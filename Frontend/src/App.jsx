import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout Components
import Navbar from "./Components/layout/Navbar";
import Footer from "./Components/layout/Footer";
// NOTE: HeroSection must be placed on the Home page, not here in the global App file.
// import HeroSection from "./Components/HeroSection"; 

// Pages 
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";              // <-- Your new Cart component
import UserProfile from "./Pages/UserProfile"; // <-- Assuming path is lowercase pages/
import UserOrder from "./Pages/UserOrder";   // <-- Assuming path is pages/
// Add any other pages your friend or you have active:
// import Catalog from "./pages/Catalog";
// import Product from "./pages/Product";
// import Checkout from "./pages/Checkout";
// import Contact from "./pages/Contact";
// import Blog from "./pages/Blog"; 

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} /> 

          {/* User Account Pages (from remote repository) */}
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/orders" element={<UserOrder />} />

          {/* Uncomment other routes as you build those pages: */}
          {/* <Route path="/catalog" element={<Catalog />} /> */}
          {/* <Route path="/product/:id" element={<Product />} /> */}
          {/* <Route path="/checkout" element={<Checkout />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
          {/* <Route path="/blog" element={<Blog />} /> */}
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
