import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  RadioProps,
  Switch,
  SwitchProps,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

type TypeProps = {
  setTypeProduct: (value: string) => void;
  setTypeSaleProduct: (value: string) => void;
};

const TextStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  /* Brand */

  color: #1b3459;
`;

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 45,
  height: 22,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    color: "#0063F7",
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(22px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#0063F7" : "#0063F7",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 18,
    height: 18,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#FFFFFF" : "#FFFFFF",
    border: "1px solid #0063F7",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),

    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="white" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      //   left: 12,
      left: 3,
    },
    "&:after": {
      backgroundImage: `url('/icons/icondeactiveswitch.png')`,
      right: 6,
      height: 10,
      width: 11,
      backgroundSize: "cover",
    },
  },
}));

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 24,
  height: 24,
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

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#0063F7",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 22,
    height: 22,
    backgroundImage: "radial-gradient(#FFFFFF,#FFFFFF 40%,transparent 50%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#0063F7",
  },
});

const TextRadioStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  /* Brand */

  color: #1b3459;
`;

const SwitchComponent = ({ setTypeProduct, setTypeSaleProduct }: TypeProps) => {
  const typeProduct = localStorage?.getItem("typeProduct");
  const typeSaleProduct = localStorage?.getItem("typeSaleProduct");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypeProduct((event.target as HTMLInputElement).value);
  };

  const handleChangeTop = (e: any) => {
    if (e.target.checked === true) {
      setTypeSaleProduct("0");
    } else {
      setTypeSaleProduct("1");
    }
  };
  const BpRadio = (props: RadioProps) => {
    return (
      <Radio
        sx={{
          "&:hover": {
            bgcolor: "transparent",
          },
        }}
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        {...props}
      />
    );
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #F2F2F5",
          padding: "15px 20px 15px 20px",
        }}
      >
        <TextStyled>Sản phẩm đang mở bán lên đầu</TextStyled>
        <IOSSwitch
          defaultChecked={JSON.parse(typeSaleProduct) === "0" ? true : false}
          onChange={handleChangeTop}
        />
      </div>
      {/* <div style={{ padding: "15px 20px 15px 20px" }}> */}
      <FormControl style={{ width: "100%" }}>
        <RadioGroup
          defaultValue={JSON.parse(typeProduct)}
          aria-labelledby="demo-customized-radios"
          name="customized-radios"
          onChange={handleChange}
        >
          <div
            style={{ borderBottom: "1px solid #F2F2F5", padding: "5px 20px" }}
          >
            <FormControlLabel
              value="0"
              control={<BpRadio />}
              label={<TextRadioStyled>Mới nhất</TextRadioStyled>}
            />
          </div>
          <div
            style={{ borderBottom: "1px solid #F2F2F5", padding: "5px 20px" }}
          >
            <FormControlLabel
              value="1"
              control={<BpRadio />}
              label={<TextRadioStyled>Cũ nhất</TextRadioStyled>}
            />
          </div>
          <div
            style={{ borderBottom: "1px solid #F2F2F5", padding: "5px 20px" }}
          >
            <FormControlLabel
              value="2"
              control={<BpRadio />}
              label={<TextRadioStyled>Giá cao - thấp</TextRadioStyled>}
            />
          </div>
          <div
            style={{
              borderBottom: "1px solid #F2F2F5",
              padding: "5px 0px 5px 20px",
            }}
          >
            <FormControlLabel
              value="3"
              control={<BpRadio />}
              label={<TextRadioStyled>Giá thấp - cao</TextRadioStyled>}
            />
          </div>
        </RadioGroup>
      </FormControl>
      {/* </div> */}
    </>
  );
};
export default SwitchComponent;
