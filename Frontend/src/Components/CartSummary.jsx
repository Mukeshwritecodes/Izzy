import React from 'react';

/**
 * Component displaying the order summary and checkout button.
 * It uses the dark navy blue color (#1F1E3E) for the background 
 * and is styled to match the thin line separators in the design.
 * * @param {object} props - Component props.
 * @param {object} props.totals - Object containing subtotal, salesTax, and grandTotal.
 */
export default function CartSummary({ totals }) {
    const { subtotal, salesTax, grandTotal } = totals;

    /**
     * Helper component for rendering each financial row (Subtotal, Tax, Total).
     */
    const TotalRow = ({ label, value, isGrandTotal = false }) => (
        <div className={`flex justify-between py-1 text-[#1F1E3E] ${isGrandTotal ? 'font-bold text-xl mt-2' : 'text-lg'}`}>
            <span className="mr-4">{label}:</span>
            {/* The line separator from the design is created using a styled span */}
            <span className={`inline-block border-b border-gray-500 px-1 w-20 text-right ${isGrandTotal ? 'border-gray-800 font-extrabold' : 'border-gray-500'}`}>
                ${value}
            </span>
        </div>
    );

    return (
        <div className="flex flex-col w-full max-w-sm">
            
            <TotalRow label="Subtotal" value={subtotal} />
            <TotalRow label="Sales Tax" value={salesTax} />
            
            {/* Grand Total Row */}
            <TotalRow label="Grand Total" value={grandTotal} isGrandTotal={true} />
            
            {/* Checkout Button - Dark Navy Blue (#1F1E3E) and oval-shaped */}
            <button 
                className="mt-8 bg-[#1F1E3E] hover:bg-indigo-900 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 tracking-wider uppercase focus:outline-none focus:ring-4 focus:ring-indigo-300"
                onClick={() => console.log("Proceeding to Checkout...")}
            >
                Check Out
            </button>
        </div>
    );
}
