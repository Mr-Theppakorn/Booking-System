import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>
      <hr style={{ margin: "1rem" }} />
      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <div style={{ marginTop: "2rem" }}>
        <Row>
          <Heading as="h3">Update password</Heading>
          <UpdatePasswordForm />
        </Row>
      </div>
    </>
  );
}

export default Account;
