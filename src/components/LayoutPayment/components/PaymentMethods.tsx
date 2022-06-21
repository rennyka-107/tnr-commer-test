import {
  FormControl,
  RadioGroup,
  Grid,
  Radio,
  Box,
  FormControlLabel,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import {
  ColStyled,
  Text14ItalicStyled,
  Text18Styled,
  Title28Styled,
  WrapperBoxBorderStyled,
} from "../../StyledLayout/styled";
import styled from "@emotion/styled";
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";

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
  setPayMethod: Dispatch<SetStateAction<string>>;
  payMethod: string;
};

const PaymentMethods = ({ payMethod, setPayMethod }: Props) => {
  const { listPayment } = useSelector((state: RootState) => state.payments);

  return (
    <WrapperBoxBorderStyled height={290} className="custom-billing-information">
      <Title28Styled>Phương thức thanh toán</Title28Styled>
      <FormControl style={{ width: "100%", marginTop: 17 }}>
        <RadioGroup
          value={payMethod}
          onChange={(event) => {
            setPayMethod(event.target.value);
          }}
        >
          <Grid container spacing={"17px"}>
            {listPayment.map((pm, idx) => {
              return (
                <Grid key={idx} item xs={12}>
                  <BoxCheckStyled
                    color={payMethod === pm.id ? "#FCB715" : "#C7C9D9"}
                  >
                    <FormControlLabel
                      value={pm.id}
                      control={<Radio />}
                      label={
                        <ColStyled>
                          <Text18Styled style={{ marginBottom: 9 }}>
                            {pm.name}
                          </Text18Styled>
                          {pm.description && (
                            <Text14ItalicStyled>
                              {pm.description}
                            </Text14ItalicStyled>
                          )}
                        </ColStyled>
                      }
                    />
                  </BoxCheckStyled>
                </Grid>
              );
            })}
          </Grid>
        </RadioGroup>
      </FormControl>
    </WrapperBoxBorderStyled>
  );
};

export default PaymentMethods;
