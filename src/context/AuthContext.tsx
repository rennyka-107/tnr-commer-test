import React, { createContext, useEffect, useState } from "react";
import { LoginParams } from "../components/LayoutAuthen/Login";
import { Login, LoginSuccess } from "@service/auth";
import SessionStorage from 'utils/SessionStorage';
import LocalStorage from 'utils/LocalStorage';
import useForceUpdate from 'hooks/useForceUpdate';
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
    login: (
        data: LoginParams
    ) => void;
    logout: () => void;
}

const initialAuthState: State = {
    user: null,
    isAuthenticated: false,
}

export const AuthenStore = createContext<AuthContextValue | null>(null);

const AuthContext = ({ children }) => {
    const [state, setState] = useState<State>(initialAuthState);
    const [rerender, forceUpdate] = useForceUpdate();

    const loginRequest = async (params: LoginParams) => {
        const response = await Login(params);
        if ((response as LoginSuccess).access_token) {
            const { access_token, refresh_token } = response as LoginSuccess;
            SessionStorage.set('accessToken', access_token, forceUpdate)
            SessionStorage.set('refreshToken', refresh_token);
        }
        return response;
    };

    const logout = () => {
        LocalStorage.remove('accessToken', forceUpdate);
        LocalStorage.remove('refreshToken');
        SessionStorage.remove('accessToken', forceUpdate);
        SessionStorage.remove('refreshToken');
    };

    useEffect(() => {
        const onAuthStateChanged = async () => {
            try {
                const accessToken =
                    LocalStorage.get('accessToken') || SessionStorage.get('accessToken');
                if (accessToken) {
                    setState({
                        user: '',
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
}

export default AuthContext;