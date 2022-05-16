import IconCircleClose from "@components/Icons/IconCircleClose";
import styled from "@emotion/styled";
import { Autocomplete, FormControl, FormHelperText, Select, TextField, UseAutocompleteProps } from "@mui/material";
import React from "react";
import { Control, Controller, FieldPath, FieldValues, SetFieldValue } from "react-hook-form";
import { InputProps } from "utils/constants";

interface itemSelect {
    label: string;
    value: string | number;
}

interface Props<T> extends Omit<UseAutocompleteProps<itemSelect, undefined, undefined, undefined>, 'name'> {
    control: Control<T>;
    setValue: SetFieldValue<T>;
    name: FieldPath<T>;
    label?: string;
    labelColor?: string;
    variant?: "standard" | "filled" | "outlined";
    required?: boolean;
}

const Container = styled.div``;

const LabelSpan = styled.span<{ color: string }>`
  margin-bottom:7px;
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
    color:red;
`

const ControllerSelectAutoComplete = <T extends FieldValues>(props: Props<T>) => {
    const { control, setValue, name, label, required, variant, labelColor, ...res } = props;

    return (
        <Container>
            {label && (<LabelSpan color={labelColor}>{label}{required && <RequiredSpan>*</RequiredSpan>}</LabelSpan>)}
            <Controller
                render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth>
                        <Autocomplete
                            disablePortal
                            id={name}
                            onChange={(e, item: itemSelect) => { setValue(name, item?.value) }}
                            renderInput={(params) => {
                                return (
                                    <TextField
                                        {...params}
                                        {...field}
                                        hiddenLabel
                                        fullWidth
                                        InputProps={{
                                            ...params.InputProps,
                                            style: {
                                                ...InputProps.style,
                                                paddingTop: 0,
                                                paddingBottom: 0
                                            }
                                        }}
                                    />
                                )
                            }
                            }
                            clearIcon={<IconCircleClose />}
                            {...res}
                        />
                        {error?.message && <ErrorText>{error?.message && error.message}</ErrorText>}
                    </FormControl>
                )
                }
                name={name}
                control={control}
            />
        </Container >

    )
}

export default ControllerSelectAutoComplete