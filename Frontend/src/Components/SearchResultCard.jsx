import React from "react";
import { Link } from "react-router-dom";

export default function SearchResultCard({ book }) {
  // Destructure properties from the book object to match database columns
  const { BookID, BookImg, Title, Author, Description } = book;
  const backendUrl = "http://localhost:5000";
  const fullImageUrl = `${backendUrl}${BookImg}`;

  return (
    // Main container with a bottom border for separation, replicating the design
    <div className="flex flex-row items-center gap-5 sm:gap-8 py-6  border-b-1 border-gray-300">
      {/* Book Image */}
      <Link to={`/product/${BookID}`} className="flex-shrink-0 w-24 sm:w-32 mx-auto sm:mx-0">
        <img
          src={fullImageUrl}
          alt={Title}
          className="w-full h-auto object-contain rounded-md shadow-md"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://placehold.co/128x192/EEEEEE/AAAAAA?text=Book";
          }}
        />
      </Link>

      {/* Book Details */}
      <div className=" flex-grow sm:text-left">
        <h2 className="text-xl sm:text-2xl font-bold
         text-gray-800" style={{ fontFamily: "jura, sans-serif" }}>{Title}</h2>
        <p className="text-md text-gray-500 mt-1" style={{ fontFamily: "jura, sans-serif" }}>{Author}</p>

        {/* "Book Description" section as seen in the image */}
        <div className="mt-4">
          <h3 className="text-sm font-bold text-gray-700" style={{ fontFamily: "jura, sans-serif" }}>Book Description</h3>
          {/* Truncates the description to 3 lines to avoid long text blocks */}
          <p className="text-sm text-gray-600 mt-1 line-clamp-3" style={{ fontFamily: "jura, sans-serif" }}>{Description}</p>
        </div>

        {/* "View Book" Button with matching styles */}
        <Link to={`/product/${BookID}`} className="inline-block mt-4 bg-[#F27C66] text-white text-sm font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors duration-200">
          View Book
        </Link>
      </div>
    </div>
  );
}
