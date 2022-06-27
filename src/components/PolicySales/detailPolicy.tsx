import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { BodySalePolicy } from "interface/register";

type Props = {
  detailData: BodySalePolicy;
};
const TitleStyled = styled(Typography)`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 38px;
  text-align: center;
  color: rgb(50, 47, 80);
  margin-bottom: 40px;
`;
const DetailPolicy = ({ detailData }: Props) => {
  return (
    <>
      <TitleStyled>{detailData.name}</TitleStyled>
      <div dangerouslySetInnerHTML={{ __html: detailData.content }} />
    </>
  );
};
export default DetailPolicy;
