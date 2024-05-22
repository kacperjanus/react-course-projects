"use client"

import React from 'react';
import ReservationCard from "@/app/account/reservations/ReservationCard";
import {Booking} from "@/app/Interfaces";
import {useOptimistic} from "react";
import {deleteReservation} from "@/app/_lib/actions";

function ReservationList({bookings}: { bookings: Booking[] }) {

    const [optimisticBookings, optimisticDelete] = useOptimistic(bookings, (curBookings, bookingId) => {
        return curBookings.filter(booking => booking.id !== bookingId)
    })

    async function handleDelete(bookingId: number) {
        optimisticDelete(bookingId);
        await deleteReservation(bookingId);
    }

    return (
        <ul className="space-y-6">
            {optimisticBookings.map((booking) => (
                <ReservationCard onDelete={handleDelete} booking={booking} key={booking.id}/>
            ))}
        </ul>
    );
}

export default ReservationList;