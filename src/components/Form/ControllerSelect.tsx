import Row from "@components/CustomComponent/Row";
import IconCircleClose from "@components/Icons/IconCircleClose";
import styled from "@emotion/styled";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, SelectProps, TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldPath, FieldValues, SetFieldValue } from "react-hook-form";

interface itemSelect {
    label: string;
    value: string | number;
}

interface Props<T> extends Omit<SelectProps, 'name'> {
    control: Control<T>;
    setValue: SetFieldValue<T>;
    name: FieldPath<T>;
    label?: string;
    labelColor?: string;
    variant?: "standard" | "filled" | "outlined";
    dataSelect: itemSelect[];
    isClear?: boolean;
    width?: number | string;
}

const Container = styled.div``;

const LabelSpan = styled.span<{ color: string }>`
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

const SelectInput = styled(Select)`
    height:44px;
    border-radius: 8px;
`

const ErrorText = styled(FormHelperText)`
    color:red;
`

const ControllerSelect = <T extends FieldValues>(props: Props<T>) => {
    const { width, control, setValue, name, label, variant, required, labelColor, isClear, dataSelect, displayEmpty, ...rest } = props;

    const clearSelect = () => {
        setValue(name, '');
    }

    return (
        <Container style={{ width: width ?? '100%' }}>
            {label && (<LabelSpan color={labelColor}>{label}{required && <RequiredSpan>*</RequiredSpan>}</LabelSpan>)}
            <Controller
                render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth>
                        <SelectInput
                            value={field.value}
                            inputProps={{
                                'aria-label': 'Without label',
                                ...rest.inputProps,
                            }}
                            {...field}
                            {...rest}

                        >
                            {dataSelect.map((item) => {
                                return (
                                    <MenuItem value={item.value} key={item.value}>{item.label}</MenuItem>
                                )
                            })}
                        </SelectInput>
                        {isClear && field?.value && (
                            <div style={{ position: "absolute", right: 35, top: 14 }}>
                                <span onClick={clearSelect}><IconCircleClose /></span>
                            </div>
                        )}
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

export default ControllerSelect