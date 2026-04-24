"use client";

import React from "react";

interface ContainerProps {
    children: React.ReactNode;
    large?: boolean;
    className?: string;
}

export default function Container({
    children,
    large = false,
    className = "",
}: ContainerProps) {
    return (
        <div
            className={`mx-auto w-full px-lg ${large ? "max-w-container-lg" : "max-w-container"
                } ${className}`}
            style={{
                width: "var(--container-width, 100%)",
            }}
        >
            {children}
        </div>
    );
}
