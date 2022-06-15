
import styled from "@emotion/styled";

import { Box } from "@mui/system";
import SelectInputComponent from "@components/CustomComponent/SelectInputComponent";
import { Button } from "@mui/material";
import { IconSearchAdvan } from "@components/Icons";
import { TBOUTStanding } from "interface/product";
import { useScroll } from "hooks/useScroll";
import { useContext } from "react";
import dynamic from "next/dynamic";

const DynamicBanner = dynamic(
	() => import("./BannerIndex"),
	{ loading: () => <p>...</p> }
  );
  const DynamicBody = dynamic(
	() => import("./BodyIndex"),
	{ loading: () => <p>...</p> , ssr: false}
  );
  const DynamicSliderShowComponent = dynamic(
	() => import("@components/CustomComponent/SliderShowComponent"),
	{ loading: () => <p>...</p>, ssr: false }
  );
  const DynamicOnlineSupportSale = dynamic(
	() => import("./OnlineSupportSale"),
	{ loading: () => <p>...</p> , ssr: false}
  );
  const DynamicSliderComponent = dynamic(
	() => import("@components/CustomComponent/SliderComponent"),
	{ loading: () => <p>...</p> , ssr: false}
  );
  const DynamicSlider3dShowBottom = dynamic(
	() => import("./Slider3dShowBottom"),
	{ loading: () => <p>...</p> , ssr: false}
  );
interface ProductsIndexProps {
  listProductOutOfStanding?: TBOUTStanding[];
}

const SaleWrap = styled.div`
  background: #1b3459;
  height: 416px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const TextBannerBottom = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */s

  text-align: right;

  /* Brand/Sub 1 */

  color: #fec83c;
  text-transform: none;
  margin-left: 13px;
`;
const TitleSlide = styled.div`
  margin-bottom: 20px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 33px;
  /* identical to box height */

  /* Brand/Text */

  color: #ffffff;
`;
const CompareSwap = styled.div`
  background: #1b3459;
  height: 211px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const BoxStyled = styled(Box)`
padding: 40px;
    display: flex;
    gap: 30px;
}
`;
const HomePage = () => {
  return (
    <>
      <DynamicBanner />
      <div style={{ padding: 88 }}>
        <DynamicBody />
      </div>

      <SaleWrap id="uu-dai">
        <TitleSlide>CHƯƠNG TRÌNH ƯU ĐÃI</TitleSlide>
        <DynamicSliderShowComponent />
      </SaleWrap>
      <div style={{ padding: 88 }}>
        <DynamicOnlineSupportSale />
      </div>
      <CompareSwap>
        <div>
          <BoxStyled sx={{ minWidth: 120, padding: "0px !important" }}>
            <SelectInputComponent
              label="Dòng sản phẩm"
              data={[]}
              value={[]}
              onChange={() => console.log("abc")}
              placeholder="TNR The Nosta"
            />
            <SelectInputComponent
              label="Loại sản phẩm"
              data={[]}
              value={[]}
              onChange={() => console.log("abc")}
              placeholder="Loại sản phẩm"
            />
          </BoxStyled>
          <div>
            <Button>
              <IconSearchAdvan />
              <TextBannerBottom>So sánh nâng cao</TextBannerBottom>
            </Button>
          </div>
        </div>
        {/* <div style={{ display: "flex", gap: 65, marginLeft: 54 }}>
          <DynamicSliderComponent
            label="khoảng giá"
            numberMin={0}
            numberMax={5}
            unit="tỷ"
          />
          <Button
            style={{
              backgroundColor: "#D60000",
              width: 163,
              height: 48,
              borderRadius: 8,
              marginTop: 10,
            }}
          >
            <span
              style={{
                color: "#FFFFFF",
                fontFamily: "Roboto",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: 19,
                textTransform: "none",
              }}
            >
              {" "}
              So sánh
            </span>
          </Button>
        </div> */}
      </CompareSwap>
      <DynamicSlider3dShowBottom />
    </>
  );
};
export default HomePage;
