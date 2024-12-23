"use client";

import { useGeolocation } from "@/hooks/use-geolocation";
import { WeatherCard } from "@/components/weather-card";
import { useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { PlacePicker } from "@/components/place-picker";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DailyWeather } from "@/types/weather";
import { WeatherService } from "@/services/weather.service";
import { useFetch } from "@/hooks/use-fetch";
import { EnergyChart } from "../components/energy-chart";

const weatherService = new WeatherService();

export default function Home() {
  const [geolocation] = useGeolocation();
  const [dailyWeather, loading, error] = useFetch(
    useCallback(
      () => geolocation && weatherService.getWeather(geolocation),
      [geolocation]
    )
  );

  const Map = useMemo(
    () =>
      dynamic(
        () => import("@/components/leaflet-map").then((mod) => mod.LeafletMap),
        {
          loading: () => (
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground">
                Wczytywanie mapy...
              </span>
              <Skeleton className="w-full min-h-72 h-[40vh] rounded-md" />
            </div>
          ),
          ssr: false,
        }
      ),
    []
  );

  return (
    <div className="grid gap-3">
      <section>
        <h2>Twoja lokalizacja</h2>
        <div className="grid gap-2">
          <Map className="w-full min-h-72 h-[40vh] rounded-md" />
          <PlacePicker />
        </div>
      </section>

      <section className="grid gap-2 w-full">
        <h2>Prognoza</h2>
        <div className="grid gap-3 w-full">
          <ScrollArea className="whitespace-nowrap">
            <table className="w-full">
              <tbody>
                <tr className="grid gap-2 max-w-full grid-cols-[repeat(7,_minmax(9rem,_1fr))]">
                  {loading || error
                    ? [...new Array(7)].map((_, i) => (
                        <td className="w-full" key={i}>
                          <WeatherCard />
                        </td>
                      ))
                    : dailyWeather?.map((weather: DailyWeather, i) => (
                        <td className="w-full" key={i}>
                          <WeatherCard weather={weather} />
                        </td>
                      ))}
                </tr>
              </tbody>
            </table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <EnergyChart dailyWeather={dailyWeather} />
      </section>
    </div>
  );
}
