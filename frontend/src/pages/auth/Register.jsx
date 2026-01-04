import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button";
import { registerUser } from "../../services/authService";
import { createUserProfile } from "../../services/userService";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Create Auth user
      const user = await registerUser(email, password);

      // 2️⃣ Create Firestore profile
      await createUserProfile(user, {
        name,
        mobile,
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-login-gradient flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl p-8 shadow">

        <h1 className="text-3xl font-bold text-center text-brand mb-6">
          RouteKeeper
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder="Full Name"
            className="w-full mb-3 px-3 py-2 border rounded-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="tel"
            required
            placeholder="Mobile Number"
            className="w-full mb-3 px-3 py-2 border rounded-xl"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <input
            type="email"
            required
            placeholder="Email"
            className="w-full mb-3 px-3 py-2 border rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            required
            placeholder="Password"
            className="w-full mb-3 px-3 py-2 border rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            required
            placeholder="Confirm Password"
            className="w-full mb-4 px-3 py-2 border rounded-xl"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            text={loading ? "Creating account..." : "Register"}
            type="submit"
          />
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-brand font-medium hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
