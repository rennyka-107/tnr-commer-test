import Loading from "@components/Loading";
import { AuthenStore } from "@context/AuthContext";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import PathRoute from "utils/PathRoute";
import useAuth from "hooks/useAuth"
import LocalStorage from "utils/LocalStorage";
import SessionStorage from "utils/SessionStorage";

export default function WithAuth(WrappedComponent: any) {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const { isAuthenticated } = useAuth();
    const Router = useRouter();
    const accessToken = LocalStorage.get('accessToken') || SessionStorage.get('accessToken');

    useEffect(() => {
      if (!isAuthenticated && !accessToken) {
        const path = Router.pathname;
        Router.push({
          pathname: PathRoute.Login,
          query: {
            prePath: path,
            tabIndex: 'login'
          },
        })
      }
    }, [isAuthenticated]);

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      return <Loading />;
    }
  };
}
export const config = {
	amp: true,
  }