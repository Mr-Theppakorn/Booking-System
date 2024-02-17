import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useDelete() {
    const queryClient = useQueryClient();
    const { isLoading, mutate } = useMutation({
        mutationFn: (id) => deleteCabin(id),
        onSuccess: () => {
            toast.success('Cabin has been successfully')
            queryClient.invalidateQueries({
                queryKey: ['cabins'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return { isLoading, mutate };
}