"use client";

import { AddInstitution } from "@/components/shared/addInstitution";
import { ComboBoxResponsive } from "@/components/shared/combobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/store/store";
import type { ComboboxOption, InstitutionAndCityResponse } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const MyDetails = () => {
  const [institutions, setInstitutions] = useState<ComboboxOption[]>([]);
  const [selectedInstitution, setSelectedInstitution] =
    useState<ComboboxOption | null>(null);
  const [phone, setPhone] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    async function fetchCitiesAndInstitutions() {
      try {
        const institutionsResponse = await axios.get<
          InstitutionAndCityResponse[]
        >("http://localhost:8000/api/institutions/");
        console.log(institutionsResponse.data);
        institutionsResponse.data.forEach((institution) => {
          const newOption: ComboboxOption = {
            label: institution.name,
            value: institution.id.toString(),
          };
          setInstitutions((prev) => {
            if (!prev.some((option) => option.value === newOption.value)) {
              return [...prev, newOption];
            }
            return prev;
          });
        });
      } catch (error) {
        setInstitutions([]);
      }
    }
    fetchCitiesAndInstitutions().catch(() => {
      /* do nothing */
    });
  }, []);

  if (!isAuthenticated) {
    return router.push("/signin");
  }
  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = {
      institution: selectedInstitution?.value,
      phone,
      avatar,
      is_student: role === "student",
      is_landlord: role === "landlord",
    };
    try {
      if (data.is_student) {
        const response = await axios.post(
          "http://localhost:8000/api/students/",
          data,
          {
            withCredentials: true,
          },
        );
        if (response.status === 200) {
          toast.success("Successfully updated");
        }
      } else if (data.is_landlord) {
        const response = await axios.post(
          "http://localhost:8000/api/landlords/",
          data,
          {
            withCredentials: true,
          },
        );
        if (response.status === 200) {
          toast.success("Successfully updated");
        }
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  }
  console.log(institutions);
  return (
    <main className="w-full p-4 pb-8 text-indigo-950">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <Image
          src="/logo.png"
          alt="Roomio logo"
          width={200}
          height={200}
          className="mx-auto block"
        />
        <h1 className="text-3xl font-bold">My Details</h1>
        <p className="-mt-4 text-sm opacity-50">
          Let&apos;s get to know you better..
        </p>
      </div>
      <form className="mt-8 flex !w-full flex-col gap-4" onSubmit={submitForm}>
        <Select value={role} onValueChange={(value) => setRole(value)}>
          <SelectTrigger className="w-full bg-indigo-200 text-indigo-950 focus:outline-none">
            <SelectValue placeholder="Select who you are" />
          </SelectTrigger>
          <SelectContent className="w-full bg-indigo-200 text-indigo-950 focus:outline-none">
            <SelectItem value="student">I am a student</SelectItem>
            <SelectItem value="landlord">I am a landlord</SelectItem>
          </SelectContent>
        </Select>
        {role === "student" && (
          <ComboBoxResponsive
            options={institutions}
            commandEmpty={
              <AddInstitution setSelectedOption={setSelectedInstitution} />
            }
            selectedOption={selectedInstitution}
            setSelectedOption={setSelectedInstitution}
            placeholder="Which institution do you belong to?"
          />
        )}
        <Input
          type="tel"
          name="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Phone number"
          required
          className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
        />
        <Input
          type="file"
          name="avatar"
          className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
          value={avatar}
          onChange={(event) => setAvatar(event.target.value)}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </main>
  );
};

export default MyDetails;
