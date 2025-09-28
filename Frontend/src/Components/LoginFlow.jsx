import React, { useRef, useState, useEffect } from "react";

export default function LoginFlow({ onClose, onSignUpSuccess }) {
  const [step, setStep] = useState("phone"); // 'phone' | 'otp'
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const otpRefs = useRef([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // focus first OTP input when entering otp step
    if (step === "otp") {
      setTimeout(() => otpRefs.current[0]?.focus?.(), 50);
    }
  }, [step]);

  function handlePhoneSubmit(e) {
    e.preventDefault();
    if (!phone) return;
    setStep("otp");
  }
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

  function handleContinue(e) {
    e.preventDefault();
    const code = otp.join("");
    console.log("Entered OTP:", code);
    // proceed to registration step
    setStep("register");
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
    const payload = { username, password, email, phone };
    console.log("Register payload:", payload);
    // TODO: send to API
    onClose();
    // show a small success toast on the page after closing
    showToast("Account created successfully");
    if (typeof onSignUpSuccess === "function") onSignUpSuccess(payload);
  }

  function showToast(message, duration = 3000) {
    try {
      const toast = document.createElement("div");
      toast.textContent = message;
      Object.assign(toast.style, {
        position: "fixed",
        right: "20px",
        top: "20px",
        background: "#1F1E3E",
        color: "#fff",
        padding: "10px 16px",
        borderRadius: "10px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
        zIndex: 99999,
        opacity: "0",
        transform: "translateY(-8px)",
        transition: "opacity .18s ease, transform .18s ease",
        fontFamily: "inherit",
      });
      document.body.appendChild(toast);
      // force layout then animate in
      requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
      });
      setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-8px)";
        setTimeout(() => toast.remove(), 200);
      }, duration);
    } catch (err) {
      console.error("showToast error", err);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div role="dialog" aria-modal="true" className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-6 z-10">
        <button className="absolute top-3 right-3 text-black font-bold z-10" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {step === "phone" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Sign up with Phone</h2>
            <form onSubmit={handlePhoneSubmit}>
              <div className="mb-4">
                <input className="w-full border border-gray-200 rounded px-3 py-2" type="tel" id="phone" name="phone" placeholder="+1 555 555 5555" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
              <button className="w-full bg-[#1F1E3E] text-white px-4 py-2 rounded-lg hover:bg-[#2A2847] transition-all duration-300" type="submit">
                Sign Up
              </button>
            </form>
          </div>
        )}

        {step === "otp" && (
          <div>
            <h2 className="text-lg font-semibold mb-2 text-center">Enter OTP</h2>
            <div className="text-xs text-center text-gray-500 mb-4">
              OTP sent to {phone || "+91 9321851111"} <button className="ml-2 text-gray-400">✎</button>
            </div>

            <form onSubmit={handleContinue}>
              <div className="flex items-center justify-center gap-3 mb-6">
                {otp.map((digit, idx) => (
                  <input key={idx} ref={(el) => (otpRefs.current[idx] = el)} value={digit} onChange={(e) => handleOtpChange(e, idx)} onKeyDown={(e) => handleOtpKeyDown(e, idx)} className="w-12 h-12 text-center border border-gray-200 rounded-md" inputMode="numeric" maxLength={1} aria-label={`OTP digit ${idx + 1}`} />
                ))}
              </div>

              <button className="w-full bg-[#1F1E3E] text-white px-4 py-2 rounded-lg hover:bg-[#2A2847] transition-all duration-300" type="submit">
                Continue
              </button>

              <div className="text-center mt-3">
                <button type="button" className="text-sm text-gray-600 underline" onClick={() => setStep("phone")}>
                  Edit number
                </button>
              </div>
            </form>
          </div>
        )}
        {step === "register" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Create account</h2>
            <form onSubmit={handleRegisterSubmit}>
              <label className="block text-sm font-medium mb-1">Enter Username</label>
              <input className="w-full border border-gray-200 rounded px-3 py-2 mb-3" placeholder="Enter your Username" value={username} onChange={(e) => setUsername(e.target.value)} />

              <label className="block text-sm font-medium mb-1">Enter Password</label>
              <input className="w-full border border-gray-200 rounded px-3 py-2 mb-3" type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} />

              <label className="block text-sm font-medium mb-1">Enter email</label>
              <input className="w-full border border-gray-200 rounded px-3 py-2 mb-4" type="email" placeholder="Enter your Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />

              <button className="w-full bg-[#1F1E3E] text-white px-4 py-2 rounded-lg hover:bg-[#2A2847] transition-all duration-300" type="submit">
                Continue
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
