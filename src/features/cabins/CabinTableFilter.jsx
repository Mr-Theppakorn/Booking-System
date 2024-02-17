import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'
import TableOperations from '../../ui/TableOperations'

export default function CabinTableFilter() {
    return (
        <TableOperations>
            <Filter filterField="discount"
                options={[
                    { value: 'all', label: 'All' },
                    { value: 'no-discount', label: 'No Discount' },
                    { value: 'with-discount', label: 'With Discount' }
                ]}
            />
            <SortBy options={[
                { value: 'name-asc', label: 'Sort by name (A-Z)' },
                { value: 'name-desc', label: 'Sort by name (Z-A)' },
                { value: 'regularPrice-asc', label: 'Sort by price (low)' },
                { value: 'regularPrice-desc', label: 'Sort by price (high)' },
                { value: 'maxCapacity-asc', label: 'Sort by Capacity (low)' },
                { value: 'maxCapacity-desc', label: 'Sort by Capacity (high)' },
            ]} />
        </TableOperations>
    )
}
