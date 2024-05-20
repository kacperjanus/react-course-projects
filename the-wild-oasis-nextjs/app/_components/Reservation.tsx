import React from 'react';
import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import {Cabin, Settings} from "@/app/Interfaces";
import {getBookedDatesByCabinId, getSettings} from "@/app/_lib/data-service";

async function Reservation({cabin}: { cabin: Cabin }) {
    const [settings, bookedDates]: [Settings, Date[]] = await Promise.all([getSettings(), getBookedDatesByCabinId(cabin.id)])

    return (
        <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
            <DateSelector settings={settings} bookedDates={bookedDates} cabin={cabin}/>
            <ReservationForm cabin={cabin}/>
        </div>
    );
}

export default Reservation;