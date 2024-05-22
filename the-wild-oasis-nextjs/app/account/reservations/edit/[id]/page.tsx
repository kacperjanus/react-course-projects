import {getBooking, getCabin} from "@/app/_lib/data-service";
import {Booking} from "@/app/Interfaces";
import {updateReservation} from "@/app/_lib/actions";
import React from "react";
import UpdateReservationForm from "@/app/account/reservations/edit/[id]/UpdateReservationForm";

export default async function Page({params}: { params: { id: number } }) {
    const booking: Booking = await getBooking(params.id)
    const cabin = await getCabin(booking.cabinId)

    const {maxCapacity} = cabin;

    return (
        <div>
            <h2 className="font-semibold text-2xl text-accent-400 mb-7">
                Edit Reservation #{params.id}
            </h2>

            <UpdateReservationForm maxCapacity={maxCapacity} booking={booking}/>
        </div>
    );
}
