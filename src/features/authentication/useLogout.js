import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '../../services/apiAuth'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { isLoading, mutate: onLogout } = useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            queryClient.removeQueries();
            toast.success("Logged out successfully");
            navigate('/login', { replace: true });
        },
        onError: (err) => {
            console.log(err.message);
            toast.error("Something went wrong");
        }
    });

    return { isLoading, onLogout };
}