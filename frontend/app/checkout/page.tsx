"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function Checkout() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const eventId = searchParams.get("eventId");
    const seatIdsParam = searchParams.get("seatIds");
    const seatIds = seatIdsParam ? seatIdsParam.split(",").map(Number) : [];

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await axios.post("http://localhost:8080/api/bookings", {
                userEmail: email,
                eventId: Number(eventId),
                seatIds: seatIds
            });
            setSuccess(true);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "Booking failed");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-900/50">
                    <span className="text-4xl">✓</span>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-4">
                    Booking Confirmed!
                </h1>
                <p className="text-neutral-400 mb-8 max-w-md text-center">
                    Your tickets have been sent to <span className="text-white font-medium">{email}</span>. Thank you for choosing AirAsia Events.
                </p>
                <Link href="/" className="px-8 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-all">
                    Return Home
                </Link>
            </div>
        );
    }

    if (!eventId || seatIds.length === 0) {
        return <div className="text-center py-20">Invalid booking session</div>;
    }

    return (
        <div className="max-w-md mx-auto py-10">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
                <h1 className="text-2xl font-bold mb-6">Complete Booking</h1>

                <div className="mb-8 p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                    <div className="flex justify-between text-sm mb-2 text-neutral-400">
                        <span>Event ID</span>
                        <span className="text-white font-mono">{eventId}</span>
                    </div>
                    <div className="flex justify-between text-sm text-neutral-400">
                        <span>Tickets</span>
                        <span className="text-white font-mono">{seatIds.length} x Standard Seat</span>
                    </div>
                    <div className="my-3 border-t border-neutral-700"></div>
                    <div className="flex justify-between font-bold text-white">
                        <span>Total</span>
                        <span>${seatIds.length * 100}.00</span>
                    </div>
                </div>

                <form onSubmit={handleBooking} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none"
                            placeholder="you@example.com"
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-900/20 border border-red-900/50 text-red-500 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-red-900/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Processing..." : "Confirm Payment"}
                    </button>
                </form>
            </div>
        </div>
    );
}
