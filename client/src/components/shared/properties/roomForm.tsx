"use client";
import { type FormEvent, useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import type { Property, RoomFormProps, RoomType } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore, useRoomState } from "@/store/store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageFileInput from "../imagesInputWithPreview";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RoomForm = ({ property, roomData, action }: RoomFormProps) => {
  const [step, setStep] = useState(1);
  const [displayImageUrl, setDisplayImageUrl] = useState("");
  const [imagesUrls, setImagesUrls] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    name: "",
    room_type: "",
    num_beds: "",
    occupied_beds: "",
    available_beds: "",
    price: "",
    display_image: "",
  });

  const {
    room,
    setAvailableBeds,
    setDescription,
    setDisplayImage,
    setImages,
    setIsAvailable,
    setName,
    setNumBeds,
    setOccupiedBeds,
    setPrice,
    setProperty,
    setRoomType,
  } = useRoomState();
  const { user } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    if (roomData) {
      setProperty(roomData.property as string);
      setName(roomData.name);
      setDescription(roomData.description);
      setRoomType(roomData.room_type);
      setNumBeds(roomData.num_beds);
      setOccupiedBeds(roomData.occupied_beds);
      setAvailableBeds(roomData.available_beds);
      setPrice(roomData.price);
      setIsAvailable(roomData.is_available);
      setDisplayImage(roomData.display_image);
      setImages(roomData?.images as File[]);
    }
    if (!roomData) {
      (async () => {
        const response = await axios.get<Property>(
          `${process.env.NEXT_PUBLIC_API_URL}/properties/${property}/`,
          {
            withCredentials: true,
          },
        );
        if (response.status === 200) {
          response.data?.url && setProperty(response.data.url);
        }
      })().catch(() => {
        toast.error("Something went wrong");
      });
    }
  }, [
    roomData,
    setProperty,
    setName,
    setDescription,
    setRoomType,
    setNumBeds,
    setOccupiedBeds,
    setAvailableBeds,
    setPrice,
    setIsAvailable,
    setDisplayImage,
    setImages,
    property,
  ]);

  useEffect(() => {
    setDisplayImageUrl(
      room.display_image instanceof File
        ? URL.createObjectURL(room.display_image)
        : room.display_image,
    );
    setImagesUrls(
      room.images instanceof Array
        ? room.images.map((item) =>
            item instanceof File ? URL.createObjectURL(item) : item,
          )
        : [],
    );

    // Cleanup function to revoke URLs
    return () => {
      if (displayImageUrl) {
        URL.revokeObjectURL(displayImageUrl);
      }
      imagesUrls.forEach((url) => URL.revokeObjectURL(url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room.display_image, room.images]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    Object.entries(room).map(([key, value]) => {
      if (value === "") {
        setErrors((prev) => ({ ...prev, [key]: "This field is required" }));
        return;
      }
    });
    if (errors.display_image) {
      toast.error("Display Image is required");
      return;
    }
    const data = new FormData();
    data.append("property", room.property as string);
    data.append("name", room.name);
    data.append("description", room.description);
    data.append("room_type", room.room_type);
    data.append("num_beds", room.num_beds.toString());
    data.append("occupied_beds", room.occupied_beds.toString());
    data.append("available_beds", room.available_beds.toString());
    data.append("price", room.price.toString());
    data.append("is_available", room.is_available.toString());
    data.append("display_image", room.display_image as File);
    data.append("images", JSON.stringify(room.images));

    try {
      if (action === "Add") {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/rooms/`, data, {
          headers: {
            "content-type": "multipart/form-data",
          },
          withCredentials: true,
        });
      }
      if (action === "Update" && roomData) {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/rooms/${roomData.id}/`,
          data,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
            withCredentials: true,
          },
        );
      }
      toast.success(`Room ${action}ed Successfully`);
      router.push(`/profile/${user?.id}/landlords/properties/${property}/`);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-start">
      <div className="my-4 flex w-full flex-col gap-1">
        <p className="text-lg font-semibold text-indigo-950">
          {step === 1 ? "Room Details" : step === 2 ? "Availability" : "Photos"}
        </p>
        <Progress color="blue" value={(step / 3) * 100} className="w-full" />
      </div>
      <form
        className="flex w-full flex-col space-y-8 md:min-h-[300px]"
        onSubmit={handleSubmit}
      >
        <legend className="sr-only">{action} Property</legend>
        {step === 1 && (
          <div className="flex flex-col space-y-4">
            <Input
              name="name"
              value={room.name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className={`w-full bg-indigo-200 text-indigo-950 focus:outline-none ${errors.name && "border border-destructive"}`}
            />
            <Select
              value={room.room_type}
              onValueChange={(value) => setRoomType(value as RoomType)}
            >
              <SelectTrigger
                className={`w-full bg-indigo-200 text-indigo-950 focus:outline-none ${errors.room_type && "border border-destructive"}`}
              >
                <SelectValue placeholder="Select your room type" />
              </SelectTrigger>
              <SelectContent className="w-full bg-indigo-200 text-indigo-950 focus:outline-none">
                <SelectItem value="single">Single (1 bed)</SelectItem>
                <SelectItem value="double">Double (2 beds)</SelectItem>
                <SelectItem value="triple">Triple (3 beds)</SelectItem>
                <SelectItem value="quadruple">Quadruple (4 beds)</SelectItem>
                <SelectItem value="dormitory">
                  Dormitory (More than 4 beds)
                </SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              name="description"
              value={room.description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Room Description"
              className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
            />
            <Input
              name="price"
              value={room.price || ""}
              min={0}
              onChange={(e) => setPrice(Number(e.target.value))}
              type="number"
              placeholder="Price"
              className={`w-full bg-indigo-200 text-indigo-950 focus:outline-none ${errors.price && "border border-destructive"}`}
            />
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col space-y-4">
            <Input
              name="numBeds"
              value={room.num_beds}
              onChange={(e) => setNumBeds(Number(e.target.value))}
              type="number"
              min={1}
              placeholder="Number of beds"
              className={`w-full bg-indigo-200 text-indigo-950 focus:outline-none ${errors.num_beds && "border border-destructive"}`}
            />
            <Input
              name="occupiedBeds"
              value={room.occupied_beds}
              onChange={(e) => setOccupiedBeds(Number(e.target.value))}
              type="number"
              min={0}
              max={room.num_beds - room.available_beds}
              placeholder="Occupied beds"
              className={`w-full bg-indigo-200 text-indigo-950 focus:outline-none ${errors.occupied_beds && "border border-destructive"}`}
            />
            <Input
              name="availableBeds"
              value={room.available_beds}
              onChange={(e) => setAvailableBeds(Number(e.target.value))}
              type="number"
              min={0}
              max={room.num_beds - room.occupied_beds}
              placeholder="Available beds"
              className={`w-full bg-indigo-200 text-indigo-950 focus:outline-none ${errors.available_beds && "border border-destructive"}`}
            />
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="display_image"
                className="font-medium text-indigo-950"
              >
                Display Image
              </Label>
              <ImageFileInput
                id="display_image"
                value={
                  typeof room.display_image !== "string"
                    ? [room.display_image]
                    : []
                }
                onFilesChange={(files: File[]) =>
                  files[0] && setDisplayImage(files[0])
                }
              >
                {displayImageUrl && (
                  <Image
                    src={displayImageUrl}
                    alt="Display Image"
                    width={200}
                    height={200}
                    className="max-h-[200px] w-full rounded-lg object-cover"
                  />
                )}
              </ImageFileInput>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="images" className="font-medium text-indigo-950">
                Room Images
              </Label>
              <ImageFileInput
                onFilesChange={(files: File[]) => setImages(files)}
                isMulti
                value={room.images as File[]}
              >
                <div className="flex w-full items-center gap-2 ">
                  {imagesUrls.map((url) => (
                    <Image
                      key={url}
                      src={url}
                      alt="Display Image"
                      width={80}
                      height={80}
                      className="block rounded-lg object-cover"
                    />
                  ))}
                </div>
              </ImageFileInput>
            </div>
            <Button
              type="submit"
              className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white transition-all duration-500 ease-linear hover:from-blue-500 hover:to-indigo-500"
            >
              {action} Room
            </Button>
          </div>
        )}
      </form>
      <div className="mt-6 flex w-full items-center justify-between gap-8">
        <Button
          disabled={step === 1}
          onClick={() => setStep((prev) => prev - 1)}
          className="h-max px-4 py-1"
        >
          Back
        </Button>
        <Button
          disabled={
            step === 3 ||
            (step === 1 && (!room.name || !room.room_type || !room.price)) ||
            (step === 2 &&
              (!room.num_beds ||
                room.occupied_beds < 0 ||
                room.available_beds < 0))
          }
          onClick={() => setStep((prev) => prev + 1)}
          className="h-max px-4 py-1"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default RoomForm;
