import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Cabins() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <p>Filter/sort</p>
            </Row>

            <CabinTable />
        </>
    );
}

export default Cabins;
