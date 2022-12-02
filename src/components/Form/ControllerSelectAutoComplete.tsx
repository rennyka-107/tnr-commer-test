import IconCircleClose from "@components/Icons/IconCircleClose";
import styled from "@emotion/styled";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  Select,
  TextField,
  UseAutocompleteProps,
} from "@mui/material";
import isEqual from "lodash.isequal";
import React from "react";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  SetFieldValue,
} from "react-hook-form";
import { InputProps } from "utils/constants";

interface itemSelect {
  label: string;
  value: string | number;
}

interface Props<T> {
  control: Control<T>;
  setValue: SetFieldValue<T>;
  name: FieldPath<T>;
  label?: string;
  labelColor?: string;
  variant?: "standard" | "filled" | "outlined";
  required?: boolean;
  onChangeExtra?: (data: itemSelect) => void;
  options: itemSelect[];
  disabled?: boolean;
  fzLabel?: string;
}

const Container = styled.div``;

const LabelSpan = styled.span<{ color: string }>`
  margin-bottom: 7px;
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

const ErrorText = styled(FormHelperText)`
  color: red;
`;

const ControllerSelectAutoComplete = <T extends FieldValues>(
  props: Props<T>
) => {
  const {
    control,
    setValue,
    name,
    label,
    required,
    variant,
    labelColor,
    options,
    onChangeExtra,
    disabled,
    fzLabel,
    ...res
  } = props;

  return (
    <Container>
      {label && (
        <LabelSpan style={{ fontSize: fzLabel}} color={labelColor}>
          {label}
          {required && <RequiredSpan>*</RequiredSpan>}
        </LabelSpan>
      )}
      <Controller
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth>
            <Autocomplete
              value={
                options.find((item) => isEqual(item?.value, field?.value))
                  ?.label ?? ""
              }
              disablePortal
              disabled={disabled}
              id={name}
              onChange={(e, item: itemSelect) => {
                setValue(field?.name, item?.value);
                onChangeExtra && onChangeExtra(item);
              }}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    hiddenLabel
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      style: {
                        ...InputProps.style,
                        paddingTop: 0,
                        paddingBottom: 0,
                      },
                    }}
                  />
                );
              }}
              options={options}
              clearIcon={<IconCircleClose />}
              disableClearable={!field?.value}
              {...res}
            />
            {error?.message && (
              <ErrorText>{error?.message && error.message}</ErrorText>
            )}
          </FormControl>
        )}
        name={name}
        control={control}
      />
    </Container>
  );
};

export default ControllerSelectAutoComplete;
