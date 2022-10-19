import Image from "next/image";
import NoProduct from "../../../../public/images/no_product.png";
import styled from "@emotion/styled";

const TextStyled = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  margin-right: 33px;

  /* Brand */

  color: #1b3459;
`;
const NoProjectComponent = () => {
  return (
    <div
      style={{ textAlign: "center", display: "flex", flexDirection: "column" ,gap: 30, padding: "82px 91px 128px 80px"}}
    >
      <div>
        {" "}
        <Image src={NoProduct} width={252} height={205} unoptimized />
      </div>
      <TextStyled>Chưa có dự án phù hợp kết quả tìm kiếm</TextStyled>
    </div>
  );
};
export default NoProjectComponent;
