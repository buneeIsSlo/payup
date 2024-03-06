import { Suspense } from "react";
import { Outlet, useLoaderData, Await } from "react-router-dom";
import { AuthContextProvider } from "@/context/AuthContext";
import { TUserProfileData } from "@/lib/types";

const Root = () => {
  const { dataPromise } = useLoaderData() as {
    dataPromise: Promise<TUserProfileData>;
  };

  return (
    <Suspense fallback={<h1 className="text-2xl">Loading...</h1>}>
      <Await resolve={dataPromise}>
        {(data) => {
          const user = data.user || null;
          console.log({ user }, "user data");
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
