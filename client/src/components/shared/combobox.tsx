"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { ComboboxOption } from "@/types";
import { type ReactNode, useState } from "react";

export function ComboBoxResponsive({
  options,
  commandEmpty,
}: {
  options: ComboboxOption[];
  commandEmpty?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { isDesktop } = useMediaQuery();

  const [selectedOption, setSelectedOption] = useState<ComboboxOption | null>(
    null,
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedOption ? <>{selectedOption.label}</> : <>+ Set Value</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <OptionList
            setOpen={setOpen}
            setSelectedOption={setSelectedOption}
            options={options}
            commandEmpty={commandEmpty}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedOption ? <>{selectedOption.label}</> : <>+ Set Value</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <OptionList
            options={options}
            setOpen={setOpen}
            setSelectedOption={setSelectedOption}
            commandEmpty={commandEmpty}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function OptionList({
  setOpen,
  setSelectedOption,
  options,
  commandEmpty,
}: {
  setOpen: (open: boolean) => void;
  setSelectedOption: (option: ComboboxOption | null) => void;
  options: ComboboxOption[];
  commandEmpty?: ReactNode;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        {commandEmpty && (
          <CommandEmpty>
            <p className="mb-4 text-sm text-indigo-950">No options found</p>
            {commandEmpty}
          </CommandEmpty>
        )}
        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              key={option.value}
              value={option.value}
              onSelect={(value) => {
                setSelectedOption(
                  options.find((selected) => selected.value === value) ?? null,
                );
                setOpen(false);
              }}
              className="text-indigo-950"
            >
              {option.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
