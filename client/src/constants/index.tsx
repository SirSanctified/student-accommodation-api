import type { ServiceCardProps } from "@/components/home/serviceCard";
import {
  HeadphonesIcon,
  ShieldCheckIcon,
  StarsIcon,
  ThumbsUpIcon,
} from "lucide-react";

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

export const reasons = [
  {
    reason: "Safe and secure",
    description:
      "All listings are screened by powerful AI algorithms, and all payments are processed through a secure payment gateway.",
    icon: <ShieldCheckIcon className="h-12 w-12" />,
  },
  {
    reason: "Easy to use",
    description: "Roomio is designed to be user-friendly and easy to navigate.",
    icon: <ThumbsUpIcon className="h-12 w-12" />,
  },
  {
    reason: "Great customer service",
    description:
      "Our team of customer service representatives is available 24/7 to help you with any questions or concerns you may have.",
    icon: <HeadphonesIcon className="h-12 w-12" />,
  },
  {
    reason: "Free to use",
    description: "Roomio is free to use and offers no ads or tracking.",
    icon: <StarsIcon className="h-12 w-12" />,
  },
];
