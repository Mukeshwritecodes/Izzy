import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios"; // Use the central API instance
import { useAuth } from "../context/AuthContext";
import jsPDF from "jspdf";

export default function UserOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setError("You must be logged in to view your orders.");
        setLoading(false);
        return;
      }
      try {
        // 1. SIMPLIFIED API CALL: The auth token is now added automatically by the axios interceptor.
        // No need for a separate headers object.
        const response = await api.get("/api/orders");

        const sanitizedOrders = response.data.map((order) => ({
          ...order,
          total: Number(order.total),
          items: order.items.map((item) => ({
            ...item,
            subtotal: Number(item.subtotal),
          })),
        }));

        setOrders(sanitizedOrders);
      } catch (err) {
        setError("Failed to fetch your orders.");
        console.error("Order fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const downloadInvoice = (order) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Invoice", 105, 20, null, null, "center");

    doc.setFontSize(12);
    doc.text(`Order ID: ${order.id}`, 20, 40);
    doc.text(`Order Date: ${new Date(order.date).toLocaleDateString()}`, 20, 50);
    doc.text(`Customer: ${user.Name || user.name}`, 20, 60);

    doc.setFontSize(14);
    doc.text("Items", 105, 80, null, null, "center");
    doc.line(20, 85, 190, 85);
    doc.setFontSize(10);
    doc.text("Book Title", 20, 92);
    doc.text("Qty", 140, 92);
    doc.text("Subtotal", 170, 92);
    doc.line(20, 95, 190, 95);

    let yPosition = 102;
    order.items.forEach((item) => {
      doc.text(item.title, 20, yPosition);
      doc.text(String(item.quantity), 140, yPosition);
      doc.text(`Rs. ${item.subtotal.toFixed(2)}`, 170, yPosition);
      yPosition += 7;
    });

    doc.line(20, yPosition + 5, 190, yPosition + 5);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Total Amount:", 140, yPosition + 12);
    doc.text(`Rs. ${order.total.toFixed(2)}`, 170, yPosition + 12);

    doc.save(`invoice_order_${order.id}.pdf`);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-32 sm:w-48 bg-[#E2C6DA] text-white flex flex-col justify-between p-6">
        <nav className="flex flex-col gap-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/profile" className="hover:underline">
            My Profile
          </Link>
          <Link to="/orders" className="underline font-semibold">
            My Orders
          </Link>
        </nav>
        <div className="text-left">
          <button onClick={handleLogout} className="text-sm hover:underline">
            ← Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 bg-white">
        <h2 className="text-2xl font-semibold text-[#5D3D6A] text-center sm:text-left mb-6">My Orders</h2>

        {loading && <p>Loading your orders...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="space-y-6">
          {!loading && !error && orders.length === 0 && <p className="text-gray-500">You have not placed any orders yet.</p>}

          {orders.map((order) => (
            <div key={order.id} className="p-4  shadow-sm">
              <div className="flex justify-between items-center mb-4 pb-2 border-b">
                <div>
                  <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-bold text-lg">₹{order.total.toFixed(2)}</p>
                </div>
              </div>

              {order.items.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-4 border-b last:border-b-0">
                  {/* 2. DYNAMIC IMAGE URL: Use the base URL from the api object. */}
                  <img src={`${api.defaults.baseURL}${item.imageUrl}`} alt={item.title} className="w-20 h-28 sm:w-24 sm:h-32 object-cover rounded" />
                  <div className="flex-1 flex flex-col sm:flex-row items-center justify-between w-full text-center sm:text-left">
                    <div>
                      <h3 className="text-lg font-semibold text-[#1F1E3E]">{item.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{item.author}</p>
                      <p className="text-sm text-gray-400 mt-2">Qty: {item.quantity}</p>
                      <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                        <button onClick={() => downloadInvoice(order)} className="bg-[#1F1E3E] text-white px-5 py-3 rounded-full text-sm hover:cursor-pointer">
                          Download Invoice
                        </button>
                        <button className="border border-[#1F1E3E] text-[#1F1E3E] px-5 py-3 rounded-full text-sm hover:cursor-pointer">Track Order</button>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 text-left sm:text-right">
                      <div className="text-sm text-gray-500">Expected Delivery</div>
                      <div className="text-sm text-[#1F1E3E] font-medium">12 - Oct / Saturday</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
