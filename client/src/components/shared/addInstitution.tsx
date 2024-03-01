"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ComboboxOption, InstitutionAndCityResponse } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ComboBoxResponsive } from "./combobox";
import { AddCity } from "./addCityDialog";

export function AddInstitution({
  setSelectedOption,
}: {
  setSelectedOption: (option: ComboboxOption) => void;
}) {
  const [institution, setInstitution] = useState<string>("");
  const [cities, setCities] = useState<InstitutionAndCityResponse[]>([]);

  const [selectedCity, setSelectedCity] = useState<ComboboxOption | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const response = await axios.get<InstitutionAndCityResponse[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/cities/`,
        );
        if (response.status === 200) {
          setCities(response.data);
        }
      } catch (error) {
        setCities([]);
      }
    })();
  }, []);

  async function onAddSuccess() {
    if (institution) {
      try {
        const response = await axios.post<InstitutionAndCityResponse>(
          `${process.env.NEXT_PUBLIC_API_URL}/institutions/`,
          {
            name: institution,
            city: `${process.env.NEXT_PUBLIC_API_URL}/cities/${selectedCity?.value}/`,
          },
          {
            withCredentials: true,
          },
        );
        if (response.status === 201) {
          const newOption: ComboboxOption = {
            label: response.data.name,
            value: response.data.id.toString(),
          };
          setSelectedOption(newOption);
        }
      } catch (error) {
        toast.error("Failed to add institution");
      }
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Add New</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-indigo-950">
            Add Institution
          </AlertDialogTitle>
          <Input
            placeholder="New Institution Name"
            className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
            name="institution"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
          />
          <ComboBoxResponsive
            placeholder="Which city is the institution located in?"
            selectedOption={selectedCity}
            setSelectedOption={setSelectedCity}
            options={cities.map((city) => ({
              label: city.name,
              value: city.id.toString(),
            }))}
            commandEmpty={<AddCity setSelectedOption={setSelectedCity} />}
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="secondary" onClick={() => onAddSuccess()}>
              Add
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
