import {
  FormControl,
  RadioGroup,
  Grid,
  Radio,
  Box,
  FormControlLabel,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  ColStyled,
  Text14ItalicStyled,
  Text18Styled,
  Title28Styled,
  WrapperBoxBorderStyled,
} from "../../StyledLayout/styled";
import styled from "@emotion/styled";

const BoxCheckStyled = styled(Box)(
  {
    width: "100%",
    borderRadius: 8,
    height: 84,
    display: "flex",
    alignItems: "center",
    paddingLeft: 35,
  },
  (props: { color?: string }) => ({
    border: `2px solid ${props.color ?? "#b8b8b8"}`,
  })
);

type Props = {
  setPayMethod: Dispatch<SetStateAction<number>>;
  payMethod: number;
};

const PaymentMethods = ({ payMethod, setPayMethod }: Props) => {
  const [colorActive, setColorActive] = useState<string[]>([
    "#FCB715",
    "#C7C9D9",
  ]);
  useEffect(() => {
    setColorActive(
      payMethod === 1 ? ["#FCB715", "#C7C9D9"] : ["#C7C9D9", "#FCB715"]
    );
  }, [payMethod]);

  return (
    <WrapperBoxBorderStyled height={290} className="custom-billing-information">
      <Title28Styled>Phương thức thanh toán</Title28Styled>
      <FormControl style={{ width: "100%", marginTop: 17 }}>
        <RadioGroup
          defaultValue={payMethod}
          onChange={(event) => setPayMethod(+event.target.value)}
        >
          <Grid container spacing={"17px"}>
            <Grid item xs={12}>
              <BoxCheckStyled color={colorActive[0]}>
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label={<Text18Styled>Mobile Banking</Text18Styled>}
                />
              </BoxCheckStyled>
            </Grid>
            <Grid item xs={12}>
              <BoxCheckStyled color={colorActive[1]}>
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label={
                    <ColStyled>
                      <Text18Styled style={{ marginBottom: 9 }}>
                        Cổng thanh toán online
                      </Text18Styled>
                      <Text14ItalicStyled>
                        Sử dụng ATM đã đăng ký Internet Banking hoặc các thẻ
                        Quốc tế Visa, Master card .....
                      </Text14ItalicStyled>
                    </ColStyled>
                  }
                />
              </BoxCheckStyled>
            </Grid>
          </Grid>
        </RadioGroup>
      </FormControl>
    </WrapperBoxBorderStyled>
  );
};

export default PaymentMethods;
