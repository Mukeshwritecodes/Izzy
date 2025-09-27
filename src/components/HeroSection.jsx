import { useState } from "react";
import WindowDay from "../Assets/Images/Window_day.png";
import WindowNight from "../Assets/Images/Window_night.png";

export default function HeroSection() {
  const [isDay, setIsDay] = useState(true);

  const toggleWindow = () => {
    setIsDay(!isDay);
  };

  return (
    <section className="flex items-center justify-between pl-2 pr-4 sm-pl-12 py-6 sm-pr-16 sm:py-16 bg-gradient-to-r from-white to-pink-100 overflow-hidden">
      <div className="flex items-center ">
        {/* Left side - Text content */}
        <div className="space-y-4 sm:space-y-6">
          {/* Main headline */}
          <h1 className="text-xl sm:text-4xl lg:text-[64px] font-bold text-[#725782]" style={{ fontFamily: "Lora, serif" }}>
            Step Into Worlds Untold
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-xl lg:text-2xl text-[#AD96BB] leading-relaxed max-w-lg" style={{ fontFamily: "Lora, serif" }}>
            Lose yourself in stories that bloom beyond the page.
          </p>

          {/* CTA Button */}

          <button className="bg-[#1F1E3E] text-white px-8 py-2 rounded-full text-[10px] font-serif font-medium hover:bg-[#2A2847] transition-all duration-300 border-[#1F1FE3E] ">Explore Books</button>
        </div>
      </div>
      <div className="">
        <img src={isDay ? WindowDay : WindowNight} alt={isDay ? "Day window view" : "Night window view"} onClick={toggleWindow} className="w-42 min-w-24 sm:w-56 md:w-72 lg:w-90 xl:w-[24rem] h-auto cursor-pointer" />
      </div>
    </section>
  );
}
