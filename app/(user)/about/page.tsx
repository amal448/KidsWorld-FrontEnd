'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const About = () => {
    const values = [
        {
            icon: "🛡️",
            title: "Safety First",
            description: "We strictly adhere to global safety standards. Every toy is tested to ensure it's safe for your little ones."
        },
        {
            icon: "🎓",
            title: "Educational Value",
            description: "Play is learning. We curate toys that spark curiosity, creativity, and development in children of all ages."
        },
        {
            icon: "🌍",
            title: "Eco-Friendly",
            description: "We are committed to the planet. Many of our products are made from sustainable materials and recyclable packaging."
        },
        {
            icon: "💖",
            title: "Made with Love",
            description: "We treat every customer like family. Our collection is handpicked with love and care."
        }
    ];

    return (
        <main className="min-h-screen bg-white overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/parents-playing.jpg"
                        alt="Parents playing with kids"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/20 to-slate-900/60"></div>
                </div>
                <div className="relative z-10 container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-black font-display mb-6 drop-shadow-lg">Empowering Imagination</h1>
                    <p className="text-xl md:text-2xl text-slate-100 max-w-2xl mx-auto drop-shadow-md">
                        We believe in the power of play to shape the future. Welcome to a world where dreams come to life.
                    </p>
                </div>
                {/* Decorative curve */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-white rounded-t-[50%] scale-x-150 translate-y-1/2"></div>
            </section>

            {/* Our Story */}
            <section className="py-24">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                        <div className="flex-1">
                            <h2 className="text-4xl font-black text-slate-900 font-display mb-6">Our Story</h2>
                            <p className="text-slate-600 text-lg leading-relaxed mb-6">
                                Founded in 2020 by a group of parents who wanted more than just plastic distractions, KidsWorld was born from a simple idea: <strong>Toys should inspire.</strong>
                            </p>
                            <p className="text-slate-600 text-lg leading-relaxed mb-6">
                                We started in a small garage with a curated selection of wooden puzzles and science kits. Today, we are proud to offer thousands of toys that have brought smiles to families across the globe. But our mission remains the same – to provide high-quality, safe, and engaging toys that help children explore their potential.
                            </p>
                            <div className="flex gap-4">
                                <div className="text-center">
                                    <span className="block text-4xl font-black text-primary">50k+</span>
                                    <span className="text-slate-500 text-sm uppercase tracking-wider">Happy Kids</span>
                                </div>
                                <div className="w-px bg-slate-200 h-12 self-center"></div>
                                <div className="text-center">
                                    <span className="block text-4xl font-black text-secondary">2000+</span>
                                    <span className="text-slate-500 text-sm uppercase tracking-wider">Products</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                                <Image src="/images/kids-playing-left.png" alt="Kids playing" fill className="object-cover" />
                            </div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-100 rounded-full -z-10"></div>
                            <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-100 rounded-full -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-black text-slate-900 font-display mb-4">Why Parents Trust Us</h2>
                        <p className="text-slate-500 text-lg">We don't just sell toys; we curate experiences that you can trust.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                                <div className="text-5xl mb-6">{item.icon}</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-500 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24">
                <div className="container mx-auto px-4 text-center">
                    <div className="bg-primary/10 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-black text-primary font-display mb-6">Ready to Play?</h2>
                            <p className="text-xl text-slate-700 max-w-xl mx-auto mb-10">
                                Discover our latest collection and find the perfect gift today.
                            </p>
                            <Link href="/products" className="btn-primary py-4 px-10 text-lg shadow-xl shadow-primary/20">
                                Shop Now
                            </Link>
                        </div>
                        {/* Abstract blobs */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default About;
