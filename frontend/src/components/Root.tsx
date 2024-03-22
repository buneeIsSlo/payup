import { Suspense } from "react";
import { Outlet, useLoaderData, Await } from "react-router-dom";
import { AuthContextProvider } from "@/context/AuthContext";
import { TUserProfileData } from "@/lib/types";
import { Button } from "./ui/button";
import { spinnerLg } from "../assets/images/index";

const Spinner = () => {
  return (
    <div className="h-dvh grid place-content-center container">
      <div>
        <img src={spinnerLg} alt="loading" className="md:scale-150" />
      </div>
    </div>
  );
};

const ErrorElement = () => {
  return (
    <div className="h-dvh grid place-content-center">
      <div className="text-center">
        <h1 className="text-destructive text-2xl py-3 font-semibold">
          😬 Oops, something went wrong!
        </h1>
        <p className="max-w-[42ch]">
          This wasn't supposed to happen. Please let me know about the problem.
        </p>
        <Button variant={"outline"} className="my-2.5">
          <a href="http://twitter.com/slo_bunee" target="_blank">
            Report problem
          </a>
        </Button>
      </div>
    </div>
  );
};

const Root = () => {
  const { dataPromise } = useLoaderData() as {
    dataPromise: Promise<TUserProfileData>;
  };

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={dataPromise} errorElement={<ErrorElement />}>
        {(data) => {
          const user = data.user || null;
          // console.log({ user }, "user data");
          return (
            <AuthContextProvider userData={user}>
              <Outlet />
            </AuthContextProvider>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default Root;
