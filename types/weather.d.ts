interface ExtremeTemps {
  min: number;
  max: number;
}

interface DailyWeather {
  date: Date;
  weatherCode: number;
  extremeTemperatures: ExtremeTemps;
  generatedEnergy: number;
}

type PrecipitationSummary = "precipitation" | "no_precipitation";

interface SummaryWeather {
  averageSurfacePressure: number;
  averageSunshine: number;
  extremeTemperatures: ExtremeTemps;
  precipitationSummary: PrecipitationSummary;
}

interface WeatherIcon {
  range: [number, number];
  icon: ReactNode;
}

export { DailyWeather, WeatherIcon, ExtremeTemps, SummaryWeather };
