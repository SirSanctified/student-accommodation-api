"use client";

import { AddCity } from "@/components/shared/addCityDialog";
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
import type { ComboboxOption, InstitutionAndCityResponse } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const MyDetails = () => {
  const [cities, setCities] = useState<ComboboxOption[]>([]);
  const [institutions, setInstitutions] = useState<ComboboxOption[]>([]);
  const [selectedCity, setSelectedCity] = useState<ComboboxOption | null>(null);
  const [selectedInstitution, setSelectedInstitution] =
    useState<ComboboxOption | null>(null);
  const [phone, setPhone] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    async function fetchCitiesAndInstitutions() {
      try {
        const [citiesResponse, institutionsResponse] = await Promise.all([
          axios.get<InstitutionAndCityResponse[]>(
            "http://server:8000/api/cities/",
            {
              withCredentials: true,
            },
          ),
          axios.get<InstitutionAndCityResponse[]>(
            "http://server:8000/api/institutions/",
            {
              withCredentials: true,
            },
          ),
        ]);
        citiesResponse.data.forEach((city) => {
          const newOption: ComboboxOption = {
            label: city.name,
            value: city.id.toString(),
          };
          setCities((prev) => [...prev, newOption]);
        });
        institutionsResponse.data.forEach((institution) => {
          const newOption: ComboboxOption = {
            label: institution.name,
            value: institution.id.toString(),
          };
          setInstitutions((prev) => [...prev, newOption]);
        });
      } catch (error) {
        setCities([]);
        setInstitutions([]);
      }
    }
    fetchCitiesAndInstitutions().catch(() => {
      /* do nothing */
    });
  }, []);
  return (
    <main className="w-full p-4 text-indigo-950">
      <div className="flex w-full flex-col items-center justify-center gap-4 bg-green-400">
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
      <form className="mt-8 flex !w-full flex-col gap-4">
        <Select value={role} onValueChange={(value) => setRole(value)}>
          <SelectTrigger className="w-full text-indigo-950">
            <SelectValue placeholder="Select who you are" />
          </SelectTrigger>
          <SelectContent className="w-full text-indigo-950">
            <SelectItem value="student">I am a student</SelectItem>
            <SelectItem value="landlord">I am a landlord</SelectItem>
          </SelectContent>
        </Select>
        <ComboBoxResponsive
          options={institutions}
          commandEmpty={<AddCity setSelectedOption={setSelectedInstitution} />}
          selectedOption={selectedInstitution}
          setSelectedOption={setSelectedInstitution}
          placeholder="Which institution do you belong to?"
        />
        <ComboBoxResponsive
          options={cities}
          commandEmpty={<AddCity setSelectedOption={setSelectedCity} />}
          selectedOption={selectedCity}
          setSelectedOption={setSelectedCity}
          placeholder="Which city do you want to live in?"
        />
        <Input
          type="tel"
          name="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Phone number"
          required
          className="w-full text-indigo-950"
        />
        <Input
          type="file"
          name="avatar"
          className="w-full text-indigo-950"
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
