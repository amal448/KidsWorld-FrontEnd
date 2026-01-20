import { productService } from '@/services/productService';
import MediaCarousel from '@/app/components/products/MediaCarousel';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/app/components/AddToCartButton';
interface Props {
    params: Promise<{ id: string }>;
}

// 1. This is a Server Component (No 'use client')
export default async function ProductDetailPage({ params }: Props) {
    const { id } = await params;

    // 2. Fetch data directly on the server
    const product = await productService.getProductById(id);

    // 3. Handle 404
    if (!product) {
        notFound();
    }

    const galleryItems = product.images?.map((img: any) => ({
        type: 'image',
        src: img.url
    })) || [];

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
                    {/* MediaCarousel is a Client Component imported here */}
                    <div>
                        <MediaCarousel items={galleryItems} />
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="mb-8">
                            <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                                {product.category?.name}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
                                {product.name}
                            </h1>
                            <p className="text-2xl md:text-3xl font-black text-secondary mb-6">
                                ₹{product.price}
                            </p>
                            <p className="text-slate-600 text-base leading-relaxed mb-8">
                                {product.description}
                            </p>
                        </div>

                        {/* Specs from Map */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {product.specifications && Object.entries(product.specifications).map(([key, value]: any) => (
                                <div key={key} className="p-4 bg-white rounded-2xl border border-slate-100 flex flex-col">
                                    <span className="text-xs text-slate-400 uppercase tracking-widest mb-1">{key}</span>
                                    <span className="font-bold text-slate-800 text-lg">{value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Buttons (These can trigger Client Actions) */}
                        <div className="flex gap-4">
                            <AddToCartButton product={{
                                id: product._id,
                                name: product.name,
                                price: product.price,
                                image: product.images?.[0]?.url || '/images/placeholder.png'
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}