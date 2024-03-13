import RoomsList from "@/components/shared/properties/roomsList";
import { Button } from "@/components/ui/button";
import type { Property } from "@/types";
import axios from "axios";
import { EditIcon } from "lucide-react";
import Link from "next/link";

const PropertyDetails = async ({
  params,
}: {
  params: { id: string; propertyId: string };
}) => {
  const property = await axios.get<Property>(
    `${process.env.NEXT_PUBLIC_API_URL}/properties/${params.propertyId}`,
    {
      withCredentials: true,
    },
  );
  return (
    <main className="relative w-full">
      <Link
        href={`/profile/${params.id}/landlords/properties/${params.propertyId}/update`}
        className="absolute -top-6 right-4 sm:top-4"
      >
        <Button variant="ghost" className="h-8 w-8 p-0 text-blue-800">
          <EditIcon />
        </Button>
      </Link>
      <h1 className="mb-2 mt-4 text-3xl font-bold text-indigo-950">
        {property.data.name} - {property.data.city}, {property.data.location}
      </h1>
      <p className="mb-4 max-w-xl text-indigo-950">
        {property.data.property_type[0]?.toUpperCase() +
          property.data.property_type.slice(1)}{" "}
        in {property.data.street}, {property.data.number} (
        {property.data.rooms?.length} rooms)
      </p>
      <h2 className="my-4 w-full text-start text-2xl font-bold text-indigo-950">
        Rooms
      </h2>
      {property.data?.rooms?.length ? (
        <RoomsList
          rooms={property.data.rooms.map((room) => ({
            room,
            property: property.data,
          }))}
        />
      ) : null}
    </main>
  );
};

export default PropertyDetails;
