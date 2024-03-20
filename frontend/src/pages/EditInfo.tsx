import { useState } from "react";
import { validateUpdateForm } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { TUpdateUserData } from "@/lib/types";
import { useAuthContext } from "@/hooks/useAuthContext";
import { toast } from "sonner";
import { spinnerSm } from "@/assets/images";

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

const EditInfo = () => {
  const { dispatch } = useAuthContext();
  const [formData, setFormData] = useState<TUpdateUserData>({});
  const [errors, setErrors] = useState<TUpdateUserData>({});
  const [isValidatingForm, setIsValidatingForm] = useState<boolean>(false);
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

    setIsValidatingForm(true);
    const cleanFormData: TUpdateUserData = Object.entries(formData)
      .filter(([, value]) => value !== "")
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    if (Object.keys(cleanFormData).length === 0) {
      setIsValidatingForm(false);
      toast.info("Nothing was changed");
      navigate("/dashboard");
    } else {
      try {
        const response = await validateUpdateForm(cleanFormData);
        if (response.errors) {
          const entries = Object.entries(response.errors);
          for (const [type, message] of entries) {
            setErrors((prevData) => ({
              ...prevData,
              [type]: message,
            }));
          }
        } else if (response.updatedUser) {
          dispatch({ type: "login", payload: response.updatedUser });
          toast.success(response.message);
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error validating form data:", error);
      } finally {
        setIsValidatingForm(false);
      }
    }
  }
  return (
    <main className="flex-1 h-full">
      <h1 className="text-center text-3xl font-bold py-6">
        Edit Profile <span aria-hidden="true">📝</span>
      </h1>
      <section className="py-5 flex justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardDescription className="text-center">
              Enter new information and hit update
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
                    Update
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
        </Card>
      </section>
    </main>
  );
};

export default EditInfo;
