import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button";
import { loginUser } from "../../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await loginUser(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
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
            className="w-full mb-4 px-3 py-2 border rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            text={loading ? "Signing in..." : "Sign In"}
            type="submit"
          />
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-brand font-medium hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}
