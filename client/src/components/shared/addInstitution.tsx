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

export function AddInstitution({
  setSelectedOption,
}: {
  setSelectedOption: (option: ComboboxOption) => void;
}) {
  const [institution, setInstitution] = useState<string>("");
  async function onAddSuccess() {
    if (institution) {
      try {
        const response = await axios.post<InstitutionAndCityResponse>(
          "http://server:8000/api/institutions/",
          {
            name: institution,
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
            className="w-full text-indigo-950"
            name="institution"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
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
