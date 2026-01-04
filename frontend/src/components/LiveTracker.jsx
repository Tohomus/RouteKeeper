import { useEffect, useState } from "react";
import { Marker, Polyline, useMap } from "react-leaflet";

/* Haversine distance */
const getDistanceKm = (a, b) => {
  const R = 6371;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLng = ((b[1] - a[1]) * Math.PI) / 180;
  const lat1 = (a[0] * Math.PI) / 180;
  const lat2 = (b[0] * Math.PI) / 180;

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
};

export default function LiveTracker({ destination, onStats }) {
  const [pos, setPos] = useState(null);
  const map = useMap();

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(
      (p) => {
        const userPos = [p.coords.latitude, p.coords.longitude];
        setPos(userPos);
        map.setView(userPos);

        const dist = getDistanceKm(userPos, destination);
        const etaMin = Math.round((dist / 40) * 60); // 40 km/h

        onStats?.({ distance: dist.toFixed(2), eta: etaMin });
      },
      console.error,
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(id);
  }, [map, destination, onStats]);

  if (!pos) return null;

  return (
    <>
      <Marker position={pos} />
      <Polyline positions={[pos, destination]} />
    </>
  );
}
