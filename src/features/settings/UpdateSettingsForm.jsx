import { useSettings } from "../../features/settings/useSettings";
import { useEditSettings } from "../../features/settings/useEditSettings";
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";

function UpdateSettingsForm() {
  const { isLoading, settings = {} } = useSettings();
  const { mutate, isCreating } = useEditSettings();

  const { minBooking, maxBooking, maxGuestBooking, breakfastPrice } = settings

  if (isLoading) {
    return <Spinner />
  }

  const handleSettings = (e, field) => {
    const { value } = e.target;
    if (!value) return;
    mutate({ [field]: value });
  }

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' disabled={isCreating} defaultValue={minBooking}
          onBlur={(e) => handleSettings(e, "minBooking")}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' disabled={isCreating} defaultValue={maxBooking} onBlur={(e) => handleSettings(e, "maxBooking")} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' disabled={isCreating} defaultValue={maxGuestBooking} onBlur={(e) => handleSettings(e, "maxGuestBooking")} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' disabled={isCreating} defaultValue={breakfastPrice} onBlur={(e) => handleSettings(e, "breakfastPrice")} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
