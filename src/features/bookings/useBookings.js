import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
    const queryClient = useQueryClient();
    const [searchParams, setSearchParams] = useSearchParams();

    // filter
    const filterBookings = searchParams.get("status");

    const filter = !filterBookings || filterBookings === "all" ? null : { field: 'status', value: filterBookings }

    // sort by

    const sortByRaw = searchParams.get("sortBy");
    let sortBy = null;
    if (sortByRaw) {
        const [field, direction] = sortByRaw.split('-');
        sortBy = { field, direction }
    }
    const page = !searchParams.get('page') ? 1 : parseInt(searchParams.get('page'))

    const { isLoading, data: { data: bookings, count } = {}, error } = useQuery(
        ['bookings', filter, sortBy, page],
        () => getBookings({ filter, sortBy, page })
    );

    const pageCount = Math.ceil(count / 10);
    // pre fetch data
    if (page < pageCount) {
        queryClient.prefetchQuery(['bookings', filter, sortBy, page + 1], () => getBookings({ filter, sortBy, page: page + 1 }));
    }

    if (page > 1) {
        queryClient.prefetchQuery(['bookings', filter, sortBy, page - 1], () => getBookings({ filter, sortBy, page: page - 1 }));
    }


    return { isLoading, bookings, error, count };
}