import React, { createContext, useReducer, ReactNode, useEffect } from "react";
import { TUserData } from "@/lib/types";

type TUser = {
  user: TUserData | null;
};

type ACTION_TYPE = { type: "login"; payload: TUserData } | { type: "logout" };

type ContextProps = {
  state: TUser;
  dispatch: React.Dispatch<ACTION_TYPE>;
};

const INITIAL_STATE: TUser = {
  user: null,
};
const authReducer = (state: TUser, action: ACTION_TYPE): TUser => {
  switch (action.type) {
    case "login":
      return { user: action.payload };
    case "logout":
      return { user: null };
    default:
      return state;
  }
};

const AuthContext = createContext<ContextProps | null>(null);
const AuthContextProvider = ({
  userData,
  children,
}: {
  userData: TUserData;
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  useEffect(() => {
    if (userData) {
      dispatch({ type: "login", payload: userData });
    }
  }, [userData]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
