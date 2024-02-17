import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signup } from '../../services/apiAuth'
import toast from 'react-hot-toast';

export function useSignup() {
    const { isLoading, mutate: createUser, data } = useMutation({
        mutationFn: signup,
        onSuccess: () => {
            toast.success("Create new user successfully. Please confirm your email address");
        },
        onError: (err) => {
            console.log(err.message);
            toast.error("Create new user failed");
        }
    });

    return { isLoading, createUser, data };
}