import styled from "@emotion/styled";
import { ProductsResponse } from "interface/product";
import { Box, Grid } from "@mui/material";
import { ItemProductMap } from "@components/CustomComponent";
import isEmpty from "lodash.isempty";
import { useDispatch, useSelector } from "react-redux";
import {
  setOldTarget,
  setTargetShape,
} from "../../../../store/projectMapSlice";
import { RootState } from "../../../../store/store";

interface ProductsProps {
  data?: ProductsResponse[];
}
const ContainerProduct = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const ListProductCard = ({ data }: ProductsProps) => {
  const dispatch = useDispatch();
  const Target = useSelector((state: RootState) => state.projectMap.Target);

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
            // gridTemplateRows: "2fr",
            overflowX: "auto",
          }}
        >
          {data.map((product, index) => (
            <Grid
              sx={{
                gridRow: index < data.length / 2 ? "1" : "2",
                gridColumn: "auto",
              }}
              item
              key={index}
            >
              <ContainerProduct>
                <ItemProductMap
                  data={product}
                  onClick={() => {
                    dispatch(
                      setTargetShape({
                        id: product.id,
                        level: "PRODUCT",
                      })
                    );
                    if (!isEmpty(Target) && isEmpty(Target.productionId)) {
                      dispatch(setOldTarget(Target));
                    }
                  }}
                />
              </ContainerProduct>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div style={{ textAlign: "center" }}>Không có dữ liệu</div>
      )}
    </Box>
  );
};
export default ListProductCard;
