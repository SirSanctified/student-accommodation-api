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
import { useState } from "react";
import { toast } from "sonner";

export function AddCity({
  setSelectedOption,
}: {
  setSelectedOption: (option: ComboboxOption) => void;
}) {
  const [city, setCity] = useState<string>("");
  async function onAddSuccess() {
    if (city) {
      try {
        const response = await axios.post<InstitutionAndCityResponse>(
          "http://localhost:8000/api/cities/",
          {
            name: city,
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
        toast.error("Failed to add city");
      }
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Add New City</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-indigo-950">
            Add New City
          </AlertDialogTitle>
          <Input
            placeholder="New City Name"
            className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
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
