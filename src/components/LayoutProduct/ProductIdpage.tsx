import FlexContainer from "@components/CustomComponent/FlexContainer";
import isEmpty from "lodash.isempty";
import { useEffect, useState } from "react";

import {
  FloorIcon,
  Icon360,
  IconBath,
  IconBedDouble,
  IconClipboardProduct,
  IconCompass,
  IconDownloadPTG,
  IconFrame,
  IconHeadSetProduct,
  IconNhaMau,
  IconPhieuTinhGia,
  IconReceiptDisabled,
  IconSetting,
} from "@components/Icons";
import IconInfor from "@components/Icons/IconInfor";
import styled from "@emotion/styled";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import useAddToCart from "hooks/useAddToCart";
import { ResponseSearchById } from "interface/product";
import { ProjectResponse } from "interface/project";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadPhieuTinhGiaAPI,
  getProductPtgApi,
} from "../../../pages/api/productsApi";
import Product1 from "../../../public/images/product1.png";
import Product2 from "../../../public/images/product2.png";
import Product3 from "../../../public/images/product3.png";
import { getProductPTG } from "../../../store/productSlice";
import { RootState } from "../../../store/store";
import ModalRegister from "./ModalRegister";
import { getUserInfoApi } from "../../../pages/api/profileApi";
import { getUserInfo } from "../../../store/profileSlice";
import useForceUpdate from "hooks/useForceUpdate";
import useNotification from "hooks/useNotification";
import ConfirmDialog from "@components/SearchPage/ConfirmDialog";
import PathRoute from "utils/PathRoute";

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
  () => import("@components/CustomComponent/TabsComponent/TabComponentDetail"),
  { loading: () => <p>...</p> }
);

const DynamicPhieuTinhGiaComponent = dynamic(
  () => import("@components/LayoutProduct/PhieuTinhGia"),
  { loading: () => <p>...</p> }
);

const TextFloorStyled = styled(Typography)`
  margin-top: 7px;
  margin-left: 3px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height */

  /* Shades/Dark 2 */

  color: #48576d;
`;

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
    background: #fec83c;
    // box-shadow: 4px 8px 24px #f2f2f5;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
    border-radius: 60px;
    color: #ffffff;
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

const ButtonDisbledStyled = styled(Button)`
  height: 68px;
  width: auto;
  border: 2px solid #f3f4f6;
  border-radius: 8px;
  padding: 20px 29px 14px 20px;
  background-color: #f3f4f6;
`;
const ButtonYellowStyledDisbaled = styled(Button)`
  height: 68px;
  width: auto;
  border: 2px solid #f3f4f6;
  border-radius: 8px;
  padding: 20px 29px 14px 20px;
  background-color: #1b3459;
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

  color: #ffffff;
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

const TextFloorValue = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  /* Brand/Main color */

  color: #1b3459;
`;

