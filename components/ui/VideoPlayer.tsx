"use client";

import React from "react";
import { X } from "lucide-react";

interface VideoPlayerProps {
    src: string;
    onClose?: () => void;
}

export default function VideoPlayer({ src, onClose }: VideoPlayerProps) {
    return (
        <div className="relative w-full max-w-4xl mx-auto">
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-textSecondary hover:text-gold transition-colors duration-micro"
                    aria-label="Close video"
                >
                    <X size={28} strokeWidth={1.5} />
                </button>
            )}
            <div className="relative w-full aspect-video rounded-card overflow-hidden bg-charcoal">
                <video
                    src={src}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}
