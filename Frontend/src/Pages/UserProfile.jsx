import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for client-side navigation
import { useAuth } from "../context/AuthContext";
import api from "../api/axios"; // 1. Import the central 'api' instance
import Branch from "../Assets/Images/Branch.png";

export default function UserProfile() {
  // Use 'user' from context as well, to pre-fill data without a delay
  const { user, logout } = useAuth();

  const [profile, setProfile] = useState(null);
  const [editData, setEditData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setError("");
      setSuccess("");
      // No need to check for token here, the API interceptor handles it.
      // If the request fails due to no token, the catch block will handle it.
      try {
        // 2. SIMPLIFIED API CALL: The token is now added automatically by the interceptor.
        const res = await api.get("/api/profile");
        setProfile(res.data);
        setEditData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };
    // Only fetch if we have a user from context
    if (user) {
      fetchProfile();
    } else {
      setLoading(false);
      setError("Please log in to view your profile.");
    }
  }, [user]); // Depend on the user object

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      // 3. SIMPLIFIED API CALL: No more 'headers' object needed.
      await api.put("/api/profile", editData);
      setProfile(editData);
      setIsEditing(false);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (passwordData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }
    try {
      // 4. SIMPLIFIED API CALL: The token is handled automatically.
      const res = await api.put("/api/profile/password", passwordData);
      setPasswordData({ currentPassword: "", newPassword: "" });
      setSuccess(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password.");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData(profile);
    setError("");
    setSuccess("");
  };

  if (loading) return <div className="p-10">Loading Your Profile...</div>;
  if (!profile) return <div className="p-10 text-red-500">{error || "Could not load profile. Please log in again."}</div>;

  return (
    <div className="min-h-screen flex">
      <aside className="w-32 sm:w-48 bg-[#E2C6DA] text-white flex flex-col justify-between p-6">
        <nav className="flex flex-col gap-6">
          {/* Use Link component for better navigation */}
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/profile" className="font-semibold underline">
            My Profile
          </Link>
          <Link to="/orders" className="hover:underline">
            My Orders
          </Link>
        </nav>
        <button onClick={logout} className="text-sm hover:underline text-left">
          ← Log out
        </button>
      </aside>

      <main className="flex-1 p-6 bg-white text-[#1F1E3E] relative overflow-hidden">
        <h2 className="text-2xl font-semibold text-[#5D3D6A] mb-4">My Profile</h2>
        {success && <div className="p-3 mb-4 bg-green-100 text-green-800 rounded-md text-sm">{success}</div>}
        {error && <div className="p-3 mb-4 bg-red-100 text-red-800 rounded-md text-sm">{error}</div>}
        <div className="w-full max-w-2xl">
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name:</label>
              {isEditing ? <input type="text" name="Name" value={editData.Name} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#5D3D6A] focus:outline-none" /> : <div className="bg-gray-100 rounded-xl p-3 text-sm">{profile.Name}</div>}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">E-mail ID:</label>
              {isEditing ? <input type="email" name="Email" value={editData.Email} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#5D3D6A] focus:outline-none" /> : <div className="bg-gray-100 rounded-xl p-3 text-sm">{profile.Email}</div>}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Mobile:</label>
              <div className="bg-gray-100 rounded-xl p-3 text-sm text-gray-500">{profile.PhoneNo}</div>
              <small className="text-xs text-gray-400">Mobile number cannot be changed for security reasons.</small>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Address:</label>
              {isEditing ? <textarea name="Address" value={editData.Address || ""} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#5D3D6A] focus:outline-none" rows="3"></textarea> : <div className="bg-gray-100 rounded-xl p-3 text-sm min-h-[4rem]">{profile.Address || "No address added yet."}</div>}
            </div>
            {isEditing && (
              <div className="flex gap-4 pt-2">
                <button type="submit" className="bg-[#1F1E3E] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-opacity-90">
                  Save Changes
                </button>
                <button type="button" onClick={handleCancelEdit} className="border border-gray-400 text-gray-600 px-4 py-2 rounded-xl text-sm hover:bg-gray-100">
                  Cancel
                </button>
              </div>
            )}
          </form>
          {!isEditing && (
            <div className="pt-2">
              <button type="button" onClick={() => setIsEditing(true)} className="bg-[#1F1E3E] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-opacity-90">
                Edit Profile
              </button>
            </div>
          )}
        </div>

        <hr className="my-8" />
        <h3 className="text-xl font-semibold text-[#5D3D6A] mb-4">Change Password</h3>
        <form onSubmit={handleUpdatePassword} className="w-full max-w-2xl space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Current Password:</label>
            <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#5D3D6A] focus:outline-none" required />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">New Password:</label>
            <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#5D3D6A] focus:outline-none" required />
          </div>
          <div className="pt-2">
            <button type="submit" className="bg-[#1F1E3E] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-opacity-90">
              Update Password
            </button>
          </div>
        </form>
        <img src={Branch} alt="Decorative branch" className="absolute w-40 opacity-90 h-40 z-0 sm:w-64 sm:h-64 lg:w-96 lg:h-96 top-0 right-0 rotate-180" />
      </main>
    </div>
  );
}
