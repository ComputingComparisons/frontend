import {
  TextInput,
  Label,
  Checkbox,
  Button,
  Alert,
  Card,
} from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { resetPassword, signIn } from "../firebase_setup/firebase";
import Input from "./Input";
import image from "../assets/logo.png";
import AuthContext from "../AuthContext";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, seterror] = useState("");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    seterror(false);
    setSent(false);
    e.preventDefault();
    const res = await resetPassword(email);
    if (res.error) seterror(res.error);
    else setSent(true);
  };

  /**useEffect(() => {
    if (sent) {
      navigate("/");
      return null;
    }
  }, [sent]);**/

  return (
    <div className="flex w-screen h-screen justify-center">
      <div className="max-w-sm self-center w-full">
        <Card>
          <div className="">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <img src={image} alt="" className="h-auto w-auto" />
              <div className="w-full text-center">
                <h1 className=" text-xl">
                  <b>Reset Password</b>
                </h1>
                <p>We'll send a link to reset you password</p>
              </div>
              {error ? (
                <Alert color="failure">
                  <span>
                    <span className="font-medium">Reset Failed!</span> Try
                    Again.
                  </span>
                </Alert>
              ) : null}
              {sent ? (
                <Alert color="success">
                  <span>
                    <span className="font-medium">Email Sent!</span> Return to{" "}
                    <Link to={"/login"}>
                      <b className=" underline">Login</b>
                    </Link>
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
              <Button type="submit" value="submit">
                Send Email
              </Button>
              <p>
                <Link to={"/login"}>Back to Login</Link>
              </p>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
