import { useState } from "react";
import { validateFormData } from "@/lib/api-client";
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
import { spinnerSm } from "@/assets/images";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TUserData } from "@/lib/types";
import { useAuthContext } from "@/hooks/useAuthContext";

const ErrorMessage = ({ id, message }: { id: string; message: string }) => {
  return (
    <p
      id={id}
      className="text-destructive text-xs font-semibold absolute -bottom-4 left-0"
      aria-live="polite"
      aria-atomic="true"
    >
      <i>{message}</i>
    </p>
  );
};

const SignUp = () => {
  const [formData, setFormData] = useState<TUserData>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<keyof TUserData, string>>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [isValidatingForm, setIsValidatingForm] = useState<boolean>(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear error message when input changes
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsValidatingForm(true);

      const response = await validateFormData(formData);
      if (response.errors) {
        const entries = Object.entries(response.errors);
        for (const [type, message] of entries) {
          setErrors((prevData) => ({
            ...prevData,
            [type]: message,
          }));
        }
      } else if (response.user) {
        dispatch({ type: "login", payload: response.user });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error validating form data:", error);
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
            Sign Up
          </CardTitle>
          <CardDescription className="text-center">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-5">
              <div className="flex flex-col space-y-2 relative">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  type="text"
                  id="first-name"
                  name="firstName"
                  placeholder="Cool"
                  onChange={handleChange}
                  aria-describedby="first-name-error"
                />
                {errors.firstName && (
                  <ErrorMessage
                    id={"first-name-error"}
                    message={errors.firstName}
                  />
                )}
              </div>
              <div className="flex flex-col space-y-2 relative">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  type="text"
                  id="last-name"
                  name="lastName"
                  placeholder="Name"
                  onChange={handleChange}
                  aria-describedby="last-name-error"
                />
                {errors.lastName && (
                  <ErrorMessage
                    id={"last-name-error"}
                    message={errors.lastName}
                  />
                )}
              </div>
              <div className="flex flex-col space-y-2 relative">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="username"
                  placeholder="coolname@mail.com"
                  onChange={handleChange}
                  aria-describedby="email-error"
                />
                {errors.username && (
                  <ErrorMessage id={"email-error"} message={errors.username} />
                )}
              </div>
              <div className="flex flex-col space-y-2 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  aria-describedby="password-error"
                />
                {errors.password && (
                  <ErrorMessage
                    id={"password-error"}
                    message={errors.password}
                  />
                )}
              </div>
              {!isValidatingForm && (
                <Button type="submit" className="w-full mt-1">
                  Sign Up
                </Button>
              )}
              {isValidatingForm && (
                <Button className="flex space-x-1 mt-1" disabled>
                  <img
                    className="block"
                    src={spinnerSm}
                    alt=""
                    aria-hidden="true"
                  />
                  <span className="block">Please wait</span>
                </Button>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p>Already have an account?</p>
          <Button variant={"link"} className="px-1">
            <Link to={"/login"}>Log in</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default SignUp;
