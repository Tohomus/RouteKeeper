import Modal from "./Modal";
import Button from "./Button";
import { useState } from "react";

export default function EditProfileModal({
  isOpen,
  onClose,
  user,
  onSave,
}) {
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // later -> backend
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile Information">
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full mb-3 px-3 py-2 border rounded-xl"
          required
        />

        {/* Email (readonly usually) */}
        <input
          name="email"
          value={formData.email}
          disabled
          className="w-full mb-3 px-3 py-2 border rounded-xl bg-gray-100"
        />

        {/* Mobile */}
        <input
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Mobile Number"
          className="w-full mb-4 px-3 py-2 border rounded-xl"
          required
        />

        {/* Change Password (UI only) */}
        <button
          type="button"
          className="text-sm text-brand hover:underline mb-4"
          disabled
        >
          Change Password (Coming Soon)
        </button>

        <Button text="Save Changes" type="submit" />
      </form>
    </Modal>
  );
}
