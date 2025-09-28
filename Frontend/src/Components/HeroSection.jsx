import { useState } from "react";
import WindowDay from "../Assets/Images/Window_day.png";
import WindowNight from "../Assets/Images/Window_night.png";
import Branch from "../Assets/Images/BranchR.png";

export default function HeroSection() {
  const [isDay, setIsDay] = useState(true);

  const toggleWindow = () => {
    setIsDay(!isDay);
  };

  return (
    <section className={`flex justify-between gap-4 pl-3 pr-4 sm:pl-10 py-4 sm:pr-12 sm:py-16 overflow-hidden relative transition-colors duration-700 ease-in-out ${isDay ? "bg-gradient-to-tr from-white to-pink-100" : "bg-gradient-to-tr from-white via-[#f8f1f8] to-[#d4a4d3]"}`}>
      <div className="flex items-center">
        {/* Left side - Text content */}
        <div className="flex flex-col gap-6 md:gap-12 py-4 z-10">
          {/* Main headline */}
          <div className="flex flex-col gap-2 md:gap-6">
            <h1 className="text-xl sm:text-4xl lg:text-[64px] font-regular text-[#563d64]" style={{ fontFamily: "Lora, serif" }}>
              Step Into Worlds Untold
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-xl lg:text-2xl pr-4 opacity-80 text-[#AD96BB] leading-relaxed max-w-lg" style={{ fontFamily: "Lora, serif" }}>
              Lose yourself in stories that bloom beyond the page.
            </p>
          </div>

          {/* CTA Button */}
          <div className="relative z-10">
            <button className="bg-[#1F1E3E] text-white px-8 py-2 sm:px-12 sm:py-4 rounded-full text-[10px] sm:text-[20px] font-serif font-medium hover:bg-[#2A2847] hover:cursor-pointer transition-all duration-300 border-[#1F1E3E] absolute translate-y-[-2px] sm:translate-y-[-12px] translate-x-[-2px] sm:translate-x-[-10px]">Explore Books</button>
            <div className="border-1 border-[#1F1E3E]   w-32 h-8 sm:w-54 sm:h-14 transition-all  rounded-full "></div>
          </div>
        </div>
      </div>
      <div className="">
        <img src={isDay ? WindowDay : WindowNight} alt={isDay ? "Day window view" : "Night window view"} onClick={toggleWindow} className="w-42 min-w-24 sm:w-56 md:w-72 lg:w-90 xl:w-[24rem] h-auto cursor-pointer transition-all" />
      </div>
      <img src={Branch} alt="Decorative branch" className="absolute w-40 opacity-96 h-40 z-0 sm:w-68 sm:h-68 lg:w-100 lg:h-100 top-0 left-0 rotate-180" />
    </section>
  );
}
