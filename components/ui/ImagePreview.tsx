"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImagePreviewProps {
    images: { src: string; alt: string }[];
    currentIndex: number;
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (index: number) => void;
}

export default function ImagePreview({
    images,
    currentIndex,
    isOpen,
    onClose,
    onNavigate,
}: ImagePreviewProps) {
    const handlePrev = () => {
        const prev = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        onNavigate(prev);
    };

    const handleNext = () => {
        const next = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        onNavigate(next);
    };

    React.useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    });

    return (
        <AnimatePresence>
            {isOpen && images[currentIndex] && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-overlay backdrop-modal"
                    onClick={onClose}
                >
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute top-lg right-lg z-20 text-textSecondary hover:text-gold transition-colors p-sm"
                        aria-label="Close preview"
                    >
                        <X size={28} strokeWidth={1.5} />
                    </button>

                    {/* Previous */}
                    <button
                        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                        className="absolute left-lg z-20 text-textSecondary hover:text-gold transition-colors p-sm"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={36} strokeWidth={1.5} />
                    </button>

                    {/* Image */}
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-[90vw] max-h-[85vh] w-auto h-auto"
                    >
                        <Image
                            src={images[currentIndex].src}
                            alt={images[currentIndex].alt}
                            width={1200}
                            height={1600}
                            className="object-contain max-h-[85vh] w-auto rounded-card"
                            priority
                        />
                    </motion.div>

                    {/* Next */}
                    <button
                        onClick={(e) => { e.stopPropagation(); handleNext(); }}
                        className="absolute right-lg z-20 text-textSecondary hover:text-gold transition-colors p-sm"
                        aria-label="Next image"
                    >
                        <ChevronRight size={36} strokeWidth={1.5} />
                    </button>

                    {/* Counter */}
                    <div className="absolute bottom-lg text-textSecondary text-caption">
                        {currentIndex + 1} / {images.length}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
