import SliderShowComponent from "@components/CustomComponent/SliderShowComponent";
import BannerIndex from "./BannerIndex";
import BodyIndex from "./BodyIndex";
import styled from "@emotion/styled";
import OnlineSupportSale from "./OnlineSupportSale";
import { Box } from "@mui/system";
import SelectInputComponent from "@components/CustomComponent/SelectInputComponent";
import SliderComponent from "@components/CustomComponent/SliderComponent";
import { Button } from "@mui/material";
import { IconSearchAdvan } from "@components/Icons";
import Slider3dShowBottom from "./Slider3dShowBottom";
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
      <BannerIndex />
      <div style={{ padding: 88 }}>
        <BodyIndex />
      </div>

      <SaleWrap>
        <TitleSlide>CHƯƠNG TRÌNH ƯU ĐÃI</TitleSlide>
        <SliderShowComponent />
      </SaleWrap>
      <div style={{ padding: 88 }}>
        <OnlineSupportSale />
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
        <div style={{ display: "flex", gap: 65, marginLeft: 54 }}>
          <SliderComponent
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
        </div>
      </CompareSwap>
	  <Slider3dShowBottom />
    </>
  );
};
export default HomePage;
