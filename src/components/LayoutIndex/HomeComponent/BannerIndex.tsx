import SearchInput from "@components/CustomComponent/SearchInput";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import Image from "next/image";
import ModalAdvanSearch from "./ModalAdvanSearch";
import Banner from "../../../../public/images/GMC.jpeg";
import Sliderbanner from "@components/CustomComponent/Sliderbanner";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
const WrapBanner = styled.div`
position: absolute;
width: 100%;
height: 644px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(2, 14, 22, 0.486) 43.23%,
    rgba(3, 6, 9, 0.729) 100%
  );

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
	const {
		bannerList
	  } = useSelector((state: RootState) => state.banner);
  return (
    <div style={{ width: "100%", height: 644, position: 'relative' }}>
      {/* <Image src={Banner} width={1200} height={644} layout="fill" objectFit="cover" /> */}
	  <Sliderbanner data={bannerList}/>
     
    </div>
  );
};
export default BannerIndex;
