import type { PropertyFormProps } from "@/types";

const PropertyForm = ({ action, propertyData }: PropertyFormProps) => {
  return (
    <form>
      <p>{propertyData ? "Edit" : "Add"}</p>
      <input type="submit" value={action} />
    </form>
  );
};

export default PropertyForm;
