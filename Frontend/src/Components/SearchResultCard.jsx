import React from "react";
import { Link } from "react-router-dom";
import api from "../api/axios"; // 1. Import the central api instance

export default function SearchResultCard({ book }) {
  const { BookID, BookImg, Title, Author, Description } = book;

  // 2. Construct the full image URL using the dynamic baseURL from our api instance
  const fullImageUrl = `${api.defaults.baseURL}${BookImg}`;

  return (
    // The rest of the component remains the same
    <div className="flex flex-row items-center gap-5 sm:gap-8 py-6 border-b border-gray-300">
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

      <div className="flex-grow sm:text-left font-jura">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{Title}</h2>
        <p className="text-md text-gray-500 mt-1">{Author}</p>
        <div className="mt-4">
          <h3 className="text-sm font-bold text-gray-700">Book Description</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-3">{Description}</p>
        </div>
        <Link to={`/product/${BookID}`} className="inline-block mt-4 bg-[#F27C66] text-white text-sm font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors duration-200">
          View Book
        </Link>
      </div>
    </div>
  );
}
