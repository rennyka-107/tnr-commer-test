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
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import { currencyFormat } from "utils/helper";
import isEmpty from "lodash.isempty";
import { useRouter } from "next/router";

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
  const {
    query: { transactionCode },
  } = useRouter();
  const data = useSelector((state: RootState) => state.payments.data);
  const productPTG = useSelector(
    (state: RootState) => state.products.productItem
  );
  useEffect(() => {
    setColorActive(
      billing === 1 ? ["#FCB715", "#C7C9D9"] : ["#C7C9D9", "#FCB715"]
    );
  }, [billing]);

  useEffect(() => {
    if (
      !isEmpty(transactionCode) &&
      !isEmpty(data) &&
      !isEmpty(data?.deposite) && !isEmpty(data.quotationRealt)
    ) {
      setBilling(
        data?.quotationRealt?.minEarnestMoney === data?.deposite ? 1 : 2
      );
    }
  }, [transactionCode, data?.deposite]);

  return (
    <WrapperBoxBorderStyled className="custom-billing-information">
      <Title28Styled>Thông tin thanh toán</Title28Styled>
      <FormControl style={{ width: "100%" }}>
        <RadioGroup
          value={billing}
          onChange={(event) => setBilling(+event.target.value)}
        >
          <Grid container spacing={"30px"}>
            <Grid item xs={6}>
              <FormControlLabel
                disabled={
                  !isEmpty(transactionCode) && data?.paymentStatus !== 0
                }
                value={1}
                control={<Radio />}
                label={<Text18Styled>Số tiền đặt hàng tối thiểu</Text18Styled>}
              />
              <BoxInputStyled color={colorActive[0]}>
                <Text18Styled color={colorActive[0]}>
                  {!isEmpty(data.production)
                    ? currencyFormat(data?.quotationRealt?.minEarnestMoney)
                    : currencyFormat(productPTG.DepositMoneyMin)}{" "}
                  vnd
                </Text18Styled>
              </BoxInputStyled>
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                disabled={
                  !isEmpty(transactionCode) && data?.paymentStatus !== 0
                }
                value={2}
                control={<Radio />}
                label={<Text18Styled>Tổng tiền đặt hàng</Text18Styled>}
              />
              <BoxInputStyled color={colorActive[1]}>
                <Text18Styled color={colorActive[1]}>
                  {!isEmpty(data.production)
                    ? currencyFormat(data?.quotationRealt?.regulationOrderPrice)
                    : currencyFormat(productPTG.DepositMoney)}
                  vnd
                </Text18Styled>
              </BoxInputStyled>
            </Grid>
          </Grid>
        </RadioGroup>
        {billing === 1 && (
          <Text14ItalicStyled
            sx={{ maxWidth: 300 }}
            style={{
              color: "#FF3B3B",
              fontWeight: 500,
              fontSize: 14,
              fontStyle: "italic",
            }}
          >
            Vui lòng thanh toán đủ tổng tiền cọc trong vòng{" "}
            {productPTG?.TimeOfPayment} {productPTG?.TimeOfPaymentUnit} để được
            hoàn thiện hồ sơ
          </Text14ItalicStyled>
        )}
      </FormControl>
    </WrapperBoxBorderStyled>
  );
};

export default BillingInfo;
