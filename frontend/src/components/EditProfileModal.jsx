import { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { updateUserProfile } from "../services/userService";
import { useAuth } from "../context/AuthContext";

export default function EditProfileModal({ isOpen, onClose, user }) {
  const { refreshProfile } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [mobile, setMobile] = useState(user?.mobile || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user?.uid) {
      console.error("UID missing — cannot update profile");
      return;
    }

    try {
      setSaving(true);
      console.log("Updating profile for UID:", user.uid);

      await updateUserProfile(user.uid, {
        name,
        mobile,
      });

      await refreshProfile();
      onClose();
    } catch (error) {
      console.error("Profile update failed", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <div className="space-y-4">
        <input
          className="w-full border px-3 py-2 rounded-xl"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border px-3 py-2 rounded-xl"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <Button
          text={saving ? "Saving..." : "Save Changes"}
          onClick={handleSave}
          disabled={saving}
        />
      </div>
    </Modal>
  );
}
