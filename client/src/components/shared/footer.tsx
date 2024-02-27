import { InstagramIcon, LinkedinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-blue-900 to-indigo-900">
      <div className="flex w-full flex-col flex-wrap items-start justify-start gap-8 p-4 sm:flex-row sm:justify-between">
        <div className="flex w-full flex-col gap-4 sm:w-auto">
          <Link href="/">
            <Image
              src="/roomio-white.svg"
              alt="Roomio logo"
              width={250}
              height={200}
              className="block sm:mx-auto"
            />
          </Link>
          <p className="text-start text-white sm:max-w-sm sm:text-center">
            Your home for all things roomy. Find your next off-campus housing
            with Roomio.
          </p>
        </div>

        <div className="flex w-full flex-col gap-4 sm:w-auto">
          <h3 className="text-lg font-bold text-white">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-white">
            <li className="hover:text-blue-400">
              <Link href="/listings">Explore</Link>
            </li>
            <li className="hover:text-blue-400">
              <Link href="#">Privacy Policy</Link>
            </li>
            <li className="hover:text-blue-400">
              <Link href="#">Terms of Service</Link>
            </li>
            <li className="hover:text-blue-400">
              <Link href="#"></Link>
            </li>
          </ul>
        </div>

        <div className="flex w-full flex-col gap-4 sm:w-auto">
          <h3 className="text-lg font-bold text-white">Contact</h3>
          <ul className="flex flex-col gap-2 text-white">
            <li className="hover:text-blue-400">
              <h3>1-800-ROOMIO</h3>
              <p>AnyStreet, AnyTown, AnyState 12345</p>
            </li>
            <li className="hover:text-blue-400">
              <Link href="#">info@roomio.com</Link>
            </li>
            <li className="hover:text-blue-400">
              <Link href="#">+263 71 345 2678</Link>
            </li>
          </ul>
        </div>
        <div className="flex w-full flex-col gap-4 sm:w-auto">
          <h3 className="text-lg font-bold text-white">Follow Us</h3>
          <ul className="flex gap-4 text-white">
            <li>
              <Link
                href="https://www.linkedin.com/company/roomio"
                className="transition-all duration-200 ease-linear"
              >
                <LinkedinIcon size={32} />
              </Link>
            </li>
            <li>
              <Link
                href="https://twitter.com/roomio"
                className="transition-all duration-200 ease-linear"
              >
                <Image
                  src="/x.svg"
                  alt="Twitter logo"
                  width={32}
                  height={32}
                  className="transition-all duration-200 ease-linear"
                />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com/roomio"
                className="transition-all duration-200 ease-linear"
              >
                <InstagramIcon size={32} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Separator className="my-8 bg-blue-300" />
      <div className="flex w-full  items-center justify-center gap-4 p-4 pb-8">
        <p className="text-white">
          &copy; {new Date().getFullYear()} Roomio. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
