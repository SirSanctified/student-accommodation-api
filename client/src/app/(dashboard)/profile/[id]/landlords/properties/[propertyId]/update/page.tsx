import PropertyForm from "@/components/shared/properties/propertyForm";
import type { Property } from "@/types";
import axios from "axios";

const UpdateProperty = async ({
  params,
}: {
  params: { propertyId: string };
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
        Update Property
      </h1>
      <p className="mb-4 max-w-xl text-indigo-950">
        Update your property details to match your needs.
      </p>
      <PropertyForm action="Update" propertyData={property.data} />
    </div>
  );
};

export default UpdateProperty;
