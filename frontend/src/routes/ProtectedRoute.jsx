import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  // ⏳ Wait for Firebase auth to resolve
  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Checking authentication...
      </p>
    );
  }

  // 🔒 User not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // ✅ User authenticated
  return children;
}
