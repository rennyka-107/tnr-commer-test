import Loading from "@components/Loading";
import { AuthenStore } from "@context/AuthContext";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import PathRoute from "utils/PathRoute";

const WithAuth = (WrappedComponent: any) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const { isAuthenticated } = useContext(AuthenStore);
    const Router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        const path = Router.pathname;
        Router.push({
          pathname: PathRoute.Login,
          query: {
            prePath: path,
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
export default WithAuth;
