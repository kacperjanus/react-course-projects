"use client"

import {differenceInDays, isPast, isSameDay, isWithinInterval} from "date-fns";
import {DateBefore, DateRange, DayPicker, Matcher} from "react-day-picker";
import "react-day-picker/dist/style.css";
import {Cabin, Settings} from "@/app/Interfaces";
import {useReservation} from "@/app/_components/ReservationContext";

function isAlreadyBooked(range: DateRange, datesArr: Date[]) {
    return (
        range?.from &&
        range?.to &&
        datesArr.some((date) =>
            isWithinInterval(date, {start: range.from!, end: range.to!})
        )
    );
}

interface DateSelectorProps {
    cabin: Cabin,
    settings: Settings,
    bookedDates: Date[]
}

function DateSelector({cabin, settings, bookedDates}: DateSelectorProps) {
    const {regularPrice, discount, maxCapacity} = cabin

    const {range, setRange, resetRange} = useReservation();

    const displayRange: DateRange = isAlreadyBooked(range, bookedDates) ? {from: undefined, to: undefined} : range

    const numNights = range?.to && range?.from ? differenceInDays(range.to, range.from) : 0
    const cabinPrice = numNights * (regularPrice - discount);
    // SETTINGS
    const {minBookingLength, maxBookingLength} = settings;

    return (
        <div className="flex flex-col justify-between">
            <DayPicker
                className="pt-12 place-self-center"
                mode="range"
                onSelect={(range) => setRange(range!)}
                selected={displayRange}
                min={minBookingLength + 1}
                max={maxBookingLength}
                fromMonth={new Date()}
                fromDate={new Date()}
                toYear={new Date().getFullYear() + 5}
                captionLayout="dropdown"
                numberOfMonths={2}
                disabled={(curDate) => isPast(curDate) || bookedDates.some((date) => isSameDay(date, curDate))}
            />

            <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
                <div className="flex items-baseline gap-6">
                    <p className="flex gap-2 items-baseline">
                        {discount > 0 ? (
                            <>
                                <span className="text-2xl">${regularPrice - discount}</span>
                                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
                            </>
                        ) : (
                            <span className="text-2xl">${regularPrice}</span>
                        )}
                        <span className="">/night</span>
                    </p>
                    {numNights ? (
                        <>
                            <p className="bg-accent-600 px-3 py-2 text-2xl">
                                <span>&times;</span> <span>{numNights}</span>
                            </p>
                            <p>
                                <span className="text-lg font-bold uppercase">Total</span>{" "}
                                <span className="text-2xl font-semibold">${cabinPrice}</span>
                            </p>
                        </>
                    ) : null}
                </div>

                {range?.from || range?.to ? (
                    <button
                        className="border border-primary-800 py-2 px-4 text-sm font-semibold"
                        onClick={() => resetRange()}
                    >
                        Clear
                    </button>
                ) : null}
            </div>
        </div>
    );
}

export default DateSelector;
