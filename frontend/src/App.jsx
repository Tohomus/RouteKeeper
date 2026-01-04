import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyOtp from "./pages/auth/VerifyOtp";

import Dashboard from "./pages/Dashboard";
import MyRoutes from "./pages/MyRoutes";
import CategoryRoutes from "./pages/CategoryRoutes";
import Profile from "./pages/Profile";

import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { currentUser } = useAuth();

  return (
    <BrowserRouter>
      <Routes>

        {/* Default Redirect */}
        <Route
          path="/"
          element={
            currentUser ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

        {/* ============ AUTH ROUTES ============ */}
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              currentUser ? <Navigate to="/dashboard" /> : <Login />
            }
          />
          <Route
            path="/register"
            element={
              currentUser ? <Navigate to="/dashboard" /> : <Register />
            }
          />
          <Route path="/verify-otp" element={<VerifyOtp />} />
        </Route>

        {/* ============ PROTECTED APP ROUTES ============ */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-routes" element={<MyRoutes />} />
          <Route path="/my-routes/:category" element={<CategoryRoutes />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
