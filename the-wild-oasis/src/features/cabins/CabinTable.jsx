import { useCabins } from "./useCabins";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
    const { isLoading, cabins } = useCabins();

    const [searchParams] = useSearchParams();

    const filterValue = searchParams.get("discount") || "all";
    const sortByValue = searchParams.get("sortBy") || "name-asc";
    let filteredCabins;
    if (filterValue === "all") filteredCabins = cabins;
    if (filterValue === "with-discount")
        filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);
    if (filterValue === "no-discount")
        filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);

    const [field, direction] = sortByValue.split("-");
    const modifier = direction === "asc" ? 1 : -1;

    let sortedCabins = filteredCabins;
    sortedCabins = sortedCabins?.sort(
        (a, b) => modifier * (a[field] - b[field])
    );

    if (isLoading) return <Spinner />;

    return (
        <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header>
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>
                <Table.Body
                    data={sortedCabins}
                    render={(cabin) => (
                        <CabinRow cabin={cabin} key={cabin.id} />
                    )}
                />
            </Table>
        </Menus>
    );
}

export default CabinTable;
