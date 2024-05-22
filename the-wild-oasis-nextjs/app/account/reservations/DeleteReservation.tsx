"use client"

import {TrashIcon} from '@heroicons/react/24/solid';
import {deleteReservation} from "@/app/_lib/actions";
import {useTransition} from "react";
import SpinnerMini from "@/app/_components/SpinnerMini";

interface DeleteReservationProps {
    bookingId: number;
    onDelete: (bookingId: number) => Promise<void>;
}

function DeleteReservation({bookingId, onDelete}: DeleteReservationProps) {
    const [isPending, startTransition] = useTransition()

    function handleDeleteReservation() {
        if (confirm("Are you sure you want to delete?"))
            startTransition(() => onDelete(bookingId))
    }

    return (
        <button
            onClick={() => handleDeleteReservation()}
            className='group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900'>
            {isPending ? <span className="mx-auto"><SpinnerMini/></span> : <>
                <TrashIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors'/>
                <span className='mt-1'>Delete</span>
            </>}
        </button>
    );
}

export default DeleteReservation;
