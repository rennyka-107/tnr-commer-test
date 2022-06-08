import styled from '@emotion/styled';
import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import { Dispatch, SetStateAction } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface Props<T> extends Omit<TextFieldProps | any, 'name'> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  labelColor?: string;
  variant?: "standard" | "filled" | "outlined";
  width?: number;
  value?: Date | null;
  onChange?: Dispatch<SetStateAction<Date | null>>
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

const ControllerDatePicker = <T extends FieldValues>(props: Props<T>) => {
  const { control, name, label, variant, required, labelColor, width, value, onChange, ...rest } = props;
  return (
    <Container style={{ width: width ?? '100%' }}>
      {label && (<LabelSpan color={labelColor}>{label}&nbsp;{required && <RequiredSpan>*</RequiredSpan>}</LabelSpan>)}
      <Controller
        render={({ field, fieldState: { error } }) => (
          <TextField
            variant={variant}
            id={name}
            type={'date'}
            defaultValue={value}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
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

export default ControllerDatePicker;
