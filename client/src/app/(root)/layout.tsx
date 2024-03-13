import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
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
      <body className={`${lato.className}`} suppressHydrationWarning>
        <div className="mx-auto min-h-screen max-w-7xl">
          <Navbar />
          <Toaster position="top-right" />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
