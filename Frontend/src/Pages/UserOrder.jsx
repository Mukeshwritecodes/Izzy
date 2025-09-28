import React from "react";
import Book1 from "../Assets/Images/Book1.png";
import Book2 from "../Assets/Images/Book2.png";
export default function UserOrder() {
  const orders = [
    {
      id: 1,
      title: "Book Name",
      author: "By Author",
      qty: 1,
      eta: "12 - Aug / Tuesday",
    },
    {
      id: 2,
      title: "Book Name",
      author: "By Author",
      qty: 1,
      eta: "12 - Aug / Tuesday",
    },
    {
      id: 3,
      title: "Book Name",
      author: "By Author",
      qty: 1,
      eta: "12 - Aug / Tuesday",
    },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left sidebar */}
      <aside className="w-32 sm:w-48 bg-[#E2C6DA] text-[#1F1E3E] flex flex-col justify-between p-6">
        <nav className="flex flex-col gap-6">
          <a href="/" className="text-white/90">
            Home
          </a>
          <a href="/profile" className="text-[#ffffff]">
            My Profile
          </a>
          <a href="/orders" className="underline font-semibold text-[#ffffff]">
            My Orders
          </a>
        </nav>

        <div className="text-left">
          <button className="text-sm text-white/90">← Log out</button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-white">
        <h2 className="text-2xl font-semibold text-[#5D3D6A] text-center sm:text-left mb-6">My Orders</h2>

        <div className="space-y-6">
          {orders.map((o) => (
            <div key={o.id} className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-4 border-b">
              {/* Cover */}
              <img src={Book1} alt="cover" className="w-20 h-28 sm:w-24 sm:h-32 object-cover rounded" />

              {/* Details + ETA */}
              <div className="flex-1 flex flex-col sm:flex-row items-center justify-between w-full text-center sm:text-left">
                {/* Book details */}
                <div>
                  <h3 className="text-lg font-semibold text-[#1F1E3E]">{o.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{o.author}</p>
                  <p className="text-sm text-gray-400 mt-2">Qty: {o.qty}</p>

                  {/* Buttons */}
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                    <button className="bg-[#1F1E3E] text-white px-5 py-3 rounded-full text-sm">Download Invoice</button>
                    <button className="border border-[#1F1E3E] text-[#1F1E3E] px-5 py-3 rounded-full text-sm">Track Order</button>
                  </div>
                </div>

                {/* ETA */}
                <div className="mt-4 sm:mt-0 text-left sm:text-right">
                  <div className="text-sm text-gray-500">Expected Delivery</div>
                  <div className="text-sm text-[#1F1E3E] font-medium">{o.eta}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
