import React from "react";
import Branch from "../Assets/Images/Branch.png";

export default function UserProfile() {
  return (
    <div className="min-h-screen flex">
      {/* Left sidebar */}
      <aside className="w-32 bg-[#E2C6DA] text-[#ffffff] flex flex-col justify-between p-6">
        <nav className="flex flex-col gap-6">
          <a href="/" className="text-white/90 hover:underline">
            Home
          </a>
          <a href="/profile" className="underline text-[#ffffff]">
            My Profile
          </a>
          <a href="/orders" className="text-white/90 hover:underline">
            My Orders
          </a>
        </nav>

        <div className="text-left">
          <button className="text-sm text-white/90">← Log out</button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-white text-[#1F1E3E] relative">
        <h2 className="text-2xl font-semibold text-[#5D3D6A] mb-4">My Profile</h2>

        <div className="w-full max-w-2xl space-y-2">
          <div>
            <label className="block text-sm text-white/60 mb-1">Name:</label>
            <div className="bg-gray-100  rounded-2xl p-3 text-sm">Mukesh Choudhary</div>
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-1">E-mail ID:</label>
            <div className="bg-gray-100  rounded-2xl p-3 text-sm">mukesh1234@gmail.com</div>
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-1">Mobile:</label>
            <div className="bg-gray-100  rounded-2xl p-3 text-sm">9987374539</div>
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-1">Address:</label>
            <div className="bg-gray-100  rounded-2xl p-3 text-sm">-</div>
          </div>

          <button className="mt-1 bg-[#1F1E3E] text-white px-3 py-2 rounded-2xl text-sm">+ Add Address</button>
        </div>
        <img src={Branch} alt="Decorative branch" className="absolute w-40 opacity-96 h-40 z-0 sm:w-68 sm:h-68 lg:w-100 lg:h-100 top-0 right-0 rotate-180" />
      </main>
    </div>
  );
}
