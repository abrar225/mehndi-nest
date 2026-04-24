"use client";

import React from "react";

interface SliderProps {
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
    step?: number;
    labels?: string[];
    className?: string;
}

export default function Slider({
    min,
    max,
    value,
    onChange,
    step = 1,
    labels,
    className = "",
}: SliderProps) {
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className={`w-full ${className}`}>
            {/* Slider track */}
            <div className="relative w-full">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="slider-input w-full h-2 rounded-full appearance-none cursor-pointer bg-borderSubtle"
                    style={{
                        background: `linear-gradient(to right, #C8A96A 0%, #C8A96A ${percentage}%, #2A2A2A ${percentage}%, #2A2A2A 100%)`,
                    }}
                />
            </div>

            {/* Labels */}
            {labels && (
                <div className="flex justify-between mt-md">
                    {labels.map((label, i) => (
                        <span
                            key={label}
                            className={`text-caption transition-colors duration-micro ${i === value
                                    ? "text-gold font-medium"
                                    : "text-textSecondary"
                                }`}
                        >
                            {label}
                        </span>
                    ))}
                </div>
            )}

            <style jsx>{`
        .slider-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #c8a96a;
          cursor: pointer;
          border: 3px solid #0f0f0f;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .slider-input::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .slider-input::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #c8a96a;
          cursor: pointer;
          border: 3px solid #0f0f0f;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
      `}</style>
        </div>
    );
}
