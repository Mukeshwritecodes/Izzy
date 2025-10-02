import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Corrected Path
import Logo from "../../Assets/Icons/Logo.svg?react"; // Corrected Path
import Heart from "../../Assets/Icons/Heart.svg?react"; // Corrected Path
import Cart from "../../Assets/Icons/Cart.svg?react"; // Corrected Path
import Profile from "../../Assets/Icons/Profile.svg?react"; // Corrected Path
import Search from "../../Assets/Icons/Search.svg?react"; // Corrected Path
import SearchWhite from "../../Assets/Icons/SearchWhite.svg?react"; // Corrected Path
import Hamburger from "../../Assets/Icons/Hamburger.svg?react"; // Corrected Path
import Sidebar from "../layout/Sidebar";
import LoginFlow from "../LoginFlow";

// 2. Change prop name to match what App.jsx sends
export default function Navbar({ totalCartItems = 0 }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // 3. Use the real user and logout function from the AuthContext
  const { user, logout } = useAuth();

  const profileRef = useRef(null);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setIsLoginOpen(true);
    // Also, close the sidebar when the login button is clicked
    setIsSidebarOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevents the page from reloading on form submission.
    if (searchTerm.trim()) {
      // Navigates to the search results page with the query as a URL parameter.
      navigate(`/search?q=${searchTerm.trim()}`);
      setSearchTerm(""); // Clears the search bar after the search is performed.
    }
  };

  // Effect to handle closing menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    }

    // Effect to close login modal with Escape key
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsLoginOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [profileRef, sidebarRef]);

  // Effect to prevent background scroll when modal is open
  useEffect(() => {
    if (isLoginOpen) {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isLoginOpen]);

  // Handler for successful authentication (LoginFlow closes itself)
  const handleAuthSuccess = () => {
    setIsLoginOpen(false);
    navigate("/profile");
  };

  return (
    // Main wrapper
    <nav className="flex-col w-full gap-0 bg-[#1F1E3E]">
      <div ref={sidebarRef} className={`fixed top-0 left-[-1px] h-full z-50 transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* --- 2. PASS THE FUNCTION AS A PROP TO THE SIDEBAR --- */}
        <Sidebar onLoginClick={handleLoginClick} />
      </div>

      {/* Top nav bar */}
      <div className="pt-4 px-4 sm:py-4 sm:px-6 flex justify-between items-center gap-auto w-full">
        <div className=" flex items-center gap-4">
          <Hamburger className="block h-7 w-7 sm:hidden text-[#F8FBE6]  cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          <button onClick={() => navigate("/")} aria-label="Go to home">
            <Logo className="flex-shrink-0 h-8 sm:h-12  lg:h-14  pt-1 hover:cursor-pointer" />
          </button>
        </div>

        {/* Search Bar (Desktop) */}
        <form onSubmit={handleSearch} className="hidden sm:block relative w-full max-w-160">
          <input type="text" placeholder="Search by title or author" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full h-13 bg-white text-[#888888] p-3 focus:outline-none rounded-2xl" />
          <button type="submit" className="absolute transform -translate-y-1/2 top-1/2 right-3" aria-label="Submit search">
            <Search className="h-5 w-5 text-gray-400" />
          </button>
        </form>

        {/* Icons (Heart, Cart, Profile) */}
        <div className="flex items-center gap-6 sm:gap-8 w-auto">
          <Heart className="h-5 w-5  sm:h-6 sm:w-6 text-[#F8FBE6] hover:text-gray-300 cursor-pointer" />

          {/* 4. Add 'relative' class to parent for correct badge positioning */}
          <Link to="/cart" className="relative" aria-label="Go to shopping cart">
            <Cart className="h-5 w-5 sm:h-6 sm:w-6 text-[#F8FBE6] hover:text-gray-300 cursor-pointer" />

            {/* 5. Use the correct prop name 'totalCartItems' */}
            {totalCartItems > 0 && <span className="absolute -top-2 -right-2 bg-[#F27C66] text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">{totalCartItems}</span>}
          </Link>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <Profile className=" h-5 w-5 sm:h-6 sm:w-6 text-[#F8FBE6] hover:text-gray-300 cursor-pointer" onClick={() => setIsProfileOpen(!isProfileOpen)} />
            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-4 w-32">
                <div className="absolute top-[-4px] right-2 w-3 h-3 bg-white transform rotate-45 z-0"></div>
                <div className="bg-white rounded-lg shadow-sm border border-black p-1 z-10 relative">
                  {/* 6. Use the real 'user' object from context */}
                  {user ? (
                    <div className="flex flex-col">
                      <Link to="/profile" className="block w-full text-left px-4 py-1 text-[16px] text-[#1f1e3e] rounded-md hover:bg-gray-100 hover:underline">
                        Profile
                      </Link>
                      {/* 7. Call the real 'logout' function */}
                      <button onClick={logout} className="block w-full text-left px-4 py-1 text-[16px] text-[#1f1e3e] rounded-md hover:bg-gray-100">
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <button
                        onClick={() => {
                          setIsLoginOpen(true);
                          setIsProfileOpen(false);
                        }}
                        className="block w-full text-center px-4 py-1 text-[16px] text-[#1f1e3e] rounded-md hover:bg-gray-100 hover:underline cursor-pointer"
                      >
                        Log In
                      </button>
                      <button
                        onClick={() => {
                          setIsLoginOpen(true);
                          setIsProfileOpen(false);
                        }}
                        className="block w-full text-center px-4 py-1 text-[16px] text-[#1f1e3e] rounded-md hover:bg-gray-100 hover:underline cursor-pointer"
                      >
                        Sign up
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Links for desktop */}
      <ul className=" bg-[#B787B6] hidden sm:flex items-center justify-center gap-4 py-1">
        <li className="text-[#F8FBE6] hover:underline cursor-pointer">
          <button onClick={() => navigate("/")} className="text-[#F8FBE6] hover:underline cursor-pointer">
            Home
          </button>
        </li>
        <p className="text-[#F8FBE6]">|</p>
        <li className="text-[#F8FBE6] hover:underline cursor-pointer">Genres</li>
        <p className="text-[#F8FBE6]">|</p>
        <li className="text-[#F8FBE6] hover:underline cursor-pointer">Best Sellers</li>
        <p className="text-[#F8FBE6]">|</p>
        <li className="text-[#F8FBE6] hover:underline cursor-pointer">New Arrivals</li>
        <p className="text-[#F8FBE6]">|</p>
        <li className="text-[#F8FBE6] hover:underline cursor-pointer">
          <button onClick={() => navigate("/blog")} className="text-[#F8FBE6] hover:underline cursor-pointer">
            Blog
          </button>
        </li>
        <p className="text-[#F8FBE6]">|</p>
        <li className="text-[#F8FBE6] hover:underline cursor-pointer">
          <button onClick={() => navigate("/contact")} className="text-[#F8FBE6] hover:underline cursor-pointer">
            Contact
          </button>
        </li>
      </ul>

      {/* Search bar for mobile */}
      <form onSubmit={handleSearch} className="sm:hidden flex w-full py-3 px-16 relative">
        <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full h-8 bg-white text-[#888888] p-2 focus:outline-none rounded-l-lg text-sm" />
        <button type="submit" className="bg-[#B787B6] flex items-center justify-center h-8 px-4 rounded-r-lg" aria-label="Submit search">
          <SearchWhite className="h-4 w-4" />
        </button>
      </form>

      {/* Login Modal/Flow Component */}
      {isLoginOpen && <LoginFlow onClose={() => setIsLoginOpen(false)} onSignUpSuccess={handleAuthSuccess} />}
    </nav>
  );
}
