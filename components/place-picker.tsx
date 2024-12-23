"use client";

import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { ChevronsUpDown } from "lucide-react";
import { useGeolocation } from "@/hooks/use-geolocation";
import { OpenStreetMapService } from "@/services/open-street-map.service";
import { useDebounce } from "@uidotdev/usehooks";
import { Place } from "@/types/open-street-map";
import { uniqBy } from "lodash";
import { Skeleton } from "./ui/skeleton";

const openStreetMapService = new OpenStreetMapService();

function PlacePicker() {
  const [geolocation, setGeolocation] = useGeolocation();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const searchDeounced = useDebounce(search, 200);
  const [places, setPlaces] = useState<Place[]>([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!value || !places.length) return;

    const place = places.find((place) => place.display_name === value)!;

    setPlaces([]);
    setGeolocation({
      latitude: place.lat,
      longitude: place.lon,
    });
  }, [value]);

  useEffect(() => {
    openStreetMapService
      .searchPlace(searchDeounced)
      .then((places) => setPlaces(uniqBy(places, "display_name")));
  }, [searchDeounced]);

  useEffect(() => {
    if (!geolocation) return;

    openStreetMapService
      .reverceSearchPlace(geolocation)
      .then(({ display_name }) => setValue(display_name));
  }, [geolocation]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between overflow-hidden"
        >
          <div className="inline w-full overflow-hidden text-ellipsis text-left">
            {value || <Skeleton className="w-full h-4" />}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[250px] p-0">
        <Command>
          <CommandInput
            onValueChange={setSearch}
            value={search}
            placeholder="Znajdź miejscowość..."
          />
          <CommandList>
            <CommandEmpty>Nie znaleziono miejscowości.</CommandEmpty>
            <CommandGroup>
              {places.map((place) => (
                <CommandItem
                  key={place.display_name}
                  value={place.display_name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {place.display_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { PlacePicker };
