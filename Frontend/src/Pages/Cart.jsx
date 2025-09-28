import React from "react";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

// --- IMPORT YOUR IMAGES ---
import ikigaiImg from "../Assets/Images/Ikigai.png";
import itEndsWithUsImg from "../Assets/Images/ItEndsWithUs.png";
import veiledInSmokeImg from "../Assets/Images/VeiledInSmoke.png";
import reachedSamImg from "../Assets/Images/You'veReachedSam.png";

// Mock data with multiple books
const mockCartItems = [
  {
    id: 1,
    name: "Ikigai: The Japanese Secret",
    price: 299,
    quantity: 2,
    imageUrl: ikigaiImg,
  },
  {
    id: 2,
    name: "It Ends With Us",
    price: 350,
    quantity: 1,
    imageUrl: itEndsWithUsImg,
  },
  {
    id: 3,
    name: "You've Reached Sam",
    price: 420,
    quantity: 1,
    imageUrl: reachedSamImg,
  },
  {
    id: 4,
    name: "Veiled in Smoke",
    price: 380,
    quantity: 1,
    imageUrl: veiledInSmokeImg,
  },
];

/**
 * Main Cart Page component displaying the list of items and the summary.
 */
export default function Cart() {
  const [cartItems, setCartItems] = React.useState(mockCartItems);

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate totals based on current items
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // Note: In India, GST is more common than Sales Tax. Using a placeholder rate.
  // For a real app, you would calculate GST (e.g., 5% or 12% on books).
  const salesTaxRate = 0.07;
  const salesTax = subtotal * salesTaxRate; // Keep decimals for accuracy in summary
  const grandTotal = subtotal + salesTax;

  const totals = { subtotal, salesTax, grandTotal };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      {/* Cart Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-[#1F1E3E]">
        Your Cart ({cartItems.length} Item{cartItems.length !== 1 ? "s" : ""})
      </h1>

      {/* Cart Header Row - HIDDEN ON MOBILE, visible on sm screens and up */}
      <div className="hidden sm:grid grid-cols-5 text-gray-500 border-b-2 border-gray-300 pb-2 mb-4">
        <span className="col-span-2 text-left">Item</span>
        <span className="col-span-1 text-center">Price</span>
        <span className="col-span-1 text-center">Quantity</span>
        <span className="col-span-1 text-right pr-4">Total</span>
      </div>

      {/* List of Cart Items - Removed the `divide-y` class */}
      <div>{cartItems.length > 0 ? cartItems.map((item) => <CartItem key={item.id} item={item} onUpdateQuantity={handleUpdateQuantity} onRemove={handleRemoveItem} />) : <p className="text-center text-gray-500 py-8">Your cart is empty.</p>}</div>

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <div className="flex justify-center sm:justify-end mt-4">
          <CartSummary totals={totals} />
        </div>
      )}
    </div>
  );
}
