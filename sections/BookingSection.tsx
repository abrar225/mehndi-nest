"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    CalendarDays, MapPin, Palette, Users, User,
    ArrowRight, ArrowLeft, CheckCircle, Loader2,
    LocateFixed, AlertCircle
} from "lucide-react";
import { SECTION_IDS } from "@/lib/constants";
import { useUIStore } from "@/lib/store";
import { bookingSchema, BookingFormData } from "@/lib/validators";
import { submitBooking, fetchBookedDates } from "@/lib/api";
import Container from "@/components/layout/Container";
import SectionWrapper from "@/components/layout/SectionWrapper";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import CustomCalendar from "@/components/ui/CustomCalendar";

const STEPS = [
    { id: 1, label: "Event Date", icon: CalendarDays },
    { id: 2, label: "Location", icon: MapPin },
    { id: 3, label: "Mehndi Style", icon: Palette },
    { id: 4, label: "Guest Count", icon: Users },
    { id: 5, label: "Contact Info", icon: User },
];

const STYLE_OPTIONS = [
    { value: "minimal" as const, label: "Minimal", desc: "Clean, subtle patterns", emoji: "✨" },
    { value: "arabic" as const, label: "Arabic", desc: "Flowing floral designs", emoji: "🌸" },
    { value: "bridal" as const, label: "Bridal", desc: "Full intricate coverage", emoji: "👰" },
];

