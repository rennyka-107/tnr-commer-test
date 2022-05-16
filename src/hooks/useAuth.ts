import { AuthContextValue, AuthenStore } from "context/AuthContext";
import { useContext } from "react";

const useAuth = (): AuthContextValue => {
    const authContext = useContext(AuthenStore);

    if (!authContext) {
        throw new Error('Forgot to wrap component in AuthContext');
    }

    return authContext;
};

export default useAuth;
