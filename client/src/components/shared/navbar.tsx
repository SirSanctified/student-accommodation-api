"use client";

import { navLinks } from "@/constants/index";
import { LucideMenu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useAuthStore } from "@/store/store";
import { UserAvatar } from "./userAvatar";
import { ProfileMenu } from "./profileMenu";

const Navbar = () => {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthStore();
  return (
    <header className="fixed top-0 z-50 mx-auto w-full max-w-7xl border-b-2 border-indigo-300 bg-gray-100/90 shadow">
      <nav className="flex items-center justify-between p-4">
        <Link href="/">
          <Image
            src={"/roomio.svg"}
            alt="Roomio Logo"
            width={200}
            height={100}
            priority
          />
        </Link>
        <div className="hidden items-center space-x-4 md:flex">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.name}
              className={`${pathname === link.href ? "text-indigo-500 hover:text-indigo-800" : "text-gray-600 hover:text-indigo-500"} text-lg font-bold`}
            >
              {link.name}
            </Link>
          ))}
          {isAuthenticated ? (
            <ProfileMenu user={user!} trigger={<UserAvatar user={user!} />} />
          ) : (
            <div className="flex items-center md:ml-4">
              <Link
                href={"/signin"}
                className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-1 text-lg font-bold text-white hover:from-indigo-600 hover:to-blue-600"
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
        {/* Mobile */}
        <div className="flex items-center gap-4 md:hidden">
          {isAuthenticated ? (
            <ProfileMenu user={user!} trigger={<UserAvatar user={user!} />} />
          ) : (
            <div className="flex items-center">
              <Link
                href={"/signin"}
                className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-1 text-lg font-bold text-white hover:from-indigo-600 hover:to-blue-600"
              >
                Sign In
              </Link>
            </div>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 ">
                <LucideMenu size={24} />{" "}
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-4">
              <SheetHeader className="mb-1">
                <Image
                  src={"/logo-color.png"}
                  alt="Roomio Logo"
                  width={100}
                  height={100}
                  className="mx-auto block rounded-full border-2 border-indigo-300 object-cover"
                />
                <SheetTitle className="text-lg font-semibold text-indigo-500">
                  The best way to find your off-campus room.
                </SheetTitle>
              </SheetHeader>
              <Separator className="mb-4 bg-gradient-to-r from-blue-500 to-indigo-500" />
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.name}>
                    <Link
                      href={link.href}
                      className={`${pathname === link.href ? "text-indigo-500 hover:text-indigo-800" : "text-gray-600 hover:text-indigo-500"} text-lg font-bold`}
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
