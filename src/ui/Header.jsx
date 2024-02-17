import { styled } from 'styled-components';
import Logout from '../features/authentication/Logout';
import UserAvatar from '../features/authentication/UserAvatar';
import HeaderMenu from './HeaderMenu';

const StyledHeader = styled.header`
    background-color: var(--color-grey-100);
    padding: 1rem;
    border-bottom: 1px solid var(--color-grey-100);
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const Header = () => {
    return (
        <StyledHeader>
            <UserAvatar />
            <HeaderMenu />
        </StyledHeader>
    );
}

export default Header;
