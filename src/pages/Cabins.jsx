import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableFilter from "../features/cabins/CabinTableFilter";

function Cabins() {

  return (
    <>
      <Row type="horizontal">
        <Heading style={{ marginBottom: "1rem" }} as="h1">All cabins</Heading>
        <CabinTableFilter />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
