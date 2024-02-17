import { useState } from "react";
import { useLogin } from "./useLogin";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, onLogin } = useLogin();
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;

    }
    onLogin({ email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        }
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          placeholder="Email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button variations="primary" size="large" disabled={isLoading}>{isLoading ? <SpinnerMini /> : "Login"}</Button>
        <Button variations="danger" size="large" disabled={isLoading} onClick={() => navigate("/signup")}>Sign up</Button>
      </FormRowVertical>
    </Form >
  );
}

export default LoginForm;
