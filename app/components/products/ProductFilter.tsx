'use client';
import React from 'react';

type ProductFilterProps = {
    filters: {
        category: string;
        priceRange: number;
        color: string;
    };
    setFilters: React.Dispatch<React.SetStateAction<{
        category: string;
        priceRange: number;
        color: string;
    }>>;
    categories: string[];
    colors: string[];
    maxPrice: number;
};

const ProductFilter = ({ filters, setFilters, categories, colors, maxPrice }: ProductFilterProps) => {

    const handleCategoryChange = (category: string) => {
        setFilters(prev => ({ ...prev, category: prev.category === category ? '' : category }));
    };

    const handleColorChange = (color: string) => {
        setFilters(prev => ({ ...prev, color: prev.color === color ? '' : color }));
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, priceRange: Number(e.target.value) }));
    };

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold font-display mb-6">Filters</h3>

            {/* Category Filter */}
            <div className="mb-8">
                <h4 className="font-bold text-slate-800 mb-3">Category</h4>
                <div className="space-y-2">
                    {categories.map((cat) => (
                        <div key={cat} className="flex items-center gap-2">
                            <button
                                onClick={() => handleCategoryChange(cat)}
                                className={`text-sm transition-colors ${filters.category === cat ? 'text-primary font-bold' : 'text-slate-600 hover:text-slate-900'}`}
                            >
                                {cat}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Price Filter */}
            <div className="mb-8">
                <h4 className="font-bold text-slate-800 mb-3">Max Price: ${filters.priceRange}</h4>
                <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={filters.priceRange}
                    onChange={handlePriceChange}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>$0</span>
                    <span>${maxPrice}</span>
                </div>
            </div>

            {/* Color Filter */}
            <div>
                <h4 className="font-bold text-slate-800 mb-3">Color</h4>
                <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                        <button
                            key={color}
                            onClick={() => handleColorChange(color)}
                            className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${filters.color === color ? 'border-primary ring-2 ring-primary/20' : 'border-slate-200'}`}
                            style={{ backgroundColor: color.toLowerCase() === 'multi' ? 'url(/images/multi-color.png)' : color.toLowerCase() }}
                            title={color}
                        >
                            {color.toLowerCase() === 'white' && <span className="sr-only">White</span>}
                            {/* Fallback visual for 'Multi' or complex colors if needed, CSS background-color handles simple ones */}
                            {color === 'Multi' && (
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-red-400 via-yellow-400 to-blue-400" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Clear Filter Button */}
            {(filters.category || filters.color || filters.priceRange < maxPrice) && (
                <button
                    onClick={() => setFilters({ category: '', priceRange: maxPrice, color: '' })}
                    className="mt-8 text-sm text-red-500 underline hover:text-red-700"
                >
                    Clear All Filters
                </button>
            )}
        </div>
    );
};

export default ProductFilter;
