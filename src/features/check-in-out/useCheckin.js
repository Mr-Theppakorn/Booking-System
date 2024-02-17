import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { updateBooking } from '../../services/apiBookings'

export function useCheckin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { isLoading: isChecking, mutate } = useMutation({
        mutationFn: ({ bookingId, breakfast }) => updateBooking(bookingId, { status: "checked-in", isPaid: true, ...breakfast, }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} checked-in successfully`);
            queryClient.invalidateQueries({ active: true });
            navigate('/bookings');
        },
        onError: (err) => toast.error(err.message)
    });

    return { isChecking, mutate };
}