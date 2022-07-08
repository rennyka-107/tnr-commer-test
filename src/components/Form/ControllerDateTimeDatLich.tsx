import styled from "@emotion/styled";
import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";
import { Dispatch, SetStateAction } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { InputProps } from "utils/constants";
import DatePicker from "react-datepicker";
import { parse, format } from "date-fns";

interface Props<T> extends Omit<TextFieldProps | any, "name"> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  labelColor?: string;
  variant?: "standard" | "filled" | "outlined";
  width?: number;
  maxDate?: Date;
}

const Container = styled.div``;
const LabelSpan = styled.div<{ color: string }>`
  margin-bottom: 4px;
  color: #1B3459;
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
  .MuiInputBase-input {
    padding: 10px !important;
  }
`;
const ControllerDateTimeDatLich = <T extends FieldValues>(props: Props<T>) => {
  const {
    control,
    name,
    label,
    variant,
    required,
    labelColor,
    width,
    maxDate,
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
        }) => (
          <DatePicker
            customInput={
              <StyledTextField
                variant={variant}
                id={name}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                error={Boolean(error)}
                helperText={error?.message && error.message}
                hiddenLabel
                {...restField}
                {...rest}
              />
            }
            selected={value ? parse(value, "dd-MM-yyyy", new Date()) : ""}
            onChange={(value) =>
              onChange(value ? format(value, "dd-MM-yyyy") : "")
            }
            dateFormat="dd-MM-yyyy"
            maxDate={maxDate}
            {...rest}
          />
        )}
      />
    </Container>
  );
};

export default ControllerDateTimeDatLich;
