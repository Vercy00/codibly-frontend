import { GeolocationPos } from "@/types/geolocation";
import { Place } from "@/types/open-street-map";
import { Api } from "./api.service";

class OpenStreetMapService extends Api {
  constructor() {
    super("https://nominatim.openstreetmap.org");
  }

  async searchPlace(search: string) {
    return (
      await this._get<Place[]>(`/search`, {
        params: new URLSearchParams({
          q: search,
          format: "json",
        }),
      })
    ).data;
  }

  async reverceSearchPlace({ latitude, longitude }: GeolocationPos) {
    return (
      await this._get<Place>(`/reverse`, {
        params: new URLSearchParams({
          lat: latitude.toString(),
          lon: longitude.toString(),
          format: "json",
        }),
      })
    ).data;
  }
}

export { OpenStreetMapService };
