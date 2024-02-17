import styled from "styled-components";
import { useBooking } from './useBooking'
import { useNavigate } from 'react-router-dom'
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import { useCheckout } from "../check-in-out/useCheckout";
import { FaSignOutAlt } from "react-icons/fa";
import { useBookingDelete } from "./useBookingDelete";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, booking } = useBooking();
  const { isCheckout, mutate } = useCheckout();
  const { isDelete, onDelete } = useBookingDelete();
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  if (isLoading) {
    return <Spinner />
  }
  const { id, status } = booking;


  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  function coverted(num) {
    const x = num / 2.54;
    const y = x / 12
    return y;
  }


  return (
    <>
      <Row type="horizontal">
        <HeadingGroup style={{ marginBottom: '2rem' }} >
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText style={{ marginBottom: '2rem' }} onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && <Button variation="primary" size="large" onClick={() => navigate(`/checkin/${id}`)}>
          Check in
        </Button>}
        {status === "checked-in" && (
          <Button variations="primary" size="large" onClick={() => mutate(id)} disabled={isCheckout}>
            Check out
          </Button>
        )}
        <Modal>
          <Modal.Open opens="delete">
            <Button variations="danger" size="large">
              Delete
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete resourceName="booking" onConfirm={() => onDelete(id, { onSettled: () => navigate('/bookings') })} disabled={isDelete} />
          </Modal.Window>
        </Modal>
        <Button size="large" variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
