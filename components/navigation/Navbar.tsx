"use client";

import React from "react";
import { Menu } from "lucide-react";
import { useUIStore } from "@/lib/store";

export default function Navbar() {
    const { toggleNav, openBooking } = useUIStore();

    return (
        <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-lg py-md">
            {/* Logo */}
            <button
                onClick={() => {
                    const el = document.getElementById("hero");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="transition-opacity duration-component focus:outline-none"
            >
                <img
                    src="/all logo/navbar-logo.webp"
                    alt="Mehndi Nest Logo"
                    className="h-14 md:h-16 w-auto"
                />
            </button>

            <div className="flex items-center gap-lg">
                {/* Book CTA — desktop only */}
                <button
                    onClick={openBooking}
                    className="hidden lg:inline-flex items-center justify-center bg-henna text-white font-body font-medium px-xl py-sm rounded-pill hover:bg-henna-hover transition-all duration-component text-caption"
                >
                    Book Artist
                </button>

                {/* Menu Toggle */}
                <button
                    onClick={toggleNav}
                    className="text-textPrimary hover:text-gold transition-colors duration-micro p-sm"
                    aria-label="Open navigation menu"
                >
                    <Menu size={28} strokeWidth={1.5} />
                </button>
            </div>
        </header>
    );
}
