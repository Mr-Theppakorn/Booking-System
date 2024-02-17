import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm";
import CreateNewGuest from "../features/guests/CreateNewGuest";

function NewUsers() {
  return (
    <>
      <Heading style={{ marginBottom: "2rem" }} as="h1">Create a new guests</Heading>
      <CreateNewGuest />
    </>
  )
}

export default NewUsers;
