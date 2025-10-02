import React, { useState, useEffect } from "react";
// 1. Import useAuth to get user token and status
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { Routes, Route } from "react-router-dom";
// 2. Import the new central 'api' instance
import api from "./api/axios";

// Layout Component
import Navbar from "./Components/layout/Navbar";
import Footer from "./Components/layout/Footer";

// Pages
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import UserProfile from "./Pages/UserProfile";
import UserOrder from "./Pages/UserOrder";
import ProductPage from "./Pages/Product";
import SearchResultsPage from "./Pages/SearchResult";
import CheckoutPage from "./Pages/Checkout";
import BlogPage from "./Pages/Blog";
import ContactPage from "./Pages/Contact";

// This new AppContent component is necessary to use hooks from AuthContext
function AppContent() {
  const [cartItems, setCartItems] = useState([]);
  const { user, token } = useAuth(); // Get user and token from context

  // This single function will now be our only source for fetching/refreshing the cart
  const fetchCart = async () => {
    if (!token) {
      setCartItems([]);
      return;
    }
    try {
      // 3. Use the simplified 'api' object. The URL is relative and the token is added automatically.
      const response = await api.get("/api/cart");
      // Normalize backend data to the format your frontend components expect
      const normalizedCart = response.data.map((item) => ({
        id: item.BookID,
        name: item.Title,
        price: Number(item.Price),
        quantity: item.Quantity,
        imageUrl: `${api.defaults.baseURL}${item.BookImg}`, // Use the dynamic base URL
      }));
      setCartItems(normalizedCart);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCartItems([]);
    }
  };

  // Fetch the cart from the DB whenever the user's login status changes
  useEffect(() => {
    fetchCart();
  }, [user, token]);

  // 4. All cart handlers are now simplified to call the API and then refetch the cart

  const handleAddToCart = async (product) => {
    if (!token) return alert("Please log in to add items to your cart.");
    try {
      await api.post("/api/cart", { bookId: product.BookID });
      fetchCart(); // After adding, just call fetchCart to get the updated list
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const handleUpdateQuantity = async (id, newQuantity) => {
    if (!token) return;
    try {
      await api.put(`/api/cart/${id}`, { quantity: newQuantity });
      fetchCart(); // Refetch to update the UI
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleRemoveItem = async (id) => {
    if (!token) return;
    try {
      await api.delete(`/api/cart/${id}`);
      fetchCart(); // Refetch to update the UI
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar totalCartItems={totalCartItems} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
          <Route path="/product/:id" element={<ProductPage onAddToCart={handleAddToCart} />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/orders" element={<UserOrder />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<div className="p-10 text-center">404 - Page Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

// The main App component now just wraps AppContent in the provider
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
