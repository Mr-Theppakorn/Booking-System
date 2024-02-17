import styled from "styled-components";
import { useEffect, useState } from "react";
import { useBooking } from "../bookings/useBooking";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";



const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPay, setConfirmPay] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { isLoading, booking } = useBooking();
  const { isChecking, mutate } = useCheckin();
  const { isLoading: isLoadingSettings, settings } = useSettings();
  const moveBack = useMoveBack();

  useEffect(() => {
    setConfirmPay(booking?.isPaid ?? false)
  }, [booking]);

  if (isLoading || isLoadingSettings) {
    return <Spinner />
  }

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const breakfastPrice = settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPay) return;
    if (addBreakfast) {
      mutate({
        bookingId, breakfast: {
          hasBreakfast: true,
          extrasPrice: breakfastPrice,
          totalPrice: totalPrice + totalPrice
        }
      });
    } else {
      mutate({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row style={{ marginBottom: "2rem" }} type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && <Box>
        <Checkbox id="breakfast" checked={addBreakfast} onChange={() => {
          setAddBreakfast((food) => !food)
          setConfirmPay(false)
        }}>
          Want to add breakfast for {formatCurrency(breakfastPrice)}
        </Checkbox>
      </Box>}

      <Box>
        <Checkbox id="confirm" checked={confirmPay} disabled={confirmPay} onChange={() => setConfirmPay((confirm) => !confirm)}>I confirm that {guests.fullName} has paid the total amount of {!addBreakfast ? formatCurrency(totalPrice) : formatCurrency(totalPrice + breakfastPrice)}</Checkbox>
      </Box>

      <ButtonGroup>
        <Button variations={confirmPay === true ? "primary" : "secondary"} size="large" onClick={handleCheckin} disabled={!confirmPay || isChecking}>Check in booking #{bookingId}</Button>
        <Button variations="secondary" size="large" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
