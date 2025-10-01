import React from "react";
import { Link } from "react-router-dom";
// Corrected import paths to be absolute from the 'src' directory
import CartItem from "../Components/CartItem";
import CartSummary from "../Components/CartSummary";

/**
 * Main Cart Page component.
 */
export default function Cart({ cartItems = [], onUpdateQuantity, onRemoveItem }) {
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const salesTaxRate = 0.07; // Placeholder tax rate
  const salesTax = subtotal * salesTaxRate;
  const grandTotal = subtotal + salesTax;
  const totals = { subtotal, salesTax, grandTotal };

  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
            {/* Cart Title */}     {" "}
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-[#1F1E3E]">
                Your Cart ({totalItemCount} Item{totalItemCount !== 1 ? "s" : ""})      {" "}
      </h1>
            {/* Cart Header Row - Desktop */}     {" "}
      <div className="hidden sm:grid grid-cols-5 text-gray-500 border-b-2 border-gray-300 pb-2 mb-4">
                <span className="col-span-2 text-left">Item</span>        <span className="col-span-1 text-center">Price</span>        <span className="col-span-1 text-center">Quantity</span>        <span className="col-span-1 text-right pr-4">Total</span>     {" "}
      </div>
            {/* List of Cart Items */}      <div>        {cartItems.length > 0 ? cartItems.map((item) => <CartItem key={item.id} item={item} onUpdateQuantity={onUpdateQuantity} onRemove={onRemoveItem} />) : <p className="text-center text-gray-500 py-8">Your cart is empty.</p>}      </div>      {/* UPDATED SECTION: Cart Summary and Checkout Button */}     {" "}
      {cartItems.length > 0 && (
        <div className="flex flex-col items-center sm:items-end mt-4">
          {/* Cart Summary Component */}
                    <CartSummary totals={totals} />
          {/* "Proceed to Checkout" button that links to the checkout page */}         {" "}
          <Link to="/checkout" className="mt-4 w-full sm:w-auto text-center bg-[#1F1E3E] text-white font-semibold py-3 px-6 rounded-lg hover:bg-opacity-90 transition duration-200">
            Proceed to Checkout
          </Link>
                 {" "}
        </div>
      )}
         {" "}
    </div>
  );
}
