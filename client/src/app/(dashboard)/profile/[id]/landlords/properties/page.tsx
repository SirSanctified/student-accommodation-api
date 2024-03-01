import { Button } from "@/components/ui/button";
import Link from "next/link";

const PropertiesPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Link href="/profile/1/landlords/properties/create">
        <Button variant="outline">Create Property</Button>
      </Link>
    </div>
  );
};

export default PropertiesPage;
