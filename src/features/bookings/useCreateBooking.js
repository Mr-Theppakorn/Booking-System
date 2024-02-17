import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useCreateBooking() {
    const queryClient = useQueryClient();
    const { mutate, isCreating } = useMutation({
        mutationFn: createBooking,
        onSuccess: () => {
            toast.success("New booking created successfully");
            queryClient.invalidateQueries({
                queryKey: ["bookings"]
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return { isCreating, mutate };
}