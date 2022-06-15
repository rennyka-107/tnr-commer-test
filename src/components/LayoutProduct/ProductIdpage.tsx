import React, { useEffect, useState } from "react";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import _ from "lodash";

import {
  Box,
  Button,
  Modal,
  Typography,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import styled from "@emotion/styled";
import Product1 from "../../../public/images/product1.png";
import Product2 from "../../../public/images/product2.png";
import Product3 from "../../../public/images/product3.png";
import {
  Icon360,
  IconBath,
  IconBedDouble,
  IconClipboardProduct,
  IconCompass,
  IconFrame,
  IconHeadSetProduct,
  IconNhaMau,
  IconPhieuTinhGia,
  IconReceiptDisabled,
  IconDownloadPTG,
  IconSetting,
} from "@components/Icons";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  downloadPhieuTinhGiaAPI,
  getProductPtgApi,
} from "../../../pages/api/productsApi";
import { getProductPTG } from "../../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ProjectResponse } from "interface/project";
import { ResponseSearchById } from "interface/product";
import { useRouter } from "next/router";

interface ProductsProps {
  listProject?: ProjectResponse[];
  navKey: string;
  dataProduct?: ResponseSearchById;
}

const DynamicBreadcrumsComponent = dynamic(
  () =>
    import("../../../src/components/CustomComponent/BreadcrumsComponent/index"),
  { loading: () => <p>...</p> }
);

const DynamicBottomProdComponent = dynamic(
  () => import("../../../src/components/CustomComponent/BottomProdComponent"),
  { loading: () => <p>...</p> }
);

const DynamicSliderProductComponent = dynamic(
  () => import("@components/CustomComponent/SliderProductComponent"),
  { loading: () => <p>...</p> }
);

const DynamicTabsComponent = dynamic(
  () => import("@components/CustomComponent/TabsComponent"),
  { loading: () => <p>...</p> }
);

const DynamicPhieuTinhGiaComponent = dynamic(
  () => import("@components/LayoutProduct/PhieuTinhGia"),
  { loading: () => <p>...</p> }
);

const dataFake = [
  {
    src: Product1,
    title: "TNR Stars Lam Sơn",
    subTitle: "90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội",
    item1: "02",
    item2: "02",
    item3: "80",
    item4: "Đông Nam",
    priceListed: 3018933000,
    priceSub: 40580174,
    ticketCard: "TRN Star",
  },
  {
    src: Product2,
    title: "TNR Stars Lam Sơn",
    subTitle: "90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội",
    item1: "02",
    item2: "02",
    item3: "80",
    item4: "Đông Nam",
    priceListed: 3018933000,
    priceSub: 40580174,
    ticketCard: "TRN Star",
  },
  {
    src: Product3,
    title: "TNR Stars Lam Sơn",
    subTitle: "90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội",
    item1: "02",
    item2: "02",
    item3: "80",
    item4: "Đông Nam",
    priceListed: 3018933000,
    priceSub: 40580174,
    ticketCard: "TNR Grand Palace",
  },
];

const TextHeaderStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 33px;

  /* Brand */

  color: #1b3459;
`;
const WrapRightCard = styled.div`
  height: 381px;
  width: auto;
  background: #f3f4f6;
  border-radius: 8px;
  padding: 38px 25px 0px 35px;
`;
const TitleRightText = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 33px;

  /* Brand */

  color: #1b3459;
`;
const SubRightText = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  /* Brand */

  color: #1b3459;
`;
const CenterIntemWrap = styled.div`
  display: grid;
  grid-template-columns: 125px 100px;
  grid-template-rows: auto;
  column-gap: 10px;
  row-gap: 13px;
  margin-top: 19px;
  margin-bottom: 19px;
`;
const WrapItemCenter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const TextCenterItem = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin-left: 7px;
  /* Brand/Main color */

  color: #1b3459;
`;
const TextBottomStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  /* Brand */

  color: #1b3459;
