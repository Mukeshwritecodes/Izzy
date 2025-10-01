import React from "react";
import { Link } from "react-router-dom"; // 1. Import Link for navigation

export default function BookCard({ book, onAddToCart }) {
  // Destructure properties from the book object, matching the database columns
  const { BookImg, Title, Author, Price, BookID } = book;
  const backendUrl = "http://localhost:5000";
  const fullImageUrl = `${backendUrl}${BookImg}`;

  return (
    // 2. Wrap the entire card in a Link component to make it clickable
    <Link to={`/product/${BookID}`} className="flex flex-col items-center p-3 sm:p-4 rounded-xl hover:shadow-2xl transition duration-300 w-full mx-auto flex-shrink-0 relative group">
      {/* Book Image */}
      <div className="w-full h-[132px] sm:h-[230px] overflow-hidden rounded-lg mb-3">
        <img src={fullImageUrl} alt={Title} className="w-full h-full object-contain rounded-lg" style={{ fontFamily: "jura, sans-serif" }} />
      </div>

      {/* Book Info */}
      <div className="w-full text-center mt-2">
        <h3 className="text-[#1F1E3E] text-base sm:text-lg font-semibold truncate px-1" style={{ fontFamily: "jura, sans-serif" }}>{Title}</h3>
        <p className="text-gray-500 text-xs sm:text-sm mt-0.5 mb-2 truncate px-1" style={{ fontFamily: "jura, sans-serif" }}>
          {Author}
        </p>
      </div>

      {/* Price */}
      <div className="flex items-baseline justify-center gap-2 mb-3">
        <span className="text-lg sm:text-xl font-bold text-gray-800" style={{ fontFamily: "jura, sans-serif" }}>
          ₹{Price}
        </span>
      </div>

      {/* Add to Cart Button */}
      <button
        className="w-full py-2 px-4 text-white bg-[#F27C66] rounded-full text-sm sm:text-md font-bold hover:bg-opacity-90 transition duration-150 shadow-md hover:shadow-lg"
        style={{ fontFamily: "jura, sans-serif" }}
        onClick={(e) => {
          // 3. This prevents the click from navigating the page
          e.preventDefault();
          // It only calls the onAddToCart function
          onAddToCart(book);
        }}
      >
        Add to cart
      </button>
    </Link>
  );
}
