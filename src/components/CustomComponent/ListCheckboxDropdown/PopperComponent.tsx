import * as React from "react";
import { useTheme, styled } from "@mui/material/styles";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Autocomplete, {
  AutocompleteCloseReason,
  autocompleteClasses,
} from "@mui/material/Autocomplete";
import ButtonBase from "@mui/material/ButtonBase";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import {
  Checkbox,
  FormControl,
  OutlinedInput,
  Typography,
} from "@mui/material";
import {
  IconSelectDatLich,
  IconSelectDropdownFilter,
  SearchIconSearchPage,
} from "@components/Icons";
import { makeStyles } from "@mui/styles";
import { MenuBarLocation } from "interface/menuBarList";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";

interface PopperComponentProps {
  anchorEl?: any;
  disablePortal?: boolean;
  open: boolean;
}

const StyledAutocompletePopper = styled("div")(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: "none",
    margin: 0,
	width: 289,
    color: "inherit",
    fontSize: 13,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1c2128",
    padding: 0,
    [`& .${autocompleteClasses.option}`]: {
      minHeight: "auto",
      alignItems: "flex-start",
      padding: 8,
      borderBottom: `1px solid  ${
        theme.palette.mode === "light" ? " #eaecef" : "#30363d"
      }`,
      '&[aria-selected="true"]': {
        backgroundColor: "transparent",
      },
      [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
        {
          backgroundColor: theme.palette.action.hover,
        },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: "relative",
  },
}));

function PopperComponent(props: PopperComponentProps) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

const StyledPopper = styled(Popper)(({ theme }) => ({
  border: `1px solid ${theme.palette.mode === "light" ? "#e1e4e8" : "#30363d"}`,
  boxShadow: `0 8px 24px ${
    theme.palette.mode === "light" ? "rgba(149, 157, 165, 0.2)" : "rgb(1, 4, 9)"
  }`,
  borderRadius: 6,
  width: 300,
  zIndex: theme.zIndex.modal,
  fontSize: 13,
  color: theme.palette.mode === "light" ? "#24292e" : "#c9d1d9",
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1c2128",
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  width: "100%",
  borderBottom: `1px solid ${
    theme.palette.mode === "light" ? "#eaecef" : "#30363d"
  }`,
  "& input": {
    padding: 8,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 16,

    /* Shades/Dark 3 */

    color: "#8190A7",
  },
}));

const Button = styled(ButtonBase)(({ theme }) => ({
  fontSize: 13,
  width: "100%",
  textAlign: "left",
  paddingBottom: 8,
  color: theme.palette.mode === "light" ? "#586069" : "#8b949e",
  fontWeight: 600,
  "&:hover,&:focus": {
    color: theme.palette.mode === "light" ? "#0366d6" : "#58a6ff",
  },
  "& span": {
    width: "100%",
  },
  "& svg": {
    width: 16,
    height: 16,
  },
}));

const OutlinedInputStyled = styled(OutlinedInput)`
  background-color: white;
`;

const TitleStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  /* identical to box height, or 24px */

  letter-spacing: 0.005em;

  /* Shades/Dark 3 */

  color: #8190a7;
