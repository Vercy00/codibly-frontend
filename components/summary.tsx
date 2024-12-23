"use client";

import { WeatherService } from "@/services/weather.service";
import { useGeolocation } from "@/hooks/use-geolocation";
import { useFetch } from "@/hooks/use-fetch";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const weatherService = new WeatherService();

function Summary() {
  const [geolocation] = useGeolocation();
  const [summary, loading, error] = useFetch(
    useCallback(
      () => geolocation && weatherService.getSummary(geolocation),
      [geolocation]
    )
  );

  useEffect(() => {
    if (error && !loading)
      toast.error(`Błąd podczas pobierania podsumowania`, {
        description: error,
      });
  }, [error, loading]);

  return (
    <Card className="rounded-md w-full">
      <CardContent className="w-full py-2">
        <div className="flex justify-between items-center py-1">
          <span className="max-w-[60%]">Najniższa temperatura</span>
          <span className="text-slate-500 w-[40%] text-right">
            {loading || error ? (
              <Skeleton className="w-full h-4" />
            ) : (
              <>{summary.extremeTemperatures.min}&deg;C</>
            )}
          </span>
        </div>
        <Separator />
        <div className="flex justify-between items-center py-1">
          <span className="max-w-[60%]">Najwyższa temperatura</span>
          <span className="w-[40%] text-right">
            {loading || error ? (
              <Skeleton className="w-full h-4" />
            ) : (
              <>{summary.extremeTemperatures.max}&deg;C</>
            )}
          </span>
        </div>
        <Separator />
        <div className="flex justify-between items-center py-1">
          <span className="max-w-[60%]">Średnie ciśnienie</span>
          <span className="w-[40%] text-right">
            {loading || error ? (
              <Skeleton className="w-full h-4" />
            ) : (
              <>{summary.averageSurfacePressure.toFixed(2)} hPa</>
            )}
          </span>
        </div>
        <Separator />
        <div className="flex justify-between items-center py-1">
          <span className="max-w-[60%]">Średni czas ekspozycji na słońce</span>
          <span className="w-[40%] text-right">
            {loading || error ? (
              <Skeleton className="w-full h-4" />
            ) : (
              <>{(summary.averageSunshine / 3600).toFixed(3)} h</>
            )}
          </span>
        </div>
        <Separator />
        <div className="flex justify-between items-center py-1">
          <span className="max-w-[60%]">Podsumowanie</span>
          <span className="w-[40%] text-right">
            {loading || error ? (
              <Skeleton className="w-full h-4" />
            ) : summary.precipitationSummary === "precipitation" ? (
              "Opady"
            ) : (
              "Brak opadów"
            )}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export { Summary };
