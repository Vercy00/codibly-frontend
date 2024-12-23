import { WeatherIcon } from "@/types/weather";
import {
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSun,
  CloudSunRain,
  Sun,
  SunSnow,
} from "lucide-react";
import { ReactNode } from "react";

const WEATHER_ICON: WeatherIcon[] = [
  {
    range: [0, 0],
    icon: <Sun />,
  },
  {
    range: [1, 3],
    icon: <CloudSun />,
  },
  {
    range: [45, 48],
    icon: <CloudFog />,
  },
  {
    range: [51, 57],
    icon: <CloudDrizzle />,
  },
  {
    range: [61, 67],
    icon: <CloudRain />,
  },
  {
    range: [71, 82],
    icon: <CloudSunRain />,
  },
  {
    range: [85, 86],
    icon: <SunSnow />,
  },
  {
    range: [95, 99],
    icon: <CloudLightning />,
  },
];

function getWeatherIcon(weatherCode: number): ReactNode {
  return WEATHER_ICON.find(
    ({ range }) => range[0] >= weatherCode && weatherCode <= range[1]
  )?.icon;
}

export { getWeatherIcon };
