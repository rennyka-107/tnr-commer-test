import React from "react";
import styled from "@emotion/styled";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Theme, useTheme } from "@mui/material/styles";
import { MenuBar, MenuBarLocation } from "interface/menuBarList";
import { makeStyles } from "@mui/styles";

type Props = {
	label?: string;
	style?: React.CSSProperties;
	data: MenuBarLocation[];
	value: string[];
	placeholder?: string;
	onChange?: any;
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

const useStyles = makeStyles(theme => ({
	menuPaper: {
	  maxHeight: 400
	}
  }));

export default function SelectLocationSearch({label, data, onChange,value,placeholder, style}: Props) {
	const theme = useTheme();
	const classes = useStyles();
  return (
    <FormControl sx={{ m: 1, width: 300, mt: 3 }} style={style}>
		<Typography>Vị Trí</Typography>
      <Select
        displayEmpty
		MenuProps={{ classes: { paper: classes.menuPaper } }}
        value={value}
        onChange={onChange}
        input={<OutlinedInputStyled style={{borderRadius: 8, height: 40}}/>}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <span>{placeholder}</span>;
          }

          return selected.join(", ");
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
            value={name.ProvinceName}
            style={getStyles(name.ProvinceName, value, theme)}
          >
            {name.ProvinceName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
