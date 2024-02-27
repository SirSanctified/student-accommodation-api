import type { ServiceCardProps } from "@/components/home/serviceCard";

export const navLinks: {
  name: string;
  href: string;
}[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Explore",
    href: "/listings",
  },
  {
    name: "About Us",
    href: "/about",
  },
  {
    name: "Contact Us",
    href: "/contact",
  },
];

export const services: ServiceCardProps[] = [
  {
    name: "Room search",
    description:
      "Roomio offers a wide variety of listings to choose from, so you're sure to find the perfect room for your needs. You can search for rooms by location, price, amenities, and even roommates.",
    imageSrc: "/room_search.jpg",
  },
  {
    name: "Roommate matching",
    description:
      "Roomio's roommate matching service can help you find the perfect people to live with. You can create a profile and answer a few questions about your lifestyle and preferences, and Roomio will match you with potential roommates who are a good fit for you.",
    imageSrc: "/roommate_matching.jpg",
  },
  {
    name: "Landlord resources",
    description:
      "Roomio also offers a variety of resources for landlords, including tips on how to market your property, screen tenants, and manage your rental property.",
    imageSrc: "/landlord_resources.jpg",
  },
];
