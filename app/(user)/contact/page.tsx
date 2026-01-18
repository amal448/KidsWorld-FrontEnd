'use client';
import React, { useState } from 'react';

const Contact = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-slate-50 py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 font-display mb-6">Get In Touch</h1>
                    <p className="text-xl text-slate-500">
                        Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="bg-slate-900 text-white rounded-3xl p-10 flex flex-col justify-between relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <span className="text-2xl">📍</span>
                                    <div>
                                        <p className="font-bold text-lg mb-1">Visit Us</p>
                                        <p className="text-slate-400">123 Toy Lane, Fun City<br />Playland, 90210</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <span className="text-2xl">📞</span>
                                    <div>
                                        <p className="font-bold text-lg mb-1">Call Us</p>
                                        <p className="text-slate-400">(555) 123-4567</p>
                                        <p className="text-slate-500 text-sm">Mon-Fri from 8am to 5pm</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <span className="text-2xl">✉️</span>
                                    <div>
                                        <p className="font-bold text-lg mb-1">Email Us</p>
                                        <p className="text-slate-400">hello@kidsworld.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 mt-12">
                            <h3 className="font-bold mb-4">Follow Us</h3>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-slate-900 flex items-center justify-center transition-all">📸</a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-slate-900 flex items-center justify-center transition-all">📘</a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-slate-900 flex items-center justify-center transition-all">🐦</a>
                            </div>
                        </div>

                        {/* Decor */}
                        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary rounded-full blur-3xl opacity-20"></div>
                        <div className="absolute top-10 right-10 text-9xl opacity-5 select-none animate-pulse">👋</div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-xl">
                        {isSubmitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-6 animate-bounce">✓</div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                                <p className="text-slate-500 max-w-xs mx-auto">Thanks for reaching out. One of our team members will get back to you shortly.</p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="mt-8 text-primary font-bold hover:underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                                        <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                                        <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                    <input required type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                                    <textarea required rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none"></textarea>
                                </div>
                                <button type="submit" className="w-full btn-primary py-4 shadow-xl shadow-primary/20 hover:shadow-primary/40">
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Contact;
