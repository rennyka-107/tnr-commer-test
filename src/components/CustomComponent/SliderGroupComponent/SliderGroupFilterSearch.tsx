import FormLabel from "@components/Form/FormLabel";
import {
  IconSelectDatLich,
  IconSelectDropdown,
  SearchIconSearchPage,
} from "@components/Icons";
import styled from "@emotion/styled";
import {
  Button,
  Card,
  ClickAwayListener,
  FormControl,
  Stack,
  SxProps,
} from "@mui/material";
import { Theme } from "@mui/system";
import { FC, useState } from "react";

interface SilderGroupProps {
  fullWidth?: boolean;
  label?: string;
  children?: React.ReactNode | React.ReactNode[];
  text: React.ReactNode | React.ReactNode[] | string;
  sx?: SxProps<Theme>;
  handleApply?: () => void;
  handleCancel?: () => void;
  spacing?: number | string;
}

const StyledDiv = styled("div")`
display: flex;
flex-direction: row; 
justi
  background-color: white;
  border: 1px solid #c7c9d9;
  border-radius: 8px;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  padding: 7px 21px;
  gap: 10px;
  cursor: pointer;
  :hover {
    border-color: #1b3459;
  }
`;

const PopUp = styled(Card)`
  background: #ffffff;
  box-shadow: 0px 4px 64px 24px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  position: absolute;
  bottom: 0;
  transform: translate(0%, 100%);
  padding: 20px;
  z-index: 11;
`;

const SliderGroupFilterSearch: FC<SilderGroupProps> = ({
  fullWidth,
  label,
  children,
  text,
  sx,
  handleApply,
  spacing = 4,
  handleCancel,
}: SilderGroupProps) => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const onOpen = () => {
    setOpenFilter(true);
  };

  const onApply = () => {
    setOpenFilter(false);
    if (handleApply) handleApply();
  };

  const onCancel = () => {
    setOpenFilter(false);
    if (handleCancel) handleCancel();
  };

  return (
    <>
      <FormControl
        fullWidth={fullWidth}
        sx={{ m: 1, width: 150, mt: 3, position: "relative", ...sx }}
      >
        <FormLabel title={label} />
        {/* <ClickAwayListener onClickAway={onCancel}> */}
        <div>
          <StyledDiv onClick={onOpen}>
            {text} <IconSelectDropdown style={{ width: 9, height: 9 }} />
          </StyledDiv>
          <PopUp hidden={!openFilter}>
            <Stack direction={"column"} spacing={spacing}>
              {children}
              <Stack spacing={2} direction={"row"} justifyContent={"flex-end"}>
                <Button style={{ color: "#1B3459" }} onClick={onCancel}>
                  Huỷ
                </Button>
                <Button
                  variant={"contained"}
                  style={{ background: "#1B3459" }}
                  onClick={onApply}
                >
                  Áp dụng
                </Button>
              </Stack>
            </Stack>
          </PopUp>
        </div>
        {/* </ClickAwayListener> */}
      </FormControl>
    </>
  );
};

export default SliderGroupFilterSearch;
