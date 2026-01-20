'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CartItem = {
    id: string; // Unified to string for MongoDB
    name: string;
    price: number;
    image: string;
    quantity: number;
    color?: string;
};

type ShopContextType = {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void; // Changed to string
    updateQuantity: (id: string, quantity: number) => void; // Changed to string
    clearCart: () => void;
    getItemQuantity: (id: string) => number; // Changed to string
    cartTotal: number;
    cartCount: number;
    isHydrated: boolean; // Standard for Next.js localStorage
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // 1. Load from local storage (Hydration)
    useEffect(() => {
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) setCartItems(JSON.parse(storedCart));
        setIsHydrated(true); // Signal that client state is ready
    }, []);

    // 2. Save to local storage (Only after hydration to prevent overwriting with empty arrays)
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems, isHydrated]);


    const addToCart = (item: CartItem) => {
        setCartItems((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    const clearCart = () => setCartItems([]);


    const getItemQuantity = (id: string) => {
        return cartItems.find((item) => item.id === id)?.quantity || 0;
    };

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <ShopContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getItemQuantity,
                cartTotal,
                cartCount,
                isHydrated
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => {
    const context = useContext(ShopContext);
    if (!context) throw new Error('useShop must be used within a ShopProvider');
    return context;
};