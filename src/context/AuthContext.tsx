import React, { createContext, useState } from "react";
import { LoginParams } from "../../pages/authen/components/Login";

interface State {
    user: any;
    isAuthenticated: boolean;
}

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

    const login = (params: LoginParams) => {
        const { username, password } = params;
        setState({
            ...state,
            isAuthenticated: true,
            user: username,
        });
    };

    const logout = () => {
        //call api to get accessToken, refreshToken
        setState(initialAuthState);
    };


    return (
        <AuthenStore.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthenStore.Provider>
    );
}

export default AuthContext;