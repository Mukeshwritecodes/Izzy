import React from "react";
import Logo from "../../Assets/Icons/Logo.svg?react";
import Heart from "../../Assets/Icons/Heart.svg?react";
import Cart from "../../Assets/Icons/Cart.svg?react";
import Profile from "../../Assets/Icons/Profile.svg?react";
import Search from "../../Assets/Icons/Search.svg?react";

export default function Navbar() {
  return (
    //Main wrapper
    <nav className="flex-col w-full gap-0">
      <div className="bg-[#1F1E3E] p-6 flex justify-between items-center gap-20">
        <Logo className="flex-shrink-0 h-10 md:h-12  lg:h-14  " />
        <div className="hidden sm:block relative w-full max-w-180">
          <input type="text" placeholder="Search" className="w-full bg-white text-[#888888]on p-3 rounded-md focus:outline-none !rounded-2xl" />
          <Search className="h-5 w-5 absolute pointer-events-none transform -translate-y-1/2 top-1/2 right-3" />
        </div>
        <div className="flex items-center gap-8">
          <Heart className="h-  6 w-6 text-white hover:text-gray-300 cursor-pointer" />
          <Cart className="h-6 w-6 text-white hover:text-gray-300 cursor-pointer" />
          <Profile className="h-6 w-6 text-white hover:text-gray-300 cursor-pointer" />
        </div>
      </div>
      <ul className="bg-[#B787B6] h-auto flex items-center justify-center gap-4 py-1">
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
    </nav>
  );
}
