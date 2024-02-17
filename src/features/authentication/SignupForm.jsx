import styled from 'styled-components'
import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { getCountries } from "../../services/apiGuests";
import FormRowVertical from '../../ui/FormRowVertical';

// Email regex: /\S+@\S+\.\S+/

const Flex = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
`

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { isLoading, createUser, data } = useSignup();
  const { errors } = formState;

  const onSubmit = ({ email, password, fullName }) => {
    createUser({ email, password, fullName });
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {!data?.user ? <>
        <FormRowVertical label="Full name" error={errors?.fullName?.message}>
          <Input type="text" id="fullName" disabled={isLoading}
            {...register("fullName", { required: "This field is required", minLength: { value: 3, message: "Full name needs a minimum of 3 characters" } })}
          />
        </FormRowVertical>

        <FormRowVertical label="Email address" error={errors?.email?.message}>
          <Input type="email" id="email" disabled={isLoading}
            {...register("email", { required: "This field is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } })}
          />
        </FormRowVertical>

        <FormRowVertical label="Password (min 6 characters)" error={errors?.password?.message}>
          <Input type="password" id="password" disabled={isLoading}
            {...register("password", { required: "This field is required", minLength: { value: 6, message: "Password needs a minimum of 6 characters" } })}
          />
        </FormRowVertical>

        <FormRowVertical label="Repeat password" error={errors?.passwordConfirm?.message}>
          <Input type="password" id="passwordConfirm" disabled={isLoading}
            {...register("passwordConfirm", { required: "This field is required", validate: (value) => value === getValues("password") || "Passwords need to match" })}
          />
          { }
        </FormRowVertical>

        <Flex>
          {/* type is an HTML attribute! */}
          <Button variations="primary" size="large" disabled={isLoading}>Create new user</Button>
        </Flex>
      </> : <p>Your registration is complete. Please confirm your email.</p>}

    </Form>
  );
}

export default SignupForm;
