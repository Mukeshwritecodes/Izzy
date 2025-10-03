import React from "react";
import { Link } from "react-router-dom";
import api from "../api/axios"; // 1. Import the central api instance

export default function BookCard({ book, onAddToCart }) {
  // Destructure properties from the book object
  const { BookImg, Title, Author, Price, BookID } = book;

  // 2. Construct the full image URL using the dynamic baseURL from our api instance
  const fullImageUrl = `${api.defaults.baseURL}${BookImg}`;

  return (
    // 3. Wrap the entire card in a Link to make it clickable
    <Link
      to={`/product/${BookID}`}
      // Added font-jura class for consistent styling
      className="font-jura flex flex-col items-center p-3 sm:p-4 sm:rounded-3xl hover:shadow-2xl hover:shadow-[#DBBCDB] transition duration-300 w-full mx-auto flex-shrink-0 relative group "
    >
      {/* Book Image */}
      <div className="w-full h-[140px] sm:h-[160px] overflow-hidden rounded-lg mb-2">
        <img src={fullImageUrl} alt={Title} className="w-full h-full object-contain rounded-lg" />
      </div>

      {/* Book Info */}
      <div className="w-full text-center mt-2" style={{ fontFamily: "Jura, sans-serif" }}>
        <h3 className="text-[#1F1E3E] text-base sm:text-lg font-bold truncate px-1">{Title}</h3>
        <p className="text-[#B787B6] text-xs sm:text-sm mt-0.5 mb-2 truncate px-1">{Author}</p>
      </div>

      {/* Price */}
      <div className="flex items-baseline justify-center gap-2 mb-3">
        <span className="text-lg sm:text-xl font-bold text-gray-800">₹{Price}</span>
      </div>

      <div className="flex gap-2 w-full items-center justify-center ">
        {/* Add to Cart Button */}
        <button
          className="w-full py-2 px-4 text-white bg-[#F27C66] sm:text-[#F27C66] border-2 sm:border-[#F27C66] sm:bg-white rounded-full text-sm sm:text-md font-regular sm:hover:bg-[#F27C66] sm:hover:text-white transition duration-150 whitespace-nowrap"
          onClick={(e) => {
            // Prevent the click from navigating the page
            e.preventDefault();
            // Only call the onAddToCart function
            onAddToCart(book);
          }}
        >
          Add to cart
        </button>
        <button
          aria-label="Add to wishlist"
          className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border-2 border-[#F27C66] text-[#F27C66] hover:bg-[#F27C66] hover:text-white transition duration-150  sm:static p-2"
          onClick={(e) => {
            e.preventDefault();
            onToggleWishlist && onToggleWishlist(book);
          }}
        >
          {/* Simple heart SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </button>
      </div>
    </Link>
  );
}
