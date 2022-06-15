import styled from "@emotion/styled";
import { ProductsResponse } from "interface/product";
import { Grid } from "@mui/material";
import { ItemProductMap } from "@components/CustomComponent";
import isEmpty from 'lodash.isempty';

interface ProductsProps {
  data?: ProductsResponse[];
}
const ContainerProduct = styled.div`
  display: flex;
  justify-content: center;
`;

const ListProductCard = ({ data }: ProductsProps) => {
  return (
    <>
      {!isEmpty(data) ? (
        <Grid container spacing={4}>
          {data?.map((product, index) => (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={6} key={index}>
              <ContainerProduct>
                <ItemProductMap
                  src={{
                    src: "https://dulichvietnam.com.vn/data/toa-nha-dep-nhat-viet-nam-8_5.jpg",
                  }}
                />
              </ContainerProduct>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div style={{ textAlign: "center" }}>No Data</div>
      )}
    </>
  );
};
export default ListProductCard;
