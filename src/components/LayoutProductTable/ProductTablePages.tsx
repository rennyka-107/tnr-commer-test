import Container from "@components/Container";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import IconAvaliableSale from "@components/Icons/avaliableSale";
import IconCommingSale from "@components/Icons/commingSale";
import IconStopSale from "@components/Icons/stopSale";
import IconWaitPaymentSale from "@components/Icons/waitPayment";
import styled from "@emotion/styled";
import Check from "@mui/icons-material/Check";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BodyRequest, getListProductTable } from "@service/productTable";
import { useEffect, useState } from "react";
import Filter from "./filter";
import { useRouter } from "next/router";
import axios from "axios";
import {
  IconBedProductTable,
  IconCanGoc,
  IconDienTichProductTable,
  IconHuongProductTable,
  IconNumberRoom,
  IconNumberRoomSleep,
} from "@components/Icons";
import { Tooltip } from "@mui/material";
import { ContactlessOutlined, DriveFileMove } from "@mui/icons-material";

type DetailRowI = {
  countRemaining: number;
  projectLevelDetailId: string;
  projectLevelDetailName: string;
  lotCode: string;
};

type ListProductData = {
  lotCode: string;
  paymentStatus: number;
  price: string;
  productionId: string;
  productionName: string;
  projectLevelDetailId: string;
  projectLevelDetailName: string;
};

type ProductionRowI = {
  doorDirection: string;
  isCornerApartment: number;
  landArea: number;
  numBath: number;
  numBed: number;
  price: string;
  paymentStatus: 2 | 3 | 4 | 99; // 2 mở bán (còn hàng), null sắp mở bán, 4 ngừng bán (đã bán), 3 đang chờ thanh toán
  productionId: string;
  productionName: string;
  projectLevelDetailId: string;
  projectLevelDetailName: string;
  code: string;
  lotCode: string;
  lstProductData: ListProductData[];
};

const TableCellStyled = styled(TableCell)`
  width: 150px;
  border: 1px solid rgba(255, 255, 255, 0.21);
  color: #ffff;
`;
const TableCellContent = styled(TableCell)`
  color: #ffff;
  border: 1px solid rgba(255, 255, 255, 0.21);
`;
const CellContent = styled(TableCell)`
  // color: red;
  border: 1px solid #d8d8d8;
  background-color: #f3f4f6;
`;

const TextRemainCount = styled.span`
  color: #06c270;
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 36.4px;
`;
const TextRemainCountZero = styled.span`
  color: #c7c9d9;
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 36.4px;
`;
const TextTable = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  /* or 18px */

  text-align: center;

  color: #000000;
`;
const LabelContainer = styled.div`
  width: 150px;
`;

const IconStyled = styled.span`
  color: black;
  align-items: center;
  display: flex;
  flex-direction: column;
  // background-color:red;
  width: 70px;
`;
const PriceStyled = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  /* or 18px */

  text-align: center;

  /* System/Success */

  color: #06c270;
`;

