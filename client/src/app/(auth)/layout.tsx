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
      <body
        className={`${lato.className} flex min-h-screen items-center justify-center`}
      >
        <div className="mx-auto my-auto flex min-h-[75vh] w-full max-w-xl flex-col items-center justify-center rounded-xl shadow-md shadow-indigo-500">
          <Toaster position="top-right" />
          {children}
        </div>
      </body>
    </html>
  );
}
