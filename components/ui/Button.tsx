"use client";

import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    size?: "default" | "large";
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
    className?: string;
}

export default function Button({
    children,
    variant = "primary",
    size = "default",
    onClick,
    type = "button",
    disabled = false,
    className = "",
}: ButtonProps) {
    const baseStyles =
        "inline-flex items-center justify-center font-body font-medium transition-all duration-component ease-elegant rounded-pill focus-visible:outline-2 focus-visible:outline-gold disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary:
            "bg-henna text-white hover:bg-henna-hover active:scale-[0.98]",
        secondary:
            "bg-transparent border border-gold text-gold hover:bg-gold hover:text-charcoal active:scale-[0.98]",
    };

    const sizes = {
        default: "px-xl py-md text-body-base",
        large: "px-3xl py-lg text-body-lg",
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
        </motion.button>
    );
}
