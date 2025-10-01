import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Corrected path
import axios from "axios";
import Branch from "../Assets/Images/Branch.png"; // Corrected path

export default function UserProfile() {
  const { token, logout } = useAuth();

  // State for displaying profile data
  const [profile, setProfile] = useState(null);
  // State for the form fields when in "edit mode"
  const [editData, setEditData] = useState({});
  // State to toggle between display and edit modes
  const [isEditing, setIsEditing] = useState(false);

  // State for password change form
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "" });

  // State for user feedback
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // This effect runs once when the component loads to fetch the user's profile
  useEffect(() => {
    const fetchProfile = async () => {
      setError("");
      setSuccess("");
      if (!token) {
        setError("No auth token found. Please log in.");
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
        setEditData(res.data); // Pre-fill the edit form
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  // Handler for input changes when in edit mode
  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Handler for password input changes
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // Handler for submitting the main profile update form
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!token) {
      setError("Authentication error. Please log in again.");
      return;
    }
    try {
      await axios.put("http://localhost:5000/api/profile", editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(editData); // Update the displayed data
      setIsEditing(false); // Exit edit mode
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    }
  };

  // Handler for submitting the password change form
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (passwordData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }
    if (!token) {
      setError("Authentication error. Please log in again.");
      return;
    }
    try {
      const res = await axios.put("http://localhost:5000/api/profile/password", passwordData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPasswordData({ currentPassword: "", newPassword: "" }); // Clear fields
      setSuccess(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password.");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData(profile); // Revert changes
    setError("");
    setSuccess("");
  };

  if (loading) return <div className="p-10">Loading Your Profile...</div>;
  if (!profile) return <div className="p-10 text-red-500">{error || "Could not load profile. Please log in again."}</div>;

  return (
    <div className="min-h-screen flex">
      {/* --- Left Sidebar --- */}
      <aside className="w-32 sm:w-48 bg-[#E2C6DA] text-[#ffffff] flex flex-col justify-between p-6">
        <nav className="flex flex-col gap-6">
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="/profile" className="font-semibold underline text-[#ffffff]">
            My Profile
          </a>
          <a href="/orders" className="hover:underline">
            My Orders
          </a>
        </nav>
        <button onClick={logout} className="text-sm hover:underline">
          ← Log out
        </button>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 p-6 bg-white text-[#1F1E3E] relative overflow-hidden">
        <h2 className="text-2xl font-semibold text-[#5D3D6A] mb-4">My Profile</h2>

        {/* --- Feedback Messages --- */}
        {success && <div className="p-3 mb-4 bg-green-100 text-green-800 rounded-md text-sm">{success}</div>}
        {error && <div className="p-3 mb-4 bg-red-100 text-red-800 rounded-md text-sm">{error}</div>}

        {/* --- Profile Display & Form Wrapper --- */}
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

            {/* The Save/Cancel buttons are INSIDE the form */}
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

          {/* The Edit Profile button is now OUTSIDE the form */}
          {!isEditing && (
            <div className="pt-2">
              <button type="button" onClick={() => setIsEditing(true)} className="bg-[#1F1E3E] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-opacity-90">
                Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* --- Password Change Form --- */}
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
