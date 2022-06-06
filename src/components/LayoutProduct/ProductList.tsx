import Container from "@components/Container";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import PaginationComponent from "@components/CustomComponent/PaginationComponent";
import Row from "@components/CustomComponent/Row";
import styled from "@emotion/styled";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import useProductList from "hooks/useProductList";
import { ProductsResponse } from "interface/product";
import { ProjectResponse } from "interface/project";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface ProductsProps {
  listProducts?: ProductsResponse[];
  listProject?: ProjectResponse[];
}

const TextHeaderStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 33px;

  /* Brand */

  color: #1b3459;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 22px;
  margin-bottom: 52px;
`;

const DynamicBreadcrumsComponent = dynamic(
  () => import("../../components/CustomComponent/BreadcrumsComponent/index"),
  { loading: () => <p>...</p> }
);
const DynamicItemProductComponent = dynamic(
  () => import("@components/LayoutProduct/ItemProduct"),
  { loading: () => <p>...</p> }
);

const ProductList = ({ listProducts, listProject }: ProductsProps) => {
  const {
    data,
    error,
    loading,
    changePageNumber,
    totalPage,
    changeBody,
    body,
    params,
  } = useProductList();
  const [titleData, setTitleData] = useState("");

  const { listMenuBarProjectType } = useSelector(
    (state: RootState) => state.menubar
  );

  useEffect(() => {
    const items = listMenuBarProjectType.find(
      (item) => item.id === body?.projectTypeId
    );
    setTitleData(items?.name);
  }, [body]);

  const listBread = [
    {
      id: 1,
      value: "Trang chủ",
    },
    {
      id: 2,
      value: titleData,
    },
  ];

  return (
    <FlexContainer>
      <Container
        title={titleData ? titleData : "Tất cả"}
        rightContent={
          <div style={{ display: "flex", justifyContent: "end" }}>
            <FormControl style={{ width: 115, marginRight: 10, height: 48 }}>
              <InputLabel id="demo-simple-select-label">Vị trí</InputLabel>
              <Select
                style={{ height: 48 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //   value="Vị Trí"
                label="Vị trí"
                onChange={() => console.log("abc")}
              >
                <MenuItem value={10}>Đông Nam</MenuItem>
                <MenuItem value={20}>Bắc</MenuItem>
                <MenuItem value={30}>Tây</MenuItem>
              </Select>
            </FormControl>
            <FormControl style={{ width: 115, height: 48 }}>
              <InputLabel id="demo-simple-select-label">Loại</InputLabel>
              <Select
                style={{ height: 48 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //   value="age"
                label="Loại"
                onChange={() => console.log("abc")}
              >
                <MenuItem value={10}>Loại</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
        }
      >
        <>
          <DynamicItemProductComponent data={data} />
          <Row customStyle={{ padding: 70, justifyContent: "center" }}>
            <PaginationComponent
              count={totalPage}
              onChange={(event, page) => {
                changePageNumber(page);
              }}
              page={params.pageNumber}
            />
          </Row>
        </>
      </Container>
    </FlexContainer>
  );
};

export default ProductList;
