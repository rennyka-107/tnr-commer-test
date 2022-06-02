import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconSearchAdvan } from "@components/Icons";
import styled from "@emotion/styled";
import {
  Fade,
  OutlinedInput,
  Paper,
  Popper,
  PopperPlacementType,
  Slider,
} from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";
import SliderComponent from "@components/CustomComponent/SliderComponent";
import SelectInputComponent from "@components/CustomComponent/SelectInputComponent";

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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const TextBannerBottom = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */s

  text-align: right;

  /* Brand/Sub 1 */

  color: #fec83c;
  text-transform: none;
  margin-left: 13px;
`;
const BodyContainer = styled.div`
  width: 1115px;
  height: 318px;
  background: #1b3459;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.12);
`;
const BoxStyled = styled(Box)`
padding: 40px;
    display: flex;
    gap: 30px;
}
`;

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ModalAdvanSearch() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <div>
      <Button onClick={handleClick("bottom")}>
        <IconSearchAdvan />
        <TextBannerBottom>Tìm kiếm nâng cao</TextBannerBottom>
      </Button>

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
        style={{ zIndex: 1000 }}
		
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <BodyContainer>
                <BoxStyled sx={{ minWidth: 120 }}>
                  <SelectInputComponent
                    label="Vị Trí"
                    data={names}
                    value={personName}
                    onChange={handleChange}
                    placeholder="Chọn vị trí"
                  />

                  <SelectInputComponent
                    label="Loại bất động sản"
                    data={names}
                    value={personName}
                    onChange={handleChange}
                    placeholder="Chọn loại bất động sản"
                  />

                  <SelectInputComponent
                    label="Loại bất động sản"
                    data={names}
                    value={personName}
                    onChange={handleChange}
                    placeholder="Chọn loại bất động sản"
                  />
                </BoxStyled>
                <BoxStyled
                  style={{
                    justifyContent: "space-between",
                    padding: "0px 75px 40px 48px",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", gap: 50 }}>
                    <SliderComponent
                      label="Diện tích (m2)"
                      numberMin={30}
                      numberMax={200}
                      unit="m2"
                    />
                    <SliderComponent
                      label="Khoảng giá"
                      numberMin={1}
                      numberMax={20}
                      unit="tỷ"
                    />
                  </div>
                  <div>
                    <Button
                      style={{
                        backgroundColor: "#D60000",
                        width: 163,
                        height: 48,
                        borderRadius: 8,
                      }}
                    >
                      <span
                        style={{
                          color: "#FFFFFF",
                          fontFamily: "Roboto",
                          fontWeight: 400,
                          fontSize: 16,
                          lineHeight: 19,
                          textTransform: "none",
                        }}
                      >
                        {" "}
                        Tìm kiếm
                      </span>
                    </Button>
                  </div>
                </BoxStyled>
              </BodyContainer>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
