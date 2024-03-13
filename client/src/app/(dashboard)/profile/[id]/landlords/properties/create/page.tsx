import PropertyForm from "@/components/shared/properties/propertyForm";
import Image from "next/image";

const CreatePropertyPage = ({
  params,
}: {
  params: { id: string; propertyId: string };
}) => {
  return (
    <div className="w-full">
      <h1 className="mb-2 mt-4 text-3xl font-bold text-indigo-950">
        Add Property
      </h1>
      <p className="mb-4 max-w-lg text-indigo-950">
        Create a new property that you has rooms you want to rent out. After
        adding, head over to creating rooms for your property.
      </p>
      <div className="flex w-full items-center justify-between gap-8">
        <PropertyForm action="Add" userId={params.id} />
        <div className="relative hidden w-full md:block">
          <Image
            src="/auth-bg.jpg"
            alt="Home"
            width={1080}
            height={720}
            className="w-full rounded-lg shadow-md"
          />
          <div className="absolute bottom-4 left-2">
            <div className="flex items-center">
              <Image
                src="/auth-home.jpg"
                alt="Home"
                width={720}
                height={720}
                className="h-12 w-12 rounded-full object-cover shadow-md"
              />
              <Image
                src="/auth-home.jpg"
                alt="Home"
                width={720}
                height={720}
                className="-ml-4 h-12 w-12 rounded-full object-cover shadow-md"
              />
              <Image
                src="/auth-home.jpg"
                alt="Home"
                width={720}
                height={720}
                className="-ml-4 h-12 w-12 rounded-full object-cover shadow-md"
              />
              <div className="-ml-12 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-950/45 font-bold text-white shadow-md">
                150+
              </div>
              <p className="ml-2 text-xl font-bold text-white">
                Landlords Trust Us
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePropertyPage;
