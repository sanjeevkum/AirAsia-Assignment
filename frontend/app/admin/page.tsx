"use client";

import { useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        date: "",
        venue: "",
        totalSeats: 20
    });
    const [status, setStatus] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("creating");
        try {
            await axios.post("http://localhost:8080/api/events", {
                ...formData,
                date: new Date(formData.date).toISOString() // Ensure ISO format
            });
            setStatus("success");
            setFormData({ name: "", description: "", date: "", venue: "", totalSeats: 20 });
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="text-neutral-400">Create and manage upcoming events.</p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
                <h2 className="text-xl font-bold mb-6">Create New Event</h2>

                {status === "success" && (
                    <div className="mb-6 p-4 bg-green-900/20 border border-green-900/50 text-green-400 rounded-lg">
                        Event created successfully!
                    </div>
                )}
                {status === "error" && (
                    <div className="mb-6 p-4 bg-red-900/20 border border-red-900/50 text-red-500 rounded-lg">
                        Failed to create event. Check console.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-300">Event Name</label>
                            <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 focus:border-red-500 outline-none transition-colors" placeholder="e.g. Coldplay Concert" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-300">Venue</label>
                            <input required name="venue" value={formData.venue} onChange={handleChange} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 focus:border-red-500 outline-none transition-colors" placeholder="e.g. National Stadium" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Description</label>
                        <textarea required name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 focus:border-red-500 outline-none transition-colors" placeholder="Event details..." />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-300">Date & Time</label>
                            <input required type="datetime-local" name="date" value={formData.date} onChange={handleChange} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 focus:border-red-500 outline-none transition-colors text-white" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-300">Total Seats</label>
                            <input required type="number" name="totalSeats" value={formData.totalSeats} onChange={handleChange} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 focus:border-red-500 outline-none transition-colors" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={status === "creating"}
                        className="w-full bg-white text-black hover:bg-neutral-200 font-bold py-3 rounded-lg transition-colors"
                    >
                        {status === "creating" ? "Creating..." : "Create Event"}
                    </button>
                </form>
            </div>
        </div>
    );
}