`;

const useInputStyles = makeStyles(() => ({
  // root: {

  // },
  input: {
    cursor: "pointer",
  },
}));

type TypeProps = {
  //   data: LabelType[];
  label?: string;
  style?: React.CSSProperties;
  data?: MenuBarLocation[];
  listDataLSProvince?: MenuBarLocation[];
  listLocation?: string[];
  placeholder?: string;
  onChange?: any;
};
const defaultValue = {
	code: "",
	countPd: 30,
	description: "Chọn Vị Trí",
	icon: "",
	iconHover: "",
	id: "111",
	name: "Chọn Vị Trí",
	nameDisplay: "",
	position: 1,
	symbol: "",
  };
export default function GitHubLabel({
  data,
  label,
  listLocation,
  onChange,
  placeholder,
  listDataLSProvince,
}: TypeProps) {
  //   console.log(data);
  const inputStyles = useInputStyles();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [value, setValue] = React.useState<MenuBarLocation[]>([]);
  const [pendingValue, setPendingValue] = React.useState<MenuBarLocation[]>([]);
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

  React.useEffect(() => {
    const newArray: any = [];
	const defaultArray: any =[];
	defaultArray.push(defaultValue)
    if (typeof window !== "undefined") {
      const dataSelectLS = localStorage?.getItem("listDataLSProvince");
      const arr: MenuBarLocation[] = JSON.parse(dataSelectLS);
      if (!isEmpty(arr)) {
        arr.map((item, index) => {
          const findItem = data.find((it) => it.ProvinceID === item.ProvinceID);
          newArray.push(findItem);
        });

        setValue(newArray);
      }else{
		setValue([])
	  }
    }
  }, [router, data]);

  const handleClose = () => {
    setValue(pendingValue);
	onChange(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }

    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "github-label" : undefined;

  const renderValue = (data: any) => {
    if (data.length === 0) {
      return "Chọn Vị Trí";
    } else {
      const arr: any = [];
      data.map((item) => arr.push(item?.ProvinceName));
      return arr.join(", ");
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ width: 221, fontSize: 13 }}>
        <FormControl sx={{ m: 1, width: 150, mt: 3 }}>
          <TitleStyled>Vị Trí</TitleStyled>
          <OutlinedInputStyled
            aria-describedby={id}
            value={renderValue(value)}
            readOnly
            classes={inputStyles}
            onClick={handleClick}
            style={{ borderRadius: 8, height: 40, textAlign: "center" }}
            endAdornment={<IconSelectDropdownFilter />}
          />
        </FormControl>
      </Box>
      <StyledPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <Autocomplete
              open
              multiple
              onClose={(
                event: React.ChangeEvent<{}>,
                reason: AutocompleteCloseReason
              ) => {
                if (reason === "escape") {
                  handleClose();
                }
              }}
              value={pendingValue}
              onChange={(event, newValue: any, reason) => {
                if (
                  event.type === "keydown" &&
                  (event as React.KeyboardEvent).key === "Backspace" &&
                  reason === "removeOption"
                ) {
                  return;
                }
                setPendingValue(newValue);
              }}
              disableCloseOnSelect
              PopperComponent={PopperComponent}
              renderTags={() => null}
              noOptionsText="No labels"
              renderOption={(props, option, { selected }) => (
                <li {...props} style={{ height: 59, alignItems: "center" }}>
                  <Checkbox
                    checked={selected}
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
                  <Box
                    component="span"
                    sx={{
                      width: 14,
                      height: 14,
                      flexShrink: 0,
                      borderRadius: "3px",
                      mr: 1,
                      mt: "2px",
                    }}
                  />
                  <Box
                    sx={{
                      flexGrow: 1,
                      "& span": {
                        color:
                          theme.palette.mode === "light"
                            ? "#586069"
                            : "#8b949e",
                      },
                    }}
                  >
                    {option?.ProvinceName}
                    <br />
                  </Box>
                </li>
              )}
              options={[...data].sort((a, b) => {
                // Display the selected labels first.
                let ai = value.indexOf(a);
                ai = ai === -1 ? value.length + data.indexOf(a) : ai;
                let bi = value.indexOf(b);
                bi = bi === -1 ? value.length + data.indexOf(b) : bi;
                return ai - bi;
              })}
              getOptionLabel={(option) => option?.ProvinceName}
              renderInput={(params) => (
                <StyledInput
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  autoFocus
                  endAdornment={<SearchIconSearchPage />}
                  style={{
                    height: 59,
                    textAlign: "center",
                    width: "95%",
                    borderBottom: "1px solid #F2F2F5",
                  }}
                  placeholder="Nhập tên tỉnh/thành phố"
                />
              )}
            />
          </div>
        </ClickAwayListener>
      </StyledPopper>
    </React.Fragment>
  );
}
