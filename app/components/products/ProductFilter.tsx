'use client';
import React from 'react';

// 1. Updated Type Definitions to match backend query keys
type ProductFilterProps = {
    filters: {
        category: string;
        maxPrice: number; // Changed from priceRange to match backend
        color: string;
    };
    setFilters: React.Dispatch<React.SetStateAction<{
        category: string;
        maxPrice: number;
        color: string;
    }>>;
    // Categories should be objects since backend uses ObjectIds
    categories: { _id: string; name: string }[]; 
    colors: string[];
    defaultMaxPrice: number;
};

const ProductFilter = ({ 
    filters, 
    setFilters, 
    categories, 
    colors, 
    defaultMaxPrice 
}: ProductFilterProps) => {

    const handleCategoryChange = (categoryId: string) => {
        // If clicking the same category, clear it (toggle behavior)
        setFilters(prev => ({ 
            ...prev, 
            category: prev.category === categoryId ? '' : categoryId 
        }));
    };

    const handleColorChange = (color: string) => {
        setFilters(prev => ({ 
            ...prev, 
            color: prev.color === color ? '' : color 
        }));
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }));
    };

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold font-display mb-6">Filters</h3>

            {/* Category Filter */}
            <div className="mb-8">
                <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">Category</h4>
                <div className="flex flex-col gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat._id}
                            onClick={() => handleCategoryChange(cat._id)}
                            className={`text-left text-sm py-1 transition-all ${
                                filters.category === cat._id 
                                ? 'text-primary font-bold translate-x-1' 
                                : 'text-slate-500 hover:text-slate-900 hover:translate-x-1'
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Filter */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Max Price</h4>
                    <span className="text-primary font-bold">${filters.maxPrice}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max={defaultMaxPrice}
                    step="10"
                    value={filters.maxPrice}
                    onChange={handlePriceChange}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-2 uppercase">
                    <span>$0</span>
                    <span>${defaultMaxPrice}</span>
                </div>
            </div>

            {/* Color Filter */}
            <div className="mb-8">
                <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">Color</h4>
                <div className="flex flex-wrap gap-3">
                    {colors.map((color) => (
                        <button
                            key={color}
                            onClick={() => handleColorChange(color)}
                            className={`w-7 h-7 rounded-full border-2 transition-all relative ${
                                filters.color === color 
                                ? 'border-primary scale-110 shadow-md' 
                                : 'border-transparent hover:scale-110'
                            }`}
                            style={{ backgroundColor: color.toLowerCase() }}
                            title={color}
                        >
                            {/* Visual checkmark for selected color */}
                            {filters.color === color && (
                                <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white mix-blend-difference">
                                    ✓
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Clear Filter Button */}
            {(filters.category || filters.color || filters.maxPrice < defaultMaxPrice) && (
                <button
                    onClick={() => setFilters({ category: '', maxPrice: defaultMaxPrice, color: '' })}
                    className="w-full py-3 rounded-xl border border-red-100 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors"
                >
                    Reset All Filters
                </button>
            )}
        </div>
    );
};

export default ProductFilter;