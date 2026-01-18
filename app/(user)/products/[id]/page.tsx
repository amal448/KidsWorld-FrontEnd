'use client';
import React from 'react';
import { notFound, useParams } from 'next/navigation';
import { collectionProducts } from '@/app/constants';
import MediaCarousel from '@/app/components/products/MediaCarousel';
import Link from 'next/link';

const ProductDetail = () => {
    // Using useParams hook for client-side parameter access
    const params = useParams();
    const productId = Number(params?.id);
    const product = collectionProducts.find((p) => p.id === productId);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <h1 className="text-4xl font-black text-slate-900 mb-4">Product Not Found</h1>
                <Link href="/products" className="btn-primary">Back to Products</Link>
            </div>
        );
    }

    // Prepare gallery items
    const galleryItems = product.gallery && product.gallery.length > 0
        ? product.gallery
        : [{ type: 'image', src: product.image }];

    return (
        <main className="min-h-screen bg-slate-50 py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-8">
                {/* Breadcrumb */}
                <div className="mb-8 text-sm text-slate-500">
                    <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
                    <span className="mx-2">&gt;</span>
                    <span className="text-slate-900 font-medium">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left Column: Media Carousel */}
                    <div>
                        <MediaCarousel items={galleryItems} />
                    </div>

                    {/* Right Column: Details */}
                    <div className="flex flex-col h-full justify-center">
                        <div className="mb-8">
                            <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                                {product.category}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 font-display mb-4 leading-tight">{product.name}</h1>
                            <div className="flex items-end gap-4 mb-8">
                                <p className="text-3xl md:text-4xl font-black text-secondary">${product.price}</p>
                                {product.price > 50 && (
                                    <span className="text-lg text-slate-400 line-through mb-1">${(product.price * 1.2).toFixed(2)}</span>
                                )}
                            </div>
                            <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                {product.description || "No description available for this product."}
                            </p>
                        </div>

                        {/* Specs */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="p-4 bg-white rounded-2xl border border-slate-100 flex flex-col">
                                <span className="text-xs text-slate-400 uppercase tracking-widest mb-1">Color</span>
                                <span className="font-bold text-slate-800 text-lg">{product.color || "N/A"}</span>
                            </div>
                            <div className="p-4 bg-white rounded-2xl border border-slate-100 flex flex-col">
                                <span className="text-xs text-slate-400 uppercase tracking-widest mb-1">Age</span>
                                <span className="font-bold text-slate-800 text-lg">3+ Years</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 mb-10">
                            <button className="flex-1 btn-primary py-4 text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all">
                                Add to Cart
                            </button>
                            <button className="w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-2xl border-2 border-slate-200 text-slate-400 hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-sm text-slate-500 pt-8 border-t border-slate-200">
                            <span className="flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">🚚</span>
                                Free Shipping
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">🛡️</span>
                                1 Year Warranty
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">↺</span>
                                30 Day Returns
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetail;