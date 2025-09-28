import React from "react";
import Profile from "../../assets/icons/Profile_wborder.svg?react";
import Genres from "../../assets/icons/Genres.svg?react";
import BestSellers from "../../assets/icons/BestSellers.svg?react";
import NewArrivals from "../../assets/icons/New Arrivals.svg?react";
import Blog from "../../assets/icons/Blog.svg?react";
import Contact from "../../assets/icons/Contact.svg?react";

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-[#1F1E3E] text-[#F8FBE6] overflow-y-auto scrollbar-hide sm:hidden">
      {/* Sidebar Header */}
      <a href="/profile" className="flex items-center gap-4 p-4 bg-[#F27C66]">
        <Profile className="h-6 w-6 text-[#1F1E3E]" />
        <span className="text-xl font-semibold">Hi, user</span>
      </a>

      {/* Sidebar Navigation Links */}
      <ul className="flex flex-col gap-4 p-4">
        <li className="flex items-center gap-4 text-white hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <a href="/" className="flex items-center gap-4 w-full">
            <Genres className="h-6 w-6" />
            <span>Genres</span>
          </a>
        </li>
        <li className="flex items-center gap-4 text-white hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <a href="/best-sellers" className="flex items-center gap-4 w-full">
            <BestSellers className="h-6 w-6" />
            <span>Best Sellers</span>
          </a>
        </li>
        <li className="flex items-center gap-4 text-white hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <a href="/new-arrivals" className="flex items-center gap-4 w-full">
            <NewArrivals className="h-6 w-6" />
            <span>New Arrivals</span>
          </a>
        </li>
        <li className="flex items-center gap-4 text-white hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <a href="/blog" className="flex items-center gap-4 w-full">
            <Blog className="h-6 w-6" />
            <span>Blog</span>
          </a>
        </li>
        <li className="flex items-center gap-4 text-white hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <a href="/contact" className="flex items-center gap-4 w-full">
            <Contact className="h-6 w-6" />
            <span>Contact</span>
          </a>
        </li>
      </ul>

      <div className="mt-auto p-4">
        <button className="flex items-center gap-2 text-left text-white bg-transparent hover:bg-gray-700 p-2 rounded-lg">
          <span className="">←</span>
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
