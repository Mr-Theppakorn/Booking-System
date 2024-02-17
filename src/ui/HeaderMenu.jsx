import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
      display: flex;
      gap: 0.4rem;
`

export default function HeaderMenu() {
    return (
        <StyledHeaderMenu>
            <li>
                <DarkModeToggle />
            </li>
            <li>
                <Logout />
            </li>
        </StyledHeaderMenu>
    )
}
