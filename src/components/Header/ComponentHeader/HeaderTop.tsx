import { IconCountry } from "@components/Icons";
import styled from "@emotion/styled";
import Link from "next/link";
import Router from "next/router";
import { useContext } from "react";
import LocalStorage from "utils/LocalStorage";
import PathRoute from "utils/PathRoute";
import SessionStorage from "utils/SessionStorage";

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
  const accessToken = LocalStorage.get("accessToken");

  return (
    <ContainerStyled>
      <WrapContainer>
        <LinkContainer>
          {/* <Link href={`http://localhost:3000${PathRoute.Profile}`} passHref> */}
          {accessToken !== null ? (
            <TextLink
              onClick={() => {
                Router.replace(`/profile`, undefined, { shallow: true });
              }}
            >
              Về tài khoản
            </TextLink>
          ) : (
            <TextLink
              onClick={() => {
                Router.replace(
                  `/authen?prePath=%2Fprofile&tabIndex=register`,
                  undefined,
                  { shallow: true }
                );
              }}
            >
              Về tài khoản
            </TextLink>
          )}

          {/* </Link> */}
          {/* <Link href={`http://localhost:3000${PathRoute.BuyingGuide}`} passHref> */}
          <TextLink
            onClick={() => {
              Router.replace(
                `${PathRoute.BuyingGuide}?idUserManual=3e63c59e-7995-4f8b-b553-740d131a052f&&selected=0`,
                undefined,
                {
                  shallow: true,
                }
              );
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
              Router.replace(
                `${PathRoute.BuyingGuide}?idUserManual=3e63c59e-7995-4f8b-b553-740d131a052f&&selected=0`,
                undefined,
                {
                  shallow: true,
                }
              );
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
