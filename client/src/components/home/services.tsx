import { services } from "@/constants";
import ServiceCard from "./serviceCard";
import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";

const Services = () => {
  return (
    <div className="mb-8 rounded bg-indigo-950 px-4 py-8">
      <div className="mb-4 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center justify-between gap-8 sm:justify-normal">
          <h3 className="font-medium text-blue-200 opacity-50">Our Services</h3>
          <h4 className="mt-2 text-3xl font-semibold capitalize text-white sm:text-4xl">
            What We Do
          </h4>
        </div>
        <Button
          asChild
          size="lg"
          className="rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md transition-all duration-300 ease-in-out hover:from-blue-600 hover:to-indigo-600"
        >
          <Link href="/listings">Explore</Link>
        </Button>
      </div>
      <Separator className="mb-4 bg-white/60" />
      <div className="grid w-full gap-6 md:grid-cols-2 md:px-8 lg:grid-cols-3">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
