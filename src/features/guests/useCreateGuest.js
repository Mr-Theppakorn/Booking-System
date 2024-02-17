import { useMutation } from '@tanstack/react-query'
import { createGuest } from '../../services/apiGuests';
import toast from 'react-hot-toast';

export function useCreateGuest() {
    const { mutate, isCreating } = useMutation({
        mutationFn: createGuest,
        onSuccess: () => {
            toast.success("Guest created successfully");

        },
        onError: (err) => toast.error(err.message)
    });

    return { isCreating, mutate };
}