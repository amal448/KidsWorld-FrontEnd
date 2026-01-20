import Link from 'next/link';
import { categoryService } from '@/services/categoryService';
import Image from 'next/image';

const Collection = async () => {
    // 1. Fetch data directly on the server
    const products = await categoryService.getCategories();

    return (
        <section className="py-24 bg-slate-50 text-slate-900">
            <div className="main-container">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Collection</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Explore our wide range of toys designed to spark creativity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {products.map((item: any) => {
                        const imageUrl = item.image?.url && item.image.url.startsWith('http')
                            ? item.image.url
                            : "/images/placeholder.png";
                        return (
                            <div
                                key={item._id}
                                className="group relative h-[300px] rounded-3xl overflow-hidden cursor-pointer shadow-md"
                            >
                                {/* Background Image using your API data */}
                                <div className="absolute inset-0 w-full h-full bg-slate-200">
                                    {/* <img
                                src={item.image?.url ?? "/images/placeholder.png"}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                /> */}
                                    <Image
                                        src={imageUrl}
                                        alt={item.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        priority
                                    />
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                                    <h3 className="text-2xl font-black text-white uppercase drop-shadow-lg">
                                        {item.name}
                                    </h3>
                                    <p className="text-white/70 text-xs line-clamp-1 mt-1">
                                        {item.description}
                                    </p>
                                    <Link
                                        href={`/category/${item.slug}`}
                                        className="mt-4 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-sm opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        Explore Collection
                                    </Link>
                                </div>
                            </div>
                        )

                    })}
                </div>
            </div>
        </section>
    );
};

export default Collection;