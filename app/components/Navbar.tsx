'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useShop } from '../context/ShopContext'

const Navbar = () => {
    const { cartCount } = useShop()
    const [scrolled, setScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { user, logout, loading } = useAuth()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    // Hide the login/logout buttons until we know the auth status
    if (loading) return <div className="w-20 h-8 bg-slate-100 animate-pulse rounded-xl" />;

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/90 backdrop-blur-md shadow-sm py-3'
                : 'bg-gradient-to-b from-black/20 to-transparent py-5'
                }`}
        >
            <nav className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tighter text-slate-900 flex items-center gap-2">
                    <span className="text-primary">Kids</span>
                    <span className="text-secondary">World</span>
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center gap-8 font-medium text-slate-700">
                    <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                    <li><Link href="/products" className="hover:text-primary transition-colors">Shop</Link></li>
                    <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                    <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                </ul>

                {/* Right Side Actions */}
                <div className="hidden md:flex items-center gap-6">
                    {/* Search Icon */}
                    <button className="text-slate-700 hover:text-primary transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>

                    {/* Cart Icon */}
                    {/* Wishlist Icon */}
                    <Link href="/wishlist" className="relative text-slate-700 hover:text-primary transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>

                    </Link>

                    {/* Cart Icon */}
                    <Link href="/cart" className="relative text-slate-700 hover:text-primary transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>
                        )}
                    </Link>

                    {/* Login Button */}
                    {/* {
                        user ?
                            <button onClick={logout} className="btn-primary py-2 px-5 rounded-xl text-sm">
                                LOGOUT
                            </button> :
                            <Link href="/login" className="btn-primary py-2 px-5 rounded-xl text-sm">
                                LOGIN
                            </Link>


                    } */}
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-bold">Hi, {user.name}</span>
                            <button onClick={logout} className="btn-primary">LOGOUT</button>
                        </div>
                    ) : (
                        <Link href="/login" className="btn-primary">LOGIN</Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-slate-900 p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    )}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-lg py-6 px-4 flex flex-col gap-4">
                    <Link href="/" className="text-lg font-medium text-slate-700 hover:text-primary py-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    <Link href="products" className="text-lg font-medium text-slate-700 hover:text-primary py-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
                    <Link href="/about" className="text-lg font-medium text-slate-700 hover:text-primary py-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                    <Link href="/contact" className="text-lg font-medium text-slate-700 hover:text-primary py-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>

                    <div className="flex items-center gap-4 mt-2">
                        <Link href="/login" className="flex-1 btn-primary text-center py-3" onClick={() => setIsMobileMenuOpen(false)}>
                            Login
                        </Link>
                        <Link href="/cart" className="flex-1 btn-secondary text-center py-3 flex items-center justify-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            <span>Cart ({cartCount})</span>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Navbar