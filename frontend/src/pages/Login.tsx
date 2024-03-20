import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { validateLoginForm } from "@/lib/api-client";
import { TLoginUserData } from "@/lib/types";
import { spinnerSm } from "@/assets/images";

const ErrorMessage = ({ id, message }: { id: string; message: string }) => {
  return (
    <p
      id={id}
      className="text-destructive text-[14px] font-semibold absolute -bottom-6 right-1/2 translate-x-1/2"
      aria-live="polite"
      aria-atomic="true"
    >
      <i>{message}</i>
    </p>
  );
};

type TLoginError = string;

const Login = () => {
  const [formData, setFormData] = useState<TLoginUserData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<TLoginError>("");
  const [isValidatingForm, setIsValidatingForm] = useState<boolean>(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsValidatingForm(true);
      const response = await validateLoginForm(formData);
      if (response.error) {
        setError(response.error);
      } else if (response.user) {
        dispatch({ type: "login", payload: response.user });
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsValidatingForm(false);
    }
  }

  return (
    <main className="grid place-content-center h-[100svh]">
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-50 bg-[radial-gradient(#e6e6e6_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <Card className="w-[350px]">
        <CardHeader>
          <Logo />
          <CardTitle className="text-center text-xl sm:text-2xl">
            Log In
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} aria-describedby="login-error">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="username"
                  placeholder="coolname@mail.com"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                {error && <ErrorMessage id="login-error" message={error} />}
                {!isValidatingForm && (
                  <Button type="submit" className="w-full mt-1">
                    Log in
                  </Button>
                )}
                {isValidatingForm && (
                  <Button className="w-full mt-1 flex space-x-1" disabled>
                    <img className="block" src={spinnerSm} alt="" />
                    <span className="block">Please wait</span>
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p>Don't have an account?</p>
          <Button variant={"link"} className="px-1">
            <Link to={"/signup"}>Sign Up</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Login;
