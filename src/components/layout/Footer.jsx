import { useState } from "react";
import DownArrow from "../../assets/icons/DownArrow.svg?react";
import Instagram from "../../assets/icons/Instagram.svg?react";
import Facebook from "../../assets/icons/Facebook.svg?react";
import Twitter from "../../assets/icons/Twitter.svg?react";
import Pinterest from "../../assets/icons/Pinterest.svg?react";
export default function Footer() {
  const [showLinks, setShowLinks] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  return (
    <footer className="bg-[#1F1E3E] text-[#F8FBE6] px-6 py-10">
      <div className="max-w-4xl mx-auto flex flex-col items-start text-left gap-2">
        {/* About Izzy */}
        <div>
          <div className="mb-2">
            <span className="text-2xl font-semibold">
              <span className="text-[#F27C66]">About</span> <span className="text-white">Izzy</span>
            </span>
          </div>
          <p className="text-sm italic" style={{ color: "#CCA1E5" }}>
            "Izzy opens the door to realms untold—where fiction breathes and imagination unfolds"
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <button onClick={() => setShowLinks(!showLinks)} className="flex items-center justify-center gap-2 mb-2">
            <span className="text-[#F27C66] text-xl font-semibold">Quick Links</span>
            <DownArrow className="h-4 w-4 text-[#F27C66]" />
          </button>
          {showLinks && (
            <ul className="text-sm space-y-1">
              <li>
                <a href="/" className="text-[#F8AFAF] hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/catalog" className="text-[#F8AFAF] hover:underline">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="/authors" className="text-[#F8AFAF] hover:underline">
                  Authors
                </a>
              </li>
            </ul>
          )}
        </div>

        {/* Customer Support */}
        <div>
          <button onClick={() => setShowSupport(!showSupport)} className="flex items-center justify-center gap-2 mb-2">
            <span className="text-[#F27C66] text-xl font-semibold">Customer Support</span>
            <DownArrow className="h-4 w-4 text-[#F27C66]" />
          </button>
          {showSupport && (
            <ul className="text-sm space-y-1">
              <li>
                <a href="/contact" className="text-[#F8AFAF] hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faq" className="text-[#F8AFAF] hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/returns" className="text-[#F8AFAF] hover:underline">
                  Shipping & Returns
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center mt-8">
        {/* Follow Us
        
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-[#F27C66] text-xl font-semibold">Follow Us</span>
            <DownArrow className="h-4 w-4 text-[#F27C66]" />
          </div> */}
        <div className="flex justify-center space-x-6 mt-2">
          <Instagram className="h-6 w-6 text-[#F8FBE6] hover:text-[#F27C66] cursor-pointer" />
          <Facebook className="h-6 w-6 text-[#F8FBE6] hover:text-[#F27C66] cursor-pointer" />
          <Twitter className="h-6 w-6 text-[#F8FBE6] hover:text-[#F27C66] cursor-pointer" />
          <Pinterest className="h-6 w-6 text-[#F8FBE6] hover:text-[#F27C66] cursor-pointer" />
        </div>

        {/* Copyright */}
        <div className="text-sm text-white mt-8">© 2025 Izzy. All rights reserved.</div>
      </div>
    </footer>
  );
}
