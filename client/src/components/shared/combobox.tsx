"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
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
  selectedOption,
  setSelectedOption,
  placeholder,
}: {
  options: ComboboxOption[];
  commandEmpty?: ReactNode;
  selectedOption: ComboboxOption | null;
  placeholder: string;
  setSelectedOption: (option: ComboboxOption | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const { isDesktop } = useMediaQuery();

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start bg-indigo-200 focus:outline-none"
          >
            {selectedOption ? (
              <>{selectedOption.label}</>
            ) : (
              <>+ {placeholder}</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="h-full w-full p-0" align="start">
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
        <Button
          variant="outline"
          className="w-full justify-start bg-indigo-200 focus:outline-none"
        >
          {selectedOption ? <>{selectedOption.label}</> : <>+ {placeholder}</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 h-full w-full border-t">
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
    <Command className="!h-full">
      <CommandInput
        placeholder="Filter status..."
        className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
      />
      <CommandList className="!h-full">
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
        <CommandItem>{commandEmpty}</CommandItem>
      </CommandList>
    </Command>
  );
}
