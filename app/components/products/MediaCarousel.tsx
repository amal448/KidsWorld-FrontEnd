'use client';
import React, { useState } from 'react';
import Image from 'next/image';

type MediaItem = {
    type: 'image' | 'video' | string; // Relaxed type to match dummy data easier if string comes in
    src: string;
    thumbnail?: string;
};

const MediaCarousel = ({ items }: { items: MediaItem[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    const currentItem = items[currentIndex];

    return (
        <div className="flex flex-col gap-4">
            {/* Main Display */}
            <div className="relative aspect-[4/3] w-full max-h-[500px] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 group mx-auto">
                {currentItem.type === 'video' ? (
                    <video
                        src={currentItem.src}
                        controls
                        className="w-full h-full object-cover"
                        poster={currentItem.thumbnail}
                    />
                ) : (
                    <Image
                        src={currentItem.src}
                        alt="Product media"
                        fill
                        className="object-cover"
                    />
                )}

                {/* Arrows */}
                {items.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white shadow-lg transition opacity-0 group-hover:opacity-100 z-10 text-xl font-bold text-slate-800"
                        >
                            ←
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white shadow-lg transition opacity-0 group-hover:opacity-100 z-10 text-xl font-bold text-slate-800"
                        >
                            →
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {items.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 px-1">
                    {items.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${idx === currentIndex ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
                        >
                            {item.type === 'video' ? (
                                <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white relative">
                                    <span className="z-10 text-2xl">▶</span>
                                    {item.thumbnail && (
                                        <Image
                                            src={item.thumbnail}
                                            alt="Video thumbnail"
                                            fill
                                            className="object-cover opacity-60"
                                        />
                                    )}
                                </div>
                            ) : (
                                <Image
                                    src={item.src}
                                    alt="Thumbnail"
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MediaCarousel;