const ProductTablePages = () => {
  const [body, setBody] = useState<BodyRequest>();
  const [data, setData] = useState<{
    lstDetailRow: DetailRowI[];
    lstProductionRow: ProductionRowI[];
  }>();
  const router = useRouter();
  const [indexHover, setIndexHover] = useState("");
  const [indexHover2, setIndexHover2] = useState("");

  const getProduct = async (body: BodyRequest, cancelToken: any) => {
    // const newValues: BodyRequest = { ...body, saleProductStatus: (body.saleProductStatus as string[]).join(',') }
    const response = await getListProductTable(body, cancelToken);
    setData(response?.responseData ?? []);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (body?.projectId) {
      getProduct(body, source.token);
    }
    return () => {
      source.cancel();
    };
  }, [body]);

  function formatCurrency(x) {
    const itemFormat = Number(x).toLocaleString("vi", {
      style: "currency",
      currency: "VND",
    });
    return itemFormat.substring(0, 4);
  }
  const MouseOver = (event: any) => {
    setIndexHover(event);
  };
  const MouseOver2 = (event: any) => {
    setIndexHover2(event);
  };
  const fetchComponent = (el: any, idx) => {
    // console.log(el,data)
    return (
      <>
        {data?.lstProductionRow?.map((element, index) => (
          <>
            <CellContent
              style={{
                backgroundColor:
                  (el.lotCode === indexHover2 && element.code <= indexHover) ||
                  (el.lotCode <= indexHover2 && element.code === indexHover)
                    ? " rgba(0, 99, 247, 0.15)"
                    : "",
                zIndex: 100,
              }}
              align="center"
              onMouseOverCapture={() => {
                MouseOver(element.code);
                MouseOver2(el.lotCode);
              }}
			  onMouseLeave={() => {
				setIndexHover2("");
				setIndexHover("");
			  }}
              key={index}
            >
              {element.lstProductData.map((data, i) => (
                <TableRow key={index}>
                  {data.lotCode == el.lotCode ? (
                    <div>{renderAction(data)}</div>
                  ) : (
                    <></>
                  )}
                </TableRow>
              ))}
            </CellContent>
          </>
        ))}
      </>
    );
  };

  const renderAction = (item: ListProductData) => {
    switch (item.paymentStatus) {
      case 4:
        return (
          <Tooltip title={item.productionName} placement="top">
            <IconStyled>
              <IconStopSale />
            </IconStyled>
          </Tooltip>
        );
      case 99:
        return (
          <Tooltip title={item.productionName} placement="top">
            <IconStyled>
              <IconCommingSale />
            </IconStyled>
          </Tooltip>
        );
      case 2:
        return (
          <Tooltip title={item.productionName} placement="top">
            <IconStyled
              onClick={() => {
                router.push(`/products/${item.productionId}`);
              }}
              style={{ cursor: "pointer" }}
            >
              <>
                <IconAvaliableSale />
                <div
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    width: "100%",
                  }}
                >
                  <PriceStyled>{formatCurrency(item.price) + "Tỷ"}</PriceStyled>
                </div>
              </>
            </IconStyled>
          </Tooltip>
        );
      case 3:
        return (
          <Tooltip title={item.productionName} placement="top">
            <IconStyled>
              <IconWaitPaymentSale />
            </IconStyled>
          </Tooltip>
        );

      default:
        return (
          <Tooltip title={item.productionName} placement="top">
            <IconStyled>
              <IconCommingSale />
            </IconStyled>
          </Tooltip>
        );
    }
  };

  return (
    <FlexContainer>
      <Container title="Bảng hàng trực tuyến">
        <Filter
          body={body}
          onSubmit={(values) => {
            setBody(values);
          }}
        />
        <TableContainer
          component={Paper}
          sx={{ marginTop: 4, borderRadius: "8px 8px 0px 0px" , maxHeight: 1140}}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCellStyled
                  style={{ backgroundColor: "#1B3459", color: "#FFFF" }}
                >
                  <LabelContainer>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <IconNumberRoom /> &nbsp; Thứ tự căn
                    </div>
                  </LabelContainer>
                </TableCellStyled>
                {data?.lstProductionRow?.map((el, index) => (
                  <TableCellContent
                    align="center"
                    key={index}
                    style={{ backgroundColor: "#1B3459", color: "#FFFF" }}
                  >
                    {el?.code ?? "no stt"}
                  </TableCellContent>
                ))}
              </TableRow>
              <TableRow>
                <TableCellStyled
                  align="left"
                  style={{
                    backgroundColor: "#1B3459",
                    color: "#FFFF",
                    top: 58,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <IconNumberRoomSleep /> &nbsp; Số phòng ngủ
                  </div>
                </TableCellStyled>
                {data?.lstProductionRow?.map((el, index) => (
                  <TableCellContent
                    align="center"
                    key={index}
                    style={{
                      backgroundColor: "#1B3459",
                      color: "#FFFF",
                      top: 58,
                    }}
                  >
                    {el?.numBed ?? "no bed"}
                  </TableCellContent>
                ))}
              </TableRow>
              <TableRow>
                <TableCellStyled
                  align="left"
                  style={{
                    backgroundColor: "#1B3459",
                    color: "#FFFF",
					top: 116,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <IconBedProductTable /> &nbsp; Số phòng vệ sinh
                  </div>
                </TableCellStyled>
                {data?.lstProductionRow?.map((el, index) => (
                  <TableCellContent
                    align="center"
                    key={index}
                    style={{
                      backgroundColor: "#1B3459",
                      color: "#FFFF",
                      top: 116,
                    }}
                  >
                    {el?.numBath ?? 0}
                  </TableCellContent>
                ))}
              </TableRow>
			  <TableRow>
                <TableCellStyled
                  align="left"
                  style={{
                    backgroundColor: "#1B3459",
                    color: "#FFFF",
					top: 174,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                                  <IconHuongProductTable /> &nbsp; Hướng logia
                  </div>
                </TableCellStyled>
                {data?.lstProductionRow?.map((el, index) => (
                  <TableCellContent
                    align="center"
                    key={index}
                    style={{
                      backgroundColor: "#1B3459",
                      color: "#FFFF",
                      top: 174,
                    }}
                  >
                     {el?.doorDirection ?? "no direction"}
                  </TableCellContent>
                ))}
              </TableRow>
			  <TableRow>
                <TableCellStyled
                  align="left"
                  style={{
                    backgroundColor: "#1B3459",
                    color: "#FFFF",
					top: 232,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                  <IconDienTichProductTable /> &nbsp; Diện tích (m2)
                  </div>
                </TableCellStyled>
                {data?.lstProductionRow?.map((el, index) => (
                  <TableCellContent
                    align="center"
                    key={index}
                    style={{
                      backgroundColor: "#1B3459",
                      color: "#FFFF",
                      top: 232,
                    }}
                  >
                      {el.landArea ? el.landArea : ""}
                  </TableCellContent>
                ))}
              </TableRow>
			  <TableRow>
                <TableCellStyled
                  align="left"
                  style={{
                    backgroundColor: "#1B3459",
                    color: "#FFFF",
					top: 290,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                   <IconCanGoc /> &nbsp; Căn góc
                  </div>
                </TableCellStyled>
                {data?.lstProductionRow?.map((el, index) => (
                  <TableCellContent
                    align="center"
                    key={index}
                    style={{
                      backgroundColor: "#1B3459",
                      color: "#FFFF",
                      top: 290,
                    }}
                  >
                     {el.isCornerApartment === 1 ? <Check /> : ""}
                  </TableCellContent>
                ))}
              </TableRow>
              {/* <TableRow>
                <TableCellStyled align="left">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <IconNumberRoomSleep /> &nbsp; Số phòng ngủ
                  </div>
                </TableCellStyled>
                {data?.lstProductionRow?.map((el, index) => (
                  <TableCellContent align="center" key={index}>
                    {el?.numBed ?? "no bed"}
                  </TableCellContent>
                ))}
              </TableRow>
              <TableRow>
                <TableCellStyled align="left">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <IconBedProductTable /> &nbsp; Số phòng vệ sinh
                  </div>
                </TableCellStyled>
                {data?.lstProductionRow?.map((el, index) => (
                  <TableCellContent align="center" key={index}>
                    {el?.numBath ?? 0}
                  </TableCellContent>
                ))}
              </TableRow>
              <TableRow>
                <TableCellStyled align="left">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <IconHuongProductTable /> &nbsp; Hướng logia
                  </div>
                </TableCellStyled>
                {data?.lstProductionRow?.map((el, index) => (
                  <TableCellContent align="center" key={index}>
                    {el?.doorDirection ?? "no direction"}
                  </TableCellContent>
                ))}
              </TableRow>
              <TableRow>
                <TableCellStyled align="left">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <IconDienTichProductTable /> &nbsp; Diện tích (m2)
                  </div>
                </TableCellStyled>
                {data?.lstProductionRow?.map((el, index) => (
                  <TableCellContent align="center" key={index}>
                    {el.landArea ? el.landArea : ""}
                  </TableCellContent>
                ))}
              </TableRow>
              <TableRow>
                <TableCellStyled align="left">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <IconCanGoc /> &nbsp; Căn góc
                  </div>
                </TableCellStyled>
                {data?.lstProductionRow?.map((el, index) => (
                  <TableCellContent align="center" key={index}>
                    {el.isCornerApartment === 1 ? <Check /> : ""}
                  </TableCellContent>
                ))}
              </TableRow> */}
            </TableHead>
            {data?.lstDetailRow?.map((el, idx) => (
              <TableRow key={idx}>
                <TableCell
                  align="left"
                  sx={{ width: 150, backgroundColor: "rgba(27, 52, 89, 0.12)" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div style={{ marginRight: 10, flex: 1 }}>
                      <TextTable>{el.lotCode}</TextTable>
                    </div>
                    <div style={{ textAlign: "center", flex: 1 }}>
                      <div>
                        {el.countRemaining === 0 ? (
                          <TextRemainCountZero>
                            {el.countRemaining}
                          </TextRemainCountZero>
                        ) : (
                          <TextRemainCount>{el.countRemaining}</TextRemainCount>
                        )}
                      </div>
                      <div>Còn lại</div>
                    </div>
                  </div>
                </TableCell>
                {fetchComponent(el, idx)}
              </TableRow>
            ))}
          </Table>
        </TableContainer>
      </Container>
    </FlexContainer>
  );
};
export default ProductTablePages;
