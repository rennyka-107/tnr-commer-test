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
  Divider,
  FormControl,
  OutlinedInput,
  Radio,
  RadioProps,
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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled as styledMui } from "@mui/material/styles";

interface PopperComponentProps {
  anchorEl?: any;
  disablePortal?: boolean;
  open: boolean;
}

interface typeCK {
  Amount: number;
  PromotionID: number;
  PromotionName: string;
  TypeId: number;
  Value: number;
  IsPresent: boolean;
}
const BpIcon = styledMui("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 20,
  height: 20,
  border: "1px solid #0063F7",
  backgroundColor: theme.palette.mode === "dark" ? "#f5f8fa" : "#f5f8fa",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#f5f8fa" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styledMui(BpIcon)({
  backgroundColor: "#0063F7",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 18,
    height: 18,
    backgroundImage: "radial-gradient(#FFFFFF,#FFFFFF 40%,transparent 50%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#0063F7",
  },
  // "input:disabled ~ &": {
  //   opacity: 0.4,
  // },
});

const BpRadio = (props: RadioProps) => {
  return (
    <Radio
      sx={{
        "&:hover": {
          bgcolor: "transparent",
        },
        p: 0
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
};
const StyledAutocompletePopper = styled("div")(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: "none",
    margin: 0,
    width: 318,
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
  width: 318,
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

const OutlinedInputStyled = styled(OutlinedInput)``;

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

const TextPriceName = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  /* Brand */

  color: #1b3459;
`;

const NumberPrice = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height */

  /* Brand/Sub 2 */

  color: #ea242a;
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
  data?: typeCK[];
  listDataLSProvince?: MenuBarLocation[];
  listLocation?: string[];
  placeholder?: string;
  onChange?: any;
  selectedPromotionIds: number[];
  setSelectedPromotionIds: Function;
  callback: Function;
};

export default function SelectCheckboxComponent({
  data,
  onChange,
  selectedPromotionIds,
  setSelectedPromotionIds,
  callback
}: TypeProps) {
  const inputStyles = useInputStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [value, setValue] = React.useState<typeCK[]>([]);
  const [pendingValue, setPendingValue] = React.useState<typeCK[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

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

  const renderValue = (event: any) => {
    if (event.length === 0) {
      return `Đã chọn ${data?.length} chiết khấu`;
    } else {
      return `Đã chọn ${data?.length} chiết khấu`;
    }
  };
  function currencyFormat(num) {
    if (!num) {
      return;
    }
    return Number(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  return (
    <React.Fragment>
      <Box sx={{ width: 317, fontSize: 13 }}>
        <FormControl sx={{ width: 317 }}>
          <OutlinedInputStyled
            aria-describedby={id}
            value={renderValue(value)}
            readOnly
            classes={inputStyles}
            onClick={handleClick}
            style={{ borderRadius: 8, height: 44, textAlign: "center" }}
            endAdornment={<KeyboardArrowDownIcon />}
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
              sx={{ p: ".5rem" }}
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
              disableCloseOnSelect
              PopperComponent={PopperComponent}
              renderTags={() => null}
              noOptionsText="No labels"
              renderOption={(props, option, { selected }) => (
                <Box sx={{ p: "1rem", pt: ".5rem" }}>
                  <Typography
                    sx={{
                      color: "#48576D",
                      fontSize: "14px",
                      lineHeight: "16px",
                      fontWeight: 500,
                      mb: 1
                    }}
                  >
                    Chiết khấu tự động
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 15,
                      maxHeight: 568,
                      overflowY: data.length >= 5 ? "scroll" : "hidden",
                    }}
                  >
                    {data.map((item, index) => {
                      if (item?.IsPresent) {
                        return (
                          <>
                            <Divider sx={{ width: "100%" }} />
                            <Typography
                              sx={{
                                color: "#48576D",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "16px",
                              }}
                            >
                              {item.PromotionName}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                gap: 0.5,
                                alignItems: "center",
                              }}
                            >
                              <BpRadio
                                // disabled={!router.pathname.includes("/products/")}
                                checked={
                                  !(selectedPromotionIds || []).includes(
                                    item.PromotionID
                                  )
                                }
                                onChange={(e, checked) => {
                                  const filterArr = selectedPromotionIds.filter(
                                    (it) => it !== item.PromotionID
                                  );
                                  if (!isEmpty(filterArr)) {
                                    setSelectedPromotionIds([...filterArr]);
                                    callback([...filterArr])
                                  } else {
                                    setSelectedPromotionIds([]);
                                    callback([]);
                                  }
                                }}
                              />
                              <TextPriceName>1. Nhận hiện vật</TextPriceName>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                gap: 0.5,
                                alignItems: "center",
                              }}
                            >
                              <BpRadio
                                checked={(selectedPromotionIds || []).includes(
                                  item.PromotionID
                                )}
                                // disabled={!router.pathname.includes("/products/")}
                                onChange={(e, checked) => {
                                  if (!isEmpty(selectedPromotionIds)) {
                                    setSelectedPromotionIds([
                                      ...selectedPromotionIds,
                                      item.PromotionID,
                                    ]);
                                    callback([
                                      ...selectedPromotionIds,
                                      item.PromotionID,
                                    ])
                                  } else {
                                    setSelectedPromotionIds([item.PromotionID]);
                                    callback([item.PromotionID]);
                                  }
                                }}
                              />
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  width: "100%",
                                }}
                              >
                                <TextPriceName>
                                  2. Trừ giá trị hợp đồng
                                </TextPriceName>

                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <NumberPrice>
                                    -{currencyFormat(item?.Value)}đ
                                  </NumberPrice>
                                </div>
                              </Box>
                            </Box>
                          </>
                        );
                      }
                      return (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            width: "100%",
                          }}
						  key={index}
                        >
                          <div style={{ display: "flex", gap: 5 }}>
                            <Checkbox
                              checked={true}
                              disabled
                              sx={{
                                color: "#0063F7",
                                "&.Mui-checked": {
                                  color: "#0063F7",
                                  opacity: 0.4,
                                },
                                width: 24,
                                height: 24,
                              }}
                            />
                            <div
                              style={{
                                maxWidth: 300,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <TextPriceName>
                                {item?.PromotionName}
                              </TextPriceName>
                            </div>
                          </div>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <NumberPrice>
                              -{currencyFormat(item?.Amount)}đ
                            </NumberPrice>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Box>
                // <li
                //   {...props}
                //   style={{
                //     height: 59,
                //     alignItems: "center",
                //     gap: 5,
                //   }}
                // >
                //   <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '100%'}}>
                //     <div style={{display: 'flex', gap: 5}}>
                //       <Checkbox
                //         checked={true}
                //         disabled
                //         sx={{
                //           color: "#0063F7",
                //           "&.Mui-checked": {
                //             color: "#0063F7",
                //           },
                //           width: 24,
                //           height: 24,
                //         }}
                //       />
                //       <div style={{ maxWidth: 165, display: "flex", alignItems: "center" }}>
                //         <TextPriceName>{option?.PromotionName}</TextPriceName>
                //       </div>
                //     </div>
                //     <div style={{  display: "flex", alignItems: "center" }}>
                //       <NumberPrice>
                //         -{currencyFormat(option?.Amount)}đ
                //       </NumberPrice>
                //     </div>
                //   </div>
                // </li>
              )}
              options={["1"]}
              // 	.sort((a, b) => {
              //     // Display the selected labels first.
              //     let ai = value.indexOf(a);
              //     ai = ai === -1 ? value.length + data.indexOf(a) : ai;
              //     let bi = value.indexOf(b);
              //     bi = bi === -1 ? value.length + data.indexOf(b) : bi;
              //     return ai - bi;
              //   }): []}
              // getOptionLabel={(option) => option?.PromotionName}
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
                    display: "none",
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
