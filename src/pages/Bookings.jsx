import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import AddBooking from "../features/bookings/AddBooking";

function Bookings() {
  return (
    <>
      <Row type="horizontal" style={{ marginBottom: "1rem", display: "flex" }}>
        <Heading as="h1" >All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <div style={{ overflow: "hidden" }}>
        <BookingTable />
      </div>
      <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end" }}> <AddBooking /></div>
    </>
  );
}

export default Bookings;