export default function BookingSection() {
    const { isBookingOpen, openBooking, closeBooking } = useUIStore();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Booked dates state
    const [bookedDates, setBookedDates] = useState<string[]>([]);
    const [dateUnavailableMsg, setDateUnavailableMsg] = useState<string | null>(null);

    // Location verification state
    const [isVerifyingLocation, setIsVerifyingLocation] = useState(false);
    const [locationVerified, setLocationVerified] = useState(false);
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
        trigger,
        clearErrors,
    } = useForm<BookingFormData>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            eventDate: "",
            location: "",
            mehndiStyle: undefined,
            guestCount: "",
            name: "",
            phone: "",
            email: "",
        },
    });

    const selectedStyle = watch("mehndiStyle");
    const watchedDate = watch("eventDate");
    const watchedLocation = watch("location");

    // Fetch booked dates when modal opens
    useEffect(() => {
        if (isBookingOpen) {
            fetchBookedDates().then(setBookedDates).catch(() => setBookedDates([]));
        }
    }, [isBookingOpen]);

    // Reset location verified when location changes
    useEffect(() => {
        setLocationVerified(false);
    }, [watchedLocation]);

    // Check if selected date is booked
    useEffect(() => {
        if (watchedDate && bookedDates.includes(watchedDate)) {
            setDateUnavailableMsg("This date is not available. Please choose another date.");
        } else {
            setDateUnavailableMsg(null);
        }
    }, [watchedDate, bookedDates]);

    // Use current location
    const handleUseCurrentLocation = useCallback(() => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        setIsFetchingLocation(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    // Use a reverse geocoding service
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=16&addressdetails=1`,
                        { headers: { "Accept-Language": "en" } }
                    );
                    const data = await response.json();

                    if (data && data.display_name) {
                        // Extract a readable location
                        const parts = [];
                        if (data.address?.suburb) parts.push(data.address.suburb);
                        if (data.address?.city || data.address?.town || data.address?.village)
                            parts.push(data.address.city || data.address.town || data.address.village);
                        if (data.address?.state) parts.push(data.address.state);

                        const locationStr = parts.length > 0 ? parts.join(", ") : data.display_name;
                        setValue("location", locationStr, { shouldValidate: true });
                        setLocationVerified(true);
                        clearErrors("location");
                    }
                } catch {
                    alert("Could not determine your location. Please enter it manually.");
                } finally {
                    setIsFetchingLocation(false);
                }
            },
            () => {
                setIsFetchingLocation(false);
                alert("Location access denied. Please enter your venue manually.");
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    }, [setValue, clearErrors]);

    // Verify location using geocoding
    const handleVerifyLocation = useCallback(async () => {
        const loc = watchedLocation?.trim();
        if (!loc || loc.length < 3) return;

        setIsVerifyingLocation(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(loc)}&limit=1`,
                { headers: { "Accept-Language": "en" } }
            );
            const data = await response.json();

            if (data && data.length > 0) {
                setLocationVerified(true);
            } else {
                setLocationVerified(false);
                alert("Could not verify this location. Please check the spelling or try a more specific address.");
            }
        } catch {
            alert("Location verification failed. Please try again.");
        } finally {
            setIsVerifyingLocation(false);
        }
    }, [watchedLocation]);

    const handleNext = async () => {
        setSubmitError(null);
        const fieldsToValidate: Record<number, (keyof BookingFormData)[]> = {
            1: ["eventDate"],
            2: ["location"],
            3: ["mehndiStyle"],
            4: ["guestCount"],
        };

        // Extra check: blocked date
        if (step === 1 && watchedDate && bookedDates.includes(watchedDate)) {
            setDateUnavailableMsg("This date is not available. Please choose another date.");
            return;
        }

        const fields = fieldsToValidate[step];
        if (fields) {
            const valid = await trigger(fields);
            if (!valid) return;
        }

        setStep((s) => Math.min(s + 1, 5));
    };

    const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

    const onSubmit = async (data: BookingFormData) => {
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            await submitBooking(data);
            setIsSuccess(true);
            // Re-fetch availability immediately so the calendar is updated
            const updatedDates = await fetchBookedDates();
            setBookedDates(updatedDates);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Submission failed. Please try again.";
            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        closeBooking();
        setTimeout(() => {
            setStep(1);
            setIsSuccess(false);
            setSubmitError(null);
            setDateUnavailableMsg(null);
            setLocationVerified(false);
            reset();
        }, 300);
    };

    const inputStyles =
        "w-full bg-charcoal border border-borderSubtle rounded-card px-xl py-md text-textPrimary font-body text-body-base focus:border-gold focus:outline-none transition-colors duration-micro placeholder:text-textSecondary/50";

    const errorStyles = "flex items-center gap-xs text-red-400 text-caption mt-sm";

    return (
        <>
            <SectionWrapper id={SECTION_IDS.booking}>
                <Container>
                    <div className="text-center max-w-2xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="text-gold text-caption tracking-[0.2em] uppercase mb-md">
                                Ready?
                            </p>
                            <h2 className="font-heading text-h2 text-textPrimary mb-xl">
                                Book Your <span className="text-gold italic">Experience</span>
                            </h2>
                            <p className="text-textSecondary text-body-lg mb-2xl">
                                Begin your mehndi journey. Share your event details and
                                let&apos;s create something beautiful together.
                            </p>
                            <Button variant="primary" size="large" onClick={openBooking}>
                                Book Your Artist
                            </Button>
                        </motion.div>
                    </div>
                </Container>
            </SectionWrapper>

            {/* Booking Modal */}
            <Modal isOpen={isBookingOpen} onClose={handleClose} className="max-w-lg w-full">
                {isSuccess ? (
                    /* Success State */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-2xl"
                    >
                        <CheckCircle size={64} className="text-gold mx-auto mb-xl" strokeWidth={1.5} />
                        <h3 className="font-heading text-h3 text-textPrimary mb-md">
                            Thank You!
                        </h3>
                        <p className="text-textSecondary text-body-base max-w-sm mx-auto">
                            Your booking request has been received. We&apos;ll get back to you
                            within 24 hours to confirm your consultation.
                        </p>
                        <Button variant="secondary" onClick={handleClose} className="mt-2xl">
                            Close
                        </Button>
                    </motion.div>
                ) : (
                    /* Multi-step Form */
                    <div>
                        {/* Step Indicators */}
                        <div className="flex items-center justify-center gap-sm mb-2xl">
                            {STEPS.map((s) => (
                                <div key={s.id} className="flex items-center gap-sm">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-caption font-medium transition-colors duration-micro ${s.id === step
                                            ? "bg-gold text-charcoal"
                                            : s.id < step
                                                ? "bg-henna text-white"
                                                : "bg-borderSubtle text-textSecondary"
                                            }`}
                                    >
                                        {s.id < step ? "✓" : s.id}
                                    </div>
                                    {s.id < 5 && (
                                        <div
                                            className={`w-6 h-px transition-colors duration-micro ${s.id < step ? "bg-henna" : "bg-borderSubtle"
                                                }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Step Title */}
                        <div className="text-center mb-xl">
                            <p className="text-gold text-caption uppercase tracking-widest">
                                Step {step} of 5
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.25 }}
                                    className="min-h-[220px]"
                                >
                                    {/* ══════════ Step 1: Event Date ══════════ */}
                                    {step === 1 && (
                                        <div>
                                            <label className="block text-textPrimary text-body-base mb-md font-medium">
                                                📅 When is your event?
                                            </label>
                                            <CustomCalendar
                                                selectedDate={watchedDate}
                                                onDateSelect={(date) => {
                                                    setValue("eventDate", date, { shouldValidate: true });
                                                    clearErrors("eventDate");
                                                }}
                                                bookedDates={bookedDates}
                                            />
                                            {/* Hidden input strictly for react-hook-form validation to hook into */}
                                            <input type="hidden" {...register("eventDate")} />

                                            {errors.eventDate && (
                                                <p className={errorStyles}>
                                                    <AlertCircle size={14} />
                                                    {errors.eventDate.message}
                                                </p>
                                            )}
                                            {dateUnavailableMsg && !errors.eventDate && (
                                                <p className={errorStyles}>
                                                    <AlertCircle size={14} />
                                                    {dateUnavailableMsg}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* ══════════ Step 2: Location ══════════ */}
                                    {step === 2 && (
                                        <div>
                                            <label className="block text-textPrimary text-body-base mb-md font-medium">
                                                📍 Where is your event?
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    {...register("location")}
                                                    placeholder="City, venue name, or full address"
                                                    className={`${inputStyles} pr-[120px] ${locationVerified ? "!border-green-500" : ""}`}
                                                />
                                                {locationVerified && (
                                                    <span className="absolute right-xl top-1/2 -translate-y-1/2 text-green-500 text-[11px] font-medium flex items-center gap-1">
                                                        <CheckCircle size={14} /> Verified
                                                    </span>
                                                )}
                                            </div>

                                            {errors.location && (
                                                <p className={errorStyles}>
                                                    <AlertCircle size={14} />
                                                    {errors.location.message}
                                                </p>
                                            )}

                                            <div className="flex flex-wrap gap-md mt-lg">
                                                {/* Use Current Location */}
                                                <button
                                                    type="button"
                                                    onClick={handleUseCurrentLocation}
                                                    disabled={isFetchingLocation}
                                                    className="flex items-center gap-sm px-lg py-sm bg-charcoal border border-borderSubtle rounded-pill text-caption text-textSecondary hover:text-gold hover:border-gold/50 transition-all disabled:opacity-50"
                                                >
                                                    {isFetchingLocation ? (
                                                        <Loader2 size={14} className="animate-spin" />
                                                    ) : (
                                                        <LocateFixed size={14} />
                                                    )}
                                                    {isFetchingLocation ? "Detecting..." : "Use current location"}
                                                </button>

                                                {/* Verify Location */}
                                                <button
                                                    type="button"
                                                    onClick={handleVerifyLocation}
                                                    disabled={isVerifyingLocation || !watchedLocation || watchedLocation.length < 3}
                                                    className="flex items-center gap-sm px-lg py-sm bg-charcoal border border-borderSubtle rounded-pill text-caption text-textSecondary hover:text-gold hover:border-gold/50 transition-all disabled:opacity-50"
                                                >
                                                    {isVerifyingLocation ? (
                                                        <Loader2 size={14} className="animate-spin" />
                                                    ) : (
                                                        <MapPin size={14} />
                                                    )}
                                                    {isVerifyingLocation ? "Verifying..." : "Verify location"}
                                                </button>
                                            </div>

                                            <p className="text-textSecondary/40 text-[11px] mt-md italic">
                                                Tip: Enter a specific venue or area for accurate service availability.
                                            </p>
                                        </div>
                                    )}

                                    {/* ══════════ Step 3: Mehndi Style ══════════ */}
                                    {step === 3 && (
                                        <div>
                                            <label className="block text-textPrimary text-body-base mb-md font-medium">
                                                🎨 What style do you prefer?
                                            </label>
                                            <div className="grid gap-md">
                                                {STYLE_OPTIONS.map((opt) => (
                                                    <button
                                                        key={opt.value}
                                                        type="button"
                                                        onClick={() => {
                                                            setValue("mehndiStyle", opt.value, { shouldValidate: true });
                                                            clearErrors("mehndiStyle");
                                                        }}
                                                        className={`flex items-center gap-lg p-xl rounded-card border transition-all duration-micro text-left ${selectedStyle === opt.value
                                                            ? "border-gold bg-gold/10 shadow-[0_0_20px_rgba(200,169,106,0.15)]"
                                                            : "border-borderSubtle hover:border-gold/50"
                                                            }`}
                                                    >
                                                        <span className="text-2xl">{opt.emoji}</span>
                                                        <div>
                                                            <p className="text-textPrimary font-medium">{opt.label}</p>
                                                            <p className="text-textSecondary text-caption">{opt.desc}</p>
                                                        </div>
                                                        {selectedStyle === opt.value && (
                                                            <CheckCircle size={20} className="text-gold ml-auto" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                            {errors.mehndiStyle && (
                                                <p className={errorStyles}>
                                                    <AlertCircle size={14} />
                                                    {errors.mehndiStyle.message}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* ══════════ Step 4: Guest Count ══════════ */}
                                    {step === 4 && (
                                        <div>
                                            <label className="block text-textPrimary text-body-base mb-md font-medium">
                                                👥 How many people need mehndi?
                                            </label>
                                            <input
                                                type="number"
                                                {...register("guestCount")}
                                                placeholder="e.g. 5"
                                                min="1"
                                                max="500"
                                                onKeyDown={(e) => {
                                                    // Block negative sign, e, +, .
                                                    if (["-", "e", "E", "+", "."].includes(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                className={inputStyles}
                                            />
                                            {errors.guestCount && (
                                                <p className={errorStyles}>
                                                    <AlertCircle size={14} />
                                                    {errors.guestCount.message}
                                                </p>
                                            )}
                                            <p className="text-textSecondary/40 text-[11px] mt-md italic">
                                                Enter a number between 1 and 500. This helps us plan the session duration.
                                            </p>
                                        </div>
                                    )}

                                    {/* ══════════ Step 5: Contact Info ══════════ */}
                                    {step === 5 && (
                                        <div className="space-y-lg">
                                            <div>
                                                <label className="block text-textPrimary text-caption mb-sm font-medium">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register("name")}
                                                    placeholder="Your full name"
                                                    maxLength={100}
                                                    className={inputStyles}
                                                />
                                                {errors.name && (
                                                    <p className={errorStyles}>
                                                        <AlertCircle size={14} />
                                                        {errors.name.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-textPrimary text-caption mb-sm font-medium">
                                                    Phone
                                                </label>
                                                <input
                                                    type="tel"
                                                    {...register("phone")}
                                                    placeholder="+91 98765 43210"
                                                    maxLength={20}
                                                    className={inputStyles}
                                                />
                                                {errors.phone && (
                                                    <p className={errorStyles}>
                                                        <AlertCircle size={14} />
                                                        {errors.phone.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-textPrimary text-caption mb-sm font-medium">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    {...register("email")}
                                                    placeholder="you@example.com"
                                                    maxLength={100}
                                                    className={inputStyles}
                                                />
                                                {errors.email && (
                                                    <p className={errorStyles}>
                                                        <AlertCircle size={14} />
                                                        {errors.email.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Submit Error */}
                            {submitError && (
                                <div className="mt-lg p-md bg-red-500/10 border border-red-500/30 rounded-card flex items-center gap-sm">
                                    <AlertCircle size={16} className="text-red-400 shrink-0" />
                                    <p className="text-red-400 text-caption">{submitError}</p>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex items-center justify-between mt-2xl">
                                {step > 1 ? (
                                    <button
                                        type="button"
                                        onClick={handlePrev}
                                        className="flex items-center gap-sm text-textSecondary hover:text-gold transition-colors text-body-base"
                                    >
                                        <ArrowLeft size={18} /> Back
                                    </button>
                                ) : (
                                    <div />
                                )}

                                {step < 5 ? (
                                    <Button
                                        onClick={handleNext}
                                        variant="primary"
                                        disabled={
                                            (step === 1 && !!dateUnavailableMsg)
                                        }
                                    >
                                        Next <ArrowRight size={18} className="ml-sm" />
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin mr-sm" />
                                                Sending...
                                            </>
                                        ) : (
                                            "Submit Request"
                                        )}
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>
                )}
            </Modal>
        </>
    );
}
