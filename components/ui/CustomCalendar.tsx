"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CustomCalendarProps {
    selectedDate?: string;
    onDateSelect: (date: string) => void;
    bookedDates: string[];
}

export default function CustomCalendar({ selectedDate, onDateSelect, bookedDates }: CustomCalendarProps) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 2);

    const [currentMonth, setCurrentMonth] = useState(() => {
        if (selectedDate) {
            const parsed = new Date(selectedDate);
            if (!isNaN(parsed.getTime())) {
                return new Date(parsed.getFullYear(), parsed.getMonth(), 1);
            }
        }
        return new Date(today.getFullYear(), today.getMonth(), 1);
    });

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const calendarDays = useMemo(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const numDays = daysInMonth(year, month);
        const startingDay = firstDayOfMonth(year, month);

        const days = [];
        
        // Blank spaces for the first week row
        for (let i = 0; i < startingDay; i++) {
            days.push(null);
        }

        // Actual days
        for (let i = 1; i <= numDays; i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    }, [currentMonth]);

    const isPrevDisabled = currentMonth.getFullYear() === today.getFullYear() && currentMonth.getMonth() === today.getMonth();
    const isNextDisabled = currentMonth.getFullYear() === maxDate.getFullYear() && currentMonth.getMonth() === maxDate.getMonth();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    return (
        <div className="w-full bg-charcoal border border-borderSubtle rounded-card p-xl shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between mb-lg">
                <h3 className="text-textPrimary font-semibold text-body-lg">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <div className="flex items-center gap-sm">
                    <button
                        type="button"
                        onClick={handlePrevMonth}
                        disabled={isPrevDisabled}
                        className="p-xs rounded-full hover:bg-white/5 text-textSecondary hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        type="button"
                        onClick={handleNextMonth}
                        disabled={isNextDisabled}
                        className="p-xs rounded-full hover:bg-white/5 text-textSecondary hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-xs mb-sm">
                {weekDays.map(day => (
                    <div key={day} className="text-center text-textSecondary text-caption font-medium py-xs">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-xs">
                {calendarDays.map((dateObj, index) => {
                    if (!dateObj) {
                        return <div key={`blank-${index}`} className="aspect-square" />;
                    }

                    // Format as YYYY-MM-DD for matching
                    // Adjust timezone offset handling
                    const offset = dateObj.getTimezoneOffset();
                    const localDateObj = new Date(dateObj.getTime() - (offset*60*1000));
                    const dateStr = localDateObj.toISOString().split("T")[0];

                    const isPast = dateObj < today;
                    const isBeyondMax = dateObj > maxDate;
                    const isBooked = bookedDates.includes(dateStr);
                    const isDisabled = isPast || isBeyondMax || isBooked;

                    const isSelected = selectedDate === dateStr;
                    const isToday = dateObj.getTime() === today.getTime();

                    return (
                        <button
                            key={dateStr}
                            type="button"
                            disabled={isDisabled}
                            onClick={() => onDateSelect(dateStr)}
                            className={`
                                aspect-square rounded-full flex items-center justify-center text-body-base transition-all
                                ${isSelected ? 'bg-gold text-charcoal font-bold shadow-[0_0_10px_rgba(200,169,106,0.3)]' : ''}
                                ${!isSelected && !isDisabled ? 'text-textPrimary hover:bg-white/10' : ''}
                                ${isDisabled ? 'text-textSecondary/30 cursor-not-allowed' : ''}
                                ${isBooked ? '!text-red-400/50 line-through' : ''}
                                ${isToday && !isSelected ? 'border border-gold/50 text-gold' : ''}
                            `}
                        >
                            {dateObj.getDate()}
                        </button>
                    );
                })}
            </div>
            
            <div className="mt-md flex items-center justify-center gap-lg text-caption text-textSecondary">
                 <div className="flex items-center gap-xs">
                     <div className="w-2 h-2 rounded-full bg-gold"></div>
                     <span>Selected</span>
                 </div>
                 <div className="flex items-center gap-xs">
                     <span className="text-red-400/50 line-through text-xs">24</span>
                     <span>Booked</span>
                 </div>
            </div>
        </div>
    );
}
