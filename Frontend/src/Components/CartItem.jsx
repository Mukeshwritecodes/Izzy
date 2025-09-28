import React from "react";

/**
 * Component representing a single item row in the shopping cart.
 * It is structured to be responsive, stacking vertically on mobile
 * and expanding to a five-column grid on larger screens.
 * @param {object} props - Component props.
 * @param {object} props.item - The cart item data {id, name, price, quantity, imageUrl}.
 * @param {function} props.onUpdateQuantity - Function to update item quantity.
 * @param {function} props.onRemove - Function to remove the item.
 */
export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const { id, name, price, quantity, imageUrl } = item;
  const itemTotal = (price * quantity).toFixed(2); // Use toFixed(2) for currency

  return (
    // Responsive layout: stacks on mobile, grid on sm screens and up
    <div className="flex flex-col sm:grid sm:grid-cols-5 sm:items-center py-4 px-2 sm:px-0 text-[#1F1E3E] hover:bg-gray-50 transition-colors duration-150 border-b">
      {/* 1. Item Details (Image, Name, Remove Button on Mobile) */}
      <div className="sm:col-span-2 flex items-center space-x-4">
        {/* Book Image */}
        <img
          src={imageUrl}
          alt={name}
          className="w-16 h-20 object-cover rounded-sm shadow-sm flex-shrink-0"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://placehold.co/64x80/EEEEEE/AAAAAA?text=BOOK";
          }}
        />
        <div className="flex-grow flex flex-col justify-between self-stretch">
          <span className="text-base font-medium leading-tight break-words">{name}</span>
          {/* Unit Price (visible on mobile only) */}
          <span className="text-gray-600 sm:hidden">{`₹${price.toFixed(2)}`}</span>
        </div>
        {/* Remove Button (visible on mobile, top right) */}
        <button className="sm:hidden text-gray-500 hover:text-red-500 transition duration-150 p-1 self-start" onClick={() => onRemove(id)} aria-label="Remove item">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* 2. Price - Hidden on mobile, visible on sm and up */}
      <div className="hidden sm:block sm:col-span-1 text-center text-lg">{`₹${price.toFixed(2)}`}</div>

      {/* Mobile Layout for Quantity and Total (Flex container) */}
      <div className="flex justify-between items-center mt-4 sm:mt-0 sm:col-span-2">
        {/* 3. Quantity Controls with Mobile Label and Sizing */}
        <div className="flex flex-col sm:flex-row sm:justify-center items-start sm:items-center space-y-1 sm:space-y-0">
          {/* Mobile-only Label */}
          <span className="text-sm text-gray-600 sm:hidden">Quantity:</span>
          <div className="flex items-center border border-gray-400 rounded-md shadow-sm">
            {/* Minus Button */}
            <button className="p-1 sm:p-2 text-gray-700 hover:bg-gray-200 rounded-l-md transition duration-150 disabled:opacity-50" onClick={() => onUpdateQuantity(id, quantity - 1)} disabled={quantity <= 1} aria-label="Decrease quantity">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <rect x="3" y="9" width="14" height="2" rx="1" />
              </svg>
            </button>
            {/* Quantity Display */}
            <span className="text-sm sm:text-base px-3 sm:px-4 py-0 sm:py-1 border-x border-gray-400 font-semibold bg-white">{quantity}</span>
            {/* Plus Button */}
            <button className="p-1 sm:p-2 text-gray-700 hover:bg-gray-200 rounded-r-md transition duration-150" onClick={() => onUpdateQuantity(id, quantity + 1)} aria-label="Increase quantity">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* 4. Total Price and Remove Button (Desktop) */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 sm:pr-4">
          {/* Mobile-only Label */}
          <span className="text-sm text-gray-600 sm:hidden">Total:</span>
          <span className="font-semibold text-lg">{`₹${itemTotal}`}</span>
          {/* Remove Button (hidden on mobile) */}
          <button className="hidden sm:block text-gray-500 hover:text-red-500 transition duration-150 p-1" onClick={() => onRemove(id)} aria-label="Remove item">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
