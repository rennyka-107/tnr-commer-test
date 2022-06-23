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

type DetailRowI = {
  countRemaining: number;
  projectLevelDetailId: string;
  projectLevelDetailName: string;
  lotCode: string;
};

type ProductionRowI = {
  doorDirection: string;
  isCornerApartment: number;
  landArea: number;
  numBath: number;
  numBed: number;
  price: string;
  paymentStatus: 2| 3 | 4 | null; // 2 mở bán (còn hàng), null sắp mở bán, 4 ngừng bán (đã bán), 3 đang chờ thanh toán
  productionId: string;
  productionName: string;
  projectLevelDetailId: string;
  projectLevelDetailName: string;
  code: string;
  lotCode: string;
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
const TextTable = styled.span`
  // color:#0000;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
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

const ProductTablePages = () => {
  const [body, setBody] = useState<BodyRequest>();
  const [data, setData] = useState<{
    lstDetailRow: DetailRowI[];
    lstProductionRow: ProductionRowI[];
  }>();
  const router = useRouter();
  const getProduct = async (body: BodyRequest, cancelToken: any) => {
    // const newValues: BodyRequest = { ...body, saleProductStatus: (body.saleProductStatus as string[]).join(',') }
    const response = await getListProductTable(body,cancelToken);
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

  const renderAction = (item: ProductionRowI) => {
    switch (item.paymentStatus) {
      case 4:
        return (
          <IconStyled>
            <IconStopSale />
          </IconStyled>
        );
      case null:
        return (
          <IconStyled>
            <IconCommingSale />
          </IconStyled>
        );
      case 2:
        return (
          <IconStyled
            onClick={() => {
              router.push(`/products/${item.productionId}`);
            }}
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
                {item.price}
              </div>
            </>
          </IconStyled>
        );
      case 3:
        return (
          <IconStyled>
            <IconWaitPaymentSale />
          </IconStyled>
        );

      default:
        return <IconStyled>{item.paymentStatus}</IconStyled>;
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
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
          <Table aria-label="simple table">
            <TableHead style={{ backgroundColor: "#1B3459", color: "#FFFF" }}>
              <TableRow>
                <TableCellStyled align="left">
                  <LabelContainer>Thứ tự căn</LabelContainer>
                </TableCellStyled>
                {data?.lstProductionRow?.map((el, index) => (
                  <TableCellContent align="center" key={index}>
                    {el?.code ?? "no stt"}
                  </TableCellContent>
                ))}
              </TableRow>
              <TableRow>
                <TableCellStyled align="left">Số phòng ngủ</TableCellStyled>
                {data?.lstProductionRow?.map((el, index) => (
                  <TableCellContent align="center" key={index}>
                    {el?.numBed ?? "no bed"}
                  </TableCellContent>
                ))}
              </TableRow>
              <TableRow>
                <TableCellStyled align="left">Số phòng vệ sinh</TableCellStyled>
                {data?.lstProductionRow?.map((el, index) => (
                  <TableCellContent align="center" key={index}>
                    {el?.numBath ?? 0}
                  </TableCellContent>
                ))}
              </TableRow>
              <TableRow>
                <TableCellStyled align="left">Hướng logia</TableCellStyled>
                {data?.lstProductionRow?.map((el, index) => (
                  <TableCellContent align="center" key={index}>
                    {el?.doorDirection ?? "no direction"}
                  </TableCellContent>
                ))}
              </TableRow>
              <TableRow>
                <TableCellStyled align="left">Căn góc</TableCellStyled>
                {data?.lstProductionRow?.map((el, index) => (
                  <TableCellContent align="center" key={index}>
                    {el.isCornerApartment ? <Check /> : ""}
                  </TableCellContent>
                ))}
              </TableRow>
            </TableHead>
            {data?.lstDetailRow?.map((el) => (
              <TableRow key={el.lotCode}>
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
                        <TextRemainCount>{el.countRemaining}</TextRemainCount>
                      </div>
                      <div>Còn lại</div>
                    </div>
                  </div>
                </TableCell>
                {data?.lstProductionRow?.map((element, index) => (
                  <CellContent align="center" key={index}>
                    {element.lotCode == el.lotCode ? renderAction(element) : <IconStyled/>}
                  </CellContent>
                ))}
              </TableRow>
            ))}
          </Table>
        </TableContainer>
      </Container>
    </FlexContainer>
  );
};
export default ProductTablePages;
