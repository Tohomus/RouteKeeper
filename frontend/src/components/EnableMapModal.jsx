import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Modal from "./Modal";
import Button from "./Button";
import { setRouteCoordinates } from "../services/routeService";

/* INTERNAL MAP CLICK HANDLER */
function ClickHandler({ onPick }) {
  useMapEvents({
    click(e) {
      console.log("Map clicked:", e.latlng);
      onPick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export default function EnableMapModal({ isOpen, onClose, route, onSuccess }) {
  const [picked, setPicked] = useState(null);
  const [saving, setSaving] = useState(false);
  const [center, setCenter] = useState([10.0, 76.3]);

  /* Reset state on open */
  useEffect(() => {
    if (!isOpen) return;

    setPicked(null);

    if (route?.latitude && route?.longitude) {
      setCenter([route.latitude, route.longitude]);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setCenter([pos.coords.latitude, pos.coords.longitude]),
        () => setCenter([10.0, 76.3])
      );
    }
  }, [isOpen, route]);

  if (!isOpen || !route) return null;

  const handleSave = async () => {
    if (!picked || saving) return;

    try {
      setSaving(true);
      await setRouteCoordinates(route.id, picked[0], picked[1]);
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("Failed to save coordinates", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={saving ? () => {} : onClose}
      title="Pick location on map"
    >
      <p className="text-sm text-gray-500 mb-2 text-center">
        Click once on the map to select location
      </p>

      <div className="h-64 mb-4">
        <MapContainer
          center={center}
          zoom={13}
          className="h-full w-full rounded-xl"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ClickHandler onPick={setPicked} />
          {picked && <Marker position={picked} />}
        </MapContainer>
      </div>

      <Button
        text={saving ? "Saving..." : "Save location in app"}
        onClick={handleSave}
        disabled={!picked || saving}
      />
    </Modal>
  );
}
