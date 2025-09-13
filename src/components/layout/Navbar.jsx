import React, { useState, useRef, useEffect } from "react";
import Logo from "../../Assets/Icons/Logo.svg?react";
import Heart from "../../Assets/Icons/Heart.svg?react";
import Cart from "../../Assets/Icons/Cart.svg?react";
import Profile from "../../Assets/Icons/Profile.svg?react";
import Search from "../../Assets/Icons/Search.svg?react";
import SearchWhite from "../../Assets/Icons/SearchWhite.svg?react";
import Hamburger from "../../Assets/Icons/Hamburger.svg?react";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const profileRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef, sidebarRef]);

  return (
    //Main wrapper
    <nav className="flex-col w-full gap-0 bg-[#1F1E3E]">
      {/* Sidebar container (for mobile) */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Top nav bar */}
      <div className="py-2 px-4 sm:py-4 sm:px-6 flex justify-between items-center gap-20 w-full">
        <div className=" flex items-center gap-4">
          <Hamburger
            className="block h-8 w-8 sm:hidden text-[#F8FBE6] cursor-pointer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <Logo className="flex-shrink-0 h-8 sm:h-12  lg:h-14  pt-1" />
        </div>
        <div className="hidden sm:block relative w-full max-w-160">
          <input
            type="text"
            placeholder="Search"
            className="w-full h-13 bg-white text-[#888888] p-3 focus:outline-none rounded-2xl"
          />
          <Search className="h-5 w-5 absolute pointer-events-none transform -translate-y-1/2 top-1/2 right-3" />
        </div>
        <div className="flex items-center gap-6 sm:gap-8 w-auto">
          <Heart className="h-5 w-5  sm:h-6 sm:w-6 text-[#F8FBE6] hover:text-gray-300 cursor-pointer" />
          <Cart className="h-5 w-5 sm:h-6 sm:w-6 text-[#F8FBE6] hover:text-gray-300 cursor-pointer" />
          <div className="relative" ref={profileRef}>
            <Profile
              className=" h-5 w-5 sm:h-6 sm:w-6 text-[#F8FBE6] hover:text-gray-300 cursor-pointer"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            />

            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-4 w-32">
                {/* The small triangular caret */}
                <div className="absolute -top-[6px] right-2 w-3 h-3 bg-[#B787B6] transform rotate-45 z-0"></div>

                {/* The Login button itself */}
                <div className="bg-white rounded-lg shadow-sm border border-black p-1 z-10 relative">
                  <a
                    href="/login"
                    className="block w-full text-center px-4 py-1 text-[16px] text-[#1f1e3e] rounded-md hover:bg-gray-100 hover:underline cursor-pointer"
                  >
                    Log In
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Links for desktop */}
      <ul className=" bg-[#B787B6] hidden sm:flex items-center justify-center gap-4 py-1">
        <li className="text-[#F8FBE6] hover:underline cursor-pointer">Home</li>
        <p className="text-[#F8FBE6]">|</p>
        <li className="text-[#F8FBE6] hover:underline cursor-pointer">Genres</li>
        <p className="text-[#F8FBE6]">|</p>
        <li className="text-[#F8FBE6] hover:underline cursor-pointer">Best Sellers</li>
        <p className="text-[#F8FBE6]">|</p>
        <li className="text-[#F8FBE6] hover:underline cursor-pointer">New Arrivals</li>
        <p className="text-[#F8FBE6]">|</p>
        <li className="text-[#F8FBE6] hover:underline cursor-pointer">Blog</li>
        <p className="text-[#F8FBE6]">|</p>
        <li className="text-[#F8FBE6] hover:underline cursor-pointer">Contact</li>
      </ul>

      {/* Search bar for mobile */}
      <div className="sm:hidden flex w-full py-3 px-20 relative">
        <input
          type="text"
          placeholder="Search"
          className="w-full h-8 bg-white text-[#888888] p-2 focus:outline-none rounded-[8px] text-[12px]"
        />
        <button className="bg-[#B787B6] absolute right-20 top-1/2 transform -translate-y-1/2 flex items-center justify-center h-8 px-4 rounded-r-[8px] ">
          <SearchWhite className="h-4 w-4 absolute pointer-events-none " />
        </button>
      </div>
    </nav>
  );
}