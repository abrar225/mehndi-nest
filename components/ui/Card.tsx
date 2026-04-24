"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CardProps {
    variant?: "portfolio" | "testimonial";
    children?: React.ReactNode;
    imageSrc?: string;
    imageAlt?: string;
    onClick?: () => void;
    className?: string;
}

export default function Card({
    variant = "portfolio",
    children,
    imageSrc,
    imageAlt = "",
    onClick,
    className = "",
}: CardProps) {
    if (variant === "portfolio") {
        return (
            <motion.div
                onClick={onClick}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`relative overflow-hidden rounded-card shadow-card cursor-pointer group ${className}`}
            >
                {imageSrc && (
                    <div className="relative w-full aspect-[3/4] overflow-hidden">
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            className="object-cover rounded-card transition-all duration-component ease-elegant 
                                       grayscale-0 scale-[1.02] brightness-[1.08] saturate-[1.1]
                                       md:grayscale md:brightness-100 md:saturate-100 md:scale-100
                                       md:group-hover:grayscale-0 md:group-hover:scale-[1.05] md:group-hover:brightness-[1.05]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        {/* Mobile tap visual cue removed to keep it bright and clean */}
                    </div>
                )}
                {children}
            </motion.div>
        );
    }

    // Testimonial Card
    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`bg-cardDark rounded-card-lg p-xl flex flex-col gap-md ${className}`}
        >
            {children}
        </motion.div>
    );
}
