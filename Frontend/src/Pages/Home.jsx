import React, { useState, useEffect } from "react";
import api from "../api/axios"; // 1. Import axios for API calls
import HeroSection from "../Components/HeroSection";
import FeaturedGenre from "../Components/FeaturedGenre";
import BookCard from "../Components/BookCard";
import Branch from "../Assets/Images/BranchR.png";

// 2. Accept the `onAddToCart` prop to pass it down
export default function Home({ onAddToCart }) {
  // 3. Set up state for books, loading, and errors
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 4. Use useEffect to fetch data from your backend when the page loads
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/api/books");
        setBooks(response.data); // Store the fetched books in state
      } catch (err) {
        setError("Could not load books. Please try again later.");
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false); // Hide the loading message
      }
    };

    fetchBooks();
  }, []); // The empty array ensures this runs only once

  return (
    <div className="flex flex-col flex-nowrap">
      <HeroSection />
      <FeaturedGenre />

      <section className="py-8 px-2 sm:px-6 lg:px-12">
        <h2 className="text-[16px] sm:text-[24px] md:text-[32px] font-serif font-semibold text-[#1F1E3E] pb-4" style={{ fontFamily: "jura, sans-serif" }}>
          Editor's Picks
        </h2>
        <hr className="border-gray-300"></hr>

        {/* 5. Handle loading and error states */}
        {loading && <p className="text-center">Loading books...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* 6. Map over the 'books' state from the API instead of MOCK_BOOKS */}
        <div className="flex overflow-x-scroll space-x-4 pb-4 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:space-x-0 md:gap-6">
          {books.map((book) => (
            <div key={book.BookID} className="min-w-[180px] md:min-w-0">
              {/* Pass the book data and the onAddToCart function down */}
              <BookCard book={book} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
        <hr className="border-gray-300"></hr>
      </section>

      <div className="relative">
        <h2 className="bg-gradient-to-l text-white text-center font-regular text-[16px] sm:text-[24px] md:text-[32px] from-[#FDFCFB] to-[#DBBCDB] py-10 italic" style={{ fontFamily: "Playfair Display, serif" }}>
          ❝The only way to do great work is to love what you do.❞
        </h2>
        <img src={Branch} alt="Decorative branch" className="absolute w-40 opacity-96 h-40 z-0 sm:w-68 sm:h-68 lg:w-60 lg:h-60 bottom-0 right-0 " />
      </div>
    </div>
  );
}
