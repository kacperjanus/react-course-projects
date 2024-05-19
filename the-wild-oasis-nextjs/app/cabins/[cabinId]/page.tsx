import {getCabin, getCabins} from "@/app/_lib/data-service";
import Image from "next/image";
import {Cabin} from "@/app/Interfaces";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import {Suspense} from "react";
import {CabinDetails} from "@/app/cabins/[cabinId]/CabinDetails";

export async function generateMetadata({params}: { params: { cabinId: string } }) {
    const {name} = await getCabin(params.cabinId);

    return {title: `Cabin ${name}`}
}

export async function generateStaticParams() {
    const cabins: Cabin[] = await getCabins()
    return cabins.map((cabin: Cabin) => {
        cabinId: String(cabin.id)
    })
}

export default async function Page({params}: { params: { cabinId: string } }) {
    const cabin = await getCabin(params.cabinId)
    // const settings = await getSettings()
    // const bookedDates = await getBookedDatesByCabinId(params.cabinId)

    return (
        <div className="max-w-6xl mx-auto mt-8">
            <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
                <div className="relative scale-[1.15] -translate-x-3">
                    <Image fill className="object-cover" src={cabin.image} alt={`Cabin ${cabin.name}`}/>
                </div>

                <CabinDetails cabin={cabin}/>
            </div>

            <div>
                <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
                    Reserve {cabin.name} today. Pay on arrival.
                </h2>

                <Suspense fallback={<Spinner/>}>
                    <Reservation cabin={cabin}/>
                </Suspense>
            </div>
        </div>
    );
}
