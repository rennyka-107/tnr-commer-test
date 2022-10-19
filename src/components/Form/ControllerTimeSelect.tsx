import { IconSelectDatLich } from "@components/Icons";
import styled from "@emotion/styled";
import { InputAdornment } from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { InputProps } from "utils/constants";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import { ContactlessOutlined } from "@mui/icons-material";
import { isEmpty } from "lodash";
interface Props<T> extends Omit<TextFieldProps, "name"> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  labelColor?: string;
  variant?: "standard" | "filled" | "outlined";
  width?: number;
  minDate?: any;
  setTimeValue?: any;
}

const Container = styled.div``;
const LabelSpan = styled.div<{ color: string }>`
  margin-bottom: 4px;
  color: #8190a7;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21.09px;
`;
const RequiredSpan = styled.span`
  color: red;
`;
const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    height: 44px;

    border-radius: 8px;
  }
  .MuiOutlinedInput-notchedOutline {
    border: 1px solid #b8b8b8;
    border-color: #b8b8b8;
  }
`;
// import { makeStyles } from "@material-ui/core/styles";

const ControllerTimeSelect = <T extends FieldValues>(props: Props<T>) => {
  const {
    control,
    name,
    label,
    variant,
    required,
    labelColor,
    width,
    minDate,
    setTimeValue,
    ...rest
  } = props;

  return (
    <Container style={{ width: width ?? "100%" }}>
      {label && (
        <LabelSpan color={labelColor}>
          {label}&nbsp;{required && <RequiredSpan>*</RequiredSpan>}
        </LabelSpan>
      )}
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value, ...restField },
          fieldState: { error },
        }) => {
          return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                renderInput={(params) => {
                  return (
                    <StyledTextField
                      variant={variant}
                      id={name}
                      fullWidth
                      error={Boolean(error)}
                      helperText={
                        params.error &&
                        params.inputProps.value ===
                          ""
                          ? "Không được bỏ trống"
                          : params.error && error?.message
                          ? error?.message && error.message
                          : ""
                      }
                      hiddenLabel
                      InputProps={{
                        style: {
                          ...InputProps.style,
                        },
                      }}
                      {...restField}
                      {...rest}
                      {...params}
                    />
                  );
                }}
                value={value ? value : ""}
                onChange={(newValue) => {
                  onChange(newValue);
                }}
                minTime={
                  new Date(minDate) <= new Date() ? dayjs(new Date()) : false
                }
              />
            </LocalizationProvider>
          );
        }}
      />
    </Container>
  );
};

export default ControllerTimeSelect;
