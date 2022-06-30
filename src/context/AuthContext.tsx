import { Login, LoginSuccess, ResponseLoginModel } from "@service/auth";
import useForceUpdate from "hooks/useForceUpdate";
import React, { createContext, useEffect, useState } from "react";
import LocalStorage from "utils/LocalStorage";
import SessionStorage from "utils/SessionStorage";
import { LoginParams } from "../components/LayoutAuthen/Login";
// import jwtDecode from 'jwt-decode';

interface State {
  user: any;
  isAuthenticated: boolean;
}

type DecodeUserInfo = {
  preferred_username: string;
  email: string;
  // image?: string;
  // role: string;
};

export interface AuthContextValue extends State {
  login: (data: LoginParams) => any;
  logout: () => void;
}

const initialAuthState: State = {
  user: null,
  isAuthenticated: false,
};

export const AuthenStore = createContext<AuthContextValue | null>(null);

const AuthContext = ({ children }) => {
  const [state, setState] = useState<State>(initialAuthState);
  const [rerender, forceUpdate] = useForceUpdate();

  const loginRequest = async (params: LoginParams) => {
    const { password, username, remember } = params;
    const response = await Login({ password, username });
    if (
      (response as ResponseLoginModel<LoginSuccess>)?.responseData?.access_token
    ) {
      const { access_token, refresh_token } = (
        response as ResponseLoginModel<LoginSuccess>
      )?.responseData;
      if (LocalStorage.get("rememberMe")) {
        LocalStorage.set("accessToken", access_token, forceUpdate);
        LocalStorage.set("refreshToken", refresh_token);
      } else {
        LocalStorage.set("accessToken", access_token, forceUpdate);
        LocalStorage.set("refreshToken", refresh_token);
      }
      //   LocalStorage.remove("accessToken");
      //   LocalStorage.remove("refreshToken");
      //   SessionStorage.set("accessToken", access_token, forceUpdate);
      //   SessionStorage.set("refreshToken", refresh_token);
    }
    // console.log(response,'------responseresponseresponse-----');

    return response;
  };

  const logout = () => {
    LocalStorage.remove("accessToken", forceUpdate);
    LocalStorage.remove("refreshToken");
    SessionStorage.remove("accessToken", forceUpdate);
    SessionStorage.remove("refreshToken");
  };

  useEffect(() => {
    const onAuthStateChanged = async () => {
      try {
        const accessToken =
          LocalStorage.get("accessToken") || SessionStorage.get("accessToken");
        if (accessToken) {
          setState({
            user: "",
            isAuthenticated: true,
          });
        } else {
          setState({
            isAuthenticated: false,
            user: null,
          });
        }
      } catch (error) {
        setState({
          user: null,
          isAuthenticated: false,
        });
      }
    };
    onAuthStateChanged();
  }, [rerender]);

  return (
    <AuthenStore.Provider value={{ ...state, login: loginRequest, logout }}>
      {children}
    </AuthenStore.Provider>
  );
};

export default AuthContext;
