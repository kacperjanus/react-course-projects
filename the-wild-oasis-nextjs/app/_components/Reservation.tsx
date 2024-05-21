import React from 'react';
import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import {Cabin, Settings} from "@/app/Interfaces";
import {getBookedDatesByCabinId, getSettings} from "@/app/_lib/data-service";
import {auth} from "@/app/_lib/auth";
import LoginMessage from "@/app/_components/LoginMessage";

async function Reservation({cabin}: { cabin: Cabin }) {
    const [settings, bookedDates]: [Settings, Date[]] = await Promise.all([getSettings(), getBookedDatesByCabinId(cabin.id)])
    const session = await auth()
    
    return (
        <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
            <DateSelector settings={settings} bookedDates={bookedDates} cabin={cabin}/>
            {session ? <ReservationForm cabin={cabin} user={session.user}/> : <LoginMessage/>}
        </div>
    );
}

export default Reservation;