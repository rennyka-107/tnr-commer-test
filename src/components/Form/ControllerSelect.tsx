import { IconSelectDropdownFilter } from "@components/Icons";
import IconCircleClose from "@components/Icons/IconCircleClose";
import styled from "@emotion/styled";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Radio,
  Select,
  SelectProps,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { isEmpty } from "lodash";
import React from "react";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  SetFieldValue,
} from "react-hook-form";

interface itemSelect {
  label: string;
  value: string | number;
}

interface Props<T> extends Omit<SelectProps, "name"> {
  control: Control<T>;
  setValue: SetFieldValue<T>;
  name: FieldPath<T>;
  label?: string;
  labelColor?: string;
  variant?: "standard" | "filled" | "outlined";
  dataSelect: itemSelect[];
  isClear?: boolean;
  width?: number | string;
  renderItemSelect?: (item: itemSelect) => React.ReactNode;
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
  height: 44px;
  border-radius: 8px;
  "& .muimenuitem-root": {
    border-bottom: 1px solid black !important;
  }
`;
const useStyles = makeStyles((theme) => ({
  menuPaper: {
    // width: 250,
	
	'& .MuiMenuItem-root': {
		borderBottom: '1px solid #F2F2F5',
		minWidth: 318
	}
  },
  noBorder: {
  
  },
}));
const ErrorText = styled(FormHelperText)`
  color: red;
`;

const ControllerSelect = <T extends FieldValues>(props: Props<T>) => {
  const {
    width,
    control,
    setValue,
    name,
    label,
    variant,
    required,
    labelColor,
    isClear,
    dataSelect,
    multiple,
    displayEmpty,
    renderItemSelect,
    ...rest
  } = props;
  const classes = useStyles();
  const clearSelect = () => {
    if (multiple) {
      setValue(name, []);
      return;
    }
    setValue(name, null);
  };

  const renderMultiValue = (arrValues: any[]) => {
    const arr: string[] = arrValues.map((el) => {
      return dataSelect.find((item) => item.value == el)?.label;
    });
    return <span>{arr.join(",")}</span>;
  };

  return (
    <Container style={{ width: width ?? "100%" }}>
      {label && (
        <LabelSpan color={labelColor}>
          {label}
          {required && <RequiredSpan>*</RequiredSpan>}
        </LabelSpan>
      )}
      <Controller
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth>
            <SelectInput
              value={field?.value}
              inputProps={{
                "aria-label": "Without label",
                ...rest.inputProps,
              }}
              endAdornment={<IconSelectDropdownFilter />}
              IconComponent={null}
              renderValue={(val: any) => {
                if (multiple) {
                  return renderMultiValue(field.value);
                }
                return (
                  <span>
                    {dataSelect.find((item) => item?.value == field.value)
                      ?.label ?? ""}
                  </span>
                );
              }}
              MenuProps={{ classes: { root: classes.menuPaper  } }}
              displayEmpty
              multiple={multiple}
              {...field}
              {...rest}
            >
              {dataSelect.map((item) => {
                if (renderItemSelect) {
                  return (
                    <MenuItem value={item.value} key={item.value}>
                      {renderItemSelect(item)}
                    </MenuItem>
                  );
                }
                return (
                  <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>
                );
              })}
            </SelectInput>
            {isClear && (multiple ? !isEmpty(field?.value) : field?.value) && (
              <div style={{ position: "absolute", right: 35, top: 14 }}>
                <span onClick={clearSelect}>
                  <IconCircleClose />
                </span>
              </div>
            )}
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

export default ControllerSelect;
