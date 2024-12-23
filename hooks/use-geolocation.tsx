"use client";

import { GeolocationPos } from "@/types/geolocation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

const GeolocationContext = createContext<
  [GeolocationPos | null, (geo: GeolocationPos) => void]
>([null, () => {}]);

interface GeolocationProviderProps {
  children: ReactNode;
}

function GeolocationProvider({ children }: GeolocationProviderProps) {
  const [geolocation, setGeolocation] = useState<GeolocationPos | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeolocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (e) => {
          setGeolocation({
            latitude: 51.2262144,
            longitude: 22.5869824,
          });

          toast.error(`Błąd geolokalizaji`, {
            description: e.message,
          });
          console.error(e);
        }
      );
    } else {
      console.error("Geolocation not supported");
    }
  }, []);

  return (
    <GeolocationContext.Provider value={[geolocation, setGeolocation]}>
      {children}
    </GeolocationContext.Provider>
  );
}

function useGeolocation() {
  const context = useContext(GeolocationContext);

  if (context === undefined)
    throw new Error("useGeolocation must be used within GeolocationProvider");

  return context;
}

export { useGeolocation, GeolocationProvider };
