import React, { createContext, useReducer } from "react";
import { TUserData, TChildren } from "@/lib/types";

type TUser = {
  user: TUserData | null;
};

type ACTION_TYPE =
  | { type: "login"; payload: TUserData }
  | { type: "logout" }
  | { type: "update"; payload: TUserData };

type ContextProps = {
  state: TUser;
  dispatch: React.Dispatch<ACTION_TYPE>;
};

type ProviderProps = TChildren & {
  userData: TUserData;
};

const authReducer = (state: TUser, action: ACTION_TYPE): TUser => {
  switch (action.type) {
    case "login":
      return { user: action.payload };
    case "logout":
      return { user: null };
    case "update":
      return { user: action.payload };
    default:
      return state;
  }
};

const AuthContext = createContext<ContextProps | null>(null);
const AuthContextProvider = ({ userData, children }: ProviderProps) => {
  const initialState: TUser = {
    user: userData || null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
