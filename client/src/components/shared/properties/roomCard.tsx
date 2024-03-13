import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { Property, Room } from "@/types";
import { BedIcon, BuildingIcon, MapPinIcon, TagIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const RoomCard = ({ room, property }: { room: Room; property?: Property }) => {
  return (
    <Link href={`/listings/${room.id}`}>
      <Card className="w-full min-w-[92vw] rounded-lg border-none bg-blue-200/75 p-0 text-indigo-950 md:min-w-[350px] md:max-w-sm lg:min-w-[450px]">
        <CardHeader className="p-0">
          <Image
            src={(room.display_image as string) || "/auth-bg.jpg"}
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
  );
};

export default RoomCard;
