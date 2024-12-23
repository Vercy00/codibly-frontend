import { GeolocationPos } from "@/types/geolocation";
import { DailyWeather, SummaryWeather } from "@/types/weather";
import { Api } from "./api.service";

class WeatherService extends Api {
  constructor() {
    super(process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:8080");
  }

  async getWeather({ latitude, longitude }: GeolocationPos) {
    return (
      await this._get<DailyWeather[]>(`/weather`, {
        params: new URLSearchParams({
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        }),
      })
    ).data;
  }

  async getSummary({ latitude, longitude }: GeolocationPos) {
    return (
      await this._get<SummaryWeather>(`/weather/summary`, {
        params: new URLSearchParams({
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        }),
      })
    ).data;
  }
}

export { WeatherService };
