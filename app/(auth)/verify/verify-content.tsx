'use client';

import React, { useState } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "@/services/authService";

export default function VerifyContent() {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const handleComplete = async (otp: string) => {
        if (otp.length === 6 && email) {
            setLoading(true);
            try {
                const res = await authService.verifyOtp(email, otp);
                if (res.ok) {
                    alert("Verification Successful!");
                    router.push("/login");
                } else {
                    alert("Verification Failed. Please try again.");
                    setValue(""); // Clear OTP on failure
                }
            } catch (error) {
                console.error("Verification error:", error);
                alert("An error occurred. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="bg-white p-10 rounded-4xl shadow-xl border border-slate-100 flex flex-col items-center gap-6">
            {/* Logo */}
            <div className="mb-2">
                <svg width="180" height="50" viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* K */}
                    <path d="M15 10V40" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round" />
                    <path d="M35 10L15 25L35 40" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                    {/* W */}
                    <path d="M55 10L62 40L72 20L82 40L89 10" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Simple Text Representation for the rest */}
                    <text x="100" y="35" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="24" fill="#0f172a">
                        Kids<tspan fill="#10b981">World</tspan>
                    </text>
                    <circle cx="170" cy="15" r="5" fill="#10b981" />
                    <circle cx="160" cy="40" r="3" fill="#fbbf24" />
                </svg>
            </div>

            <div className="text-center">
                <h1 className="text-3xl font-black text-slate-900 mb-2">Check your inbox</h1>
                <p className="text-slate-500">We sent a code to {email || "your email"}. Enter it below.</p>
            </div>

            <InputOTP
                maxLength={6}
                value={value}
                onChange={(val) => {
                    setValue(val);
                    if (val.length === 6) handleComplete(val);
                }}
                disabled={loading}
            >
                <InputOTPGroup className="gap-2">
                    <InputOTPSlot index={0} className="w-12 h-14 rounded-xl border-2" />
                    <InputOTPSlot index={1} className="w-12 h-14 rounded-xl border-2" />
                    <InputOTPSlot index={2} className="w-12 h-14 rounded-xl border-2" />
                    <InputOTPSlot index={3} className="w-12 h-14 rounded-xl border-2" />
                    <InputOTPSlot index={4} className="w-12 h-14 rounded-xl border-2" />
                    <InputOTPSlot index={5} className="w-12 h-14 rounded-xl border-2" />
                </InputOTPGroup>
            </InputOTP>

            <button
                className="w-full btn-primary py-4 rounded-2xl font-bold disabled:opacity-50 flex justify-center items-center"
                disabled={value.length < 6 || loading}
                onClick={() => handleComplete(value)}
            >
                {loading ? "Verifying..." : "Verify Account"}
            </button>
        </div>
    );
}
