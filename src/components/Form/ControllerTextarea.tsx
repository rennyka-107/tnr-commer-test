import styled from "@emotion/styled";
import { TextareaAutosize, TextareaAutosizeProps } from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

interface Props<T> extends Omit<TextareaAutosizeProps, "name"> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  labelColor?: string;
  variant?: "standard" | "filled" | "outlined";
  width?: number;
}

const Container = styled.div``;
const LabelSpan = styled.div<{ color: string }>`
  margin-bottom: 4px;
  color: ${({ color }) => color ?? "#1B3459"};
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21.09px;
`;
const RequiredSpan = styled.span`
  color: red;
`;

// import { makeStyles } from "@material-ui/core/styles";

const ControllerTextarea = <T extends FieldValues>(props: Props<T>) => {
  const {
    control,
    name,
    label,
    variant,
    required,
    labelColor,
    width,
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
        render={({ field, fieldState: { error } }) => (
          <TextareaAutosize
            // variant={variant}
            id={name}
            // fullWidth
            // error={Boolean(error)}
            // helperText={error?.message && error.message}
            // hiddenLabel
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

export default ControllerTextarea;
