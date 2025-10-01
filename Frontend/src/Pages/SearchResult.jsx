import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios"; // Using the centralized axios instance
import SearchResultCard from "../Components/SearchResultCard"; // Path to the card component

export default function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    if (!query) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get(`/api/books/search?q=${query}`);
        setSearchResults(response.data);
      } catch (err) {
        setError("Failed to fetch search results. Please try again.");
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Page Title */}
      <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
        Search Result for: <span className="font-bold text-[#1F1E3E]">{query}</span>
      </h1>

      {/* Loading and Error Messages */}
      {loading && <p className="text-center py-10">Searching...</p>}
      {error && <p className="text-center py-10 text-red-500">{error}</p>}

      {!loading && searchResults.length === 0 && <p className="text-center py-10 text-gray-500">No books found matching your search.</p>}

      {/* Results List */}
      {searchResults.length > 0 && (
        <div className="flex flex-col gap-6">
          {searchResults.map((book) => (
            <SearchResultCard key={book.BookID} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
