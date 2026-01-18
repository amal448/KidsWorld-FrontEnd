'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { collectionProducts } from '../constants'; // Using mock data to hydrate/reference

export type CartItem = {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    color?: string;
};

type ShopContextType = {
    cartItems: CartItem[];
    wishlistItems: number[]; // Store Product IDs
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    toggleWishlist: (id: number) => void;
    clearCart: () => void;
    isInWishlist: (id: number) => boolean;
    getItemQuantity: (id: number) => number;
    cartTotal: number;
    cartCount: number;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [wishlistItems, setWishlistItems] = useState<number[]>([]);

    // Load from local storage on mount (client-side only)
    useEffect(() => {
        const storedCart = localStorage.getItem('cartItems');
        const storedWishlist = localStorage.getItem('wishlistItems');
        if (storedCart) setCartItems(JSON.parse(storedCart));
        if (storedWishlist) setWishlistItems(JSON.parse(storedWishlist));
    }, []);

    // Save to local storage whenever state changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

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

    const removeFromCart = (id: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const toggleWishlist = (id: number) => {
        setWishlistItems((prev) => {
            if (prev.includes(id)) {
                return prev.filter((itemId) => itemId !== id);
            }
            return [...prev, id];
        });
    };

    const isInWishlist = (id: number) => wishlistItems.includes(id);

    const getItemQuantity = (id: number) => {
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
                wishlistItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                toggleWishlist,
                clearCart,
                isInWishlist,
                getItemQuantity,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => {
    const context = useContext(ShopContext);
    if (!context) {
        throw new Error('useShop must be used within a ShopProvider');
    }
    return context;
};
