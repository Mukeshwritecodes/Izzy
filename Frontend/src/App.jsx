import React, { useState, useEffect } from "react";
// 1. Import useAuth to get user token and status
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

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
import CheckoutPage from "./Pages/Checkout.jsx";

// 2. Create an AppContent component to house the main logic
// This is necessary to use the `useAuth` hook, which must be inside the AuthProvider.
function AppContent() {
  const [cartItems, setCartItems] = useState([]);
  const { user, token } = useAuth(); // Get user and token from context

  // 3. This useEffect fetches the cart from the DB when the user logs in or the token changes
  useEffect(() => {
    const fetchCart = async () => {
      // If there's no token, the user is logged out, so the cart should be empty.
      if (!token) {
        setCartItems([]);
        return;
      }
      try {
        const response = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Normalize backend data to the format your frontend components expect
        const normalizedCart = response.data.map((item) => ({
          id: item.BookID,
          name: item.Title,
          price: Number(item.Price),
          quantity: item.Quantity,
          imageUrl: `http://localhost:5000${item.BookImg}`,
        }));
        setCartItems(normalizedCart);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        setCartItems([]); // Ensure cart is empty on a failed fetch
      }
    };

    fetchCart();
  }, [user, token]); // This effect re-runs whenever the user logs in or out

  // 4. All cart handlers are now async and call the backend API

  const handleAddToCart = async (product) => {
    if (!token) return alert("Please log in to add items to your cart.");
    try {
      // Call the backend to add the item
      await axios.post("http://localhost:5000/api/cart", { bookId: product.BookID }, { headers: { Authorization: `Bearer ${token}` } });
      // After adding, refetch the entire cart to ensure the UI is in sync
      const response = await axios.get("http://localhost:5000/api/cart", { headers: { Authorization: `Bearer ${token}` } });
      const normalizedCart = response.data.map((item) => ({ id: item.BookID, name: item.Title, price: Number(item.Price), quantity: item.Quantity, imageUrl: `http://localhost:5000${item.BookImg}` }));
      setCartItems(normalizedCart);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const handleUpdateQuantity = async (id, newQuantity) => {
    if (!token) return;
    try {
      await axios.put(`http://localhost:5000/api/cart/${id}`, { quantity: newQuantity }, { headers: { Authorization: `Bearer ${token}` } });
      const response = await axios.get("http://localhost:5000/api/cart", { headers: { Authorization: `Bearer ${token}` } });
      const normalizedCart = response.data.map((item) => ({ id: item.BookID, name: item.Title, price: Number(item.Price), quantity: item.Quantity, imageUrl: `http://localhost:5000${item.BookImg}` }));
      setCartItems(normalizedCart);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleRemoveItem = async (id) => {
    if (!token) return;
    try {
      await axios.delete(`http://localhost:5000/api/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await axios.get("http://localhost:5000/api/cart", { headers: { Authorization: `Bearer ${token}` } });
      const normalizedCart = response.data.map((item) => ({ id: item.BookID, name: item.Title, price: Number(item.Price), quantity: item.Quantity, imageUrl: `http://localhost:5000${item.BookImg}` }));
      setCartItems(normalizedCart);
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
          <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} />} />
          <Route path="*" element={<div className="p-10 text-center">404 - Page Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

// 5. The main App component now simply wraps AppContent in the provider
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
