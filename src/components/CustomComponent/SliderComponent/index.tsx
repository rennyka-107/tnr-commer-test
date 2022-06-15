import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

type Props = {
	label?: string;
	numberMin?: number;
	numberMax?: number;
	unit?: string;
	style?: React.CSSProperties;
	onChange?: any;
	value?: any;

  };

const SliderSyled = styled(Slider)`
  color: #fcb715;
  height: 0.1rem;
  .MuiSlider-rail {
    color: #d8d8d8;
  }
  .MuiSlider-thumb{
	  height: 13px;
	  width: 13px;
  }
  .MuiSlider-valueLabel {
    background-color: transparent;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;

    color: #ffffff;
  }
  .MuiSlider-valueLabelOpen {
    transform: translateY(150%) scale(1) !important;
  }
`;
const CustomTittle = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */

  color: #ffffff;
`;


const minDistance = 10;

export default function SliderComponent({label,numberMin,numberMax,unit,onChange,value}) {
  const [value1, setValue1] = React.useState<number[]>([0, 200]);

  function valuetext(value: number) {
	return `${value} ${unit}`;
  }
  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };


  return (
    <Box sx={{ width: 297 }}>
      <CustomTittle>{label}</CustomTittle>
      <SliderSyled
        getAriaLabel={() => "Minimum distance"}
        value={value}
		min={numberMin}
		max={numberMax}
        onChange={onChange}
        valueLabelDisplay="on"
        valueLabelFormat={valuetext}
        disableSwap
      />
    </Box>
  );
}
