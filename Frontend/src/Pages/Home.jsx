import React from "react";
import HeroSection from "../Components/HeroSection";
import FeaturedGenre from "../Components/FeaturedGenre";
import Branch from "../Assets/Images/BranchR.png";

export default function Home() {
  return (
    <div className="flex flex-col flex-nowrap">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Genre Section */}
      <FeaturedGenre />
      <div className="relative">
        <h2 className="bg-gradient-to-l text-white text-center font-regular text-[16px] sm:text-[24px] md:text-[32px] from-[#FDFCFB] to-[#DBBCDB] py-10 font italic" style={{ fontFamily: "Playfair Display, serif" }}>
          ❝The only way to do great work is to love what you do.❞
        </h2>
        <img src={Branch} alt="Decorative branch" className="absolute w-40 opacity-96 h-40 z-0 sm:w-68 sm:h-68 lg:w-60 lg:h-60 bottom-0 right-0 " />
      </div>
    </div>
  );
}
