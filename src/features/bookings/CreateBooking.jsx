import { useState } from 'react';
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import { differenceInDays, isBefore, isDate, startOfDay } from 'date-fns';
import { useGuests } from './useGuests';
import Spinner from '../../ui/Spinner';
import { useCabin } from '../cabins/useCabin';
import { useSettings } from '../settings/useSettings';
import { useCreateBooking } from './useCreateBooking';
import Checkbox from '../../ui/Checkbox'
import toast from 'react-hot-toast';

const StyledSelect = styled.select`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
`;

const Flex = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
`;

function CreateBooking({ cabinEdit = {}, onClose }) {
    const { id: editId, ...editValues } = cabinEdit;
    const isEdit = Boolean(editId);
    const { register, handleSubmit, reset, getValues, formState } = useForm({ defaultValues: isEdit ? editValues : {} });
    const { errors } = formState;
    const [addBreakfast, setAddBreakfast] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    const { isLoadingGuests, guests } = useGuests();
    const { isLoading, cabins } = useCabin();
    const { isLoading: isSettings, settings } = useSettings();

    const { isCreating, mutate } = useCreateBooking();
    //const { editCabin, isLoading } = useEditCabin();

    if (isLoadingGuests || isLoading || isSettings) {
        return <Spinner />
    }
    //const isWorking = isCreating || isLoading;

    const onSubmit = (data) => {
        const numNights = differenceInDays(
            new Date(data.endDate),
            new Date(data.startDate)
        );
        const today = startOfDay();
        if (isBefore(new Date(data.startDate), today)) {
            toast.error("You can't start a booking before today");
            return
        }
        if (numNights < 1) {
            toast.error('Start date must be before end date');
            return;
        }
        if (numNights < settings.minBooking) {
            toast.error(
                `Minimum nights per booking are ${settings.minBooking}`
            );
            return
        }
        if (numNights > settings.maxBooking) {
            toast.error(
                `Maximum nights per booking are ${settings.maxBooking}`
            );
            return
        }
        const reservedCabin = cabins
            .filter((cabin) => cabin.id === Number(data.cabinId))
            .at(0);
        console.log(reservedCabin);
        const cabinPrice =
            (reservedCabin.regularPrice - reservedCabin.discount) * numNights;

        const extrasPrice = addBreakfast
            ? settings.breakfastPrice * numNights * data.numGuests
            : 0;

        const totalPrice = cabinPrice + extrasPrice;

        const newBooking = {
            ...data,
            cabinPrice,
            extrasPrice,
            totalPrice,
            isPaid,
            numNights,
            cabinId: Number(data.cabinId),
            numGuests: Number(data.numGuests),
            guestId: Number(data.guestId),
            hasBreakfast: addBreakfast,
            status: 'unconfirmed',
            startDate: new Date(data.startDate).toISOString(),
            endDate: new Date(data.endDate).toISOString(),
        };
        mutate(newBooking, {
            onSuccess: () => {
                reset();
                onClose?.();
            }
        });

        {/*const image = typeof data.image === "string" ? data.image : data.image[0];
        if (isEdit) {
            editCabin({ newCabinData: { ...data, image }, id: editId }, {
                onSuccess: () => {
                    reset();
                    onClose?.();
                }
            });
        } else {
            mutate({ ...data, image }, {
                onSuccess: () => {
                    reset();
                    onClose?.();
                }
            });
        }
    */}
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} type={onClose ? 'modal' : 'regular'}>
            <FormRow label="Start Date" error={errors?.startDate?.message}>
                <Input type="date" id="startDate" defaultValue=""  {...register("startDate", { required: "Please choose start date" }, { validate: isDate(getValues().startDate) || "Your start date is not valid" })} />
                {/*<Input
                    type="date"
                    id="startDate"
                    defaultValue=""
                    {...register("startDate", {
                        required: "กรุณาเลือกวันที่เริ่มต้น",
                        validate: {
                            futureDate: (value) => {
                                const selectedDate = new Date(value);
                                const currentDate = new Date();
                                if (selectedDate < currentDate) {
                                    return "กรุณาเลือกวันที่ในอนาคตเท่านั้น";
                                }
                                return true;
                            },
                        },
                    })}
                />*/}
            </FormRow>

            <FormRow label="End Date" error={errors?.endDate?.message}>
                <Input type="date" id="endDate" defaultValue=""  {...register("endDate", { required: "Please choose end date" }, { validate: isDate(getValues().endDate) || "Your start date is not valid" })} />
            </FormRow>

            <FormRow label="Select Guest" error={errors?.guestId?.message}>
                <StyledSelect id="guestId"
                    {...register("guestId",
                        {
                            validate: (value) => value > 0 || "Please select guest ",
                        })}
                >
                    <option value="">Select Guest</option>
                    {guests.map((guest) => (
                        <option key={guest.id} value={guest.id}>{guest.fullName}</option>
                    ))}
                </StyledSelect>
            </FormRow>

            <FormRow label="Number of guests" error={errors?.numGuests?.message}>
                <Input type="number" id="numGuests"
                    {...register("numGuests",
                        {
                            required: "this field is required",
                            min: {
                                value: 1,
                                message: "Capacity should be at least 1"
                            },
                            max: {
                                value: settings.maxGuestBooking,
                                message: `Capacity should be at most ${settings.maxGuestBooking}`
                            }

                        })}
                />
            </FormRow>

            <FormRow label="Select Cabin" error={errors?.cabinId?.message}>
                <StyledSelect id="cabinId"
                    {...register("cabinId",
                        {
                            validate: (value) => value !== "" || "Please select cabin ",
                        })}
                >
                    <option value="">Select Cabin</option>
                    {cabins.map((cabin) => (
                        <option key={cabin.id} value={cabin.id}>{cabin.name}</option>
                    ))}
                </StyledSelect>
            </FormRow>
            <FormRow label="Description for booking" error={errors?.description?.message}>
                <Textarea type="text" id="observations" defaultValue=""
                    {...register("observations")} />
            </FormRow>
            <Flex>
                <FormRow>
                    <Checkbox
                        id="breakfast"
                        onChange={() => setAddBreakfast((e) => !e)}

                    >
                        I want breakfast with my booking
                    </Checkbox>
                </FormRow>
                <FormRow>
                    <Checkbox
                        id="paid"
                        onChange={() => setIsPaid((e) => !e)}
                    >
                        This booking is paid
                    </Checkbox>
                </FormRow>
            </Flex>
            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variations="secondary" size="medium" type="reset" onClick={() => onClose?.()}>
                    Cancel
                </Button>
                <Button variations="primary" size="medium" >{isEdit ? "Edit Cabin" : "Add Booking"}</Button>
            </FormRow>
        </Form >
    );
}

export default CreateBooking;