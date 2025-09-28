import React from 'react';
import CartItem from '../components/CartItem'; 
import CartSummary from '../components/CartSummary'; 

// --- IMPORT YOUR IMAGES ---
// Note: We are using the capitalized paths you provided (Assets/Images)
import ikigaiImg from '../Assets/Images/Ikigai.png';
import itEndsWithUsImg from '../Assets/Images/ItEndsWithUs.png';
import veiledInSmokeImg from '../Assets/Images/VeiledInSmoke.png';
import reachedSamImg from '../Assets/Images/You\'veReachedSam.png';


// Mock data with multiple books
const mockCartItems = [
    { 
        id: 1, 
        name: "Ikigai: The Japanese Secret", 
        price: 299, 
        quantity: 2, 
        imageUrl: ikigaiImg 
    },
    { 
        id: 2, 
        name: "It Ends With Us", 
        price: 350, 
        quantity: 1, 
        imageUrl: itEndsWithUsImg 
    },
    { 
        id: 3, 
        name: "You've Reached Sam", 
        price: 420, 
        quantity: 1, 
        imageUrl: reachedSamImg
    },
    { 
        id: 4, 
        name: "Veiled in Smoke", 
        price: 380, 
        quantity: 1, 
        imageUrl: veiledInSmokeImg
    },
];

/**
 * Main Cart Page component displaying the list of items and the summary.
 */
export default function Cart() {
    const [cartItems, setCartItems] = React.useState(mockCartItems);

    const handleUpdateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prevItems => 
            prevItems.map(item => 
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    // Calculate totals based on current items
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const salesTaxRate = 0.07; 
    const salesTax = Math.round(subtotal * salesTaxRate);
    const grandTotal = subtotal + salesTax;

    const totals = { subtotal, salesTax, grandTotal };

    return (
        <div className="container mx-auto max-w-5xl px-4 py-8">
            
            {/* Cart Title (matching design image) */}
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-[#1F1E3E]">
                Your Cart ({cartItems.length} Item{cartItems.length !== 1 ? 's' : ''})
            </h1>

            {/* Cart Header Row - Matches the design structure */}
            <div className="hidden sm:grid grid-cols-5 font-semibold text-lg md:text-xl text-gray-500 border-b-2 border-gray-400 pb-2">
                <span className="col-span-2 text-left">Item</span>
                <span className="col-span-1 text-center">Price</span>
                <span className="col-span-1 text-center">Quantity</span>
                <span className="col-span-1 text-right pr-4">Total</span> 
            </div>
            
            <div className="grid sm:grid-cols-5 font-semibold text-lg md:text-xl text-gray-500 border-b-2 border-gray-400 pb-2 sm:hidden">
                <span className="col-span-2 text-left">Item</span>
                <span className="col-span-1 text-center">Price</span>
                <span className="col-span-1 text-center">Quantity</span>
                <span className="col-span-1 text-right pr-4">Total</span> 
            </div>

            {/* List of Cart Items */}
            <div className="divide-y divide-gray-200">
                {cartItems.map(item => (
                    <CartItem 
                        key={item.id} 
                        item={item} 
                        onUpdateQuantity={handleUpdateQuantity} 
                        onRemove={handleRemoveItem} 
                    />
                ))}
            </div>

            {/* Separator line before the summary totals, matching the design */}
            <div className="w-full h-px bg-gray-400 my-4"></div>

            {/* Cart Summary - Aligned to the right, constrained width */}
            <div className="flex justify-end">
                 <CartSummary totals={totals} />
            </div>
           
        </div>
    );
}
