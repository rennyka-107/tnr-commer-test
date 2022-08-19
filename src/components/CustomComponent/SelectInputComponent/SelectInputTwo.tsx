import React from "react";
import styled from "@emotion/styled";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Theme, useTheme } from "@mui/material/styles";
import { MenuBar } from "interface/menuBarList";
import { IconSelectDatLich } from "@components/Icons";

type Props = {
	label?: string;
	style?: React.CSSProperties;
	data: MenuBar[];
	value: string[];
	placeholder?: string;
	onChange?: any;
	typeOfLocation? : boolean;
  };

const LabelSelectStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */

  color: #ffffff;
  margin-bottom: 8px;
`;

const OutlinedInputStyled = styled(OutlinedInput)`
  background-color: white;
`;

function getStyles(name: string, value: readonly string[], theme: Theme) {
  return {
    fontWeight:
	value.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 10;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectInputTwo({label, data, onChange,value,placeholder,typeOfLocation}: Props) {
	const theme = useTheme();

  return (
    <FormControl sx={{ m: 1, width: 196, mt: 3 }}>
      <LabelSelectStyled>{label}</LabelSelectStyled>
      <Select
        displayEmpty
        value={value}
        onChange={onChange}
        input={<OutlinedInputStyled style={{borderRadius: 8, height: 54 , color: "#1B3459", fontWeight: 500, fontSize: 16}}/>}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <span>{placeholder}</span>;
          }

          return selected.join(", ");
        }}
        MenuProps={MenuProps}
		IconComponent={IconSelectDatLich}
        inputProps={{ "aria-label": "Without label" }}
        SelectDisplayProps={{
          style: {
            paddingTop: 18,
            paddingBottom: 18,
            paddingLeft: 19,
          },
        }}
      >
        {data?.map((name,index) => (
          <MenuItem
            key={index}
            value={name.name}
            style={getStyles(name.name, value, theme)}
          >
            {name.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
