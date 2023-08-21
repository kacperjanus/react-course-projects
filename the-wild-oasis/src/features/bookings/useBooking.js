import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
    const { bookingId } = useParams();
    const {
        isLoading,
        data: booking,
        error,
    } = useQuery({
        queryKey: ["bookings", bookingId],
        queryFn: () => getBooking(bookingId),
    });

    return { isLoading, error, booking };
}
