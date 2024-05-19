"use client"

import React from 'react';
import {ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

function Filter(): React.JSX.Element {
    const searchParams: ReadonlyURLSearchParams = useSearchParams()
    const router: AppRouterInstance = useRouter()
    const pathname: string = usePathname()

    const activeFilter: string = searchParams.get("capacity") ?? "all"

    function handleFilter(filter: string): void {
        const params: URLSearchParams = new URLSearchParams(searchParams);
        params.set("capacity", filter);
        router.replace(`${pathname}?${params.toString()}`, {scroll: false})
    }

    return (
        <div className="border border-primary-800 flex">
            <Button filter={"all"} handleFilter={handleFilter} activeFilter={activeFilter}>All cabins</Button>
            <Button filter={"small"} handleFilter={handleFilter} activeFilter={activeFilter}>1-3 guests</Button>
            <Button filter={"medium"} handleFilter={handleFilter} activeFilter={activeFilter}>4-7 guests</Button>
            <Button filter={"large"} handleFilter={handleFilter} activeFilter={activeFilter}>8-12 guests</Button>
        </div>
    );
}

interface ButtonProps {
    filter: string,
    handleFilter: (filter: string) => void,
    activeFilter: string,
    children: string
}

function Button({filter, handleFilter, activeFilter, children}: ButtonProps): React.JSX.Element {
    return <button
        className={`px-5 py-2 hover:bg-primary-800 ${activeFilter === filter ? "bg-primary-700 text-primary-50" : ""}`}
        onClick={() => handleFilter(filter)}>{children}</button>
}

export default Filter;