import React from "react";
import styled from "@emotion/styled";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Theme, useTheme } from "@mui/material/styles";
import { MenuBar } from "interface/menuBarList";

type Props = {
	label?: string;
	style?: React.CSSProperties;
	data: any[];
	value: any[];
	placeholder?: string;
	onChange?: any;
	setDataKhoangGia?: any;
  };


const OutlinedInputStyled = styled(OutlinedInput)`
  background-color: white;
`;

function getStyles(name: string, value: readonly string[], theme: Theme) {
  return {
    fontWeight:
	value.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
		fontSize:14
  };
}

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 10;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
	  height: 40,
      width: 250,
	  borderRadius: 8
    },
  },
};

export default function SelectKhoanGia({label, data, onChange,value,placeholder, style,setDataKhoangGia}: Props) {
	const theme = useTheme();


  return ( 
    <FormControl sx={{ m: 1, width: 300, mt: 3 }} style={style}>

      <Select
        displayEmpty
        value={value}
        onChange={onChange}
        input={<OutlinedInputStyled style={{borderRadius: 8, height: 40}}/>}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <span>{placeholder}</span>;
          }
		  if (selected[0] === 0 && selected[1] === 0 || selected[0] === '0' && selected[1] === '0') {
            return <span>Tất Cả</span>;
          }
          return `${selected[0]} Tỷ - ${selected[1]} Tỷ`;
        }}

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
            value={name.value}
            style={getStyles(name.name, value, theme)}
          >
            {name.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