const ProductIdpage = ({ navKey, dataProduct }: ProductsProps) => {
  console.log({ dataProduct });
  const router = useRouter();
  const id = router.asPath.split("/")[2];
  const addToCart = useAddToCart();

  const [dataDownloadPtg, setDataDownloadPtg] = useState({
    ProjectId: 0,
    ProductId: 0,
    DepositDate: "",
    PriceID: 0,
    ScheduleID: 0,
  });
  const listBread = [
    {
      id: 1,
      value: "Trang chủ",
      path: "/",
    },
    {
      id: 2,
      value: dataProduct.projectType.name,
      path: `/${PathRoute.ProjectTNR}?type=${dataProduct.projectType.id}`,
    },
    {
      id: 3,
      value: dataProduct.projectName,
      path: `/search?Type=Advanded&projectId=${dataProduct.project.id}`,
    },
  ];

  const dispatch = useDispatch();
  const [tabCardValue, setTabCardValue] = useState(true);
  const [typeBottomShow, setTypeBottomShow] = useState(1);
  const [openModalVideo, setOpenModalVideo] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [handleOpen, setHandleOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callApi, setCallApi] = useState(false);
  const [tempCartId, setTempCartId] = useState<string | null>(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);

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
  const { cart } = useSelector((state: RootState) => state.carts);
  const notification = useNotification();

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

  //   useEffect(() => {
  //     if (callApi === true) {
  //       {
  //         (async () => {
  //           try {
  //             const response = await getProductPtgApi(paramsMock);
  //             dispatch(getProductPTG(response.responseData));
  //           } catch (error) {
  //             console.log(error);
  //           }
  //         })();
  //       }
  //     }
  //   }, [callApi, dispatch]);

  const fetchUserInfor = async () => {
    const responseUser = await getUserInfoApi();
    dispatch(getUserInfo(responseUser.responseData));
  };
  //   console.log()
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      fetchUserInfor();
    }
  }, []);
  const handlePhieuTinhGia = () => {
    setTabCardValue(false);
    setTypeBottomShow(2);
    setCallApi(true);
  };

  const handleThamQuan = () => {
    setTabCardValue(true);
    setOpenModalRegister(true);
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
        {/* {!isEmpty(productItem) ? ( */}
        <DynamicPhieuTinhGiaComponent
          // productItem={productItem}
          setDataDownloadPtg={setDataDownloadPtg}
          dataProduct={dataProduct}
        />
        {/* ) : (
          <>
            <div style={{ textAlign: "center", marginTop: 200 }}>
              <CircularProgress />
            </div>
          </>
        )} */}
      </>
    );
  };
  const handleClose = () => {
    setHandleOpen(false);
  };

  //   useEffect(() => {
  //     fetchPhieuTinhGia();
  //   }, [productItem]);

  const handleDownloadPhieuTinhGia = () => {
    (async () => {
      setLoading(true);
      setHandleOpen(true);
      const response: any = await downloadPhieuTinhGiaAPI(dataDownloadPtg);
      var binaryString = window.atob(response);
      var binaryLen = binaryString.length;
      var bytes = new Uint8Array(binaryLen);
      for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
      }
      var blob = new Blob([bytes], { type: "application/pdf" });
      var link = document.createElement("a");
      link.setAttribute("target", "_blank");
      link.href = window.URL.createObjectURL(blob);
      link.click();
      setLoading(false);
      setHandleOpen(false);
    })();
  };
  const fecthBackDrop = () => {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={handleOpen}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  };
  useEffect(() => {
    if (loading === false) {
      setHandleOpen(false);
    }
  }, [loading]);

  const handleAddToCart = (id: string) => () => {
    // addToCart(product.productId);
    if (cart && cart.id === id) {
      notification({
        severity: "success",
        message: "Sản phẩm này đã có sẵn trong giỏ hàng",
      });
    } else if (isEmpty(cart)) {
      addToCart(id);
    } else {
      setTempCartId(id);
      setOpenConfirmDialog(true);
    }
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleChangeCartITem = (id: string) => () => {
    addToCart(id);
    setOpenConfirmDialog(false);
  };

  return (
    <>
      <FlexContainer>
        <div
          style={{
            marginTop: 166,
            display: "flex",
            flexDirection: "column",
            width: "84%",
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
              <DynamicSliderProductComponent
                data={
                  !isEmpty(dataProduct?.apartmentModelPhotos)
                    ? dataProduct?.apartmentModelPhotos
                    : [dataProduct?.thumbnail] ?? ["/images/product_1.png"]
                }
              />
              <ModalRegister
                isOpen={openModalRegister}
                onClose={() => setOpenModalRegister(!openModalRegister)}
                product={dataProduct}
                toggle={() => setOpenModalRegister(!openModalRegister)}
              />
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
                    src={dataProduct?.video ?? dataProduct?.project?.video}
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
                {typeBottomShow !== 1 ? (
                  <ButtonYellowStyled
                    onClick={() => {
                      setTypeBottomShow(1);
                      if (!tabCardValue) {
                        setTabCardValue(!tabCardValue);
                      }
                    }}
                  >
                    <IconInfor />
                    <TextInSideButtonYellow>Thông tin</TextInSideButtonYellow>
                  </ButtonYellowStyled>
                ) : (
                  <ButtonYellowStyledDisbaled disabled>
                    <IconInfor disabled />
                    <TextInSideButtonYellowDisabled>
                      Thông tin
                    </TextInSideButtonYellowDisabled>
                  </ButtonYellowStyledDisbaled>
                )}
                <ButtonYellowStyled onClick={() => setOpenModalVideo(true)}>
                  <Icon360 />
                  <TextInSideButtonYellow> Video tour</TextInSideButtonYellow>
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
                <ButtonYellowStyled onClick={() => handleThamQuan()}>
                  <IconNhaMau />
                  <TextInSideButtonYellow>
                    {" "}
                    Tham quan nhà mẫu
                  </TextInSideButtonYellow>
                </ButtonYellowStyled>
              </div>
            </div>
            <div>
              <WrapRightCard>
                <TitleRightText>{dataProduct?.name}</TitleRightText>
                {dataProduct.projectTypeCode === "2" ? (
                  <div
                    style={{
                      display: "flex",
                      gap: 37,
                      marginBottom: 15,
                      marginTop: 20,
                    }}
                  >
                    <SubRightText>
                      {dataProduct?.levelDetailParentName}
                    </SubRightText>
                    <SubRightText>{dataProduct?.levelDetailName}</SubRightText>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      gap: 37,
                      marginBottom: 15,
                      marginTop: 20,
                    }}
                  >
                    <SubRightText>
                      {dataProduct?.levelDetailParentName}
                    </SubRightText>
                  </div>
                )}
                <div style={{ border: " 1px solid #C7C9D9", width: 262 }}></div>
                <CenterIntemWrap>
                  {dataProduct?.projectTypeCode === "1" ? (
                    <WrapItemCenter>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <FloorIcon />
                        <TextFloorStyled>min</TextFloorStyled>
                      </div>
                      <TextCenterItem>
                        <TextFloorValue>
                          {dataProduct?.minFloor} tầng
                        </TextFloorValue>
                      </TextCenterItem>
                    </WrapItemCenter>
                  ) : (
                    <WrapItemCenter>
                      <IconBedDouble />
                      <TextCenterItem>
                        {dataProduct?.numBed ? dataProduct?.numBed : "N/A"}
                      </TextCenterItem>
                    </WrapItemCenter>
                  )}
                  {dataProduct?.projectTypeCode === "1" ? (
                    <WrapItemCenter>
                      <IconFrame />
                      <TextCenterItem>
                        {dataProduct?.buildArea ? dataProduct?.buildArea : "N/A"}{" "}
                        m²
                      </TextCenterItem>
                    </WrapItemCenter>
                  ) : (
                    <WrapItemCenter>
                      <IconFrame />
                      <TextCenterItem>
                        {dataProduct?.clearArea ? dataProduct?.clearArea : "N/A"}{" "}
                        m²
                      </TextCenterItem>
                    </WrapItemCenter>
                  )}

                  {dataProduct?.projectTypeCode === "1" ? (
                    <WrapItemCenter>
                      <FloorIcon />
                      <TextFloorStyled>max</TextFloorStyled>
                      <TextCenterItem>
                        <TextFloorValue>
                          {dataProduct?.maxFloor} tầng
                        </TextFloorValue>
                      </TextCenterItem>
                    </WrapItemCenter>
                  ) : (
                    <WrapItemCenter>
                      <IconBath />
                      <TextCenterItem>
                        {dataProduct?.numBath ? dataProduct?.numBath : "N/A"}
                      </TextCenterItem>
                    </WrapItemCenter>
                  )}
                  <WrapItemCenter>
                    <IconCompass />
                    <TextCenterItem>
                      {dataProduct?.doorDirection
                        ? dataProduct?.doorDirection
                        : "N/A"}
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
                      {dataProduct?.totalVatPrice
                        ? currencyFormat(dataProduct?.totalVatPrice)
                        : "N/A"}
                      đ
                    </NumberBottomStyled>
                  </div>
                  {dataProduct?.projectTypeCode === "1" ? (
                    <div style={{ display: "flex" }}>
                      <TextBottomStyled2 style={{ marginRight: 50 }}>
                        Giá trị QSDĐ{" "}
                      </TextBottomStyled2>
                      <NumberBottomStyled2>
                        {dataProduct?.lurUnitPrice
                          ? currencyFormat(dataProduct?.lurUnitPrice)
                          : "N/A"}
                        đ/m2
                      </NumberBottomStyled2>
                    </div>
                  ) : (
                    <div style={{ display: "flex" }}>
                      <TextBottomStyled2 style={{ marginRight: 19 }}>
                        Đơn giá thông thuỷ{" "}
                      </TextBottomStyled2>
                      <NumberBottomStyled2>
                        {dataProduct?.unitPrice
                          ? currencyFormat(dataProduct?.unitPrice)
                          : "N/A"}
                        đ/m2
                      </NumberBottomStyled2>
                    </div>
                  )}
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
                    // onClick={() => {
                    //   // localStorage.setItem(
                    //   //   "cart-id",
                    //   //   JSON.stringify(dataProduct.id)
                    //   // );
                    //   addToCart(id);
                    // }}
                    onClick={handleAddToCart(id)}
                    disabled={dataProduct?.paymentStatus !== 2}
                    style={{
                      backgroundColor:
                        dataProduct?.paymentStatus !== 2 ? "#FFFF" : "#f3f4f6",
                      color: "#1B3459",
                      border: "1px solid #1B3459",
                    }}
                  >
                    Giỏ hàng
                  </ButtonStyled>
                  <ButtonStyled
                    // onClick={() => {
                    //   addToCart(id);
                    // }}
                    onClick={handleAddToCart(id)}
                    disabled={dataProduct?.paymentStatus !== 2}
                    style={{
                      backgroundColor:
                        dataProduct?.paymentStatus !== 2 ? "#FFFF" : "",
                    }}
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
                  <a
                    href={`tel:+84${(
                      dataProduct?.project.hotline ??
                      dataProduct?.defaultPhoneNumber ??
                      "0123456789"
                    )?.substring(1)}`}
                    style={{ textAlign: "center" }}
                  >
                    <IconHeadSetProduct />
                    <TextContact>Liên hệ tư vấn viên</TextContact>
                  </a>
                  <div style={{ border: "1px solid #1B3459" }} />
                  <a
                    href={`/policySale/${dataProduct.project.id}?Idproduct=${dataProduct.id}`}
                    style={{ textAlign: "center" }}
                  >
                    <IconClipboardProduct />
                    <TextContact>Chính sách bán hàng</TextContact>
                  </a>
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
            // <> {fetchPhieuTinhGia()} </>
            <>
              <DynamicPhieuTinhGiaComponent
                // productItem={productItem}
                setDataDownloadPtg={setDataDownloadPtg}
                dataProduct={dataProduct}
              />
            </>
          )}
          {/* Tab Components */}
          {fecthBackDrop()}
        </div>
      </FlexContainer>
      <ConfirmDialog
        open={openConfirmDialog}
        handleClose={handleCloseConfirmDialog}
        handleConfirm={handleChangeCartITem}
        tempCart={tempCartId}
      />
    </>
  );
};

export default ProductIdpage;
