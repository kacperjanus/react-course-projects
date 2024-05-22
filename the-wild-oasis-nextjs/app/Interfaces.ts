export interface Cabin {
    id: number;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    image: string,
    description: string,
}

export interface Booking {
    id: number;
    guestId: number;
    startDate: string;
    endDate: string;
    numNights: number;
    totalPrice: number;
    numGuests: number;
    status: string;
    created_at: string;
    // cabins: { name, image },
    cabins: { name: string, image: string };
    cabinId: number;
    observations?: string;
}

export interface Settings {
    id: number,
    createdAt: string,
    minBookingLength: number,
    maxBookingLength: number,
    maxGuestPerBooking: number,
    breakfastPrice: number,
}

export interface Guest {
    id: number,
    created_at: string,
    fullName: string,
    email: string,
    nationalID: string,
    nationality: string,
    countryFlag: string,
}