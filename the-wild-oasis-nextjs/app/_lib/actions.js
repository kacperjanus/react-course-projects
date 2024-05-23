"use server";

import {auth, signIn, signOut} from "./auth";
import {supabase} from "@/app/_lib/supabase";
import {revalidatePath} from "next/cache";
import {getBookings} from "@/app/_lib/data-service";
import {redirect} from "next/navigation";

export async function updateGuest(formData) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    const nationalID = formData.get("nationalID");
    const [nationality, countryFlag] = formData.get("nationality").split("%");

    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error("Please provide valid national ID")
    const updateData = {nationality, countryFlag, nationalID};


    const {data, error} = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', session.user.guestId)

    if (error) {
        console.error(error);
        throw new Error('Guest could not be updated');
    }

    revalidatePath('/account/profile')
}

export async function signInAction() {
    await signIn("google", {redirectTo: "/account"})
}

export async function signOutAction() {
    await signOut({redirectTo: "/"})
}

export async function deleteReservation(bookingId) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingsId = guestBookings.map(booking => booking.id);

    if (!guestBookingsId.includes(bookingId)) throw new Error("You're not allowed to delete this booking")

    const {data, error} = await supabase.from('bookings').delete().eq('id', bookingId);

    if (error) {
        console.error(error);
        throw new Error('Booking could not be deleted');
    }

    revalidatePath('/account/reservations')
}

export async function updateReservation(updatedFields) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingsId = guestBookings.map(booking => booking.id);

    console.log(guestBookingsId)
    if (!guestBookingsId.includes(Number(updatedFields.get("bookingId")))) throw new Error("You're not allowed to update this booking")

    const {data, error} = await supabase
        .from('bookings')
        .update({
            numGuests: updatedFields.get("numGuests"),
            observations: updatedFields.get("observations").slice(0, 1000)
        })
        .eq('id', updatedFields.get("bookingId"))
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error('Booking could not be updated');
    }

    revalidatePath(`/account/reservations/edit/${updatedFields.get("bookingId")}`)
    revalidatePath(`/account/reservations`)
    redirect("/account/reservations")
}

export async function createBooking(bookingData, formData) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    const newBooking = {
        ...bookingData,
        guestId: session.user.guestId,
        numGuests: Number(formData.get("numGuest")),
        observations: formData.get("observations").slice(0, 1000),
        extrasPrice: 0,
        totalPrice: bookingData.cabinPrice,
        status: "unconfirmed",
        isPaid: false,
        hasBreakfast: false,
    }

    const {error} = await supabase
        .from('bookings')
        .insert([newBooking])

    if (error) {
        console.error(error);
        throw new Error('Booking could not be created');
    }

    revalidatePath(`/cabins/${bookingData.cabinId}`)
    redirect('/cabins/thankyou')
}