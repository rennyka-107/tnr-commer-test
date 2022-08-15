import { FormControlLabel, Radio, RadioGroup, Switch } from "@mui/material";
import { Box, styled } from "@mui/system";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
// 0: //Mới nhất
// 1: //Cũ nhất
// 2: //Giá cao-thấp
// 3: //Giá thấp-cao
type RadioType = "0" | "1" | "2" | "3";

interface Props {
  handleChangeFilter: (filter: any) => void;
  total: number;
}

const FilterSection = ({ handleChangeFilter, total }: Props) => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [radioValue, setRadioValue] = useState<RadioType>("0");
  const [switchValue, setSwitchValue] = useState<boolean>(true);

  const handleChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value as RadioType);
    handleChangeFilter({
      sortType: parseInt(e.target.value),
      isPayment: switchValue ? 1 : 0,
    });
  };

  const handleChangeSwitch = (e: ChangeEvent<HTMLInputElement>) => {
    setSwitchValue(e.target.checked);
    handleChangeFilter({
      sortType: parseInt(radioValue),
      isPayment: e.target.checked ? 1 : 0,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        m: "20px 48px 0 48px",
      }}
    >
      <Box
        sx={{
          fontWeight: 400,
          fontSize: "14px",
          display: "flex",
        }}
      >
        <Box sx={{ fontWeight: 700, fontSize: "16", mr: 1 }}>{total}</Box>
        <Box sx={{ color: "#8190A7" }}>Sản phẩm có thể đổi</Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          columnGap: 1,
          cursor: "pointer",
          position: "relative",
        }}
        onMouseEnter={() => setOpenFilter(true)}
        onMouseLeave={() => setOpenFilter(false)}
      >
        <Image alt="" src="/icons/filter_icon.svg" width={16} height={11} />
        <Box sx={{ color: "#1B3459", fontSize: "16px", fontWeight: 400 }}>
          Sắp xếp
        </Box>
        <StyledFilter openFilter={openFilter}>
          <ul className="list">
            <li className="item">
              <div className="text">Sản phẩm đang mở bán lên đầu</div>
              <Switch checked={switchValue} onChange={handleChangeSwitch} />
            </li>
            <li className="item">
              <Radio
                checked={radioValue === "0"}
                value="0"
                onChange={handleChangeRadio}
                name="radio-buttons"
              />
              <div className="text">Mới nhất</div>
            </li>
            <li className="item">
              <Radio
                checked={radioValue === "1"}
                value="1"
                onChange={handleChangeRadio}
                name="radio-buttons"
              />
              <div className="text">Cũ nhất</div>
            </li>
            <li className="item">
              <Radio
                checked={radioValue === "2"}
                value="2"
                onChange={handleChangeRadio}
                name="radio-buttons"
              />
              <div className="text">Giá bằng giá đặt cọc - cao</div>
            </li>
            <li className="item">
              <Radio
                checked={radioValue === "3"}
                value="3"
                onChange={handleChangeRadio}
                name="radio-buttons"
              />
              <div className="text">Giá cao - bằng giá đặt cọc</div>
            </li>
          </ul>
        </StyledFilter>
      </Box>
    </Box>
  );
};

export default FilterSection;

interface StyledFilterProps {
  openFilter: boolean;
}

const StyledFilter = styled(Box)<StyledFilterProps>((props) => ({
  position: "absolute",
  backgroundColor: "#fff",
  zIndex: 1,
  boxShadow: "0px 4px 64px 24px rgba(0, 0, 0, 0.08)",
  width: "328px",
  right: "-4px",
  top: "25px",
  borderRadius: "4px",
  display: `${props.openFilter ? "block" : "none"}`,

  ".list": {
    listStyle: "none",
    padding: 0,
  },

  ".item": {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "15px 15px 15px 25px",
  },

  ".item + .item": {
    borderTop: "1px solid #F2F2F5",
  },
}));
