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
      <p className="mb-4 max-w-xl text-indigo-950">
        {JSON.stringify(property.data)}
      </p>
      <Link
        href={`/profile/${params.id}/landlords/properties/${params.propertyId}/update`}
      >
        <Button variant="outline">Update Property</Button>
      </Link>
    </div>
  );
};

export default PropertyDetails;
