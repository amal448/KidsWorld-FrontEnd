'use client';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { useShop } from '../../context/ShopContext';

type ProductProps = {
    product: {
        _id: string;
        name: string;
        price: number;
        images?: { url: string }[];
        category?: { name: string };
    };
};

// Wrap with 'memo' to prevent unnecessary re-renders when other products update
const ProductCard = memo(({ product }: ProductProps) => {
    const { addToCart } = useShop();
    const imageUrl = product.images?.[0]?.url ?? '/images/placeholder.png';

    return (
        <Link
            href={`/products/${product._id}`}
            className="group block bg-white rounded-3xl p-3 shadow-sm border border-slate-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
        >
            <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-100">
                <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy" // Standard for list items
                />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm text-xs font-bold">Quick View</span>
                </div>
            </div>

            <div className="px-2 pb-2">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1 opacity-70">
                    {product.category?.name || 'General'}
                </p>
                <h3 className="text-md font-bold text-slate-800 line-clamp-1 mb-2">
                    {product.name}
                </h3>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-slate-900">
                        ₹{product.price}
                    </span>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart({
                                id: product._id,
                                name: product.name,
                                price: product.price,
                                image: imageUrl,
                                quantity: 1,
                                color: '' // Optional based on CartItem type
                            });
                        }}
                        className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center hover:bg-primary transition-colors duration-300 shadow-lg shadow-slate-200 cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                </div>
            </div>
        </Link>
    );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;