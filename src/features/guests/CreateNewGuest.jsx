import styled from 'styled-components'
import { useForm } from "react-hook-form";
import { useCreateGuest } from "../guests/useCreateGuest";
import { useCountrys } from "./useCountrys";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from '../../ui/FormRow';
import Spinner from '../../ui/Spinner';

const StyledSelect = styled.select`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  width: 100%;

`;

const Flex = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 3rem;
  margin-top: 2rem;
`

function CreateNewGuest() {
    const { register, formState, handleSubmit, reset } = useForm();
    const { isLoadingCountries, countries } = useCountrys();
    const { isCreating, mutate } = useCreateGuest();
    const { errors } = formState;

    if (isLoadingCountries) {
        return <Spinner />
    }
    const onSubmit = (data) => {
        const country = countries.find(country => data.nationality === country.name);
        const newGuest = {
            ...data,
            nationality: country.name,
            countryFlag: `https://flagcdn.com/${country.alpha2Code.toLowerCase()}.svg`
        }
        mutate(newGuest, {
            onSuccess: () => {
                reset();
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Full name" error={errors?.fullName?.message}>
                <Input type="text" id="fullName" disabled={isCreating}
                    {...register("fullName", { required: "This field is required", minLength: { value: 3, message: "Full name needs a minimum of 3 characters" } })}
                />
            </FormRow>

            <FormRow label="Email address" error={errors?.email?.message}>
                <Input type="email" id="email" disabled={isCreating}
                    {...register("email", { required: "This field is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } })}
                />
            </FormRow>

            <FormRow label="National ID" error={errors?.nationalID?.message}>
                <Input type="text" id="nationalID" disabled={isCreating}
                    {...register("nationalID", { required: "This field is required", minLength: { value: 10, message: "National ID needs a minimum of 10 characters" } })}
                />
            </FormRow>

            <FormRow label="Select your nationality" error={errors?.nationality?.message}>
                <StyledSelect id="nationality" disabled={isCreating}
                    {...register("nationality", {
                        validate: (value) => value !== "" || "Please select your nationality ",
                    })}
                >
                    <option value="">Please select your nationality</option>
                    {countries.map((country) => (
                        <option key={country.name} value={country.name}>{country.name}</option>
                    ))}
                </StyledSelect>
            </FormRow>

            <Flex>
                {/* type is an HTML attribute! */}
                <Button variations="secondary" size="large" onClick={() => reset()} disabled={isCreating}>Reset</Button>
                <Button variations="primary" size="large" disabled={isCreating}>Create new guest</Button>
            </Flex>
        </Form>
    );
}

export default CreateNewGuest;