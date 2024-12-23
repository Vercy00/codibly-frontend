"use client";

import { HTMLAttributes, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useGeolocation } from "@/hooks/use-geolocation";

function LeafletMap(props: HTMLAttributes<HTMLDivElement>) {
  const [geolocation, setGeolocation] = useGeolocation();
  const mapRef = useRef<L.Map>(null);
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    if (!geolocation) return;

    if (!mapRef.current) {
      mapRef.current = L.map("map").setView(
        [geolocation.latitude, geolocation.longitude],
        13
      );

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      mapRef.current.on("click", (e) => {
        setGeolocation({
          latitude: e.latlng.lat % 90,
          longitude: e.latlng.lng % 180,
        });
      });
    }

    if (!markerRef.current) {
      markerRef.current = L.marker([
        geolocation.latitude,
        geolocation.longitude,
      ])
        .addTo(mapRef.current)
        .openPopup();
    }

    markerRef.current.setLatLng({
      lat: geolocation.latitude,
      lng: geolocation.longitude,
    });

    mapRef.current.setView([geolocation.latitude, geolocation.longitude], 13);
  }, [geolocation, setGeolocation]);

  return (
    <div className="grid gap-1">
      <span className="text-sm text-muted-foreground">
        Kliknij w mapę, aby zmienić lokalizację
      </span>
      <div {...props} id="map" />
    </div>
  );
}

export { LeafletMap };
