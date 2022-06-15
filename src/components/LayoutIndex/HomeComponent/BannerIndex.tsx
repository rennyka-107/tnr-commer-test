
import SearchInput from "@components/CustomComponent/SearchInput";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import ModalAdvanSearch from "./ModalAdvanSearch";

const WrapBanner = styled.div`
  width: auto;
  height: 644px;
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(2, 14, 22, 0.486) 43.23%,
      rgba(3, 6, 9, 0.729) 100%
    ),
    url("images/GMC.jpeg");
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ContainerBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TextBanner = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 42px;
  text-align: center;

  /* Brand/Text */

  color: #ffffff;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.35);
`;

const BannerIndex = () => {



  return (
    <WrapBanner>
      <ContainerBody>
        <div style={{ marginBottom: 20 }}>
          <TextBanner>SỐNG XANH THỊNH VƯỢNG</TextBanner>
          <TextBanner>ĐẤT VÀNG PHỒN VINH</TextBanner>
        </div>

        <SearchInput
          placholder="Nhập tên dự án, địa chỉ hoặc thành phố"
          width={723}
          height={60}
        />

        <div style={{ marginTop: 19 }}>
          <ModalAdvanSearch />
        </div>
      </ContainerBody>
    </WrapBanner>
  );
};
export default BannerIndex;
