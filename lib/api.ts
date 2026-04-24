import { BookingFormData } from "./validators";
import { supabase } from "./supabase";

const SUPABASE_FUNCTION_URL = "https://vsbsvvonqvhbfkatoaqw.supabase.co/functions/v1/handle-booking";

export async function submitBooking(data: BookingFormData) {
    const response = await fetch(SUPABASE_FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Submission failed" }));
        throw new Error(error.message || "Something went wrong");
    }

    return response.json();
}

export async function fetchBookedDates(): Promise<string[]> {
    try {
        const today = new Date().toISOString().split("T")[0];
        const { data: bookings, error } = await supabase
            .from("bookings")
            .select("event_date")
            .gte("event_date", today)
            .in("status", ["pending", "confirmed"]);

        if (error) throw error;

        // Group and return dates with 1+ bookings
        const dateCounts: Record<string, number> = {};
        bookings.forEach((b) => {
            dateCounts[b.event_date] = (dateCounts[b.event_date] || 0) + 1;
        });

        return Object.entries(dateCounts)
            .filter(([, count]) => count >= 1)
            .map(([date]) => date);
    } catch {
        return [];
    }
}
