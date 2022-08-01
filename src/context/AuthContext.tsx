import {
  Login,
  LoginSuccess,
  ResponseLoginModel,
  sendNotificationToken,
} from "@service/auth";
import { firebaseCloudMessaging } from "../firebase";
import useForceUpdate from "hooks/useForceUpdate";
import React, { createContext, useEffect, useState } from "react";
import LocalStorage from "utils/LocalStorage";
import SessionStorage from "utils/SessionStorage";
import { LoginParams } from "../components/LayoutAuthen/Login";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { RootState } from "../../store/store";
import useNotification from "hooks/useNotification";
import { AlertColor } from "@mui/material";
import { setNotification } from "../../store/notificationSlice";
import { useRouter } from "next/router";
import { removeAllComparePopUpItem } from "../../store/productCompareSlice";

// import jwtDecode from 'jwt-decode';

interface State {
  user: any;
  isAuthenticated: boolean;
}

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
  const router = useRouter();
  const [rerender, forceUpdate] = useForceUpdate();
  const [deviceToken, setDeviceToken] = useState<string | null>();
  const notification = useNotification();
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  if (mounted) {
    firebaseCloudMessaging.onMessage();
  }
  const payloadNotification = useSelector(
    (state: RootState) => state.notification.payload
  );
  useEffect(() => {
    if (!isEmpty(payloadNotification)) {
      notification({
        severity:
          (payloadNotification?.data?.noticeType as AlertColor) ?? "success",
        title: payloadNotification?.notification?.title ?? "Tiêu đề",
        message: payloadNotification?.notification?.body ?? "Nội dung",
      });
      dispatch(setNotification(null));
    }
  }, [payloadNotification]);
  useEffect(() => {
    firebaseCloudMessaging.init();
    const setToken = async () => {
      const token = await firebaseCloudMessaging.tokenInlocalforage();
      if (token) {
        setDeviceToken(token as string);
        setMounted(true);
        // not working
      }
    };
    setToken();
  }, []);

  useEffect(() => {
    // return () => {
		if(router.pathname !== '/compare-search'){
		  dispatch(removeAllComparePopUpItem({}))
		  console.log("clearn")
		}
		console.log(router)
	//   }
  },[router.pathname])

  useEffect(() => {
    if (router.pathname !== "/search" && router.pathname !== "/projectTNR" && router.pathname !== "/compare-search" && router.pathname !== "/products" && router.pathname !== "/compare-product") {
      localStorage.removeItem("listDataLSProvince");
      localStorage.removeItem("listParamsLSProvince");
      localStorage.removeItem("listDataLSProjectType");
      localStorage.removeItem("listParamsLSProjectType");
      localStorage.removeItem("listDataLSProject");
      localStorage.removeItem("listParamsIdProject");
    }
  }, [router]);

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
      await sendNotificationToken({ deviceToken, action: 1 });
      //   LocalStorage.remove("accessToken");
      //   LocalStorage.remove("refreshToken");
      //   SessionStorage.set("accessToken", access_token, forceUpdate);
      //   SessionStorage.set("refreshToken", refresh_token);
    }

    return response;
  };

  //   console.log(deviceToken, "device token")

  const logout = async () => {
    LocalStorage.remove("accessToken", forceUpdate);
    LocalStorage.remove("refreshToken");
    SessionStorage.remove("accessToken", forceUpdate);
    SessionStorage.remove("refreshToken");
    const deviceToken = await LocalStorage.get("fcm_token");
    await sendNotificationToken({
      deviceToken: deviceToken as string,
      action: 0,
    });
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
