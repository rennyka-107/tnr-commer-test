import FlexContainer from "@components/CustomComponent/FlexContainer";
import SliderCategoryIndex from "@components/CustomComponent/SliderCategoryIndex";
import styled from "@emotion/styled";
import { Typography, useMediaQuery } from "@mui/material";
import useHover from "hooks/useHover";
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
  const matches1080 = useMediaQuery("(max-width:1080px)");
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
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
        // style={{
        
        // }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center",
            marginTop: 75,

          }}
        ></div>
        {productTopByOutStanding?.length > 0 ? (
          <div ref={hoverRef} style={{paddingTop: 50,height: 600}}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
				marginBottom: 50,
				marginLeft: matches1080? 0 :70,
				marginRight: matches1080 ? 0 :60
              }}
			  className="dynamic-Header"
            >
              <TextBDS>BẤT ĐỘNG SẢN NỔI BẬT</TextBDS>
              <LinkStyled href="/hot-products">Xem tất cả</LinkStyled>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, auto)",
                justifyContent: sizeOfArray >= 4 ? "center" : "",
				width: sizeOfArray >= 4 ? "100%" : 1115,
              }}
            >
              <>
                <DynamicSliderHotProduct hoverCheck={isHovered} />
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
