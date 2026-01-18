'use client';
import React, { useState, useMemo } from 'react';
import { collectionProducts } from '../../constants';
import ProductFilter from '../../components/products/ProductFilter';
import ProductCard from '../../components/products/ProductCard';

const Products = () => {
    // Determine unique values for filters from data
    const categories = Array.from(new Set(collectionProducts.map(p => p.category)));
    const colors = Array.from(new Set(collectionProducts.map(p => p.color))).filter(Boolean) as string[];
    const maxPrice = Math.ceil(Math.max(...collectionProducts.map(p => p.price)));

    const [filters, setFilters] = useState({
        category: '',
        priceRange: maxPrice,
        color: '',
    });

    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const filteredProducts = useMemo(() => {
        return collectionProducts.filter(product => {
            const matchesCategory = filters.category ? product.category === filters.category : true;
            const matchesPrice = product.price <= filters.priceRange;
            const matchesColor = filters.color ? product.color === filters.color : true;

            return matchesCategory && matchesPrice && matchesColor;
        });
    }, [filters]);

    return (
        <main className="min-h-screen bg-slate-50 py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 font-display mb-2">Shop All Toys</h1>
                        <p className="text-slate-500 text-lg">Find the perfect gift for every age and interest.</p>
                    </div>

                    {/* Mobile Filter Toggle */}
                    <button
                        className="md:hidden flex items-center justify-center gap-2 bg-white px-4 py-3 rounded-xl border border-slate-200 font-bold text-slate-700 shadow-sm"
                        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                        Filters
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                    {/* Sidebar Filters - Desktop */}
                    <aside className={`w-full md:w-64 lg:w-72 flex-shrink-0 ${isMobileFilterOpen ? 'block' : 'hidden md:block'}`}>
                        <div className="sticky top-24">
                            <ProductFilter
                                filters={filters}
                                setFilters={setFilters}
                                categories={categories}
                                colors={colors}
                                maxPrice={maxPrice}
                            />
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 border-dashed">
                                <span className="text-6xl mb-4">🔍</span>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">No products found</h3>
                                <p className="text-slate-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
                                <button
                                    onClick={() => setFilters({ category: '', priceRange: maxPrice, color: '' })}
                                    className="btn-primary"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Products;