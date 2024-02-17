import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useCurrentUser } from "./useCurrentUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user,
  } = useCurrentUser();
  const { isLoading, mutate } = useUpdateUser();
  const [fullName, setFullName] = useState(user?.user_metadata?.fullName);
  const [avatar, setAvatar] = useState(null);


  function handleSubmit(e) {
    e.preventDefault();
    mutate({ fullName, avatar });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={user?.email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isLoading}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          type="file"
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow>
        <Button variations="secondary" size="medium" type="reset" variation="secondary" disabled={isLoading}>
          Cancel
        </Button>
        <Button disabled={isLoading} variations="primary" size="large"> Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
