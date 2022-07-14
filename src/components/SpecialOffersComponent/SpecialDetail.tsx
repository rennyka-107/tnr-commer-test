import ContainerSales from "@components/Container/ContainerSales";
import { SpecialOfferI } from "interface/SpecialOffers";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const TitleStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: italic;
  font-weight: 400;
  font-size: 14px;
  line-height: 170%;
  /* identical to box height, or 24px */

  /* Shades/Dark 2 */

  color: #48576d;
`;

type Props = {
  data: SpecialOfferI;
};

const SpecialDetail = ({ data }: Props) => {
  return (
    <ContainerSales title={data?.name} checkBread={true}>
      <div>
        <TitleStyled>{data?.startDate}</TitleStyled>
        <div style={{ width: "100%", padding: 80 }}>
          <div
            className="content-project-view ck-content"
            dangerouslySetInnerHTML={{ __html: data?.description }}
          />
        </div>
      </div>
    </ContainerSales>
  );
};
export default SpecialDetail;
