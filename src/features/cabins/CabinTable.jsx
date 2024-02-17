import { useCabin } from './useCabin'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react';
import { useDelete } from './useDelete';
import styled from "styled-components";
import Spinner from '../../ui/Spinner'
import CabinRow from "./CabinRow";
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Button from '../../ui/Button';



const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

const CabinTable = () => {
  const { isLoading, cabins, error } = useCabin();
  const [searchParams] = useSearchParams();
  const { mutate } = useDelete();
  const [selectedIds, setSelectedIds] = useState([]);

  if (isLoading) {
    return <Spinner />
  }
  const filterValue = searchParams.get('discount') || 'all';

  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins;

  if (filterValue === 'no-discount') filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  if (filterValue === 'with-discount') filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  const sortBy = searchParams.get('sortBy') || 'startDate-asc'
  const [field, direction] = sortBy.split('-');

  const modifier = direction === 'asc' ? 1 : -1;
  let sortedCabins = filteredCabins
  if (field === 'name') {
    sortedCabins = filteredCabins?.sort(
      (a, b) => a["name"].localeCompare(b["name"]) * modifier
    );
  } else {
    sortedCabins = filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);
  }


  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr 1fr">
        <Table.Header >
          <div></div>
          <div>Image</div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={sortedCabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} selectedIds={selectedIds}
          setSelectedIds={setSelectedIds} />
        } />

      </Table>
      {selectedIds.length > 0 && <Button variations="danger" size="medium" onClick={() => mutate(selectedIds)}>Delete</Button>}
    </Menus>
  );
}

export default CabinTable;

