import { styled } from 'styled-components'
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const StyledAppLayout = styled.div`
   display: grid;
   grid-template-columns: 26rem 1fr;
   grid-template-rows: auto 1fr;
   height: 100vh;
   // media queries
   @media screen and (max-width: 768px) {
       grid-template-columns: 40px 1fr;
   }
  
`

const Main = styled.main`
    background-color: var(--color-grey-50);
    padding: 4rem;
    overflow: scroll;
    @media screen and (max-width: 400px) {
        padding: 0.5rem;;
   }
`

const Container = styled.div`
    max-width: 120rem;
    margin: 0 auto;
    flex-direction: column;
    gap: 2rem;
`

const AppLayout = () => {
    return (
        <StyledAppLayout>
            <Header />
            <Sidebar />
            <Main>
                <Container><Outlet /></Container>
            </Main>
        </StyledAppLayout>
    );
}

export default AppLayout;
