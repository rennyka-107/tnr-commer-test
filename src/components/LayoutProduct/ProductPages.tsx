import FlexContainer from "@components/CustomComponent/FlexContainer";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import { ProductsResponse } from "interface/product";
import { ProjectResponse } from "interface/project";
import { useState } from "react";
import Container from "@components/Container";
import ContainerProduct from "@components/Container/ContainerProduct";

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

const DynamicBreadcrumsComponent = dynamic(
  () => import("../../components/CustomComponent/BreadcrumsComponent/index"),
  { loading: () => <p>...</p> }
);
const DynamicItemProductComponent = dynamic(
  () => import("@components/LayoutProduct/ItemProduct"),
  { loading: () => <p>...</p> }
);

const ProductPages = ({ listProducts, listProject }: ProductsProps) => {
  const listBread = [
    {
      id: 1,
      value: "Trang chủ",
    },
    {
      id: 2,
      value: listProject ? listProject[0]?.funcDivision : "",
    },
  ];
  const fetchRight = () => {
    return (
      <>
 
          <FormControl style={{ width: 115, marginRight: 10, height: 48 }}>
            <InputLabel id="demo-simple-select-label">Vị trí</InputLabel>
            <Select
              style={{ height: 48 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value="Vị Trí"
                label="Vị Trí"
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
      
      </>
    );
  };
  return (
    <FlexContainer>
      <ContainerProduct
        title={listProject ? listProject[0]?.name : ""}
        rightContent={fetchRight()}
      >
        <DynamicItemProductComponent data={listProducts} />
      </ContainerProduct>
    </FlexContainer>
  );
};

export default ProductPages;
