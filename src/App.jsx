// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout Components
import Navbar from "./components/layout/Navbar";
// import Sidebar from "./components/layout/Sidebar";
// import Footer from "./components/layout/Footer";

// Pages (use your actual filenames)
// import Home from "./pages/Home";
// import Catalog from "./pages/Catalog";
// import Product from "./pages/Product";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import Contact from "./pages/Contact";
// import Blog from "./Pages/Blog";
// import UserProfile from "./pages/UserProfile";
// import UserOrder from "./pages/UserOrder";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      {/* <Sidebar /> */}

      <main className="flex-1">
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/orders" element={<UserOrder />} /> */}
        </Routes>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
