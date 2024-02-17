import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast';
import { deleteBooking } from '../../services/apiBookings'

export function useBookingDelete() {
    const queryClient = useQueryClient();
    const { isLoading: isDelete, mutate: onDelete } = useMutation({
        mutationFn: (id) => deleteBooking(id),
        onSuccess: (id) => {
            toast.success(`Booking #${id} deleted successfully`);
            queryClient.invalidateQueries({ active: true });
        },
        onError: (err) => toast.error(err.message)
    });

    return { isDelete, onDelete };
}