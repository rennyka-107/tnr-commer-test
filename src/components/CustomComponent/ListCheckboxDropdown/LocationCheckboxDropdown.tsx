import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Theme, useTheme } from "@mui/material/styles";
import { MenuBar, MenuBarLocation } from "interface/menuBarList";
import { makeStyles } from "@mui/styles";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputBase,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";

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

const TextStyled = styled(InputBase)`
  padding: 10px 1px 10px 20px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  /* Shades/Dark 3 */
  border-bottom: 1px solid #f2f2f5;
  color: #8190a7;
`;
const FormControlLabelStyled = styled(FormControlLabel)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin: 0 auto;
  /* Brand */

  color: #1b3459;
`;

function getStyles(name: string, value: readonly string[], theme: Theme) {
  return {
    fontWeight:
      value.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    fontSize: 14,
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
      borderRadius: 8,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  menuPaper: {
    maxHeight: 400,
  },
  noBorder: {
    border: "none",
  },
}));

export default function LocationCheckboxDropdown({
  label,
  data,
  onChange,
  value,
  placeholder,
  style,
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
  });
  const classes = useStyles();
  const [valueText, setValueText] = useState("");
  const [listDataSelectCheck, setListDataSelectCheck] = useState([]);
  const [selected, setSelected] = useState([]);
  const [listFormChecked, setListFormChecked] = useState([]);
  const [dataFilter, setDataFilter] = useState({
    filter: "none",
    value: [],
  });

  const handleFilterSearch = (event: any) => {
    setValueText(event.target.value);
    const newData = data.filter((item) =>
      item.ProvinceName.includes(event.target.value)
    );
    if (event.target.value !== "") {
      setTimeout(
        () => setDataFilter({ filter: event.target.value, value: newData }),
        500
      );
    } else {
      setDataFilter({ filter: "none", value: data });
    }
  };

  useEffect(() => {
    setDataFilter({ filter: "none", value: data });
  }, [data]);

  //   useEffect(() => {
  //     fetchData();
  //   }, [dataFilter.filter]);

  const handleChange1 = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: any
  ) => {
    if (event.target.checked === true) {
      onChange(data);
      listDataSelectCheck.forEach((item) => {
        if (item.ProvinceID !== data.ProvinceID) {
          setListDataSelectCheck([...listDataSelectCheck, data]);
        } else {
          return;
        }
      });
    }
  };

  //   const fetchData = () => {
  //     return (
  //       <>
  //         {dataFilter.value.map((item, index) => (
  //           //   <FormControlLabelStyled
  //           //     key={index}
  //           //     style={{
  //           //       width: 318,
  //           //       height: 52,
  //           //       minWidth: 218,
  //           //       borderBottom: "1px solid #F2F2F5",
  //           //     }}
  //           //     control={<>{fetchChecked(name)}</>}
  //           //     label={name.ProvinceName}
  //           //   />
  //           <MenuItem
  //             key={index}
  //             value={item.ProvinceID}
  //             style={{
  //               background: "white",
  //               //   fontWeight: selectedData.has(id) ? '700' : '400',
  //             }}
  //           >
  //             <Checkbox
  //               sx={{
  //                 color: "#0063F7",
  //                 "&.Mui-checked": {
  //                   color: "#0063F7",
  //                 },
  //                 width: 24,
  //                 height: 24,
  //                 marginRight: 2,
  //                 marginLeft: 2,
  //               }}
  //               checked={myFunction(watch(`radio-${item.ProvinceID}`))}
  //               onChange={(e, checked) => {
  //                 setValue(`radio-${item.ProvinceID}`, checked);
  //                 // handleChange1(e, item);
  //               }}
  //             />
  //           </MenuItem>
  //         ))}
  //       </>
  //     );
  //   };

  useEffect(() => {
    const dataWatch: any = {};
    data.forEach((item: any, idx: number) => {
      listDataSelectCheck.forEach((province, index) => {
        if (province.ProvinceID === item.ProvinceID) {
          dataWatch[`radio-${province.ProvinceID}`] = true;
        }
      });
      reset({
        ...dataWatch,
      });
    });
  }, [listDataSelectCheck]);

  function myFunction(elem: boolean) {
    if (elem === true) {
      return true;
    } else {
      return false;
    }
  }

  const handleChange = (event) => {
    console.log(123213);
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === data.length ? [] : data);
      return;
    }
    setSelected(value);
  };
  return (
    <FormControl sx={{ m: 1, width: 300, mt: 3 }} style={style}>
      <Typography>Vị Trí</Typography>

      <Select
        labelId="mutiple-select-label"
        multiple
		displayEmpty
        value={selected}
        input={<OutlinedInputStyled style={{ borderRadius: 8, height: 40 }} />}
        onChange={handleChange}
        MenuProps={{ classes: { paper: classes.menuPaper } }}
        renderValue={(selected) => selected.join(", ")}
      >
        <FormGroup style={{ width: 318, minWidth: 218 }} >
          <TextField
            sx={{ flex: 1 }}
            onChange={(e) => handleFilterSearch(e)}
            placeholder="Nhập tên tỉnh/thành phố"
            value={valueText}
            variant="outlined"
            InputProps={{
              classes: { notchedOutline: classes.noBorder },
            }}
          />
        </FormGroup>
          {data.map((option, index) => (
            <MenuItem
              key={index}
              value={option.ProvinceName}
              divider
              dense={false}
              disableGutters={true}
            >
              <ListItemIcon>
                <FormControlLabelStyled
                  control={
                    <Checkbox
                      name="checkbox"
                      checked={selected.indexOf(option.ProvinceName) > -1}
                      sx={{
                        color: "#0063F7",
                        "&.Mui-checked": {
                          color: "#0063F7",
                        }, 
                        width: 24,
                        height: 24,
                        marginRight: 2,
                        marginLeft: 2,
                      }}
                    />
                  }
				  label={option.ProvinceName}
                />
              </ListItemIcon>
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
