import { subDays } from 'date-fns';
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../services/apiBookings';

export function useRecentStays() {
    const [searchParams] = useSearchParams();

    const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));
    const queryDate = subDays(new Date(), numDays).toDateString();

    const { isLoading: isLoadingStays, data: stays } = useQuery({
        queryFn: () => getStaysAfterDate(queryDate),
        queryKey: ['stays', `last-${numDays}`],
    });

    const confirmedStays = stays?.filter((stays) => stays.status === 'checked-in' || stays.status === 'checked-out')

    return { isLoadingStays, confirmedStays, numDays };
}