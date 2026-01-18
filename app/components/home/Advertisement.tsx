'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';
import { popularToys, lovedToys } from '../../constants';

// Register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

const Advertisement = () => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const parallaxTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#advertisement',
                start: 'top 60%',
                end: 'bottom 80%',
                scrub: true
            }
        });

        parallaxTimeline
            .from('#adv-left-kid', {
                x: -100, y: 100, opacity: 0, ease: "none"
            }, 0)
            .from('#adv-right-kid', {
                x: 100, y: 100, opacity: 0, ease: "none"
            }, 0);

    }, { scope: containerRef });

    return (
        <section id='advertisement' ref={containerRef} className='relative py-24 overflow-hidden bg-yellow-50/50'>
            {/* Decorative Images */}
            <img
                src="/images/kids-playing-left.png"
                alt="Kid playing with blocks"
                id="adv-left-kid"
                className="absolute top-0 left-0 w-48 md:w-64 opacity-0 pointer-events-none select-none"
            />
            <img
                src="/images/kids-playing-right.png"
                alt="Kid flying kite"
                id="adv-right-kid"
                className="absolute bottom-0 right-0 w-48 md:w-64 opacity-0 pointer-events-none select-none"
            />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24'>

                    {/* Popular Toys List */}
                    <div className="popular">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-10 flex items-center gap-3">
                            <span className="text-4xl">🔥</span> Most Popular Toys
                        </h2>

                        <ul className="space-y-8">
                            {popularToys.map(({ name, category, detail, price }) => (
                                <li key={name} className="flex justify-between items-start group">
                                    <div className='md:me-10 flex-1 border-b border-dashed border-slate-300 pb-2'>
                                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors">{name}</h3>
                                        <p className="text-slate-500 text-sm mt-1 font-medium italic">
                                            {category} | {detail}
                                        </p>
                                    </div>
                                    <span className="font-black text-secondary text-xl whitespace-nowrap ps-4">{price}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Loved Toys List */}
                    <div className="loved">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-10 text-right md:text-left flex items-center justify-end md:justify-start gap-3">
                            Most Loved Toys <span className="text-4xl">❤️</span>
                        </h2>

                        <ul className="space-y-8">
                            {lovedToys.map(({ name, category, detail, price }) => (
                                <li key={name} className="flex justify-between items-start group">
                                    <div className='md:me-10 flex-1 border-b border-dashed border-slate-300 pb-2 text-right md:text-left order-2 md:order-1'>
                                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-secondary transition-colors">{name}</h3>
                                        <p className="text-slate-500 text-sm mt-1 font-medium italic">
                                            {category} | {detail}
                                        </p>
                                    </div>
                                    <span className="font-black text-primary text-xl whitespace-nowrap pe-4 md:pe-0 md:ps-4 order-1 md:order-2">{price}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Advertisement;