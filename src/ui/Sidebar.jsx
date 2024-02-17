import { styled } from 'styled-components';
import Logo from './Logo'
import MainNav from './MainNav'
import Uploader from '../data/Uploader'

const StyledSidebar = styled.aside`
    background-color: var(--color-grey-100);
    padding: 2rem;
    border-right: 1px solid var(--color-grey-100);
    grid-row: 1 / -1;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    @media screen and (max-width: 768px) {
        padding: 0rem;
   }
`
const Sidebar = () => {
    return (
        <StyledSidebar>
            <Logo />
            <MainNav />
            {1 > 2 && <Uploader />}
        </StyledSidebar>
    );
}

export default Sidebar;
