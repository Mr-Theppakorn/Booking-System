import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
  @media screen and (max-width: 550px) {
    grid-template-columns: 40rem;
  }
  @media screen and (max-width: 450px) {
    grid-template-columns: 35rem;
  }
`;

function Login() {

  return <LoginLayout>
    <Heading as="h1">Log in to your account</Heading>
    <LoginForm />
  </LoginLayout>;
}

export default Login;
