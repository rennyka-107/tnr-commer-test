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

  /* Brand */

  color: #1b3459;
`;
const NoProductComponent = () => {
  return (
    <div
      style={{ textAlign: "center", display: "flex", flexDirection: "column" ,gap: 30,padding: "70px 91px 123px 80px"}}
    >
      <div>
        {" "}
        <Image src={NoProduct} width={252} height={205} unoptimized />
      </div>
      <TextStyled>Chưa có bất động sản phù hợp kết quả tìm kiếm</TextStyled>
    </div>
  );
};
export default NoProductComponent;
