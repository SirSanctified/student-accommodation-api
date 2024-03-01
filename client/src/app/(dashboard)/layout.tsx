import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import SideNavbar from "@/components/shared/sideNavbar";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

import { Lato } from "next/font/google";

const lato = Lato({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Roomio - Your OffCampus Room Finder",
  description:
    "A website for students looking for off-campus housing. It is easy to use and has a wide variety of listings",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lato.className}`}>
        <div className="mx-auto min-h-screen max-w-7xl">
          <Navbar />
          <SideNavbar />
          <Toaster position="top-right" />
          <div className="mt-20 min-h-screen p-4 pt-10 lg:ml-[12rem] xl:ml-[18rem] 2xl:ml-[19rem]">
            {children}
            <footer className="border-indigo-blue-500 fixed bottom-0 left-0 mx-auto w-full max-w-7xl rounded-t-md border-t bg-gradient-to-t from-indigo-950 to-blue-950 py-4 xl:left-[calc(50%-40rem)]">
              <p className="text-center text-white">
                © {new Date().getFullYear()} Roomio. All rights reserved.
              </p>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
