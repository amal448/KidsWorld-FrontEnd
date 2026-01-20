'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
import ProductFilter from '../../components/products/ProductFilter';
import { categoryService } from '@/services/categoryService';
import ProductCard from '../../components/products/ProductCard';
import { productService } from '@/services/productService';

// Move static data outside to prevent re-creation on every render
const COLORS = ["Red", "Blue", "Green", "Yellow", "Pink", "Multi"];

const Products = () => {
    const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false); // New state for subtle updates

    const [filters, setFilters] = useState({
        category: '',
        color: '',
        maxPrice: 5000,
    });

    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Fetch Categories once
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await categoryService.getCategories();
                setCategories(data);
            } catch (err) {
                console.error("Failed to load categories", err);
            }
        };
        loadCategories();
    }, []);

    // Debounce timer
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedFilters(filters), 400);
        return () => clearTimeout(timer);
    }, [filters]);

    // Fetch Products
    useEffect(() => {
        const fetchProducts = async () => {
            // Only show full skeleton if we have no products yet
            if (products.length === 0) setLoading(true);
            else setIsRefreshing(true); // Otherwise, just show a subtle "refreshing" state

            try {
                const data = await productService.getProducts(debouncedFilters);
                setProducts(data);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
                setIsRefreshing(false);
            }
        };

        fetchProducts();
    }, [debouncedFilters]);

    return (
        <main className="min-h-screen bg-slate-50 py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-8">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">Shop All Toys</h1>
                    <p className="text-slate-500 text-lg">Find the perfect gift for every age and interest.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                    <aside className="w-full md:w-64 lg:w-72 shrink-0">
                        <div className="sticky top-24">
                            <ProductFilter
                                filters={filters}
                                setFilters={setFilters}
                                categories={categories}
                                colors={COLORS}
                                defaultMaxPrice={5000}
                            />
                        </div>
                    </aside>

                    <div className={`flex-1 transition-opacity duration-300 ${isRefreshing ? 'opacity-50' : 'opacity-100'}`}>
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, n) => (
                                    <div key={n} className="h-[400px] bg-white rounded-3xl animate-pulse border border-slate-100" />
                                ))}
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 border-dashed text-center">
                                <span className="text-5xl mb-4">🧸</span>
                                <h3 className="text-xl font-bold text-slate-900">No toys found here!</h3>
                                <p className="text-slate-500">Try adjusting your filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};
export default Products;