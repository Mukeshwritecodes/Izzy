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
    <footer className="bg-[#1F1E3E] text-[#F8FBE6] w-full">
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Four Column Layout */}
          <div className="grid grid-cols-4 gap-8">
            {/* About Izzy */}
            <div>
              <span className="text-[#F27C66] text-xl font-bold mb-4">About</span>
              <span className="ml-2 text-2xl font-semibold">Izzy</span>
              <div className="bg-gradient-to-tr from-[#CCA1E5] to-white bg-clip-text text-transparent text-sm italic leading-relaxed">"Izzy opens the door to realms untold—where fiction breathes and imagination unfolds"</div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-[#F27C66] text-xl font-bold mb-4">Quick Links</h3>
              <ul className="text-[#F8FBE6] text-sm space-y-2">
                <li>
                  <a href="/" className="hover:text-[#F27C66] transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/catalog" className="hover:text-[#F27C66] transition-colors">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="/catalog" className="hover:text-[#F27C66] transition-colors">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="/catalog" className="hover:text-[#F27C66] transition-colors">
                    Genres
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-[#F27C66] transition-colors">
                    Contact us
                  </a>
                </li>
              </ul>
            </div>

            {/* Customer Support */}
            <div>
              <h3 className="text-[#F27C66] text-xl font-bold mb-4">Customer Support</h3>
              <ul className="text-[#F8FBE6] text-sm space-y-2">
                <li>
                  <a href="/faq" className="hover:text-[#F27C66] transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/shipping" className="hover:text-[#F27C66] transition-colors">
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a href="/tracking" className="hover:text-[#F27C66] transition-colors">
                    Order Tracking
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-[#F27C66] transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-[#F27C66] transition-colors">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-[#F27C66] text-xl font-bold mb-4">Follow Us</h3>
              <ul className="text-[#F8FBE6] text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-[#F27C66] transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#F27C66] transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#F27C66] transition-colors">
                    Pinterest
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#F27C66] transition-colors">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section with Social Icons and Copyright */}
          <div className="flex flex-col items-center mt-12">
            <div className="flex justify-center space-x-6 mb-4">
              <Instagram className="h-6 w-6 text-[#F8FBE6] hover:stroke-[#F27C66] cursor-pointer transition-colors" />
              <Facebook className="h-6 w-6 text-[#F8FBE6] hover:stroke-[#F27C66] cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-[#F8FBE6] hover:fill-[#F27C66] cursor-pointer transition-colors" />
              <Pinterest className="h-6 w-6 text-[#F8FBE6] hover:fill-[#F27C66] cursor-pointer transition-colors" />
            </div>
            <div className="text-[#F8FBE6] text-sm">© 2025 Izzy. All rights reserved.</div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden w-full">
        <div className="max-w-4xl mx-auto flex flex-col items-start text-left gap-2 px-6 py-10">
          {/* About Izzy */}
          <div>
            <div className="mb-2">
              <span className="text-2xl font-semibold">
                <span className="text-[#F27C66]">About</span> <span className="text-white">Izzy</span>
              </span>
            </div>
            <p className="text-sm italic bg-gradient-to-tr from-[#CCA1E5] to-white bg-clip-text text-transparent">"Izzy opens the door to realms untold—where fiction breathes and imagination unfolds"</p>
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
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center mb-4">
          {/* Follow Us
          
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-[#F27C66] text-xl font-semibold">Follow Us</span>
              <DownArrow className="h-4 w-4 text-[#F27C66]" />
            </div> */}
          <div className="flex justify-center space-x-6">
            <Instagram className="h-6 w-6 text-[#F8FBE6] hover:text-[#F27C66] cursor-pointer" />
            <Facebook className="h-6 w-6 text-[#F8FBE6] hover:text-[#F27C66] cursor-pointer" />
            <Twitter className="h-6 w-6 text-[#F8FBE6] hover:text-[#F27C66] cursor-pointer" />
            <Pinterest className="h-6 w-6 text-[#F8FBE6] hover:text-[#F27C66] cursor-pointer" />
          </div>

          {/* Copyright */}
          <div className="text-sm text-white mt-6">© 2025 Izzy. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
