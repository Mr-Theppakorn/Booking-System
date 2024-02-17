import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login } from '../../services/apiAuth'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { isLoading, mutate: onLogin, data } = useMutation({
        mutationFn: ({ email, password }) => login(email, password),
        onSuccess: (data) => {
            toast.success(`Logged in as ${data.user.email}`);
            queryClient.setQueriesData(['user'], data.user);
            navigate('/dashboard', { replace: true });
        },
        onError: (err) => {
            console.log(err.message);
            toast.error("Invalid email or password");
        }
    });

    return { isLoading, onLogin, data };
}