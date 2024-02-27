import { reasons } from "@/constants/index";
import ReasonCard from "./reasonCard";

const Reasons = () => {
  return (
    <div className="mb-8 w-full px-4">
      <h3 className=" mb-2 font-medium text-indigo-950 opacity-50">
        Why Roomio
      </h3>
      <h4 className="mb-4 caption-bottom text-3xl font-bold text-indigo-950">
        More than just a room booking app
      </h4>
      <p className="mb-4 max-w-[80ch] text-indigo-950 opacity-70">
        Roomio is the perfect website for students looking for off-campus
        housing and for landlords looking to rent out their properties. With its
        wide variety of listings, roommate matching service, and landlord
        resources, Roomio makes it easy to find the perfect room for your needs.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {reasons.map((reason) => (
          <ReasonCard
            key={reason.reason}
            reason={reason.reason}
            description={reason.description}
            icon={reason.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Reasons;
