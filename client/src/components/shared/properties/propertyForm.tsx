"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  type ComboboxOption,
  type InstitutionAndCityResponse,
  type PropertyFormProps,
  type PropertyType,
} from "@/types";
import { useEffect, useState } from "react";
import { ComboBoxResponsive } from "../combobox";
import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { AddCity } from "../addCityDialog";

const PropertyForm = ({ action, propertyData }: PropertyFormProps) => {
  const [name, setName] = useState(propertyData?.name ?? "");
  const [location, setLocation] = useState(propertyData?.location ?? "");
  const [street, setStreet] = useState(propertyData?.street ?? "");
  const [number, setNumber] = useState(propertyData?.number ?? "");
  const [cities, setCities] = useState<ComboboxOption[]>([]);
  const [selectedCity, setSelectedCity] = useState<ComboboxOption | null>(null);
  const [propertyType, setPropertyType] = useState(
    propertyData?.property_type ?? "boarding house",
  );
  const [isPublished, setIsPublished] = useState(
    propertyData?.is_published ?? false,
  );
  const [amenities, setAmenities] = useState<ComboboxOption[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<ComboboxOption[]>(
    [],
  );

  useEffect(() => {
    async function fetchCities() {
      try {
        const [response, amenityResponse] = await Promise.all([
          axios.get<InstitutionAndCityResponse[]>(
            `${process.env.NEXT_PUBLIC_API_URL}/cities/`,
          ),
          axios.get<{ url: string; id: number; name: string }[]>(
            `${process.env.NEXT_PUBLIC_API_URL}/amenities/`,
          ),
        ]);
        if (response.status === 200) {
          response.data.forEach((city) => {
            const newOption: ComboboxOption = {
              label: city.name,
              value: city.id.toString(),
            };
            setCities((prev) => {
              if (!prev.some((option) => option.value === newOption.value)) {
                return [...prev, newOption];
              }
              return prev;
            });
          });
        }
        if (amenityResponse.status === 200) {
          amenityResponse.data.forEach((amenity) => {
            const newOption: ComboboxOption = {
              label: amenity.name,
              value: amenity.id.toString(),
            };
            setAmenities((prev) => {
              if (!prev.some((option) => option.value === newOption.value)) {
                return [...prev, newOption];
              }
              return prev;
            });
          });
        }
      } catch (error) {
        setCities([]);
      }
    }

    fetchCities().catch(() => {
      // do nothing
    });
  }, []);

  return (
    <form className="flex w-full flex-col space-y-4">
      <legend className="sr-only">{action} Property</legend>
      <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
        <Input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Property Name"
          required
          className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
        />
        <SelectComponent
          value={propertyType}
          onValueChange={(value) => setPropertyType(value as PropertyType)}
        >
          <SelectTrigger className="w-full bg-indigo-200 text-indigo-950 focus:outline-none">
            <SelectValue placeholder="Select your property type" />
          </SelectTrigger>
          <SelectContent className="w-full bg-indigo-200 text-indigo-950 focus:outline-none">
            <SelectItem value="boarding house">Boarding House</SelectItem>
            <SelectItem value="hostel">Hostel</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="cottage">Cottage</SelectItem>
          </SelectContent>
        </SelectComponent>
      </div>
      <div className="flex flex-col space-y-2 sm:flex-row md:space-x-2 md:space-y-0">
        <Select
          options={amenities}
          defaultValue={amenities[0]}
          isMulti
          placeholder="Select property amenities"
          onChange={(amenity) =>
            setSelectedAmenities((prev) => [...prev, ...amenity])
          }
          className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
        />
        <ComboBoxResponsive
          options={cities}
          selectedOption={selectedCity}
          setSelectedOption={setSelectedCity}
          commandEmpty={<AddCity setSelectedOption={setSelectedCity} />}
          placeholder="Which city is your property located in?"
        />
      </div>
      <div className="flex flex-col space-y-2 sm:flex-row md:space-x-2 md:space-y-0">
        <Input
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          required
          className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
        />
        <Input
          name="street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          placeholder="Street"
          required
          className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
        />

        <Input
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Number"
          required
          className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
        />
      </div>
      <Button type="submit" variant="default" className="w-full sm:max-w-40">
        {action}
      </Button>
    </form>
  );
};

export default PropertyForm;
