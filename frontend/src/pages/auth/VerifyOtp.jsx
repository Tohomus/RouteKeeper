import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const mobile = location.state?.mobile;

  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();

    if (otp.length === 6) {
      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <>
      {!success ? (
        <>
          <h1 className="text-2xl font-bold text-center text-brand mb-2">
            Verify Phone Number
          </h1>

          <p className="text-sm text-center text-gray-600 mb-6">
            Enter the OTP sent to {mobile}
          </p>

          <form onSubmit={handleVerify}>
            <input
              type="text"
              maxLength={6}
              required
              placeholder="Enter 6-digit OTP"
              className="w-full mb-6 px-3 py-2 text-center tracking-widest border rounded-xl focus:ring-2 focus:ring-brand"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
            />

            <Button text="Verify OTP" type="submit" />
          </form>

          <p className="text-sm text-center text-gray-500 mt-4">
            Didn’t receive OTP?{" "}
            <span className="text-brand cursor-pointer hover:underline">
              Resend
            </span>
          </p>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
            Successfully Registered 🎉
          </h2>
          <p className="text-center text-gray-600">
            Redirecting to login page...
          </p>
        </>
      )}
    </>
  );
}
