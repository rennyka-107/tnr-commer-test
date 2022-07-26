import CloseIcon from "@mui/icons-material/Close";
import type { AlertProps } from "@mui/material/Alert";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import type { FC, ReactNode } from "react";
import {
  createContext,
  forwardRef,
  Fragment,
  useCallback,
  useState,
} from "react";
import IconWarning from "@components/Icons/IconWarning";
import IconError from "@components/Icons/IconError";
import IconSuccess from "@components/Icons/IconSuccess";
import isEmpty from "lodash.isempty";

const AlertMessage = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  function getIcon() {
    switch (props.icon) {
      case "warning":
        return <IconWarning />;
      case "success":
        return <IconSuccess />;
      default:
        return <IconError />;
    }
  }
  return (
    <Alert
      elevation={6}
      ref={ref}
      variant="standard"
      {...props}
      icon={getIcon()}
    />
  );
});
AlertMessage.displayName = 'AlertMessage';
interface Config {
  message?: string | null;
  error?: string | null;
  severity?: AlertProps["severity"];
  onUndo?: () => Promise<void>;
  title?: string;
}

export type ContextValue = (config: Config) => void;

export const NotificationContext = createContext<ContextValue | null>(null);

if (process.env.NODE_ENV === "development") {
  NotificationContext.displayName = "NotificationContext";
}

const defaultConfigs: Config = {
  message: null,
  error: null,
  title: "",
};

const NotificationProvider: FC = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [config, setConfig] = useState<Config>(defaultConfigs);

  const handleClose = (_event: any, reason?: string) => {
    if (reason === "clickaway") return;
    setOpen(false);
    setConfig(defaultConfigs);
  };

  const setNotification = useCallback((config: Config) => {
    setConfig((state) => ({
      ...state,
      ...config,
    }));
    setOpen(true);
  }, []);

  const { message, error, severity, onUndo, title } = config;

  const action = (
    <Fragment>
      {onUndo ? (
        <Button variant="text" onClick={onUndo}>
          Undo
        </Button>
      ) : null}
      <IconButton sx={{ ml: 0.5 }} color="inherit" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Fragment>
  );

  const content =
    error || (message && severity) ? (
      <AlertMessage
        onClose={handleClose}
        severity={error ? "error" : severity}
        sx={{ width: "100%", display: "flex", alignItems: "center" }}
        icon={error ? "error" : severity}
      >
        <Box>
          <Typography
            sx={{
              color: (function () {
                if (isEmpty(error)) {
                  switch (severity) {
                    case "success":
                      return "#06C270";
                    case "warning":
                      return "#FFCC00";
                    default:
                      return "#FF3B3B";
                  }
                } else {
                  return "#FF3B3B";
                }
              })(),
              fontWeight: 500,
              fontSize: "1rem",
              lineHeight: "16.41px",
            }}
          >
            {title ?? ""}
          </Typography>
          <Typography>{error || message}</Typography>
        </Box>
      </AlertMessage>
    ) : undefined;

  return (
    <NotificationContext.Provider value={setNotification}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        action={action}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {content}
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export { NotificationContext as default, NotificationProvider };
