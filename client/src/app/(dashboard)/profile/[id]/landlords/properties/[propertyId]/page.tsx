import RoomsList from "@/components/shared/properties/roomsList";
import { Button } from "@/components/ui/button";
import type { Property } from "@/types";
import axios from "axios";
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
    <div className="w-full">
      <h1 className="mb-2 mt-4 text-3xl font-bold text-indigo-950">
        Property Details
      </h1>
      <p className="mb-4 max-w-xl text-indigo-950">
        This page contains all the details of your property {property.data.name}
        .
      </p>
      <p className="mb-4 max-w-xl text-indigo-950"></p>
      {property.data?.rooms?.length ? (
        <RoomsList
          rooms={property.data.rooms.map((room) => ({
            room,
            property: property.data,
          }))}
        />
      ) : null}
      <Link
        href={`/profile/${params.id}/landlords/properties/${params.propertyId}/update`}
      >
        <Button variant="outline">Update Property</Button>
      </Link>
    </div>
  );
};

export default PropertyDetails;
