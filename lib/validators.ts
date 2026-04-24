import { z } from "zod";

// ── Profanity / nonsense filter ──
const BLOCKED_PATTERNS = [
    /^([a-z])\1{3,}$/i,          // aaaa, bbbbb
    /^[0-9]+$/,                  // pure numbers as name
    /test|asdf|qwer|zxcv/i,    // common test strings
    /fuck|shit|damn|ass|bitch/i, // profanity
    /http|www\./i,              // URLs in name/location
    /^\.+$/,                     // just dots
    /^\s*$/,                     // whitespace only
];

function isNonsense(value: string): boolean {
    return BLOCKED_PATTERNS.some((pattern) => pattern.test(value.trim()));
}

// ── Name validation helpers ──
function isValidName(value: string): boolean {
    // Must contain at least 2 alphabetic characters and no purely numeric/special chars
    const cleaned = value.trim();
    const letterCount = (cleaned.match(/[a-zA-Z\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F]/g) || []).length;
    return letterCount >= 2;
}

// ── Phone validation helper ──
function isValidPhone(value: string): boolean {
    // Strip spaces, dashes, parens, plus sign for digit counting
    const digits = value.replace(/[\s\-\(\)\+]/g, "");
    // Enforce exactly 10 digits
    return /^\d{10}$/.test(digits);
}

// ── Email domain validation ──
const DISPOSABLE_DOMAINS = [
    "tempmail.com", "throwaway.email", "guerrillamail.com",
    "mailinator.com", "yopmail.com", "trashmail.com",
    "sharklasers.com", "guerrillamailblock.com", "grr.la",
];

function isDisposableEmail(email: string): boolean {
    const domain = email.split("@")[1]?.toLowerCase();
    return DISPOSABLE_DOMAINS.includes(domain);
}

export const bookingSchema = z.object({
    eventDate: z
        .string()
        .min(1, "Event date is required")
        .refine(
            (val) => {
                const selected = new Date(val);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return selected >= today;
            },
            { message: "Event date cannot be in the past" }
        )
        .refine(
            (val) => {
                const selected = new Date(val);
                const maxDate = new Date();
                maxDate.setFullYear(maxDate.getFullYear() + 2);
                return selected <= maxDate;
            },
            { message: "Event date must be within the next 2 years" }
        ),

    location: z
        .string()
        .min(3, "Location must be at least 3 characters")
        .max(200, "Location is too long")
        .refine((val) => !isNonsense(val), {
            message: "Please enter a valid location",
        })
        .refine((val) => isValidName(val), {
            message: "Location must contain valid place name",
        }),

    mehndiStyle: z.enum(["minimal", "arabic", "bridal"], {
        errorMap: () => ({ message: "Please select a mehndi style" }),
    }),

    guestCount: z
        .string()
        .min(1, "Number of people is required")
        .refine(
            (val) => {
                const num = parseInt(val, 10);
                return !isNaN(num) && num > 0;
            },
            { message: "Must be a positive number" }
        )
        .refine(
            (val) => {
                const num = parseInt(val, 10);
                return num <= 500;
            },
            { message: "Guest count cannot exceed 500" }
        ),

    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name is too long")
        .refine((val) => !isNonsense(val), {
            message: "Please enter a valid name",
        })
        .refine((val) => isValidName(val), {
            message: "Name must contain at least 2 letters",
        }),

    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number is too long")
        .refine((val) => isValidPhone(val), {
            message: "Please enter a valid 10-digit phone number",
        }),

    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address")
        .refine((val) => !isDisposableEmail(val), {
            message: "Please use a permanent email address",
        }),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
