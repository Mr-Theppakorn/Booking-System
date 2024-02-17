import { useEffect } from "react";
import { useCurrentUser } from "../features/authentication/useCurrentUser"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Spinner from "./Spinner";


const Full = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`

function ProtectedRouteV2({ children }) {
    const navigate = useNavigate();
    const { isLoading, isAuthenticated } = useCurrentUser();

    useEffect(() => {
        if (isAuthenticated && !isLoading) navigate('/');

    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) return <Full><Spinner /></Full>

    if (!isAuthenticated) return children
}

export default ProtectedRouteV2;