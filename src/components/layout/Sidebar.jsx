import React from "react";
import Profile from "../../assets/icons/Profile_wborder.svg?react";
import Genres from "../../assets/icons/Genres.svg?react";
import BestSellers from "../../assets/icons/BestSellers.svg?react";
import NewArrivals from "../../assets/icons/New Arrivals.svg?react";
import Blog from "../../assets/icons/Blog.svg?react";
import Contact from "../../assets/icons/Contact.svg?react";

export default function Sidebar() {
  return (
     <aside className="h-screen w-64 bg-[#1F1E3E] text-[#F8FBE6]">
      {/* Sidebar Header */}
      <div className="flex items-center gap-4 p-4 bg-[#F27C66]">
        <Profile className="h-6 w-6 text-[#1F1E3E]" />
        <span className="text-xl font-semibold">Hi, user</span>
      </div>

      {/* Sidebar Navigation Links */}
      <ul className="flex flex-col gap-4 p-4">
        <li className="flex items-center gap-4 text-white hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <Genres className="h-6 w-6" />
          <span>Genres</span>
        </li>
        <li className="flex items-center gap-4 text-white hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <BestSellers className="h-6 w-6" />
          <span>Best Sellers</span>
        </li>
        <li className="flex items-center gap-4 text-white hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <NewArrivals className="h-6 w-6" />
          <span>New Arrivals</span>
        </li>
        <li className="flex items-center gap-4 text-white hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <Blog className="h-6 w-6" />
          <span>Blog</span>
        </li>
        <li className="flex items-center gap-4 text-white hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <Contact className="h-6 w-6" />
          <span>Contact</span>
        </li>
      </ul>
    </aside>
  );
}