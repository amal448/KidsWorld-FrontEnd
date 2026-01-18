'use client';
import React, { useRef } from 'react';
import Link from 'next/link';

import { collectionProducts } from '../../constants';




const Collection = () => {
    return (
        <section className="py-24 bg-slate-50 text-slate-900">
            <div className="main-container">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">Our Collection</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Explore our wide range of toys designed to spark creativity and joy in every child.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {Array.from(new Set(collectionProducts.map(p => p.category))).map((category, index) => {
                        const product = collectionProducts.find(p => p.category === category);
                        const image = product?.image || '/images/product-placeholder.png';

                        return (
                            <div
                                key={category}
                                className="collection-item group relative h-[300px] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-500"
                            >
                                {/* Background Image with Zoom Effect */}
                                <div className="absolute inset-0 w-full h-full">
                                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform duration-700 ease-out">
                                        {/* Simple placeholder since we don't have real images yet, usually this would be an <img /> */}
                                        <span className="text-6xl">🧸</span>
                                    </div>
                                </div>

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors duration-500" />

                                {/* Content - Priority Text */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                                    <h3 className="text-4xl font-black text-white tracking-wide uppercase font-display transform group-hover:-translate-y-2 transition-transform duration-300 drop-shadow-lg">
                                        {category}
                                    </h3>
                                    <span className="mt-2 inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white/90 text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75 border border-white/30">
                                        Explore Collection
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-center mt-12">
                    <Link href="/shop">
                        <button className="btn-primary flex items-center gap-2">
                            Explore More
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Collection;
