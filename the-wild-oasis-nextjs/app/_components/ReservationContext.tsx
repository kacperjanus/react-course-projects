'use client'

import React, {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {DateRange} from "react-day-picker";

const initialState: DateRange = {
    from: undefined,
    to: undefined
}

const ReservationContext = createContext(initialState);


function ReservationProvider({children}: { children: React.ReactNode }) {
    const [range, setRange] = useState<DateRange>(initialState);

    const resetRange = () => setRange(initialState)

    //@ts-ignore
    return <ReservationContext.Provider value={{range, setRange, resetRange}}>{children}</ReservationContext.Provider>
}

function useReservation(): { range: DateRange, setRange: Dispatch<SetStateAction<DateRange>>, resetRange: () => void } {
    //@ts-ignore
    const context: {
        range: DateRange,
        setRange: Dispatch<SetStateAction<DateRange>>,
        resetRange: () => void
    } = useContext(ReservationContext);

    if (context === undefined) {
        throw new Error("Context was used outside provider")
    }
    return context;
}

export {ReservationProvider, useReservation};