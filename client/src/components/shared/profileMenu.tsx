"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import {
  BellIcon,
  BriefcaseIcon,
  BuildingIcon,
  HeartIcon,
  LightbulbIcon,
  LogOutIcon,
  PackageOpenIcon,
  Settings,
  UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { User } from "@/types";

export function ProfileMenu({
  trigger,
  user,
}: {
  trigger: React.ReactNode;
  user: User;
}) {
  const router = useRouter();
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>{trigger}</MenubarTrigger>
        <MenubarContent className="text-md text-indigo-950">
          <MenubarItem>
            <UserIcon className="mr-2 h-4 w-4" />
            <Link href={`/profile/${user.id}`}>Profile</Link>
          </MenubarItem>
          <MenubarItem>
            <BellIcon className="mr-2 h-4 w-4" />
            Notifications
          </MenubarItem>
          <MenubarItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </MenubarItem>
          <MenubarItem
            onClick={() => {
              localStorage.removeItem("auth");
              router.push("/signin");
            }}
          >
            <LogOutIcon className="mr-2 h-4 w-4" />
            Logout
          </MenubarItem>
          <MenubarSeparator className="my-1 h-[2px] bg-indigo-500" />
          {user.is_student ? (
            <>
              <MenubarItem>
                <BriefcaseIcon className="mr-2 h-4 w-4" />
                <Link href={`/profile/${user.id}/students/bookings`}>
                  Bookings
                </Link>
              </MenubarItem>
              <MenubarItem>
                <HeartIcon className="mr-2 h-4 w-4" />
                Favorites
              </MenubarItem>
              <MenubarItem>
                <LightbulbIcon className="mr-2 h-4 w-4" />
                Interests
              </MenubarItem>
            </>
          ) : (
            <>
              <MenubarItem>
                <BriefcaseIcon className="mr-2 h-4 w-4" />
                <Link href={`/profile/${user.id}/landlords/bookings`}>
                  Bookings
                </Link>
              </MenubarItem>
              <MenubarItem>
                <BuildingIcon className="mr-2 h-4 w-4" />
                <Link href={`/profile/${user.id}/landlords/properties`}>
                  Properties
                </Link>
              </MenubarItem>
              <MenubarItem>
                <PackageOpenIcon className="mr-2 h-4 w-4" />
                Resources
              </MenubarItem>
            </>
          )}
          <MenubarSeparator />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
