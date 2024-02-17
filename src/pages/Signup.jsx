import { useNavigate } from "react-router-dom"
import styled from "styled-components";
import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm";
import { IoMdArrowRoundBack } from "react-icons/io";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 50rem;
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

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 1.7rem;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: var(--color-grey-50);
  
  &:hover {
    background-color: var(--color-brand-500);
    color: var(--color-grey-0);
    transition: all 0.3s ease-in-out;
    box-shadow: 0 0 10px var(--color-brand-300);
  }
`;



function Signup() {
  const navigate = useNavigate();
  return <LoginLayout>
    <Btn onClick={() => navigate(-1)}><IoMdArrowRoundBack /> Back</Btn>
    <Heading as="h1">Sign up to your account</Heading>
    <SignupForm />
  </LoginLayout>;
}

export default Signup;