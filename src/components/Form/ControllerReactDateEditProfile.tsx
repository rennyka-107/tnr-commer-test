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
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
/* identical to box height */
margin-bottom: 8px;

/* Shades/Dark 3 */

color: #8190A7;
`;
const RequiredSpan = styled.span`
  color: red;
`;

const ControllerReactDateEditProfile = <T extends FieldValues>(props: Props<T>) => {
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
              <TextField
                variant={variant}
                id={name}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  style: {
                    ...InputProps.style,
                    paddingTop: 0,
                    paddingBottom: 0,

                  },
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
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            {...rest}
          />
        )}
      />
    </Container>
  );
};

export default ControllerReactDateEditProfile;
