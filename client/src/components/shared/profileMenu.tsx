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
import { LogOutIcon, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProfileMenu({ trigger }: { trigger: React.ReactNode }) {
  const router = useRouter();
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>{trigger}</MenubarTrigger>
        <MenubarContent className="text-md text-indigo-950">
          <MenubarItem>
            <User className="mr-2 h-4 w-4" />
            <Link href={"/profile"}>Profile</Link>
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
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
