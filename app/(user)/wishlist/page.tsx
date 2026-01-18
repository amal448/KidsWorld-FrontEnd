'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useShop } from '../../context/ShopContext';
import { collectionProducts } from '../../constants';

const Wishlist = () => {
    const { wishlistItems, toggleWishlist, addToCart } = useShop();

    // Rehydrate products from IDs
    const items = collectionProducts.filter(p => wishlistItems.includes(p.id));

    if (items.length === 0) {
        return (
            <main className="min-h-screen bg-slate-50 py-24 md:py-32 flex flex-col items-center justify-center text-center px-4">
                <div className="w-24 h-24 bg-pink-100 theme-pink text-pink-500 rounded-full flex items-center justify-center text-4xl mb-6">💖</div>
                <h1 className="text-3xl font-black text-slate-900 mb-2">Your Wishlist is Empty</h1>
                <p className="text-slate-500 mb-8 max-w-md">Save items you love here for later.</p>
                <Link href="/products" className="btn-primary">
                    Start Browsing
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-8">
                <h1 className="text-4xl font-black text-slate-900 font-display mb-8">My Wishlist ({items.length})</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map(product => (
                        <div key={product.id} className="group bg-white rounded-3xl p-4 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 relative">
                            <button
                                onClick={() => toggleWishlist(product.id)}
                                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white text-pink-500 hover:bg-pink-50 flex items-center justify-center shadow-md transition-colors"
                            >
                                ✕
                            </button>

                            <Link href={`/products/${product.id}`}>
                                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-50">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                            </Link>

                            <div>
                                <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">{product.category}</p>
                                <h3 className="text-lg font-bold text-slate-900 mb-2 font-display truncate">{product.name}</h3>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-xl font-black text-secondary">${product.price}</span>
                                    <button
                                        onClick={() => addToCart({ ...product, quantity: 1 } as any)}
                                        className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-secondary transition-colors"
                                    >
                                        Move to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Wishlist;
