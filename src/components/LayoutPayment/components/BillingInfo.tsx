import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import {
  FormControl,
  RadioGroup,
  Grid,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";
import {
  WrapperBoxBorderStyled,
  Title28Styled,
  RowStyled,
  Text14ItalicStyled,
  Text18Styled,
  ColStyled,
} from "../../StyledLayout/styled";
import styled from "@emotion/styled";

const BoxInputStyled = styled(Box)(
  {
    width: "100%",
    height: 44,
    borderRadius: 8,
    padding: "10px 46px",
    marginTop: 3,
    marginBottom: 16,
  },
  (props: { color?: string }) => ({
    color: props.color ?? "#B8B8B8",
    border: `1px solid ${props.color ?? "#b8b8b8"}`,
  })
);

type Props = {
  setBilling: Dispatch<SetStateAction<number>>;
  billing: number;
};

const BillingInfo = ({ setBilling, billing }: Props) => {
  const [colorActive, setColorActive] = useState<string[]>([
    "#FCB715",
    "#C7C9D9",
  ]);
  useEffect(() => {
    setColorActive(
      billing === 1 ? ["#FCB715", "#C7C9D9"] : ["#C7C9D9", "#FCB715"]
    );
  }, [billing]);

  return (
    <WrapperBoxBorderStyled className="custom-billing-information">
      <Title28Styled>Thông tin thanh toán</Title28Styled>
      <FormControl style={{ width: "100%" }}>
        <RadioGroup
          defaultValue={billing}
          onChange={(event) => setBilling(+event.target.value)}
        >
          <Grid container spacing={"30px"}>
            <Grid item xs={6}>
              <FormControlLabel
                value={1}
                control={<Radio />}
                label={<Text18Styled>Số tiền đặt hàng tối thiểu</Text18Styled>}
              />
              <BoxInputStyled color={colorActive[0]}>
                <Text18Styled color={colorActive[0]}>
                  20.000.000 vnd
                </Text18Styled>
              </BoxInputStyled>
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                value={2}
                control={<Radio />}
                label={<Text18Styled>Tổng tiền đặt hàng</Text18Styled>}
              />
              <BoxInputStyled color={colorActive[1]}>
                <Text18Styled color={colorActive[1]}>
                  50.000.000 vnd
                </Text18Styled>
              </BoxInputStyled>
            </Grid>
          </Grid>
        </RadioGroup>
        <Text14ItalicStyled sx={{ maxWidth: 330 }}>
          Vui lòng thanh toán đủ tổng tiền cọc trong vòng 24h để được hoàn thiện
          hồ sơ
        </Text14ItalicStyled>
      </FormControl>
    </WrapperBoxBorderStyled>
  );
};

export default BillingInfo;
