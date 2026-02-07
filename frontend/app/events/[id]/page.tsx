"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Event {
    id: number;
    name: string;
    description: string;
    date: string;
    venue: string;
    totalSeats: number;
}

interface Seat {
    id: number;
    seatNumber: string;
    status: "AVAILABLE" | "BOOKED" | "RESERVED";
    price: number;
}

export default function EventDetails({ params }: { params: { id: string } }) {
    const [event, setEvent] = useState<Event | null>(null);
    const [seats, setSeats] = useState<Seat[]>([]);
    const [selectedSeatIds, setSelectedSeatIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventRes, seatsRes] = await Promise.all([
                    axios.get(`http://localhost:8080/api/events/${params.id}`),
                    axios.get(`http://localhost:8080/api/events/${params.id}/seats`)
                ]);
                setEvent(eventRes.data);
                setSeats(seatsRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [params.id]);

    const toggleSeat = (seatId: number) => {
        setSelectedSeatIds(prev =>
            prev.includes(seatId)
                ? prev.filter(id => id !== seatId)
                : [...prev, seatId]
        );
    };

    const handleBook = () => {
        if (selectedSeatIds.length === 0) return;
        const query = new URLSearchParams({
            eventId: params.id,
            seatIds: selectedSeatIds.join(",")
        }).toString();
        router.push(`/checkout?${query}`);
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!event) return <div className="text-center py-20">Event not found</div>;

    return (
        <div className="space-y-8">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-start gap-6">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-2">
                        {event.name}
                    </h1>
                    <p className="text-neutral-400 max-w-2xl">{event.description}</p>
                    <div className="mt-4 flex gap-4 text-sm text-neutral-500">
                        <span>📅 {new Date(event.date).toLocaleString()}</span>
                        <span>📍 {event.venue}</span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold text-white">
                        {selectedSeatIds.length > 0 ? selectedSeatIds.length : 0} <span className="text-sm font-normal text-neutral-500">tickets</span>
                    </div>
                    <button
                        onClick={handleBook}
                        disabled={selectedSeatIds.length === 0}
                        className={`mt-4 px-8 py-3 rounded-full font-bold transition-all ${selectedSeatIds.length > 0
                            ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20"
                            : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                            }`}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Select Seats</h2>
                <div className="flex gap-4 text-sm mb-4">
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-neutral-800 border border-neutral-700"></div> Available</div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-green-500 border border-green-600"></div> Selected</div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-neutral-900 border border-neutral-800 opacity-50 cursor-not-allowed"></div> Booked</div>
                </div>

                <div className="grid grid-cols-6 md:grid-cols-10 gap-3 max-w-3xl mx-auto bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800">
                    {seats.map((seat) => {
                        const isSelected = selectedSeatIds.includes(seat.id);
                        const isBooked = seat.status === "BOOKED";

                        return (
                            <button
                                key={seat.id}
                                onClick={() => !isBooked && toggleSeat(seat.id)}
                                disabled={isBooked}
                                className={`
                  relative h-10 w-full rounded-t-lg rounded-b-sm flex items-center justify-center text-xs font-medium transition-all
                  ${isBooked
                                        ? "bg-neutral-800 text-neutral-600 cursor-not-allowed opacity-50"
                                        : isSelected
                                            ? "bg-green-600 text-white shadow-lg shadow-green-900/20 translate-y-[-2px]"
                                            : "bg-neutral-700 hover:bg-neutral-600 text-neutral-300 hover:translate-y-[-2px]"
                                    }
                `}
                                title={`Seat ${seat.seatNumber} - $${seat.price}`}
                            >
                                {seat.seatNumber}
                            </button>
                        );
                    })}
                </div>

                <div className="w-full bg-neutral-800 h-2 rounded-full mt-8 mx-auto max-w-3xl relative">
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-neutral-500 tracking-widest uppercase">Stage</div>
                </div>
            </div>
        </div>
    );
}
