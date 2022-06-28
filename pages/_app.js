import React from "react";
import PropTypes from "prop-types";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { wrapper } from "../store/store";
import createEmotionCache from "../utility/createEmotionCache";
import lightTheme from "../styles/theme/lightTheme";
import "../styles/globals.css";
import AuthContext from "../src/context/AuthContext";
import CartProvider from "./../src/context/CartProvider";
import { NotificationProvider } from '../src/context/NotificationContext';
import "react-datepicker/dist/react-datepicker.css";

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <NotificationProvider>
          <CssBaseline />
          <AuthContext>
            <CartProvider>
              <Component {...pageProps} />
            </CartProvider>
          </AuthContext>
        </NotificationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default wrapper.withRedux(MyApp);

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
