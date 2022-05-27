import { IconCountry } from "@components/Icons";
import styled from "@emotion/styled";
import Link from "next/link";
import Router from "next/router";
import PathRoute from "utils/PathRoute";

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
          {/* <Link href={`http://localhost:3000${PathRoute.Profile}`} passHref> */}
          <TextLink
            onClick={() => {
              Router.replace(`${PathRoute.Profile}`, undefined, { shallow: true });
            }}
          >
            Về tài khoản
          </TextLink>
          {/* </Link> */}
          {/* <Link href={`http://localhost:3000${PathRoute.BuyingGuide}`} passHref> */}
          <TextLink
            onClick={() => {
              Router.replace(`${PathRoute.BuyingGuide}`, undefined, { shallow: true });
            }}
          >
            Về quy trình mua BĐS Online
          </TextLink>
          {/* </Link> */}
          <Link
            href={"https://tnrvietnam.com.vn/sites/tnr/ve-chung-toi/"}
            passHref
          >
            <TextLink target={"_blank"}>Về TNR</TextLink>
          </Link>
          {/* <Link href="" passHref > */}
          <TextLink
            onClick={() => {
              Router.replace(`${PathRoute.BuyingGuide}`, undefined, { shallow: true });
            }}
          >
            Về hỗ trợ
          </TextLink>
          {/* </Link> */}
        </LinkContainer>
        <IconCountry style={IconCountryStyle} />
      </WrapContainer>
    </ContainerStyled>
  );
};

export default HeaderTop;
