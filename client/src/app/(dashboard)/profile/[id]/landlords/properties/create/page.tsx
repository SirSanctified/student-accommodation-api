import PropertyForm from "@/components/shared/properties/propertyForm";
const CreatePropertyPage = () => {
  return (
    <div className="w-full">
      <h1 className="mb-2 mt-4 text-3xl font-bold text-indigo-950">
        Add Property
      </h1>
      <p className="mb-4 max-w-xl text-indigo-950">
        Create a new property that you has rooms you want to rent out. After
        adding, head over to creating rooms for your property.
      </p>
      <PropertyForm action="Add" />
    </div>
  );
};

export default CreatePropertyPage;
