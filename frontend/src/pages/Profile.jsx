import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import { getUserProfile } from "../services/userService";
import EditProfileModal from "../components/EditProfileModal";

export default function Profile() {
  const { currentUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const handleProfileUpdated=(updatedProfile)=>{
    setProfile(updatedProfile);
  }

  useEffect(() => {
    if (authLoading || !currentUser) return;

    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(currentUser.uid);
        setProfile(data);
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [currentUser, authLoading]);

  if (authLoading || loadingProfile) {
    return <p className="text-center">Loading profile...</p>;
  }

  if (!profile) {
    return <p className="text-center text-red-500">Profile not found</p>;
  }

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-0">
      <h1 className="text-2xl font-bold mb-8">Profile</h1>

      {/* PROFILE HEADER */}
      <div className="bg-white border border-slate-300 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6 mb-6">

        {/* AVATAR PLACEHOLDER */}
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gray-200 border-2 border-slate-400 flex items-center justify-center text-center">
          <span className="text-gray-500 text-sm px-3">
            Profile photo<br />coming soon<br/>No Money for now..lol
          </span>
        </div>

        {/* BASIC INFO */}
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="text-gray-600">{profile.email}</p>

          <button
            onClick={() => setIsEditOpen(true)}
            className="mt-3 px-4 py-1.5 rounded-xl border text-sm hover:bg-gray-50"
          >
            Edit Info
          </button>
        </div>
      </div>

      {/* ACCOUNT INFORMATION */}
      <div className="bg-white border border-slate-300 rounded-xl p-6 mb-6">
        <h3 className="font-semibold mb-4">Account Information</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{profile.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{profile.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Mobile Number</p>
            <p className="font-medium">{profile.mobile}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Password</p>
            <p className="font-medium">••••••••</p>
            <button
              className="text-sm text-brand hover:underline mt-1"
              disabled
            >
              Change Password (Coming Soon)
            </button>
          </div>
        </div>
      </div>

      {/* LOGOUT */}
      <div className="bg-white border border-slate-300 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-500">
          You can securely log out of your account
        </p>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="px-5 py-2 rounded-xl bg-red-500 text-white
            hover:bg-red-600 disabled:opacity-60"
        >
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>

      {/* EDIT PROFILE MODAL */}
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        user={{...profile,uid:currentUser.uid}}
        onUpdated={handleProfileUpdated}
      />
    </div>
  );
}
