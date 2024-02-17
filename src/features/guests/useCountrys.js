import { useQuery } from '@tanstack/react-query'
import { getCountries } from '../../services/apiGuests'

export function useCountrys() {
    const { isLoading, data: countries, error } = useQuery({
        queryKey: ['country'],
        queryFn: getCountries,
    });

    return { isLoadingCountries: isLoading, countries, error };
}