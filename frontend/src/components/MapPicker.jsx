import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function ClickHandler({ onPick }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapPicker({ onSelect, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-4 w-[90%] max-w-lg">
        <h3 className="font-semibold mb-2">Pick a location</h3>

        <div className="h-[300px] rounded-xl overflow-hidden border">
          <MapContainer
            center={[10.0159, 76.3419]}
            zoom={13}
            className="w-full h-full"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickHandler onPick={onSelect} />
          </MapContainer>
        </div>

        <button
          onClick={onClose}
          className="mt-3 text-sm text-gray-600 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
