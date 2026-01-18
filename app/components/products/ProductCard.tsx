'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type ProductProps = {
    product: {
        id: number;
        name: string;
        price: number;
        image: string;
        category: string;
        color: string;
    };
};

const ProductCard = ({ product }: ProductProps) => {
    return (
        <Link href={`/products/${product.id}`} className="group block bg-white rounded-3xl p-4 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-50">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-white transition-colors z-10" onClick={(e) => e.preventDefault()}>
                    ❤
                </button>
            </div>

            <div>
                <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">{product.category}</p>
                <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">{product.name}</h3>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-black text-secondary">${product.price}</span>
                    <button className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-secondary transition-colors text-lg font-bold">
                        +
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
