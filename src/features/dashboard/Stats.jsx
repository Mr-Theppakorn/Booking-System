import Stat from "./Stat";
import { FaAddressBook } from "react-icons/fa";
import { MdCalendarMonth } from "react-icons/md";
import { BsBookmarkStarFill } from "react-icons/bs";
import { TfiStatsUp } from "react-icons/tfi";
import styled from 'styled-components'


export const Stats = ({ bookings, confirmedStays, numDays, cabins }) => {
    const totalBookings = bookings.length;
    const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
    const totalCheckin = confirmedStays.length;
    const occupation =
        confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
        (numDays * cabins);

    return (
        <>
            <Stat
                title="Bookings"
                color="blue"
                icon={<FaAddressBook />}
                value={totalBookings}
            />
            <Stat
                title="Sales"
                color="green"
                icon={<BsBookmarkStarFill />}
                value={sales}
            />
            <Stat
                title="Check in"
                color="indigo"
                icon={<MdCalendarMonth />}
                value={totalCheckin}
            />
            <Stat
                title="Occupancy rate"
                color="yellow"
                icon={<TfiStatsUp />}
                value={Math.round(occupation * 100) + '%'}
            />
        </>
    );
};
