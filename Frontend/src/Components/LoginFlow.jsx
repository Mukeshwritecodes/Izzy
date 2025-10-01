import React, { useRef, useState, useEffect } from "react";
// --- 1. Import axios for making API calls ---
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function LoginFlow({ onClose, onSignUpSuccess }) {
  const { login } = useAuth();
  const [step, setStep] = useState("phone"); // 'phone' | 'otp' | 'register'
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const otpRefs = useRef([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // --- 2. Add state for loading, errors, and the registration token ---
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [registrationToken, setRegistrationToken] = useState("");

  useEffect(() => {
    if (step === "otp") {
      setTimeout(() => otpRefs.current[0]?.focus?.(), 50);
    }
  }, [step]);

  // --- 3. Update phone submit handler to call the backend ---
  async function handlePhoneSubmit(e) {
    e.preventDefault();
    if (!phone) return;
    setLoading(true);
    setError("");
    try {
      await api.post("/api/auth/send-otp", {
        phoneNo: phone,
      });
      setStep("otp");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to send OTP. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  // (Helper functions for OTP input remain the same)
  function handleOtpChange(e, idx) {
    const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) {
      otpRefs.current[idx + 1]?.focus?.();
    }
  }

  function handleOtpKeyDown(e, idx) {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus?.();
    }
  }

  // --- 4. Update OTP handler to verify with the backend ---
  async function handleOtpSubmit(e) {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter the full 6-digit OTP.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/api/auth/verify-otp", {
        phoneNo: phone,
        otp: code,
      });

      // Check the response to see if we should login or register
      if (response.data.token) {
        // --- USER EXISTS: LOGIN SUCCESSFUL ---
        login(response.data.user, response.data.token);
        if (typeof onSignUpSuccess === "function") onSignUpSuccess(response.data.user);
        showToast("Logged in successfully!");
        onClose();
      } else if (response.data.registrationToken) {
        // --- NEW USER: PROCEED TO REGISTER ---
        setRegistrationToken(response.data.registrationToken);
        setStep("register");
      }
    } catch (err) {
      const message = err.response?.data?.message || "OTP verification failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  // --- 5. Update register handler to create the new user ---
  async function handleRegisterSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/api/auth/register", {
        name: username,
        password,
        email,
        registrationToken,
      });

      // --- REGISTRATION SUCCESSFUL: LOGIN ---
      login(response.data.user, response.data.token);
      if (typeof onSignUpSuccess === "function") onSignUpSuccess(response.data.user);
      showToast("Account created successfully!");
      onClose();
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  // (The showToast helper function remains the same)
  function showToast(message, duration = 3000) {
    // ... your existing toast function code
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div role="dialog" aria-modal="true" className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-6 z-10">
        <button className="absolute top-3 right-3 text-black font-bold z-10" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {/* --- 6. Add error display and loading states to JSX --- */}

        {step === "phone" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Sign up or Login with Phone</h2>
            <form onSubmit={handlePhoneSubmit}>
              <input className="w-full border border-gray-200 rounded px-3 py-2 mb-2" type="tel" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              <button className="w-full bg-[#1F1E3E] text-white px-4 py-2 rounded-lg hover:bg-[#2A2847] transition-all duration-300 disabled:opacity-50" type="submit" disabled={loading}>
                {loading ? "Sending..." : "Continue"}
              </button>
            </form>
          </div>
        )}

        {step === "otp" && (
          <div>
            <h2 className="text-lg font-semibold mb-2 text-center">Enter OTP</h2>
            <div className="text-xs text-center text-gray-500 mb-4">OTP sent to {phone}</div>
            <form onSubmit={handleOtpSubmit}>
              {" "}
              {/* Renamed from handleContinue */}
              <div className="flex items-center justify-center gap-3 mb-2">
                {otp.map((digit, idx) => (
                  <input key={idx} ref={(el) => (otpRefs.current[idx] = el)} value={digit} onChange={(e) => handleOtpChange(e, idx)} onKeyDown={(e) => handleOtpKeyDown(e, idx)} className="w-12 h-12 text-center border border-gray-200 rounded-md" inputMode="numeric" maxLength={1} />
                ))}
              </div>
              {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
              <button className="w-full bg-[#1F1E3E] text-white px-4 py-2 rounded-lg hover:bg-[#2A2847] transition-all duration-300 mt-4 disabled:opacity-50" type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Continue"}
              </button>
            </form>
          </div>
        )}

        {step === "register" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Create your account</h2>
            <form onSubmit={handleRegisterSubmit}>
              <label className="block text-sm font-medium mb-1">Enter Username</label>
              <input className="w-full border border-gray-200 rounded px-3 py-2 mb-3" placeholder="Enter your Username" value={username} onChange={(e) => setUsername(e.target.value)} required />

              <label className="block text-sm font-medium mb-1">Enter Password</label>
              <input className="w-full border border-gray-200 rounded px-3 py-2 mb-3" type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

              <label className="block text-sm font-medium mb-1">Enter email</label>
              <input className="w-full border border-gray-200 rounded px-3 py-2 mb-2" type="email" placeholder="Enter your Email ID" value={email} onChange={(e) => setEmail(e.target.value)} required />

              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

              <button className="w-full bg-[#1F1E3E] text-white px-4 py-2 rounded-lg hover:bg-[#2A2847] transition-all duration-300 mt-2 disabled:opacity-50" type="submit" disabled={loading}>
                {loading ? "Creating Account..." : "Continue"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
