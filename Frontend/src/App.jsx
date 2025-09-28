import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./Components/HeroSection"; // Assuming this is also used

// Pages (Updated imports)
import Home from "./pages/Home";
import Cart from "./pages/Cart"; // <-- UNCOMMENTED: Import the Cart page component
// import Catalog from "./pages/Catalog";
// import Product from "./pages/Product";
// import Checkout from "./pages/Checkout";
// import Contact from "./pages/Contact";
// import Blog from "./Pages/Blog";
// import UserProfile from "./pages/UserProfile";
// import UserOrder from "./pages/UserOrder";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      {/* <Sidebar /> - Rendered inside Navbar */}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Cart Route definition */}
          <Route path="/cart" element={<Cart />} /> {/* <-- UNCOMMENTED: Define the route path */}
          
          {/* Other commented routes */}
          {/* <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/orders" element={<UserOrder />} /> */}
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
