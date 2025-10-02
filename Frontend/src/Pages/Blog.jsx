import React from "react";
import Branch from "../Assets/Images/Branch.png";
import BranchR from "../Assets/Images/BranchR.png";
import Book1 from "../Assets/Images/Book1.png";
import Fantasy from "../Assets/Images/Fantasy.png";
import Book2 from "../Assets/Images/Book2.png";
import Ikigai from "../Assets/Images/Ikigai.png";
import ItEndsWithUs from "../Assets/Images/ItEndsWithUs.png";
import VeiledInSmoke from "../Assets/Images/VeiledInSmoke.png";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Storytelling: What Makes a Book Unforgettable",
      excerpt: "Explore the elements that transform a simple story into an unforgettable journey that stays with readers long after the final page.",
      author: "Sarah Mitchell",
      date: "January 15, 2025",
      readTime: "5 min read",
      category: "Writing Craft",
      image: Book1,
    },
    {
      id: 2,
      title: "Genre Spotlight: The Rise of Contemporary Fantasy",
      excerpt: "Discover why contemporary fantasy has become one of the fastest-growing genres and which authors are leading this magical renaissance.",
      author: "David Chen",
      date: "January 12, 2025",
      readTime: "7 min read",
      category: "Genres",
      image: Fantasy,
    },
    {
      id: 3,
      title: "Building Your Personal Library: A Curator's Guide",
      excerpt: "Learn how to build a meaningful collection that reflects your literary journey and grows with your evolving tastes.",
      author: "Emma Rodriguez",
      date: "January 10, 2025",
      readTime: "6 min read",
      category: "Book Collecting",
      image: Book2,
    },
    {
      id: 4,
      title: "The Psychology of Book Covers: First Impressions Matter",
      excerpt: "Dive into the fascinating world of book cover design and discover how visual elements influence our reading choices.",
      author: "Michael Foster",
      date: "January 8, 2025",
      readTime: "4 min read",
      category: "Design",
      image: Ikigai,
    },
    {
      id: 5,
      title: "Supporting Independent Authors: Why It Matters",
      excerpt: "Explore the importance of supporting indie authors and discover platforms that help emerging voices reach new readers.",
      author: "Lisa Park",
      date: "January 5, 2025",
      readTime: "5 min read",
      category: "Industry",
      image: ItEndsWithUs,
    },
    {
      id: 6,
      title: "Reading in the Digital Age: E-books vs Physical Books",
      excerpt: "An honest comparison of digital and physical reading experiences, and why both have their place in modern libraries.",
      author: "James Wright",
      date: "January 3, 2025",
      readTime: "8 min read",
      category: "Technology",
      image: VeiledInSmoke,
    },
  ];

  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1F1E3E] to-[#B787B6] py-16 px-4 sm:px-6 lg:px-12">
        <img src={Branch} alt="Decorative branch" className="absolute top-0 left-0 w-20 h-20 opacity-50 rotate-90" />
        <img src={BranchR} alt="Decorative branch" className="absolute bottom-0 right-0 w-24 h-24 opacity-50" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F8FBE6] mb-4" style={{ fontFamily: "Irish Grover, cursive" }}>
            Izzy
          </h1>
          <p className="text-xl sm:text-2xl text-[#F8FBE6] opacity-90 mb-8" style={{ fontFamily: "Playfair Display, serif" }}>
            "Where stories meet storytellers, and readers discover their next great adventure"
          </p>
          <div className="w-24 h-1 bg-[#F27C66] mx-auto"></div>
        </div>
      </div>

      {/* Featured Post */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F1E3E]" style={{ fontFamily: "Jura, sans-serif" }}>
              Featured Story
            </h2>
            <div className="flex-1 ml-6 h-px bg-gradient-to-r from-[#B787B6] to-transparent"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block px-3 py-1 bg-[#F27C66] text-white text-sm font-semibold rounded-full mb-4">{featuredPost.category}</div>
              <h3 className="text-3xl sm:text-4xl font-bold text-[#1F1E3E] mb-4" style={{ fontFamily: "Jura, sans-serif" }}>
                {featuredPost.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{featuredPost.excerpt}</p>
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <span className="font-semibold text-[#B787B6]">{featuredPost.author}</span>
                <span className="mx-2">"</span>
                <span>{featuredPost.date}</span>
                <span className="mx-2">"</span>
                <span>{featuredPost.readTime}</span>
              </div>
              <button className="bg-[#B787B6] hover:bg-[#A076A5] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">Read Full Story</button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-80 object-cover rounded-xl shadow-lg" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F1E3E]" style={{ fontFamily: "Jura, sans-serif" }}>
              Recent Posts
            </h2>
            <div className="flex-1 ml-6 h-px bg-gradient-to-r from-[#B787B6] to-transparent"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-[#F27C66] text-white text-xs font-semibold rounded-full">{post.category}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1F1E3E] mb-3 line-clamp-2 group-hover:text-[#B787B6] transition-colors duration-200" style={{ fontFamily: "Jura, sans-serif" }}>
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="font-semibold text-[#B787B6]">{post.author}</span>
                    <span className="mx-2">"</span>
                    <span>{post.date}</span>
                    <span className="mx-2">"</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-gradient-to-r from-[#1F1E3E] to-[#B787B6] relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FBE6] mb-4" style={{ fontFamily: "Jura, sans-serif" }}>
            Stay Updated with Our Literary Journey
          </h2>
          <p className="text-lg text-[#F8FBE6] opacity-90 mb-8">Subscribe to our newsletter and never miss a story, review, or literary discovery.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email address" className="flex-1 px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#F27C66]" />
            <button className="bg-[#F27C66] hover:bg-[#E06B55] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">Subscribe</button>
          </div>
        </div>
        <img src={Branch} alt="Decorative branch" className="absolute top-0 right-0 w-32 h-32 opacity-50 rotate-180" />
      </section>

      {/* Quote Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl sm:text-3xl lg:text-4xl text-[#1F1E3E] font-italic leading-relaxed" style={{ fontFamily: "Playfair Display, serif" }}>
            "Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers."
          </blockquote>
          <cite className="block mt-6 text-lg text-[#B787B6] font-semibold">- Charles W. Eliot</cite>
        </div>
      </section>
    </div>
  );
}
