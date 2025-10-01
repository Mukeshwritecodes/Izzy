import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Import your icons using correct relative paths
import Profile from "../../Assets/Icons/Profile_wborder.svg?react";
import Genres from "../../Assets/Icons/Genres.svg?react";
import BestSellers from "../../Assets/Icons/BestSellers.svg?react";
import NewArrivals from "../../Assets/Icons/New Arrivals.svg?react";
import Blog from "../../Assets/Icons/Blog.svg?react";
import Contact from "../../Assets/Icons/Contact.svg?react";

export default function Sidebar({ onLoginClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="h-screen w-64 bg-[#1F1E3E] text-[#F8FBE6] overflow-y-auto scrollbar-hide sm:hidden flex flex-col">
      {user ? (
        <Link to="/profile" className="flex items-center gap-4 p-4 bg-[#F27C66]">
          <Profile className="h-6 w-6 text-[#1F1E3E]" />
          <span className="text-xl font-semibold truncate">Hi, {user.Name || user.name}</span>
        </Link>
      ) : (
        <button onClick={onLoginClick} className="flex items-center gap-4 p-4 bg-[#F27C66] text-left">
          <Profile className="h-6 w-6 text-[#1F1E3E]" />
          <span className="text-xl font-semibold">Hi, Sign In</span>
        </button>
      )}

      {/* Sidebar Navigation Links */}
      <ul className="flex flex-col gap-4 p-4">
        <li className="flex items-center gap-4 text-white hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <Link to="/" className="flex items-center gap-4 w-full">
            <Genres className="h-6 w-6" />
            <span>Genres</span>
          </Link>
        </li>
        <li className="flex items-center gap-4 text-white hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <Link to="/best-sellers" className="flex items-center gap-4 w-full">
            <BestSellers className="h-6 w-6" />
            <span>Best Sellers</span>
          </Link>
        </li>
        <li className="flex items-center gap-4 text-white hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <Link to="/new-arrivals" className="flex items-center gap-4 w-full">
            <NewArrivals className="h-6 w-6" />
            <span>New Arrivals</span>
          </Link>
        </li>
        <li className="flex items-center gap-4 text-white hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <Link to="/blog" className="flex items-center gap-4 w-full">
            <Blog className="h-6 w-6" />
            <span>Blog</span>
          </Link>
        </li>
        <li className="flex items-center gap-4 text-white hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <Link to="/contact" className="flex items-center gap-4 w-full">
            <Contact className="h-6 w-6" />
            <span>Contact</span>
          </Link>
        </li>
      </ul>

      {/* Logout Button */}
      <div className="mt-auto p-4">
        {user && (
          <button onClick={handleLogout} className="flex items-center gap-2 text-left text-white bg-transparent hover:bg-gray-700 p-2 rounded-lg w-full">
            <span className="transform rotate-180">→</span>
            <span>Log out</span>
          </button>
        )}
      </div>
    </aside>
  );
}
