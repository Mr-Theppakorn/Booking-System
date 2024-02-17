import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUser } from '../../services/apiAuth'
import toast from 'react-hot-toast';

export function useUpdateUser() {
    const queryClient = useQueryClient();
    const { isLoading, mutate } = useMutation({
        mutationFn: updateUser,
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data.user);
            toast.success("Updated successfully");
        },
        onError: (err) => {
            console.log(err.message);
            toast.error("Something went wrong");
        }
    });

    return { isLoading, mutate };
}