import FlexContainer from "@components/CustomComponent/FlexContainer";
import SliderCategoryIndex from "@components/CustomComponent/SliderCategoryIndex";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { TBOUTStanding } from "interface/product";
import _ from "lodash";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

const DynamicSliderHotProduct = dynamic(
  () => import("../../../components/CustomComponent/SliderProductHotComponent"),
  { loading: () => <p>...</p> }
);

const TextBDS = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 33px;

  /* Brand/Main color */

  color: #1b3459;
`;
const LinkStyled = styled.a`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 26px;
  text-align: right;

  color: #1f70e8;
`;

const ContainerProduct = styled.div`
  display: flex;
  flex-direction: column;

  height: auto;
`;
export default function BodyIndex() {
  const dispatch = useDispatch();

  const router = useRouter();
  const { listMenuBarProjectType } = useSelector(
    (state: RootState) => state.menubar
  );
  const { productTopByOutStanding } = useSelector(
    (state: RootState) => state.products
  );
  const menuBarProjectType = listMenuBarProjectType?.filter(
    (item) => item.id !== "1"
  );
  const sizeOfArray = _.size(productTopByOutStanding);

  const onClickProduct = async (projectTypeId) => {
    const paramsSearch = {
      page: 0,
      size: 10,
    };

    const searchList = {
      projectId: "",
      provinceId: "",
      projectTypeId: projectTypeId,
    };
    // try {
    //   const response = await searchListProductByProjectIdApi(paramsSearch, searchList);
    //   dispatch(getListProduct(response.responseData));

    //   if (response.responseCode === "00") {
    router.replace(`/productTNR?provinceId=&&projectTypeId=${projectTypeId}`);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <FlexContainer>
      <SliderCategoryIndex />
      <ContainerProduct
        style={{
          width: sizeOfArray >= 4 ? "100%" : 1115,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center",
            marginTop: 75,
            marginBottom: 33,
          }}
        ></div>
        {productTopByOutStanding?.length > 0 ? (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginBottom: 20,
              }}
            >
              <TextBDS>BẤT ĐỘNG SẢN NỔI BẬT</TextBDS>
              <LinkStyled href="/hot-products">Xem tất cả</LinkStyled>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, auto)",
                justifyContent: sizeOfArray >= 4 ? "center" : "",
              }}
            >
              <>
                <DynamicSliderHotProduct />
              </>
            </div>
          </div>
        ) : (
          <></>
        )}
      </ContainerProduct>
    </FlexContainer>
  );
}
