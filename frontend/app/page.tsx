"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface Event {
    id: number;
    name: string;
    description: string;
    date: string;
    venue: string;
    totalSeats: number;
}

export default function Home() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch events from backend
        axios.get('http://localhost:8080/api/events')
            .then(res => setEvents(res.data))
            .catch(err => console.error(err)) // Handle error gracefully in real app
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold tracking-tight">Upcoming Events</h1>
                <p className="text-neutral-400">Discover and book tickets for the hottest events.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <Link href={`/events/${event.id}`} key={event.id} className="group">
                        <div className="h-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-red-500/50 transition-all cursor-pointer hover:shadow-2xl hover:shadow-red-900/10">
                            <div className="h-48 bg-neutral-800 relative">
                                {/* Fallback pattern since we don't have images */}
                                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                                    <span className="text-4xl">🎫</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        {new Date(event.date).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <h2 className="text-xl font-bold group-hover:text-red-500 transition-colors">{event.name}</h2>
                                <p className="text-neutral-400 text-sm line-clamp-2">{event.description || "No description available."}</p>
                                <div className="flex items-center text-sm text-neutral-500 gap-2">
                                    <span>📍 {event.venue}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
