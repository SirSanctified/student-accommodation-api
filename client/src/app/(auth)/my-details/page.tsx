"use client";

import { AddCity } from "@/components/shared/addCityDialog";
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
import type {
  ComboboxOption,
  InstitutionAndCityResponse,
  PreferredPaymentMethods,
} from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const MyDetails = () => {
  const [institutions, setInstitutions] = useState<ComboboxOption[]>([]);
  const [cities, setCities] = useState<ComboboxOption[]>([]);
  const [selectedInstitution, setSelectedInstitution] =
    useState<ComboboxOption | null>(null);
  const [selectedCity, setSelectedCity] = useState<ComboboxOption | null>(null);
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [ecocashNumber, setEcocashNumber] = useState<string>("");
  const [accountNmber, setAccountnumber] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [preferredPaymentMethod, setPreferredPaymentMethod] =
    useState<PreferredPaymentMethods>("ecocash usd");
  const [avatar, setAvatar] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    async function fetchInstitutionsAndCities() {
      try {
        const [institutionsResponse, citiesResponse] = await Promise.all([
          axios.get<InstitutionAndCityResponse[]>(
            "http://localhost:8080/api/institutions/",
          ),
          axios.get<InstitutionAndCityResponse[]>(
            "http://localhost:8080/api/cities/",
          ),
        ]);

        institutionsResponse.data.forEach((institution) => {
          const newOption: ComboboxOption = {
            label: institution.name,
            value: institution.url ?? institution.id.toString(),
          };
          setInstitutions((prev) => {
            if (!prev.some((option) => option.value === newOption.value)) {
              return [...prev, newOption];
            }
            return prev;
          });
        });

        citiesResponse.data.forEach((city) => {
          console.log(city);
          const newOption: ComboboxOption = {
            label: city.name,
            value: city.url ?? city.id.toString(),
          };
          setCities((prev) => {
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
    fetchInstitutionsAndCities().catch(() => {
      /* do nothing */
    });
  }, []);

  if (!isAuthenticated) {
    return router.push("/signin");
  }
  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const userRoleData = {
      user: `http://localhost/api/auth/users/${user?.id}/`,
      institution: selectedInstitution?.value,
      city: selectedCity?.value,
      registration_number: registrationNumber,
      address: address,
      level: level,
      ecocash_number: ecocashNumber,
      account_number: accountNmber,
      account_name: accountName,
      bank_name: bankName,
      preferred_payment_method: preferredPaymentMethod,
      is_student: role === "student",
      is_landlord: role === "landlord",
    };

    try {
      if (userRoleData.is_student) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/students/`,
          {
            user: userRoleData.user,
            institution: userRoleData.institution,
            registrationNumber: userRoleData.registration_number,
            level: userRoleData.level,
          },
          {
            withCredentials: true,
          },
        );
      } else if (userRoleData.is_landlord) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/landlords/`,
          {
            user: userRoleData.user,
            address: userRoleData.address,
            city: userRoleData.city,
            preferred_payment_method: userRoleData.preferred_payment_method,
            bank_name: userRoleData.bank_name,
            account_name: userRoleData.account_name,
            account_number: userRoleData.account_number,
            ecocash_number: userRoleData.ecocash_number,
          },
          {
            withCredentials: true,
          },
        );
      }

      toast.success("Successfully updated");

      router.push("/");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  }
  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-4 py-8 text-indigo-950">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <h1 className="w-full text-start text-3xl font-bold">My Details</h1>
        <p className="-mt-4 w-full  text-start text-sm opacity-80">
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
        {role === "student" ? (
          <>
            <ComboBoxResponsive
              options={institutions}
              commandEmpty={
                <AddInstitution setSelectedOption={setSelectedInstitution} />
              }
              selectedOption={selectedInstitution}
              setSelectedOption={setSelectedInstitution}
              placeholder="Which institution do you belong to?"
            />
            <Input
              type="text"
              name="registrationNumber"
              value={registrationNumber}
              onChange={(event) => setRegistrationNumber(event.target.value)}
              placeholder="Registration number"
              required
              className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
            />
            <Input
              type="text"
              name="level"
              value={level}
              onChange={(event) => setLevel(event.target.value)}
              placeholder="Level"
              required
              className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
            />
          </>
        ) : role === "landlord" ? (
          <>
            <ComboBoxResponsive
              options={cities}
              commandEmpty={<AddCity setSelectedOption={setSelectedCity} />}
              selectedOption={selectedCity}
              setSelectedOption={setSelectedCity}
              placeholder="Where do you live?"
            />
            <Input
              type="text"
              name="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Address"
              required
              className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
            />
            <Input
              type="text"
              name="ecocashNumber"
              value={ecocashNumber}
              onChange={(event) => setEcocashNumber(event.target.value)}
              placeholder="Ecocash number"
              required
              className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
            />
            <Input
              type="text"
              name="accountNumber"
              value={accountNmber}
              onChange={(event) => setAccountnumber(event.target.value)}
              placeholder="Account number"
              required
              className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
            />
            <Input
              type="text"
              name="accountName"
              value={accountName}
              onChange={(event) => setAccountName(event.target.value)}
              placeholder="Account name"
              required
              className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
            />
            <Input
              type="text"
              name="bankName"
              value={bankName}
              onChange={(event) => setBankName(event.target.value)}
              placeholder="Bank name"
              required
              className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
            />
            <Select
              value={preferredPaymentMethod}
              onValueChange={(value) =>
                setPreferredPaymentMethod(value as PreferredPaymentMethods)
              }
            >
              <SelectTrigger className="w-full bg-indigo-200 text-indigo-950 focus:outline-none">
                <SelectValue
                  placeholder="Preferred payment method"
                  className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
                />
              </SelectTrigger>
              <SelectContent className="w-full bg-indigo-200 text-indigo-950 focus:outline-none">
                <SelectItem value="bank transfer">Bank Transfer</SelectItem>
                <SelectItem value="ecocash usd">Ecocash USD</SelectItem>
                <SelectItem value="cash usd">Cash USD</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </>
        ) : null}
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
