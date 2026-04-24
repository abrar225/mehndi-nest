"use client";

import React, { useRef } from "react";
import { useInView } from "react-intersection-observer";

interface SectionWrapperProps {
    children: React.ReactNode;
    id: string;
    className?: string;
    fullWidth?: boolean;
    noPadding?: boolean;
}

export default function SectionWrapper({
    children,
    id,
    className = "",
    fullWidth = false,
    noPadding = false,
}: SectionWrapperProps) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section
            id={id}
            ref={ref}
            className={`${noPadding ? "" : "section-padding"} ${fullWidth ? "w-full" : ""
                } ${inView ? "reveal-visible" : "reveal-hidden"} ${className}`}
        >
            {children}
        </section>
    );
}
