import { SpecialOfferI } from "interface/SpecialOffers";
import styled from "@emotion/styled";
import ImageWithHideOnErrorOffers from "hooks/ImageWithHideOnErrorOffers";
import Mask3 from "../../../public/images/mask_g_3.png";
import ContainerSales from "@components/Container/ContainerSales";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";

type Props = {
  data: SpecialOfferI[];
};

const ContainerStyled = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(4, 1fr);
`;

const SpecialOffersComponent = ({ data }: Props) => {
  const Router = useRouter();
  return (
    <ContainerSales title={"Khuyến mại"} checkBread={true}>
      <ContainerStyled>
        {data.map((item, index) => (
          <Tooltip title={item.name} placement="top"  key={index}>
            <div
              onClick={() => Router.push(`/sales/${item.id}`)}
              style={{ cursor: "pointer" }}
			  key={index}
            >
              <ImageWithHideOnErrorOffers
                key={index}
                className="logo"
                src={item.avatar ? item.avatar : Mask3}
                fallbackSrc={Mask3}
                width={350}
                height={224}
                priority
                layout="fixed"
                unoptimized={true}
              />
            </div>
          </Tooltip>
        ))}
      </ContainerStyled>
    </ContainerSales>
  );
};
export default SpecialOffersComponent;
