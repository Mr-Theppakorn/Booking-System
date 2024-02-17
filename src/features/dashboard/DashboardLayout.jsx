import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings ";
import { useRecentStays } from "./useRecentStays";
import { useCabin } from "../../features/cabins/useCabin";
import Spinner from '../../ui/Spinner'
import { Stats } from "./Stats";
import SalesChart from './SalesChart'
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
  margin-top: 1rem;
  @media screen and (max-width: 1300px) {
        display: flex;
        flex-direction: column;
        gap: 1rem;
  }
`;

export default function DashboardLayout() {
  const { bookings, isLoading } = useRecentBookings();
  const { isLoadingStays, confirmedStays, numDays } = useRecentStays();
  const { cabins, isLoadingCabin } = useCabin()

  if (isLoading || isLoadingStays || isLoadingCabin) {
    return <Spinner />
  }

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabins={cabins?.length} />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  )
}
