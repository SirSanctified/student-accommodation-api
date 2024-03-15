"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { Property, Room } from "@/types";
import {
  BedIcon,
  BuildingIcon,
  EditIcon,
  MapPinIcon,
  TagIcon,
  TrashIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeleteConfirmition from "../deleteConfirmition";
import { useAuthStore } from "@/store/store";
import UpdateRoomDialog from "@/components/properties/updateRoomDialog";

const RoomCard = ({ room, property }: { room: Room; property?: Property }) => {
  const { user } = useAuthStore();
  return (
    <div className="group relative min-w-[92vw] rounded-lg border-none md:min-w-[350px] md:max-w-sm lg:min-w-[450px]">
      <Link href={`/listings/${room.id}`}>
        <Card className="w-full min-w-[92vw] rounded-lg border-none bg-blue-200/75 p-0 text-indigo-950 md:min-w-[350px] md:max-w-sm lg:min-w-[450px]">
          <CardHeader className="p-0">
            <Image
              src={"/auth-bg.jpg"}
              alt="Room"
              width={500}
              height={500}
              className="max-h-52 w-full rounded-t-lg object-cover"
            />
          </CardHeader>
          <CardContent className="px-2 py-4">
            <div className="mb-4 flex items-center gap-4">
              <h3 className="text-md font-bold">
                {property?.name ? `${property.name}, room ` : null}
                {room.name}
              </h3>
              <p className="flex items-center gap-2 rounded-full bg-indigo-200 px-2 py-0.5 text-sm font-semibold text-blue-900">
                <TagIcon
                  size={12}
                  className="rotate-90 transform text-indigo-600"
                />{" "}
                {formatCurrency(room.price)} / month
              </p>
            </div>
            {property ? (
              <div className="mb-4 flex items-center gap-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-indigo-950">
                  <MapPinIcon size={12} className="text-indigo-600" />{" "}
                  {property.city}, {property.location}
                </p>
              </div>
            ) : null}
            <div className="mb-2 flex items-center gap-4 text-sm font-semibold text-indigo-950">
              {property ? (
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <BuildingIcon size={12} className="text-indigo-600" />
                  {property?.property_type[0]?.toUpperCase() +
                    property.property_type.slice(1)}
                </p>
              ) : null}
              <p className="flex items-center gap-2 text-sm font-semibold">
                <BedIcon size={16} className="text-indigo-600" />
                {room.num_beds} Total
              </p>
              <p className="flex items-center gap-2 text-sm font-semibold">
                <BedIcon size={16} className="text-indigo-600" />
                {room.available_beds} Available
              </p>
            </div>
          </CardContent>
        </Card>
      </Link>
      {user?.id === property?.owner && (
        <div className="absolute right-0 top-0 z-10 hidden h-max  w-max flex-col items-center justify-center gap-4 rounded-lg bg-indigo-300 bg-opacity-50 p-4 px-1 group-hover:flex">
          <UpdateRoomDialog
            trigger={
              <Button
                variant={"ghost"}
                className="h-max w-max text-indigo-600 transition-all duration-500 ease-linear hover:scale-110 hover:bg-transparent hover:text-blue-700"
              >
                <EditIcon size={24} />
              </Button>
            }
            roomData={room}
            property={property?.url ?? ""}
          />
          <DeleteConfirmition
            item="room"
            trigger={
              <Button
                variant={"ghost"}
                className="h-max w-max text-red-500 transition-all duration-500 ease-linear hover:scale-110 hover:bg-transparent hover:text-red-800"
              >
                <TrashIcon size={24} />
              </Button>
            }
            actionUrl={`${process.env.NEXT_PUBLIC_API_URL}/rooms/${room.id}/`}
          />
        </div>
      )}
    </div>
  );
};

export default RoomCard;
