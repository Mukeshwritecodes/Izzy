import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import BookCard from "../Components/BookCard"; // Assuming correct path from src

export default function ProductPage({ onAddToCart }) {
  // Get the 'id' from the URL (e.g., /product/1)
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(response.data.mainBook);
        setRelatedBooks(response.data.related);
      } catch (err) {
        setError("Could not find this book. Please try another.");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [id]); // Re-fetch data if the book ID in the URL changes

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!book) return null; // Or a "not found" component

  // Placeholder for discount logic if needed
  const discountedPrice = book.Price * 0.85;

  return (
    <div className="bg-white">
      <div className="container mx-auto max-w-5xl px-4 py-8 ba">
        {/* --- Main Product Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left Side: Book Image */}
          <div className="flex justify-center p-4 rounded-4xl items-start border-3 border-purple-100">
            <img src={`http://localhost:5000${book.BookImg}`} alt={book.Title} className="w-full max-w-[220px] h-auto object-contain rounded-lg shadow-lg drop" />
          </div>

          {/* Right Side: Book Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1F1E3E]">{book.Title}</h1>
            <p className="text-lg text-gray-600 mt-2">{book.Author}</p>
            <div className="flex items-baseline gap-3 my-4">
              <span className="text-3xl font-bold text-gray-800">₹{discountedPrice.toFixed(0)}</span>
              <span className="text-xl text-gray-400 line-through">₹{book.Price}</span>
              <span className="text-lg font-semibold text-green-500">15% OFF</span>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <button onClick={() => onAddToCart(book)} className="bg-[#F27C66] text-white font-semibold py-3 px-8 rounded-lg hover:bg-opacity-90 transition duration-200">
                Add to Cart
              </button>
              <button className="bg-white text-[#F27C66] font-semibold py-3 px-8 rounded-lg border-2 border-[#F27C66] hover:bg-gray-100 transition duration-200">Buy It Now</button>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-[#1F1E3E] border-b pb-2">About Book</h2>
              <p className="text-gray-700 mt-4 leading-relaxed">{book.Description}</p>
            </div>
          </div>
        </div>

        {/* --- You May Also Like Section --- */}
        {relatedBooks.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#1F1E3E] mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedBooks.map((relatedBook) => (
                <BookCard key={relatedBook.BookID} book={relatedBook} onAddToCart={onAddToCart} />
              ))}
            </div>
          </div>
        )}

        {/* --- About Author Section --- */}
        <div className="mt-16 bg-purple-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-[#1F1E3E] mb-4">About Author</h2>
          <p className="text-gray-700 leading-relaxed">
            {/* This would ideally come from an 'AuthorBio' column in an 'Authors' table */}A brief biography of {book.Author}. Having seen people immersed in every kind of difficulty, this author puts together their thoughts and choice to help readers make their lives better and more meaningful. Through this book, they would like to tell the reader that it's okay to have problems and issues in life. Everyone has them.
          </p>
        </div>
      </div>
    </div>
  );
}
