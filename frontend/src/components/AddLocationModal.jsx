import { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { addRoute } from "../services/routeService";
import { useAuth } from "../context/AuthContext";

export default function AddLocationModal({
  isOpen,
  onClose,
  defaultCategory = "",
}) {
  const { currentUser } = useAuth();

  const [name, setName] = useState("");
  const [mapLink, setMapLink] = useState("");
  const [category, setCategory] = useState(defaultCategory);
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addRoute({
      userId: currentUser.uid,
      name,
      category: category.toLowerCase(),
      mapLink,
      notes,
      latitude: null,
      longitude: null,
    });

    onClose();
    setName("");
    setMapLink("");
    setNotes("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Location">
      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          required
          placeholder="Location name"
          className="w-full border px-3 py-2 rounded-xl"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          required
          placeholder="Google Maps link"
          className="w-full border px-3 py-2 rounded-xl"
          value={mapLink}
          onChange={(e) => setMapLink(e.target.value)}
        />

        <select
          required
          value={category}
          disabled={!!defaultCategory}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-3 py-2 rounded-xl"
        >
          <option value="">Select category</option>
          <option value="work">Work</option>
          <option value="family">Family</option>
          <option value="friends">Friends</option>
        </select>

        <textarea
          placeholder="Notes (optional)"
          className="w-full border px-3 py-2 rounded-xl"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <Button text="Save Location" type="submit" />
      </form>
    </Modal>
  );
}
