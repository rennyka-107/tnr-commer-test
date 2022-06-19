import styled from "@emotion/styled";
import { ProductsResponse } from "interface/product";
import { Box, Grid } from "@mui/material";
import { ItemProductMap } from "@components/CustomComponent";
import isEmpty from "lodash.isempty";
import { useDispatch } from "react-redux";
import { setTarget } from "../../../../store/projectMapSlice";

interface ProductsProps {
  data?: ProductsResponse[];
}
const ContainerProduct = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const ListProductCard = ({ data }: ProductsProps) => {
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {!isEmpty(data) ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          sx={{
            pt: 0,
            display: "grid",
            gridAutoColumns: "23rem",
            gridTemplateRows: "2fr",
            overflowX: "auto",
          }}
        >
          {data.map((product, index) => (
            <Grid
              sx={{
                gridRow:
                  index < data.length / 2
                    ? "1"
                    : "2",
                gridColumn: "auto",
              }}
              item
              key={index}
            >
              <ContainerProduct>
                <ItemProductMap
                onClick={()=>{dispatch(setTarget(product))}}
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
    </Box>
  );
};
export default ListProductCard;
