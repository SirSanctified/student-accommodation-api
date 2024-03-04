"use client";

import Link from "next/link";
import { Separator } from "../ui/separator";
import { UserAvatar } from "./userAvatar";
import { useAuthStore } from "@/store/store";
import {
  BellIcon,
  BitcoinIcon,
  BriefcaseIcon,
  BuildingIcon,
  ChevronRight,
  LightbulbIcon,
  StoreIcon,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const SideNavbar = () => {
  const { user } = useAuthStore();
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <>
      {!isNavOpen ? (
        <Button
          variant="ghost"
          className="fixed -left-1 top-20 rounded-full lg:hidden"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <ChevronRight size={32} />
        </Button>
      ) : null}
      <aside
        className={cn(
          "fixed left-auto top-0 mt-20  min-h-screen w-1/2 bg-indigo-200 pt-12 transition-all duration-500 ease-linear sm:w-1/6 md:mt-0 md:w-2/6 md:pt-24 lg:block lg:w-1/5",
          isNavOpen ? "block" : "hidden",
        )}
      >
        <Button
          variant="ghost"
          className="fixed right-0 top-20 rounded-full lg:hidden"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <X size={32} />
        </Button>
        <div className="mt-4 flex w-full flex-col space-y-4">
          <Link
            href={`/profile/${user?.id}/`}
            className="flex flex-col items-center justify-center"
          >
            <UserAvatar user={user!} />
            <p className="mt-2 w-full px-2 text-center text-xs text-indigo-950 dark:text-white">
              {user?.first_name} {user?.last_name}
            </p>
          </Link>
          <Separator className="bg-indigo-800 bg-opacity-25" />
          <div className="mt-4 flex  w-full flex-col justify-start space-y-4 px-2">
            {user?.is_student ? (
              <>
                <Link
                  href={`/profile/${user?.id}/students/bookings`}
                  className={`text-md group flex w-full items-center justify-start gap-2 rounded-md px-2 py-2 transition-all duration-500 ease-linear hover:bg-indigo-950 hover:text-white dark:hover:bg-white dark:hover:text-indigo-950 ${
                    pathname === `/profile/${user?.id}/students/bookings`
                      ? "bg-indigo-950 text-white"
                      : ""
                  }`}
                >
                  <BriefcaseIcon size={24} />
                  <p className="overflow-clip ">Bookings</p>
                </Link>
                <Link
                  href={`#`}
                  className={`text-md group flex w-full items-center justify-start gap-2 rounded-md px-2 py-2 transition-all duration-500 ease-linear hover:bg-indigo-950 hover:text-white dark:hover:bg-white dark:hover:text-indigo-950 ${
                    pathname === `/profile/${user?.id}/notifications`
                      ? "bg-indigo-950 text-white"
                      : ""
                  }`}
                >
                  <BellIcon size={24} />
                  <p className="overflow-clip ">Notifications</p>
                </Link>
                <Link
                  href={`#`}
                  className={`text-md group flex w-full items-center justify-start gap-2 rounded-md px-2 py-2 transition-all duration-500 ease-linear hover:bg-indigo-950 hover:text-white dark:hover:bg-white dark:hover:text-indigo-950 ${
                    pathname === `/profile/${user?.id}/interests`
                      ? "bg-indigo-950 text-white"
                      : ""
                  }`}
                >
                  <LightbulbIcon size={24} />
                  <p className="overflow-clip ">Interests</p>
                </Link>
                <Link
                  href={`#`}
                  className={`text-md group flex w-full items-center justify-start gap-2 rounded-md px-2 py-2 transition-all duration-500 ease-linear hover:bg-indigo-950 hover:text-white dark:hover:bg-white dark:hover:text-indigo-950 ${
                    pathname === `/profile/${user?.id}/recommendations`
                      ? "bg-indigo-950 text-white"
                      : ""
                  }`}
                >
                  <LightbulbIcon size={24} />
                  <p className="whitespace-normal">Recommended Roommates</p>
                </Link>
                <Link
                  href={`#`}
                  className={`text-md group flex w-full items-center justify-start gap-2 rounded-md px-2 py-2 transition-all duration-500 ease-linear hover:bg-indigo-950 hover:text-white dark:hover:bg-white dark:hover:text-indigo-950 ${
                    pathname === `/profile/${user?.id}/spending`
                      ? "bg-indigo-950 text-white"
                      : ""
                  }`}
                >
                  <BitcoinIcon size={24} />
                  <p className="overflow-clip ">Spending</p>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={`/profile/${user?.id}/landlords/bookings`}
                  className={`text-md group flex w-full items-center justify-start gap-2 rounded-md px-2 py-2 transition-all duration-500 ease-linear hover:bg-indigo-950 hover:text-white dark:hover:bg-white dark:hover:text-indigo-950 ${
                    pathname === `/profile/${user?.id}/landlords/bookings`
                      ? "bg-indigo-950 text-white"
                      : ""
                  }`}
                >
                  <BriefcaseIcon size={24} />
                  <p className="overflow-clip ">Bookings</p>
                </Link>
                <Link
                  href={`/profile/${user?.id}/landlords/properties`}
                  className={`text-md group flex w-full items-center justify-start gap-2 rounded-md px-2 py-2 transition-all duration-500 ease-linear hover:bg-indigo-950 hover:text-white dark:hover:bg-white dark:hover:text-indigo-950 ${
                    pathname === `/profile/${user?.id}/landlords/properties`
                      ? "bg-indigo-950 text-white"
                      : ""
                  }`}
                >
                  <BuildingIcon size={24} />
                  <p className="overflow-clip ">Properties</p>
                </Link>
                <Link
                  href={`#`}
                  className={`text-md group flex w-full items-center justify-start gap-2 rounded-md px-2 py-2 transition-all duration-500 ease-linear hover:bg-indigo-950 hover:text-white dark:hover:bg-white dark:hover:text-indigo-950 ${
                    pathname === `/profile/${user?.id}/notifications`
                      ? "bg-indigo-950 text-white"
                      : ""
                  }`}
                >
                  <BellIcon size={24} />
                  <p className="overflow-clip ">Notifications</p>
                </Link>
                <Link
                  href={`#`}
                  className={`text-md group flex w-full items-center justify-start gap-2 rounded-md px-2 py-2 transition-all duration-500 ease-linear hover:bg-indigo-950 hover:text-white dark:hover:bg-white dark:hover:text-indigo-950 ${
                    pathname === `/profile/${user?.id}/marketing-tools`
                      ? "bg-indigo-950 text-white"
                      : ""
                  }`}
                >
                  <StoreIcon size={24} />
                  <p className="overflow-clip ">Marketing Tools</p>
                </Link>
                <Link
                  href={`#`}
                  className={`text-md group flex w-full items-center justify-start gap-2 rounded-md px-2 py-2 transition-all duration-500 ease-linear hover:bg-indigo-950 hover:text-white dark:hover:bg-white dark:hover:text-indigo-950 ${
                    pathname === `/profile/${user?.id}/tips`
                      ? "bg-indigo-950 text-white"
                      : ""
                  }`}
                >
                  <LightbulbIcon size={24} />
                  <p className="whitespace-normal">Tips</p>
                </Link>
                <Link
                  href={`#`}
                  className={`text-md group flex w-full items-center justify-start gap-2 rounded-md px-2 py-2 transition-all duration-500 ease-linear hover:bg-indigo-950 hover:text-white dark:hover:bg-white dark:hover:text-indigo-950 ${
                    pathname === `/profile/${user?.id}/revenue`
                      ? "bg-indigo-950 text-white"
                      : ""
                  }`}
                >
                  <BitcoinIcon size={24} />
                  <p className="overflow-clip ">Revenue</p>
                </Link>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideNavbar;
