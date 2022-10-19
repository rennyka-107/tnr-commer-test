import styled from "@emotion/styled";
import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

interface Props<T> extends Omit<TextFieldProps, "name"> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  labelColor?: string;
  variant?: "standard" | "filled" | "outlined";
  width?: number;
  checkAutoComplete?: boolean;
}

const Container = styled.div``;
const LabelSpan = styled.div<{ color: string }>`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */

  /* Shades/Dark 3 */
  margin-bottom: 8px;
  color: #8190a7;
`;
const RequiredSpan = styled.span`
  color: red;
`;

// import { makeStyles } from "@material-ui/core/styles";

const ControllerTextFieldEditProfile = <T extends FieldValues>(
  props: Props<T>
) => {
  const {
    control,
    name,
    label,
    variant,
    required,
    labelColor,
    width,
    checkAutoComplete,
    ...rest
  } = props;

  return (
    <Container style={{ width: width ?? "100%" }}>
      {label && (
        <LabelSpan color={"#8190a7"}>
          {label}&nbsp;{required && <RequiredSpan>*</RequiredSpan>}
        </LabelSpan>
      )}
      <Controller
        render={({ field, fieldState: { error } }) => (
          <TextField
            variant={variant}
            id={name}
            fullWidth
            error={Boolean(error)}
            helperText={error?.message && error.message}
            hiddenLabel
            {...field}
            {...rest}
          />
        )}
        name={name}
        control={control}
      />
    </Container>
  );
};

export default ControllerTextFieldEditProfile;
