"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

const LandLordVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const idCard = formData.get("idCard") as File;
    const utilityBill = formData.get("utilityBill") as File;
    const titleDeed = formData.get("titleDeed") as File;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/verification/`,
        {
          id_card: idCard,
          utility_bill: utilityBill,
          title_deed: titleDeed,
        },
        {
          withCredentials: true,
        },
      );
      toast.success("Successfully submitted verification request");
      event.currentTarget.reset();
      router.push("/");
    } catch (error) {
      toast.error(
        "Failed to submit request. If you have a pending requst please wait for it to be approved.",
      );
    }
    setIsLoading(false);
  }
  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-4 py-8 text-indigo-950">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <h1 className="w-full text-start text-3xl font-bold text-white">
          Verify Yourself
        </h1>
        <p className="-mt-4 w-full  text-start text-sm text-white opacity-80">
          We need you to verify your identity before you can start listing your
          properties.
        </p>
      </div>
      <form className="mt-8 flex !w-full flex-col gap-1" onSubmit={submitForm}>
        <Label htmlFor="idCard" className="text-white">
          Upload ID Card<span className="text-red-500">*</span>
        </Label>
        <Input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          name="idCard"
          id="idCard"
          className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
          placeholder="ID Card, eg. passport, national id"
          required
        />
        <Label htmlFor="utilityBill" className="mt-3 text-white">
          Upload Utility Bill<span className="text-red-500">*</span>
        </Label>
        <Input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          name="utilityBill"
          id="utilityBill"
          className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
          placeholder="Utility Bill, eg. water bill"
          required
        />
        <Label htmlFor="titleDeed" className="mt-3 text-white">
          Upload Title Deed<span className="text-red-500">*</span>
        </Label>
        <Input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          name="titleDeed"
          id="titleDeed"
          className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
          placeholder="Title Deed, eg. house title deed"
          required
        />
        <Button variant="secondary" type="submit" className="mt-3 w-full">
          {isLoading ? "Submitting..." : "Verify"}
        </Button>
      </form>
    </main>
  );
};

export default LandLordVerification;
