import ReservationCard from "./ReservationCard";
import {Booking} from "@/app/Interfaces"
import {getBookings} from "@/app/_lib/data-service";
import {auth} from "@/app/_lib/auth";
import {Session} from "next-auth";

export const metadata = {
    title: "Reservations",
}

export default async function Page() {
    const session: Session | null = await auth();
    
    //@ts-ignore
    const bookings: Booking[] = await getBookings(session?.user?.guestId);

    return (
        <div>
            <h2 className="font-semibold text-2xl text-accent-400 mb-7">
                Your reservations
            </h2>

            {bookings.length === 0 ? (
                <p className="text-lg">
                    You have no reservations yet. Check out our{" "}
                    <a className="underline text-accent-500" href="/cabins">
                        luxury cabins &rarr;
                    </a>
                </p>
            ) : (
                <ul className="space-y-6">
                    {bookings.map((booking) => (
                        <ReservationCard booking={booking} key={booking.id}/>
                    ))}
                </ul>
            )}
        </div>
    );
}
