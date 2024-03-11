import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import { Lato } from "next/font/google";
import Image from "next/image";

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
      <body
        className={`${lato.className} flex min-h-screen items-center justify-center bg-[url("/auth-home.jpg")] bg-cover bg-center bg-no-repeat`}
      >
        <div className="mx-auto my-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center gap-8 md:flex-row ">
          <Toaster position="top-right" />
          {children}
          <div className="mx-auto mr-4 hidden flex-1 rounded-lg bg-blue-200/45 p-6 md:block md:w-1/2">
            <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={100}
              className="mx-auto mb-4"
            />
            <h1 className="text-4xl font-bold text-indigo-950">
              Home is Where Your Story Begins
            </h1>
            <p className="mt-4 text-lg text-indigo-950">
              Your home is more than just a place to live. It&rsquo;s where you
              create memories, build relationships, and grow as a person.
              It&rsquo;s where you feel safe, comfortable, and loved. Finding
              the perfect home can be a challenge, but it&rsquo;s also an
              exciting opportunity to start a new chapter in your life. Whether
              you&rsquo;re a student looking for off-campus housing or a
              landlord looking to rent out your property, Roomio can help you
              find the perfect place to call home.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
