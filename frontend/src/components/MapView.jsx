import { MapContainer, TileLayer, Marker } from "react-leaflet";

export default function MapView({ latitude, longitude, children }) {
  if (latitude == null || longitude == null) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center text-gray-500">
        Location not set for in-app map
      </div>
    );
  }

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={14}
      className="h-[400px] w-full rounded-xl"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[latitude, longitude]} />
      {children}
    </MapContainer>
  );
}
