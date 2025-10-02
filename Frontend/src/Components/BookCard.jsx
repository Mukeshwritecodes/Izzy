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
      className="font-jura flex flex-col items-center p-3 sm:p-4 rounded-xl hover:shadow-2xl hover:shadow-[#DBBCDB] transition duration-300 w-full mx-auto flex-shrink-0 relative group"
    >
      {/* Book Image */}
      <div className="w-full h-[124px] sm:h-[180px] overflow-hidden rounded-lg mb-3">
        <img src={fullImageUrl} alt={Title} className="w-full h-full object-contain rounded-lg" />
      </div>

      {/* Book Info */}
      <div className="w-full text-center mt-2" style={{fontFamily: 'Jura, sans-serif'}}>
        <h3 className="text-[#1F1E3E] text-base sm:text-lg font-bold truncate px-1">{Title}</h3>
        <p className="text-[#B787B6] text-xs sm:text-sm mt-0.5 mb-2 truncate px-1">{Author}</p>
      </div>

      {/* Price */}
      <div className="flex items-baseline justify-center gap-2 mb-3">
        <span className="text-lg sm:text-xl font-bold text-gray-800">₹{Price}</span>
      </div>

      {/* Add to Cart Button */}
      <button
        className="w-full py-2 px-4 text-[#F27C66] border-2 border-[#F27C66] rounded-full text-sm sm:text-md font-bold hover:bg-opacity-90 transition duration-150"
        onClick={(e) => {
          // Prevent the click from navigating the page
          e.preventDefault();
          // Only call the onAddToCart function
          onAddToCart(book);
        }}
      >
        Add to cart
      </button>
    </Link>
  );
}
