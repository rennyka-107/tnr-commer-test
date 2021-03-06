import BoxContainer from "@components/CustomComponent/BoxContainer";
import LoadingComponent from "@components/LoadingComponent";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import {
  ContractI,
  getOrderById,
} from "@service/Profile";
import ImageWithHideOnError from "hooks/ImageWithHideOnError";

import { isEmpty } from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FormatFns from "utils/DateFns";
import { dayOfWeekToString, getDateFromStringDMY } from "utils/helper";
import Product3 from "../../../public/images/product3.png";
interface Props {
  item: ContractI;
}
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImageProduct = styled(Image)`
  border-radius: 8px;
`;

const HeaderTitle = styled.span`
  color: #1b3459;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 33px;
`;

const TitleNameProject = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #8190a7;
`;
const TitleProductProject = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #1b3459;
`;
const TextLeftTop = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #1b3459;
`;

const TitleCenterStyled = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #1b3459;
`;

const TextBottomTable = styled.span`
  background: #ffffff;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  /* Brand */

  color: #1b3459;
`;

const DetailTransaction = () => {
  const router = useRouter();
  const { transCode } = router.query;
  const [data, setData] = useState<any[any]>([]);

  const fetchById = async (id: any) => {
    try {
      const response = await getOrderById(id);
      setData(response.responseData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchById(transCode);
  }, [router]);

  const convertDateToString = (date: Date) => {
    const house = FormatFns.format(date, "HH:mm");
    const day = FormatFns.format(date, "dd/MM/yyyy");
    const dateOfWeek = date.getDay();
    return house + " | " + dayOfWeekToString(dateOfWeek) + "," + day;
  };

  function currencyFormat(num) {
    if (!num) {
      return;
    }
    return Number(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  const fecthComponent = () => {
	console.log(data)
    return (
      <>
        {isEmpty(data) ? (
          <>
            <LoadingComponent />
          </>
        ) : (
          <div style={{ padding: 60 }}>
            <div style={{ display: "flex", flexDirection: "row", gap: 50 }}>
              <ImageWithHideOnError
                className="logo"
                src={data.production.apartmentModel.image}
                fallbackSrc={Product3}
                height={199}
                width={350}
                title={"Logo "}
                alt={"Logo "}
                priority
                style={{ borderRadius: 8 }}
                unoptimized={true}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <TitleNameProject>
                  {data?.production.thongTinDuAn.name}
                </TitleNameProject>
                <TitleProductProject>
                  {data?.production.lotSymbolLegal}
                </TitleProductProject>
                <div style={{ border: "1px solid #C7C9D9" }} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <TextLeftTop>Di???n t??ch</TextLeftTop>
                    <TextLeftTop>Ph??ng ng???</TextLeftTop>
                    <TextLeftTop>Ph??ng t???m</TextLeftTop>
                    <TextLeftTop>H?????ng</TextLeftTop>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      textAlign: "right",
                    }}
                  >
                    <TextLeftTop>
                      {data.production.landArea
                        ? data.production.landArea
                        : "N/A"}
                    </TextLeftTop>
                    <TextLeftTop>
                      {data.production.numBed ? data.production.numBed : "N/A"}
                    </TextLeftTop>
                    <TextLeftTop>
                      {data.production.numBath
                        ? data.production.numBath
                        : "N/A"}
                    </TextLeftTop>
                    <TextLeftTop>
                      {data.production.doorDirection
                        ? data.production.doorDirection
                        : "N/A"}
                    </TextLeftTop>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 27 }}>
              <TitleCenterStyled style={{ marginBottom: 20 }}>
                Th??ng tin ?????t c???c
              </TitleCenterStyled>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 15,
                  }}
                >
                  <TextLeftTop>M?? ?????t ch???</TextLeftTop>
                  <TextLeftTop>Th???i gian ?????t ch???</TextLeftTop>
                  <TextLeftTop>T??nh tr???ng ?????t ch???</TextLeftTop>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 15,
                    textAlign: "right",
                    alignItems: "end",
                  }}
                >
                  <TextLeftTop>{data.billNumber}</TextLeftTop>
                  <TextLeftTop>
                    {convertDateToString(
                      getDateFromStringDMY(data.createdAt) ?? new Date()
                    )}
                  </TextLeftTop>
                  {data.transactionCodeObject.orderList.status ===
                  "Ch??a ho??n th??nh h??? s??"  || data.transactionCodeObject.orderList.status === "???? t???o b???n nh??p th??ng tin mua h??ng" ?(
                    <>
                      <TextLeftTop
                        style={{ color: "#EA242A", fontWeight: 700 }}
                      >
                            {data.transactionCodeObject.orderList.status}
                      </TextLeftTop>
                      <Button
                        style={{
                          height: 30,
                          width: 130,
                          background: "#FEC83C",
                          textTransform: "none",
                          color: "#0E1D34",
                          fontSize: 12,
                          borderRadius: 8,
                        }}
                        onClick={() =>
                          router.push(
                            `/payment-cart?transactionCode=${data.transactionCodeObject.code}`
                          )
                        }
                      >
                        Ho??n Thi???n
                      </Button>
                    </>
                  ) : (
                    <>
                      <TextLeftTop>
                        {data.transactionCodeObject.orderList.status}
                      </TextLeftTop>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 30 }}>
              <TitleCenterStyled style={{ marginBottom: 20 }}>
                Th??ng tin kh??ch h??ng
              </TitleCenterStyled>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 15,
                  }}
                >
                  <TextLeftTop>T??n kh??ch h??ng</TextLeftTop>
                  <TextLeftTop>S??? CMND</TextLeftTop>
                  <TextLeftTop>??i???n tho???i</TextLeftTop>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 15,
                    textAlign: "right",
                  }}
                >
                  <TextLeftTop>
                    {data.paymentIdentityInfos[0].fullname}
                  </TextLeftTop>
                  <TextLeftTop>
                    {data.paymentIdentityInfos[0].idNumber}
                  </TextLeftTop>
                  <TextLeftTop>
                    {data.paymentIdentityInfos[0].phoneNumber}
                  </TextLeftTop>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 27 }}>
              <TitleCenterStyled style={{ marginBottom: 20 }}>
                B??o gi??
              </TitleCenterStyled>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 15,
                  }}
                >
                  <TextLeftTop>Gi?? B??S</TextLeftTop>
                  <TextLeftTop>Thu??? VAT</TextLeftTop>
                  <TextLeftTop>Ph?? b???o tr??</TextLeftTop>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 15,
                    textAlign: "right",
                  }}
                >
                  <TextLeftTop>
                    {currencyFormat(data.quotationRealt.landPrice)} ??
                  </TextLeftTop>
                  <TextLeftTop>
                    {currencyFormat(data.quotationRealt.vat)} ??
                  </TextLeftTop>
                  <TextLeftTop>
                    {currencyFormat(data.quotationRealt.maintainPrice)} ??
                  </TextLeftTop>
                </div>
              </div>
            </div>
            <div
              style={{
                border: "1px solid #C7C9D9",
                marginTop: 20,
                marginBottom: 20,
              }}
            />
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 15,
                  }}
                >
                  <TextLeftTop>T???ng ti???n ni??m y???t</TextLeftTop>
                  <TextLeftTop>Gi???m gi??</TextLeftTop>
                  <TextLeftTop>T???ng ti???n mua online</TextLeftTop>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 15,
                    textAlign: "right",
                  }}
                >
                  <TextLeftTop>
                    {currencyFormat(data.quotationRealt.totalPrice)} ??
                  </TextLeftTop>
                  <TextLeftTop>
                    {currencyFormat(data.quotationRealt.sales)} ??
                  </TextLeftTop>
                  <TextLeftTop>
                    {currencyFormat(data.quotationRealt.totalOnlinePrice)} ??
                  </TextLeftTop>
                </div>
              </div>
            </div>
            <div
              style={{
                border: "1px solid #C7C9D9",
                marginTop: 20,
                marginBottom: 20,
              }}
            />
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 15,
                  }}
                >
                  <TextLeftTop>Ti???n ?????t ch??? t???i thi???u</TextLeftTop>
                  <TextLeftTop>Ti???n ?????t c???c quy ?????nh</TextLeftTop>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 15,
                    textAlign: "right",
                  }}
                >
                  <TextLeftTop>
                    {currencyFormat(data.quotationRealt.minEarnestMoney)} ??
                  </TextLeftTop>
                  <TextLeftTop>
                    {currencyFormat(data.quotationRealt.regulationOrderPrice)} ??
                  </TextLeftTop>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 27 }}>
              <TitleCenterStyled style={{ marginBottom: 20 }}>
                Chi ti???t thanh to??n
              </TitleCenterStyled>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 15,
                  }}
                >
                  <TextLeftTop>???? ?????t c???c</TextLeftTop>
                  <TextLeftTop>???? thanh to??n</TextLeftTop>
                  <TextLeftTop>C??n l???i</TextLeftTop>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 15,
                    textAlign: "right",
                  }}
                >
                  <TextLeftTop>
                    {currencyFormat(
                      data.transactionCodeObject.orderList.deposite
                    )}{" "}
                    ??
                  </TextLeftTop>
                  <TextLeftTop>
                    {currencyFormat(data.transactionCodeObject.orderList.paid)}{" "}
                    ??
                  </TextLeftTop>
                  <TextLeftTop>
                    {currencyFormat(
                      data.transactionCodeObject.orderList.deposite
                    )}{" "}
                    ??
                  </TextLeftTop>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "10px",
                background: "#F3F4F6",
                gap: 10,
                height: 76,
                marginTop: 25,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 80,
                  padding: "10px 10px 0px 10px",
                }}
              >
                <TextLeftTop>M?? TT</TextLeftTop>
                <TextLeftTop>Ng??y TT</TextLeftTop>
                <TextLeftTop>S??? ti???n</TextLeftTop>
                <TextLeftTop>H??nh th???c</TextLeftTop>
                <TextLeftTop>Tr???ng th??i</TextLeftTop>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                  background: "#ffffff",
                  height: 34,
                  padding: 10,
                }}
              >
                <TextBottomTable style={{ fontSize: 12, maxWidth: 150 }}>
                  {data.billNumber}
                </TextBottomTable>
                <TextBottomTable style={{ fontSize: 12, maxWidth: 200 }}>
                  {" "}
                  {convertDateToString(
                    getDateFromStringDMY(data.createdAt) ?? new Date()
                  )}
                </TextBottomTable>
                <TextBottomTable style={{ fontSize: 12, maxWidth: 150 }}>
                  {currencyFormat(data.deposite)} ??
                </TextBottomTable>
                <TextBottomTable style={{ fontSize: 12, maxWidth: 150 }}>
                  {data.paymentMethod.name}
                </TextBottomTable>
                <TextBottomTable style={{ fontSize: 12, maxWidth: 150 }}>
                  Ch??? duy???t
                </TextBottomTable>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
    fecthComponent();
  }, [data]);

  return (
    <BoxContainer
      HeaderCustom={
        <HeaderContainer>
          <HeaderTitle>Chi ti???t giao d???ch</HeaderTitle>
        </HeaderContainer>
      }
      styleCustom={{ padding: "21px 24px" }}
    >
      {/* {item?.avatar ? (
          <ImageProduct
            loader={({ src, width, quality }) => {
              return `${src}?w=${width}&q=${quality}`;
            }}
            src={
              item?.avatar ??
              "https://tse3.mm.bing.net/th?id=OIP.zsEgRepQ6Uh5OYkkhJyn2gHaE5&pid=Api&P=0&w=277&h=183"
            }
            width={159}
            height={96}
            alt=""
          />
        ) : ( */}

      {/* )} */}
      {fecthComponent()}
    </BoxContainer>
  );
};

export default DetailTransaction;
