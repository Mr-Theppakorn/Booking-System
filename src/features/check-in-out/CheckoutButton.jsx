import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { isCheckout, mutate } = useCheckout();
  return (
    <Button variations="primary" size="small" onClick={() => mutate(bookingId)} disabled={isCheckout}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
