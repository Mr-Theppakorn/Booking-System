import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useCreateCabin() {
    const queryClient = useQueryClient();
    const { mutate, isCreating } = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success("New cabin created successfully");
            queryClient.invalidateQueries({
                queryKey: ["cabins"]
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return { isCreating, mutate };
}