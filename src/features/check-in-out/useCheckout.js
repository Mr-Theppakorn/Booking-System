import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast';
import { updateBooking } from '../../services/apiBookings'

export function useCheckout() {
    const queryClient = useQueryClient();
    const { isLoading: isCheckout, mutate } = useMutation({
        mutationFn: (id) => updateBooking(id, { status: "checked-out" }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} checkout successfully`);
            queryClient.invalidateQueries({ active: true });
        },
        onError: (err) => toast.error(err.message)
    });

    return { isCheckout, mutate };
}