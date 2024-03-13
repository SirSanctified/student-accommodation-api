"use client";

import { type FormEvent, useEffect, useState } from "react";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import {
  type Property,
  type ComboboxOption,
  type InstitutionAndCityResponse,
  type PropertyFormProps,
  type PropertyType,
} from "@/types";
import { usePropertyStore } from "@/store/store";
import { ComboBoxResponsive } from "@/components/shared/combobox";
import axios from "axios";
import { AddCity } from "@/components/shared/addCityDialog";
import { Input } from "@/components/ui/input";
import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

const PropertyForm = ({ action, propertyData, userId }: PropertyFormProps) => {
  const [step, setStep] = useState(1);
  const [initialAmenities, setInitialAmenities] = useState<ComboboxOption[]>(
    [],
  );
  const [selectedAmenities, setSelectedAmenities] = useState<ComboboxOption[]>(
    [],
  );
  const [cities, setCities] = useState<ComboboxOption[]>([]);
  const [selectedCity, setSelectedCity] = useState<ComboboxOption | null>(null);
  const router = useRouter();
  const {
    property,
    setAmenities,
    setCity,
    setLocation,
    setName,
    setNumber,
    setPropertyType,
    setStreet,
  } = usePropertyStore();

  useEffect(() => {
    async function fetchCities() {
      try {
        const [response, amenityResponse] = await Promise.all([
          axios.get<InstitutionAndCityResponse[]>(
            `${process.env.NEXT_PUBLIC_API_URL}/cities/`,
          ),
          axios.get<{ url: string; id: number; name: string }[]>(
            `${process.env.NEXT_PUBLIC_API_URL}/amenities/`,
          ),
        ]);
        response.data.forEach((city) => {
          const newOption: ComboboxOption = {
            label: city.name,
            value: city.url ?? city.id.toString(),
          };
          setCities((prev) => {
            if (!prev.some((option) => option.value === newOption.value)) {
              return [...prev, newOption];
            }
            return prev;
          });
        });
        amenityResponse.data.forEach((amenity) => {
          const newOption: ComboboxOption = {
            label: amenity.name,
            value: amenity.url,
          };
          setInitialAmenities((prev) => {
            if (!prev.some((option) => option.value === newOption.value)) {
              return [...prev, newOption];
            }
            return prev;
          });
        });
      } catch (error) {
        setCities([]);
        setInitialAmenities([]);
      }
    }

    fetchCities().catch(() => {
      // do nothing
    });
    if (action === "Update") {
      setName(propertyData?.name ?? "");
      setNumber(propertyData?.number ?? "");
      setLocation(propertyData?.location ?? "");
      setPropertyType(propertyData?.property_type ?? "boarding house");
      setStreet(propertyData?.street ?? "");
      const city: ComboboxOption | null =
        cities.find((city) => city.value === propertyData?.city) ?? null;
      const amenityOptions: (ComboboxOption | [])[] =
        propertyData?.amenities?.map(
          (option) =>
            initialAmenities.find((amenity) => amenity.value === option) ?? [],
        ) ?? [];
      city
        ? setSelectedCity({
            label: city.label,
            value: city.value,
          })
        : setSelectedCity(null);
      amenityOptions.length > 0
        ? setSelectedAmenities(amenityOptions.flat())
        : [];
    }
  }, [
    action,
    propertyData?.city,
    propertyData?.amenities,
    propertyData?.name,
    propertyData?.location,
    propertyData?.number,
    propertyData?.property_type,
    propertyData?.street,
    setName,
    setNumber,
    setLocation,
    setPropertyType,
    setStreet,
    setAmenities,
    setSelectedCity,
    setSelectedAmenities,
    cities,
    initialAmenities,
  ]);

  useEffect(() => {
    if (selectedCity) {
      setCity(selectedCity.value);
    }
    if (selectedAmenities.length > 0) {
      setAmenities(selectedAmenities.map((amenity) => amenity.value));
    }
  }, [selectedCity, setCity, selectedAmenities, setAmenities]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      name: property.name,
      property_type: property.property_type,
      location: property.location,
      street: property.street,
      number: property.number,
      city: property.city,
      is_published: true,
      amenities: property.amenities,
    };
    try {
      let response;
      if (action === "Update") {
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/properties/${propertyData?.id}/`,
          data,
          {
            withCredentials: true,
          },
        );
        if (response.status === 200) {
          toast.success("Property updated successfully");
        }
        router.push(
          `/profile/${userId}/landlords/properties/${propertyData?.id}/`,
        );
      } else {
        response = await axios.post<Property>(
          `${process.env.NEXT_PUBLIC_API_URL}/properties/`,
          data,
          {
            withCredentials: true,
          },
        );
        if (response.status === 201) {
          toast.success("Property created successfully");
        }
        router.push(
          `/profile/${userId}/landlords/properties/${response.data.id}/`,
        );
      }
    } catch (error) {
      if (action === "Update") {
        toast.error("Failed to update property");
      } else {
        toast.error("Failed to create property");
      }
    }
  }
  return (
    <div className="flex w-full flex-col items-start">
      <div className="my-4 flex w-full flex-col gap-1">
        <p className="text-lg font-semibold text-indigo-950">
          {step === 1 ? "Location" : step === 2 ? "Property Type" : "Amenities"}
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
            <ComboBoxResponsive
              options={cities}
              selectedOption={selectedCity}
              setSelectedOption={setSelectedCity}
              commandEmpty={<AddCity setSelectedOption={setSelectedCity} />}
              placeholder="Which city is your property located in?"
            />
            <Input
              name="location"
              value={property.location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              required
              className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
            />
            <Input
              name="street"
              value={property.street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Street"
              required
              className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
            />

            <Input
              name="number"
              value={property.number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Number"
              required
              className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
            />
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col space-y-4">
            <Input
              name="name"
              value={property.name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
            />
            <SelectComponent
              value={property.property_type}
              onValueChange={(value) => setPropertyType(value as PropertyType)}
            >
              <SelectTrigger className="w-full bg-indigo-200 text-indigo-950 focus:outline-none">
                <SelectValue placeholder="Select your property type" />
              </SelectTrigger>
              <SelectContent className="w-full bg-indigo-200 text-indigo-950 focus:outline-none">
                <SelectItem value="boarding house">Boarding House</SelectItem>
                <SelectItem value="hostel">Hostel</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="cottage">Cottage</SelectItem>
              </SelectContent>
            </SelectComponent>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col space-y-4">
            <Select
              options={initialAmenities}
              value={selectedAmenities}
              isMulti
              placeholder="Select property amenities"
              onChange={(selectedOptions) =>
                setSelectedAmenities(selectedOptions as ComboboxOption[])
              }
              isSearchable
              className="z-0 w-full rounded-full bg-indigo-200 text-indigo-950 focus:outline-none"
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: "transparent",
                  backgroundColor: "#c7d2fe",
                  borderRadius: "8px",
                  color: "#1e1b4b",
                  ":focus": {
                    borderColor: "#1e1b4b",
                  },
                }),
                container: (base) => ({
                  ...base,
                  width: "100%",
                  ":focus": {
                    borderColor: "#1e1b4b",
                  },
                }),
              }}
            />
            <Button
              type="submit"
              variant="default"
              className="w-full sm:max-w-40"
            >
              {action}
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
            (step === 1 &&
              (!property.location ||
                !property.city ||
                !property.street ||
                !property.number)) ||
            (step === 2 && (!property.property_type || !property.name))
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

export default PropertyForm;
