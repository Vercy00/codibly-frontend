"use client";

import { getWeatherIcon } from "@/const/weather-icon";
import { DailyWeather } from "@/types/weather";
import { format } from "date-fns";
import { BatteryCharging, Dot } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

interface WeatherCardProps {
  weather?: DailyWeather;
}

function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="grid gap-1 justify-items-center border rounded-md p-2 w-full">
      <div className="[&>*]:size-11">
        {weather ? getWeatherIcon(weather.weatherCode) : <Skeleton />}
      </div>
      <div className="w-full text-center">
        {weather ? (
          format(weather.date, "dd/LL/yyyy")
        ) : (
          <Skeleton className="w-full h-4" />
        )}
      </div>
      <div className="flex items-center w-full justify-center">
        {weather ? (
          <span className="text-slate-500 ">
            {weather.extremeTemperatures.min} &deg;C
          </span>
        ) : (
          <span className="w-full">
            <Skeleton className="w-full h-4" />
          </span>
        )}
        <Dot />
        {weather ? (
          <span>{weather.extremeTemperatures.max} &deg;C</span>
        ) : (
          <span className="w-full">
            <Skeleton className="w-full h-4" />
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 w-full justify-center">
        <BatteryCharging />
        {weather ? (
          <span>{weather.generatedEnergy.toFixed(3)} kWh</span>
        ) : (
          <span className="w-full">
            <Skeleton className="w-full h-4" />
          </span>
        )}
      </div>
    </div>
  );
}

export { WeatherCard };
