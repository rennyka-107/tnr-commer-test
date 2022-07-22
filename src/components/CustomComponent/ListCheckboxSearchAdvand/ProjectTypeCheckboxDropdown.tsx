import * as React from "react";
import { useTheme, styled } from "@mui/material/styles";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Autocomplete, {
  AutocompleteCloseReason,
  autocompleteClasses,
} from "@mui/material/Autocomplete";
import InputBase from "@mui/material/InputBase";
import Checkbox from "@mui/material/Checkbox";
import {
  FormControl,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { MenuBar, MenuBarLocation } from "interface/menuBarList";
import { makeStyles } from "@mui/styles";
import {
  IconDropDown,
  IconSelectDatLich,
  SearchIconSearchPage,
} from "@components/Icons";
import _, { isEmpty } from "lodash";
import { useRouter } from "next/router";

interface PopperComponentProps {
  anchorEl?: any;
  disablePortal?: boolean;
  open: boolean;
}
type Props = {
  label?: string;
  style?: React.CSSProperties;
  data: MenuBar[];
  listProjectType: string[];
  checkSelectProvince?: any;
  placeholder?: string;
  onChange?: any;
};
const StyledAutocompletePopper = styled("div")(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    width: 250,
    boxShadow: "none",
    margin: 0,
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
function PopperComponent(props: PopperComponentProps) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

const OutlinedInputStyled = styled(OutlinedInput)`
  background-color: white;
`;
const LabelStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  margin-top: 4px;
  color: #1b3459;
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

  color: #ffffff;
`;
const useStyles = makeStyles((theme) => ({
  menuPaper: {
    width: 303,
    marginLeft: 13,
  },
  noBorder: {
    border: "none",
  },
}));
const ProjectTypeCheckboxDropdown = ({
  label,
  data,
  onChange,
  listProjectType,
  placeholder,
  checkSelectProvince,
  style,
}: Props) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [listDataView, setListDataView] = React.useState([]);
  const [value, setValue] = React.useState<any[]>([]);

  const [pendingValue, setPendingValue] = React.useState<any[]>([]);

  const classes = useStyles();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };
  React.useEffect(() => {
    if (checkSelectProvince === true) {
      setPendingValue([]);
    }
  }, [checkSelectProvince]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const dataSelectLS = localStorage?.getItem("listDataLSProjectType");
      if (!isEmpty(JSON.parse(dataSelectLS))) {
        setPendingValue(JSON.parse(dataSelectLS));
      } 
    }
  }, []);

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
  return (
    <FormControl sx={{ m: 1, width: 303, mt: 3 }}>
      <TitleStyled>{label}</TitleStyled>
      <Select
        labelId="mutiple-select-label"
        multiple
        displayEmpty
        value={pendingValue}
        input={<OutlinedInputStyled style={{ borderRadius: 8, height: 54 }} />}
        renderValue={(selected) => {
          if (pendingValue.length === 0) {
            return <span>{placeholder}</span>;
          } else {
            const arr: any = [];
            selected.map((item) => arr.push(item.name));
            return arr.join(", ");
          }
        }}
        IconComponent={IconSelectDatLich}
        inputProps={{ "aria-label": "Without label" }}
        MenuProps={{ classes: { paper: classes.menuPaper } }}
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
              disableCloseOnSelect
              PopperComponent={PopperComponent}
              renderTags={() => null}
              noOptionsText="Không có loại bất động sản"
              renderOption={(props, option, { selected, ...elseProps }) => {
                let nodeEle = (
                  <li {...props} style={{ height: 59, alignItems: "center" }}>
                    <Checkbox
                      checked={selected}
                      onChange={(e, checked) => {
                        if (checked) {
                          setPendingValue(
                            _.uniqBy([...pendingValue, option], "id")
                          );
                        } else {
                          setPendingValue(
                            pendingValue.filter((it) => it.id !== option.id)
                          );
                        }
                      }}
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
                    <LabelStyled>{option.name}</LabelStyled>
                  </li>
                );
                pendingValue.forEach((item, index) => {
                  if (option.id === item.id) {
                    selected = true;
                    nodeEle = (
                      <li
                        {...props}
                        style={{ height: 59, alignItems: "center" }}
                      >
                        <Checkbox
                          checked={selected}
                          onChange={(e, checked) => {
                            if (checked) {
                              setPendingValue(
                                _.uniqBy([...pendingValue, item], "id")
                              );
                            } else {
                              setPendingValue(
                                pendingValue.filter((it) => it.id !== item.id)
                              );
                            }
                          }}
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
                        <LabelStyled>{option.name}</LabelStyled>
                      </li>
                    );
                  }
                });
                return nodeEle;
              }}
              options={data ? [...data] : []}
              getOptionLabel={(option: any) => option.name}
              renderInput={(params) => (
                <StyledInput
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  autoFocus
                  endAdornment={<SearchIconSearchPage />}
                  style={{
                    display: "none",
                    height: 59,
                    textAlign: "center",
                    width: "100%",
                    borderBottom: "1px solid #F2F2F5",
                  }}
                  placeholder="Nhập tên tỉnh/thành phố"
                />
              )}
            />
          </div>
        </ClickAwayListener>
      </Select>
    </FormControl>
  );
};
export default ProjectTypeCheckboxDropdown;
