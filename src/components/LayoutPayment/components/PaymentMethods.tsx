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
  Text14Styled,
  Text18Styled,
  Title28Styled,
  WrapperBoxBorderStyled,
} from "../../StyledLayout/styled";
import styled from "@emotion/styled";
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";

const BoxCheckStyled = styled(Box)(
  {
    width: "100%",
    borderRadius: 8,
    height: "auto",
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
  const { cart } = useSelector((state: RootState) => state.carts);
  const {
    query: { transactionCode },
  } = useRouter();

  console.log(payMethod, "paymethod")

  return (
    <WrapperBoxBorderStyled className="custom-billing-information">
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
                      disabled={!isEmpty(transactionCode)}
                      sx={{ minWidth: "100%" }}
                      componentsProps={{
                        typography: {
                          flex: 1,
                          pr: "35px",
                          mt: "20px",
                          mb: "20px",
                        },
                      }}
                      value={pm.id}
                      control={<Radio />}
                      label={
                        <ColStyled sx={{}}>
                          <Text18Styled style={{ marginBottom: 9 }}>
                            {pm.name}
                          </Text18Styled>
                          {pm.description && (
                            <Text14ItalicStyled>
                              {pm.description}
                            </Text14ItalicStyled>
                          )}
                          {pm.id === "2F19283D-4384-43B7-805F-556BAAbcn447" && (
                            <Box
                              sx={{
                                mt: 1,
                                display: "flex",
                                justifyContent: "space-between",
                                minWidth: "100%",
                              }}
                            >
                              <Text14Styled>Tên chủ tài khoản</Text14Styled>
                              <Text14Styled>
                                {!isEmpty(cart) && !isEmpty(cart.accountMSB)
                                  ? cart.accountMSB?.name
                                  : ""}
                              </Text14Styled>
                            </Box>
                          )}
                          {pm.id === "2F19283D-4384-43B7-805F-556BAAbcn447" && (
                            <Box
                              sx={{
                                mt: 1,
                                display: "flex",
                                justifyContent: "space-between",
                                minWidth: "100%",
                              }}
                            >
                              <Text14Styled>Ngân hàng</Text14Styled>
                              <Text14Styled>
                                {!isEmpty(cart) && !isEmpty(cart.accountMSB)
                                  ? cart.accountMSB?.bankName
                                  : ""}
                              </Text14Styled>
                            </Box>
                          )}
                          {pm.id === "2F19283D-4384-43B7-805F-556BAAbcn447" && (
                            <Box
                              sx={{
                                mt: 1,
                                display: "flex",
                                justifyContent: "space-between",
                                minWidth: "100%",
                              }}
                            >
                              <Text14Styled>Chi nhánh</Text14Styled>
                              <Text14Styled>
                                {!isEmpty(cart) && !isEmpty(cart.accountMSB)
                                  ? cart.accountMSB?.bankBranchName
                                  : ""}
                              </Text14Styled>
                            </Box>
                          )}
                          {pm.id === "2F19283D-4384-43B7-805F-556BAAbcn447" && (
                            <Box
                              sx={{
                                mt: 1,
                                display: "flex",
                                justifyContent: "space-between",
                                minWidth: "100%",
                              }}
                            >
                              <Text14Styled>Số tài khoản</Text14Styled>
                              <Text14Styled>
                                {!isEmpty(cart) && !isEmpty(cart.accountMSB)
                                  ? cart.accountMSB?.accountNumber
                                  : ""}
                              </Text14Styled>
                            </Box>
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
