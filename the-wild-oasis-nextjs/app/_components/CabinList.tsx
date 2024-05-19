import React from 'react';
import CabinCard from "@/app/_components/CabinCard";
import {Cabin} from "@/app/Interfaces"
import {getCabins} from "@/app/_lib/data-service";

async function CabinList({filter}: { filter: string | string[] }) {
    const cabins: Cabin[] = await getCabins()

    if (!cabins.length) return null

    let displayedCabins: Cabin[]

    switch (filter) {
        case "all":
            displayedCabins = cabins;
            break;
        case "small":
            displayedCabins = cabins.filter((cabin: Cabin) => cabin.maxCapacity <= 3);
            break;
        case "medium":
            displayedCabins = cabins.filter((cabin: Cabin) => cabin.maxCapacity > 3 && cabin.maxCapacity <= 7);
            break;
        case "large":
            displayedCabins = cabins.filter((cabin: Cabin) => cabin.maxCapacity >= 8);
            break;
        default:
            displayedCabins = cabins;
    }

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
            {displayedCabins.map((cabin: Cabin) => (
                <CabinCard cabin={cabin} key={cabin.id}/>
            ))}
        </div>
    )
}

export default CabinList;