
import { IconCountry } from "@components/Icons";
import styled from "@emotion/styled";
import Link from "next/link";

const ContainerStyled = styled.div`
  height: 34px;
  width: 100%;
  display: flex;
  background-color: #1b3459;
  justify-content: center;
  flex-direction: row;
  position: relative;
`;

const WrapContainer = styled.div`
  display: flex;
  align-items: center;
`;
const LinkContainer = styled.div`
  gap: 56px;
  display: flex;
  justify-content: center;
`;
const TextLink = styled.a`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  color: #dbdee3;
  cursor: pointer;
  :hover {
    color: yellow;
  }
`;

const IconCountryStyle = {
  position: "absolute" as "absolute",
  right: "50px",
  cursor: "pointer",
};

const HeaderTop = () => {
  return (
    <ContainerStyled>
      <WrapContainer>
        <LinkContainer>
          <Link href="/">
            <TextLink>Về tài khoản</TextLink>
          </Link>
          <Link href="/">
            <TextLink>Về quy trình mua BĐS Online</TextLink>
          </Link>
          <Link href="/">
            <TextLink>Về TNR</TextLink>
          </Link>
          <Link href="/">
            <TextLink>Về hỗ trợ</TextLink>
          </Link>
        </LinkContainer>
          <IconCountry style={IconCountryStyle} />
      </WrapContainer>
    </ContainerStyled>
  );
};

export default HeaderTop;
