import React from 'react';
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'; // Using Heroicons for standard UI

/**
 * Component representing a single item row in the shopping cart.
 * It is structured to align with the five-column grid defined in Cart.jsx.
 * * @param {object} props - Component props.
 * @param {object} props.item - The cart item data {id, name, price, quantity, imageUrl}.
 * @param {function} props.onUpdateQuantity - Function to update item quantity.
 * @param {function} props.onRemove - Function to remove the item.
 */
export default function CartItem({ item, onUpdateQuantity, onRemove }) {
    const { id, name, price, quantity, imageUrl } = item;
    const itemTotal = price * quantity;

    return (
        // Grid layout matching the 5 column headers in Cart.jsx
        <div className="grid grid-cols-5 items-center py-4 text-[#1F1E3E] hover:bg-gray-50 transition-colors duration-150">
            
            {/* 1. Item Details (Image and Name) - Col 1-2 */}
            <div className="col-span-2 flex items-center space-x-4">
                {/* Book Image (small, rounded, like the design) */}
                <img 
                    src={imageUrl} 
                    alt={name} 
                    className="w-16 h-20 object-cover rounded-sm shadow-sm flex-shrink-0"
                    // Placeholder fallback if image fails to load
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/64x80/EEEEEE/AAAAAA?text=BOOK" }} 
                />
                <span className="font-medium text-base sm:text-lg">{name}</span>
            </div>

            {/* 2. Price - Col 3 (Centered) */}
            <div className="col-span-1 text-center text-base sm:text-lg">
                ${price}
            </div>

            {/* 3. Quantity Controls - Col 4 (Centered) */}
            <div className="col-span-1 flex justify-center items-center">
                <div className="flex items-center border border-gray-400 rounded-md text-sm shadow-sm">
                    {/* Minus Button */}
                    <button 
                        className="p-1 text-gray-700 hover:bg-gray-200 rounded-l-md transition duration-150 disabled:opacity-50"
                        onClick={() => onUpdateQuantity(id, quantity - 1)}
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                    >
                        <MinusIcon className="h-4 w-4" />
                    </button>
                    
                    {/* Quantity Display */}
                    <span className="px-3 border-x border-gray-400 font-semibold bg-white">{quantity}</span>
                    
                    {/* Plus Button */}
                    <button 
                        className="p-1 text-gray-700 hover:bg-gray-200 rounded-r-md transition duration-150"
                        onClick={() => onUpdateQuantity(id, quantity + 1)}
                        aria-label="Increase quantity"
                    >
                        <PlusIcon className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* 4. Total Price and Remove Button - Col 5 (Right Aligned) */}
            <div className="col-span-1 flex justify-end items-center space-x-3 pr-4">
                <span className="font-semibold text-lg text-right">${itemTotal}</span>
                {/* Remove Button (small X) */}
                <button 
                    className="text-gray-500 hover:text-red-500 transition duration-150 p-1"
                    onClick={() => onRemove(id)}
                    aria-label="Remove item"
                >
                    <XMarkIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}
