import { useQuery } from '@tanstack/react-query'
import { getGuests } from '../../services/apiGuests'

export function useGuests() {
    const { isLoading: isLoadingGuests, data: guests, error } = useQuery({
        queryKey: ['guests'],
        queryFn: getGuests,
    });

    return { isLoadingGuests, guests, error };
}