import {
  TextInput,
  Label,
  Checkbox,
  Button,
  Alert,
  Card,
} from "flowbite-react";
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signIn } from "../firebase_setup/firebase";
import Input from "./Input";
import image from "../assets/logo.png";
import AuthContext from "../AuthContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const [validUser, setValidUser] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    const res = await signIn(email, password);
    if (res.error) seterror(res.error);
    else setValidUser(true);
  };

  if (user) {
    navigate("/");
    return null;
  }
  return (
    <div className="flex w-screen h-screen justify-center">
      <div className="max-w-sm self-center w-full">
        <Card>
          <div className="">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <img src={image} alt="" className="h-auto w-auto" />

              {error ? (
                <Alert color="failure">
                  <span>
                    <span className="font-medium">Login Failed!</span> Incorrect
                    Username or Password. Try again, or create an account.
                  </span>
                </Alert>
              ) : null}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Your email" />
                </div>
                <TextInput
                  id="email1"
                  type="email"
                  placeholder="name@example.com"
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password1" value="Your password" />
                </div>
                <TextInput
                  id="password1"
                  type="password"
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <Button type="submit" value="submit">
                Submit
              </Button>
              <p>
                Need an Account? <Link to={"/signup"}>Signup</Link>
              </p>
              <p>
                <Link to={"/reset"}>Reset Password</Link>
              </p>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signin;