`;
const NumberBottomStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */

  color: #d60000;
`;
const TextBottomStyled2 = styled(Typography)`
  font-family: "Roboto";
  font-style: italic;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height */

  /* Brand */

  color: #1b3459;
`;
const NumberBottomStyled2 = styled(Typography)`
  font-family: "Roboto";
  font-style: italic;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height */

  color: #d60000;
`;
const ButtonStyled = styled(Button)`
  width: 125px;
  height: 46px;
  background: #ea242a;
  border-radius: 60px;
  padding: 13px;
  :hover {
    background: #ffffff;
    box-shadow: 4px 8px 24px #f2f2f5;
    border: 1px solid #48576d;
    border-radius: 60px;
    color: #48576d;
    font-weight: 400;
  }
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  text-transform: none;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 4px;
`;
const ButtonYellowStyled = styled(Button)`
  height: 68px;
  width: auto;
  border: 2px solid #fec83c;
  border-radius: 8px;
  padding: 20px 29px 14px 20px;
`;
const ButtonYellowStyledDisbaled = styled(Button)`
  height: 68px;
  width: auto;
  border: 2px solid #f3f4f6;
  border-radius: 8px;
  padding: 20px 29px 14px 20px;
`;
const TextInSideButtonYellow = styled(Typography)`
  margin-left: 14px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  /* identical to box height, or 112% */
  text-transform: none;

  /* Brand */

  color: #1b3459;
`;
const TextInSideButtonYellowDisabled = styled(Typography)`
  margin-left: 14px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  /* identical to box height, or 112% */
  text-transform: none;

  /* Brand */

  color: #c7c9d9;
`;
const TextContact = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: right;

  /* Brand */

  color: #1b3459;
