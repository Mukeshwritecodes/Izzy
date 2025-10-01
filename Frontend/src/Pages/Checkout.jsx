import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function CheckoutPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch user's profile data to pre-fill the form
  useEffect(() => {
    if (user) {
      // Check for both casings to be safe
      setShippingAddress(user.Address || user.address || "");
      setBillingAddress(user.Address || user.address || "");
      setPhoneNumber(user.PhoneNo || user.phoneNo || "");
    }
  }, [user]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!shippingAddress || !paymentMethod) {
      setError("Shipping address and payment method are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await axios.post("http://localhost:5000/api/orders", { shippingAddress, paymentMethod }, { headers: { Authorization: `Bearer ${token}` } });
      alert("Order placed successfully!");
      // TODO: In the next step, you might want to clear the cart in the App state
      navigate("/orders"); // Redirect to a "My Orders" page
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen py-12 px-4 flex justify-center items-start">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Checkout</h1>
        <form onSubmit={handlePlaceOrder} className="space-y-6">
          {/* Shipping Address */}
          <div>
            <label htmlFor="shippingAddress" className="block text-md font-medium text-gray-700">
              Shipping Address:
            </label>
            <textarea id="shippingAddress" rows="3" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
          </div>

          {/* Billing Address */}
          <div>
            <label htmlFor="billingAddress" className="block text-md font-medium text-gray-700">
              Billing Address:
            </label>
            <textarea id="billingAddress" rows="3" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-md font-medium text-gray-700">
              Phone Number:
            </label>
            <input type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>

          {/* Payment Method */}
          <fieldset>
            <legend className="text-lg font-medium text-gray-900">Choose payment method</legend>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <input id="credit-card" name="payment-method" type="radio" value="Credit Card" onChange={(e) => setPaymentMethod(e.target.value)} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
                  Credit card
                </label>
              </div>
              <div className="flex items-center">
                <input id="upi" name="payment-method" type="radio" value="UPI" onChange={(e) => setPaymentMethod(e.target.value)} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                <label htmlFor="upi" className="ml-3 block text-sm font-medium text-gray-700">
                  UPI
                </label>
              </div>
              <div className="flex items-center">
                <input id="cod" name="payment-method" type="radio" value="Cash on Delivery" onChange={(e) => setPaymentMethod(e.target.value)} defaultChecked className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">
                  Cash on Delivery
                </label>
              </div>
            </div>
          </fieldset>

          {error && <p className="text-sm text-red-600">{error}</p>}

          {/* Submit Button */}
          <div className="pt-4">
            <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1F1E3E] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
              {loading ? "Placing Order..." : "Save and Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
