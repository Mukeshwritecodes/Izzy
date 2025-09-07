import React from "react";
import react, { useState } from "react";
import Logo from "../../Assets/Icons/Logo.svg?react";
import Heart from "../../Assets/Icons/Heart.svg?react";
import Cart from "../../Assets/Icons/Cart.svg?react";
import Profile from "../../Assets/Icons/Profile.svg?react";
import Search from "../../Assets/Icons/Search.svg?react";
import SearchWhite from "../../Assets/Icons/SearchWhite.svg?react";
import Hamburger from "../../Assets/Icons/Hamburger.svg?react";

export default function Navbar() {
  return (
    //Main wrapper
    <nav className="flex-col w-full gap-0">
      <div className="bg-[#1F1E3E] py-2 px-4 sm:py-4 sm:px-6 flex justify-between items-center gap-20 w-full">
        <div className=" flex items-center gap-4">
          <Hamburger className="block h-8 w-8 sm:hidden text-[#F8FBE6] cursor-pointer" />
          <Logo className="flex-shrink-0 h-8 sm:h-12  lg:h-14  pt-1" />
        </div>
        <div className="hidden sm:block relative w-full max-w-160">
          <input type="text" placeholder="Search" className="w-full bg-white text-[#888888] p-3 focus:outline-none rounded-2xl" />
          <Search className="h-5 w-5 absolute pointer-events-none transform -translate-y-1/2 top-1/2 right-3" />
        </div>
        <div className="hidden sm:visible bg-[#1F1E3E] flex w-full">
          <input type="text" placeholder="Search" className="w-full bg-white text-[#888888] p-3 focus:outline-none rounded-2xl" />
        </div>
        <div className="flex items-center gap-6 sm:gap-8 w-auto">
          <Heart className="h-6 w-6 text-[#F8FBE6] hover:text-gray-300 cursor-pointer" />
          <Cart className="h-6 w-6 text-[#F8FBE6] hover:text-gray-300 cursor-pointer" />

          <Profile className=" h-6 w-6 text-[#F8FBE6] hover:text-gray-300 cursor-pointer" />
        </div>
      </div>
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
      <div className="sm:hidden bg-[#1F1E3E] flex w-full py-3 px-20 relative">
        <input type="text" placeholder="Search" className="w-full h-10 bg-white text-[#888888] p-2 focus:outline-none rounded-[8px]" />
        <button className="bg-[#B787B6] absolute right-20 top-1/2 transform -translate-y-1/2 flex items-center justify-center h-10 px-6 rounded-r-[8px]">
          <SearchWhite className="h-5 w-5 absolute pointer-events-none " />
        </button>
      </div>
    </nav>
  );
}