`;

const ProductIdpage = ({ navKey, dataProduct }: ProductsProps) => {
  const router = useRouter();
  const id = router.asPath.split("/")[2];

  const mockDataPhieutinhgia = {
    ProjectName: "TNR AMALUNA - TRÀ VINH",
    BlockName: "Liền kề",
    ProductName: "LK.08.32",
    DepositDate: "29/04/2022",
    IsMortgage: true,
    GroupCusID: 0,
    ProvinceID: 0,
    DistrictID: 0,
    PriceID: 230896,
    ScheduleID: 1900,
  };

  const paramsMock = {
    ProjectName: dataProduct?.project.name,
    BlockName: "Liền kề",
    ProductName: "LK.08.32",
    DepositDate: "29/04/2022",
    IsMortgage: true,
    GroupCusID: 0,
    ProvinceID: 0,
    DistrictID: 0,
    PriceID: 230896,
  };
  const listBread = [
    {
      id: 1,
      value: "Trang chủ",
    },
    {
      id: 2,
      value: "Đất nền",
    },
    {
      id: 3,
      value: "Tiểu khu",
    },
  ];
  const dispatch = useDispatch();
  const productItem = useSelector(
    (state: RootState) => state.products.productItem
  );
  const [tabCardValue, setTabCardValue] = useState(true);
  const [typeBottomShow, setTypeBottomShow] = useState(1);
  const [openModalVideo, setOpenModalVideo] = useState(false);
  const [callApi, setCallApi] = useState(false);
  const [numberRoom, setNumberRoom] = useState({
    num: "S.202",
    open: false,
    anchor: null,
  });
  const [roomType, setRoomType] = useState({
    type: "living",
    open: false,
    anchor: null,
  });

  const convertRoom = (type: string): string => {
    switch (type) {
      case "living":
        return "Phòng khách";
      case "bed":
        return "Phòng ngủ";
      case "kitchen":
        return "Phòng bếp";
      case "balcony":
        return "Ban công";
      case "toilet":
        return "Nhà vệ sinh";
      default:
        return "Phòng khách";
    }
  };

  console.log(dataProduct, '--------dataProduct-------');


  useEffect(() => {
    if (callApi === true) {
      {
        (async () => {
          try {
            const response = await getProductPtgApi(paramsMock);
            dispatch(getProductPTG(response.responseData));
          } catch (error) {
            console.log(error);
          }
        })();
      }
    }
  }, [callApi, dispatch]);

  const handlePhieuTinhGia = () => {
    setTabCardValue(false);
    setTypeBottomShow(2);
    setCallApi(true);
  };

  const handleThamQuan = () => {
    setTabCardValue(true);
    setTypeBottomShow(1);
  };
  function currencyFormat(num) {
    if (!num) {
      return;
    }
    return Number(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }
  const fetchPhieuTinhGia = () => {
    return (
      <>
        {!_.isEmpty(productItem) ? (
          <DynamicPhieuTinhGiaComponent
            productItem={productItem}
            dataProduct={dataProduct}
          />
        ) : (
          <>
            <div style={{ textAlign: "center", marginTop: 200 }}>
              <CircularProgress />
            </div>
          </>
        )}
      </>
    );
  };

  useEffect(() => {
    fetchPhieuTinhGia();
  }, [productItem]);

  const handleDownloadPhieuTinhGia = () => {
    (async () => {
      const response: any = await downloadPhieuTinhGiaAPI(mockDataPhieutinhgia);
      var binaryString = window.atob(response);
      var binaryLen = binaryString.length;
      var bytes = new Uint8Array(binaryLen);
      for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
      }
      var blob = new Blob([bytes], { type: "application/pdf" });
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.click();
    })();
  };
  return (
    <>
      <FlexContainer>
        <div
          style={{
            marginTop: 166,
            display: "flex",
            flexDirection: "column",
            width: "70%",
          }}
        >
          <div>
            <DynamicBreadcrumsComponent
              breaditem={listBread}
              activePage={dataProduct?.name}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 56,
            }}
          >
            <TextHeaderStyled>
              {dataProduct?.project.name} - {dataProduct?.lotSymbolLegal}
            </TextHeaderStyled>
          </div>
        </div>
        <div style={{ marginBottom: 128 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 16,
              justifyContent: "center",
            }}
          >
            <div>
              <DynamicSliderProductComponent />
              <Modal
                open={openModalVideo}
                onClose={() => setOpenModalVideo(false)}
                style={{
                  padding: "5vh 3%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  style={{
                    position: "relative",
                    maxWidth: "1660px",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <iframe
                    src={dataProduct?.video ?? dataProduct.project.video}
                    style={{ width: "100%", height: "100%" }}
                    frameBorder={"0"}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="video"
                  />
                  <Box
                    style={{
                      position: "absolute",
                      top: 30,
                      left: 30,
                      width: 50,
                      height: 50,
                      cursor: "pointer",
                    }}
                  >
                    <IconSetting style={{ width: 50, height: 50 }} />
                  </Box>
                  <Box
                    style={{
                      position: "absolute",
                      top: 30,
                      right: 30,
                      cursor: "pointer",
                    }}
                  >
                    <Button
                      id="button-number-room"
                      onClick={(event) =>
                        setNumberRoom({
                          ...numberRoom,
                          open: true,
                          anchor: event.currentTarget,
                        })
                      }
                      style={{
                        background: "white",
                        borderRadius: "8px 0px 0px 8px",
                        borderRight: "1px solid #c7c9d9",
                      }}
                    >
                      {numberRoom.num}
                    </Button>
                    <Menu
                      open={numberRoom.open}
                      anchorEl={numberRoom.anchor}
                      MenuListProps={{
                        "aria-labelledby": "button-number-room",
                      }}
                      onClose={() =>
                        setNumberRoom({
                          ...numberRoom,
                          open: false,
                          anchor: null,
                        })
                      }
                      className="menu-select-room-number-video360"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        boxShadow: "none",
                      }}
                    >
                      <MenuItem
                        style={{
                          borderTop: "0.5px solid #c7c9d9",
                          color: "#8190A7",
                        }}
                        onClick={() =>
                          setNumberRoom({
                            num: "S.203",
                            open: false,
                            anchor: null,
                          })
                        }
                      >
                        S.203
                      </MenuItem>
                      <MenuItem
                        style={{ color: "#8190A7" }}
                        onClick={() =>
                          setNumberRoom({
                            num: "S.204",
                            open: false,
                            anchor: null,
                          })
                        }
                      >
                        S.204
                      </MenuItem>
                      <MenuItem
                        style={{ color: "#8190A7" }}
                        onClick={() =>
                          setNumberRoom({
                            num: "S.205",
                            open: false,
                            anchor: null,
                          })
                        }
                      >
                        S.205
                      </MenuItem>
                      <MenuItem
                        style={{ color: "#8190A7" }}
                        onClick={() =>
                          setNumberRoom({
                            num: "S.206",
                            open: false,
                            anchor: null,
                          })
                        }
                      >
                        S.206
                      </MenuItem>
                    </Menu>
                    <Button
                      id="button-room-type"
                      onClick={(event) =>
                        setRoomType({
                          ...roomType,
                          open: true,
                          anchor: event.currentTarget,
                        })
                      }
                      style={{
                        background: "white",
                        borderRadius: "0px 8px 8px 0px",
                      }}
                    >
                      {convertRoom(roomType.type)}
                    </Button>
                    <Menu
                      open={roomType.open}
                      anchorEl={roomType.anchor}
                      MenuListProps={{ "aria-labelledby": "button-room-type" }}
                      onClose={() =>
                        setRoomType({ ...roomType, open: false, anchor: null })
                      }
                      className="menu-select-room-type-video360"
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        boxShadow: "none",
                      }}
                    >
                      <MenuItem
                        style={{
                          borderTop: "0.5px solid #c7c9d9",
                          color: "#8190A7",
                        }}
                        onClick={() =>
                          setRoomType({
                            type: "living",
                            open: false,
                            anchor: null,
                          })
                        }
                      >
                        {convertRoom("living")}
                      </MenuItem>
                      <MenuItem
                        style={{ color: "#8190A7" }}
                        onClick={() =>
                          setRoomType({
                            type: "kitchen",
                            open: false,
                            anchor: null,
                          })
                        }
                      >
                        {convertRoom("kitchen")}
                      </MenuItem>
                      <MenuItem
                        style={{ color: "#8190A7" }}
                        onClick={() =>
                          setRoomType({
                            type: "toilet",
                            open: false,
                            anchor: null,
                          })
                        }
                      >
                        {convertRoom("toilet")}
                      </MenuItem>
                      <MenuItem
                        style={{ color: "#8190A7" }}
                        onClick={() =>
                          setRoomType({
                            type: "balcony",
                            open: false,
                            anchor: null,
                          })
                        }
                      >
                        {convertRoom("balcony")}
                      </MenuItem>
                    </Menu>
                  </Box>
                </Box>
              </Modal>
              <div style={{ display: "flex", gap: 19, marginTop: 24 }}>
                <ButtonYellowStyled onClick={() => setOpenModalVideo(true)}>
                  <Icon360 />
                  <TextInSideButtonYellow> Video tour</TextInSideButtonYellow>
                </ButtonYellowStyled>
                <ButtonYellowStyled onClick={() => handleThamQuan()}>
                  <IconNhaMau />
                  <TextInSideButtonYellow>
                    {" "}
                    Tham quan nhà mẫu
                  </TextInSideButtonYellow>
                </ButtonYellowStyled>
                {tabCardValue === true ? (
                  <ButtonYellowStyled onClick={() => handlePhieuTinhGia()}>
                    <IconPhieuTinhGia />
                    <TextInSideButtonYellow>
                      Phiếu tính giá
                    </TextInSideButtonYellow>
                  </ButtonYellowStyled>
                ) : (
                  <ButtonYellowStyledDisbaled disabled>
                    <IconReceiptDisabled />
                    <TextInSideButtonYellowDisabled>
                      Phiếu tính giá
                    </TextInSideButtonYellowDisabled>
                  </ButtonYellowStyledDisbaled>
                )}
              </div>
            </div>
            <div>
              <WrapRightCard>
                <TitleRightText>{dataProduct?.name}</TitleRightText>
                <div
                  style={{
                    display: "flex",
                    gap: 37,
                    marginBottom: 15,
                    marginTop: 20,
                  }}
                >
                  <SubRightText>
                    Tòa {dataProduct?.lotSymbolCommercial}
                  </SubRightText>
                  <SubRightText>Tầng {dataProduct?.floorNum}</SubRightText>
                </div>
                <div style={{ border: " 1px solid #C7C9D9", width: 262 }}></div>
                <CenterIntemWrap>
                  <WrapItemCenter>
                    <IconFrame />

                    <TextCenterItem>{dataProduct?.landArea}</TextCenterItem>
                  </WrapItemCenter>
                  <WrapItemCenter>
                    <IconBath />
                    <TextCenterItem>{dataProduct?.numBath}</TextCenterItem>
                  </WrapItemCenter>
                  <WrapItemCenter>
                    <IconBedDouble />
                    <TextCenterItem>{dataProduct?.numBed} m²</TextCenterItem>
                  </WrapItemCenter>
                  <WrapItemCenter>
                    <IconCompass />
                    <TextCenterItem>
                      {dataProduct?.doorDirection}
                    </TextCenterItem>
                  </WrapItemCenter>
                </CenterIntemWrap>
                <div style={{ border: " 1px solid #C7C9D9", width: 262 }}></div>
                <div style={{ marginTop: 12 }}>
                  <div style={{ display: "flex", marginBottom: 14 }}>
                    <TextBottomStyled style={{ marginRight: 40 }}>
                      Giá niêm yết{" "}
                    </TextBottomStyled>
                    <NumberBottomStyled>
                      {currencyFormat(dataProduct?.price)}đ
                    </NumberBottomStyled>
                  </div>
                  <div style={{ display: "flex" }}>
                    <TextBottomStyled2 style={{ marginRight: 19 }}>
                      Đơn giá thông thuỷ{" "}
                    </TextBottomStyled2>
                    <NumberBottomStyled2>
                      {currencyFormat(dataProduct?.unitPrice)}đ/m2
                    </NumberBottomStyled2>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 20,
                    marginTop: 35,
                    marginBottom: 22,
                  }}
                >
                  <ButtonStyled
                    onClick={() => {
                      localStorage.setItem(
                        "cart-id",
                        JSON.stringify(dataProduct.id)
                      );
                    }}
                    disabled={!dataProduct?.isOpeningSale}
                  >
                    Giỏ hàng
                  </ButtonStyled>
                  <ButtonStyled
                    onClick={() => {
                      localStorage.setItem(
                        "cart-id",
                        JSON.stringify(dataProduct.id)
                      );
                      router.push("/payment-cart/" + dataProduct.id);
                    }}
                    disabled={!dataProduct?.isOpeningSale}
                  >
                    Mua Online
                  </ButtonStyled>
                </div>
              </WrapRightCard>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    gap: 28,
                    background: "#FEC83C",
                    borderRadius: "8px",
                    width: "auto",
                    height: 82,
                    padding: "15px 20px 10px 20px",
                    marginTop: 13,
                    marginBottom: 24,
                  }}
                >
                  <a href={dataProduct.project.hotline ?? dataProduct.defaultPhoneNumber}>
                    <IconHeadSetProduct />
                    <TextContact>{dataProduct.project.hotline ?? dataProduct.defaultPhoneNumber}</TextContact>
                  </a>
                  <div style={{ border: "1px solid #1B3459" }} />
                  <div style={{ textAlign: "center" }}>
                    <IconClipboardProduct />
                    <TextContact>Chính sách bán hàng</TextContact>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text  Bottom */}
          <div
            style={{
              height: 53,
              width: "100%",
              background: "#1B3459",
              textAlign: "center",
              padding: "15px",
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Typography
              style={{
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "22px",
                lineHeight: "26px",
                color: "#FFFFFF",
              }}
            >
              {typeBottomShow === 1 ? "THÔNG TIN CHI TIẾT" : "Phiếu tính giá"}
            </Typography>
            {typeBottomShow === 2 ? (
              <div
                style={{
                  display: "flex",
                  position: "absolute",
                  right: 0,
                  alignItems: "center",
                  marginRight: 46,
                  cursor: "pointer",
                }}
                onClick={() => handleDownloadPhieuTinhGia()}
              >
                {" "}
                <IconDownloadPTG />
                <Typography
                  style={{ fontSize: 16, fontWeight: 400, color: "#FCB715" }}
                >
                  Tải phiếu tính giá
                </Typography>
              </div>
            ) : (
              <></>
            )}
          </div>
          {typeBottomShow === 1 ? (
            <>
              <DynamicTabsComponent />
            </>
          ) : (
            <> {fetchPhieuTinhGia()} </>
          )}
          {/* Tab Components */}
        </div>
      </FlexContainer>
    </>
  );
};

export default ProductIdpage;
