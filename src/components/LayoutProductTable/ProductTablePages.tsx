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

type DetailRowI = {
    countRemaining: number,
    projectLevelDetailId: string;
    projectLevelDetailName: string;
}

type ProductionRowI = {
    doorDirection: string;
    isCornerApartment: number;
    landArea: number;
    numBath: number;
    numBed: number;
    price: string;
    productStatus: -1 | 0 | 1 | 2 | 3; //- 1 ngừng bán, 0 sắp mở bán, 1 mở bán (còn hàng), 2 đang chờ thanh toán
    productionId: string;
    productionName: string;
    projectLevelDetailId: string;
    projectLevelDetailName: string;
}

const TableCellStyled = styled(TableCell)`
    width: 150px;
    color: #FFFF;
`
const TableCellContent = styled(TableCell)`
    color: #FFFF;
`

const TextRemainCount = styled.span`
    color:#06C270;
    font-family: Roboto;
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 36.4px;
`
const TextTable = styled.span`
    // color:#0000;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
`

const ProductTablePages = () => {
    const [body, setBody] = useState<BodyRequest>();
    const [data, setData] = useState<{ lstDetailRow: DetailRowI[], lstProductionRow: ProductionRowI[] }>();

    const getProduct = async (body: BodyRequest) => {
        // const newValues: BodyRequest = { ...body, saleProductStatus: (body.saleProductStatus as string[]).join(',') }
        const response = await getListProductTable(body);
        setData(response?.responseData ?? [])
    }

    useEffect(() => {
        if (body?.projectId) {
            getProduct(body);
        }
    }, [body])

    const renderAction = (item: ProductionRowI) => {
        switch (item.productStatus) {
            case -1:
                return (
                    <span>
                        <IconStopSale />
                    </span>
                )
            case 0:
                return (
                    <span>
                        <IconCommingSale />
                    </span>
                )
            case 1:
                return (
                    <span onClick={() => { }} style={{ color: 'black', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                        <>
                            <IconAvaliableSale />
                            {item.price}
                        </>
                    </span>
                )
            case 2:
                return (
                    <span>
                        <IconWaitPaymentSale />
                    </span>
                )

            default:
                return null;
        }
    }

    return (
        <FlexContainer>
            <Container
                title="Bảng hàng trực tuyến"
            >
                <Filter body={body} onSubmit={(values) => { setBody(values) }} />
                <TableContainer component={Paper} sx={{ marginTop: 4, flex: 9 }} >
                    <Table aria-label="simple table" >
                        <TableHead style={{ backgroundColor: '#1B3459', color: '#FFFF' }}>
                            <TableRow >
                                <TableCellStyled align="left">Thứ tự căn</TableCellStyled>
                                {data?.lstProductionRow.map((el) => (
                                    <TableCellContent align="left" key={el.productionId}>{el.productionName}</TableCellContent>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCellStyled align="left" sx={{ minWidth: 150 }} >Số phòng ngủ</TableCellStyled>
                                {data?.lstProductionRow.map((el) => (
                                    <TableCellContent align="left" key={el.productionId}>{el.numBed}</TableCellContent>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCellStyled align="left" sx={{ minWidth: 150 }}>Số phòng vệ sinh</TableCellStyled>
                                {data?.lstProductionRow.map((el) => (
                                    <TableCellContent align="left" key={el.productionId}>{el.numBath}</TableCellContent>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCellStyled align="left" sx={{ minWidth: 150 }}>Hướng logia</TableCellStyled>
                                {data?.lstProductionRow.map((el) => (
                                    <TableCellContent align="left" key={el.productionId}>{el.doorDirection}</TableCellContent>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCellStyled align="left" sx={{ minWidth: 150 }}>Căn góc</TableCellStyled>
                                {data?.lstProductionRow.map((el) => (
                                    <TableCellContent align="left" key={el.productionId}>{el.isCornerApartment ? <Check /> : ''}</TableCellContent>
                                ))}
                            </TableRow>
                        </TableHead>
                        {
                            data?.lstDetailRow.map((el) => (
                                <TableRow key={el.projectLevelDetailId}>
                                    <TableCell align="left" sx={{ minWidth: 150, backgroundColor: 'rgba(27, 52, 89, 0.12)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{ marginRight: 10 }}>
                                                <TextTable>
                                                    {el.projectLevelDetailName}
                                                </TextTable>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <div><TextRemainCount>{el.countRemaining}</TextRemainCount></div>
                                                <div>Còn lại</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    {data?.lstProductionRow.map((element) => (
                                        <TableCellContent align="left" key={element.productionId}>{element.projectLevelDetailId == el.projectLevelDetailId ? renderAction(element) : ''}</TableCellContent>
                                    ))}
                                </TableRow>
                            ))
                        }
                    </Table>
                </TableContainer>
            </Container>
        </FlexContainer>
    )
}
export default ProductTablePages;