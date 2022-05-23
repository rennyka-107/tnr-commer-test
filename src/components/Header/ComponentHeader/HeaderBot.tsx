import { IconBag, IconHeart, IconUser, Logo } from "@components/Icons";
import styled from "@emotion/styled";
import { Route } from "@mui/icons-material";
import { Button } from "@mui/material";
import MenuDropdown from "ItemComponents/MenuDropdown";
import Link from "next/link";
import { useRouter } from "next/router";
import PathRoute from "utils/PathRoute";

const ContainerNavTop = styled.div`
  height: 93px;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #f3f4f6;
  box-shadow: 0px -4px 20px 1px rgba(0, 0, 0, 0.15);
`;

const BodyContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0px 50px 0px 167px;
  justify-content: space-between;
`;
const WrapMenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const TextLink = styled.a`
  text-transform: none;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #0e1d34;
`;
const WrapRightItem = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;
const ButtonBuyHelp = styled(Button)`
  height: 39px;
  width: 145px;
  background: #ffffff;
  border: 1px solid #ea242a;
  border-radius: 8px;
  padding: 8px 25px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  text-align: center;
  color: #0e1d34;
  text-transform: none;

  :hover {
    background: #ea242a;
    color: #ffffff;
  }
`;
const IconAccountWrap = styled.div`
  display: flex;
  gap: 30px;
`;
// const TextBuyHelp = styled.span`
//   width: auto;

// `;
const lbds = [
  {
    id: 1,
    value: "Chung cư",
  },
  {
    id: 2,
    value: "Căn hộ dịch vụ",
  },
  {
    id: 3,
    value: "Bất động sản nghỉ dưỡng",
  },
  {
    id: 4,
    value: "Khu đô thị",
  },
];
const Duan = [
  {
    id: 1,
    value: "TNR Star Bỉm Sơn",
  },
  {
    id: 2,
    value: "TNR Star Kiến Tường",
  },
  {
    id: 3,
    value: "TNR Star Lam Sơn",
  },
];
const HeaderBot = () => {
  const Router = useRouter();
  return (
    <ContainerNavTop>
      <BodyContainer>
        <WrapMenuItem>
          <div>
            <Logo />
          </div>
          <div style={{ display: 'flex', gap: 35, marginLeft: 38 }}>
            <MenuDropdown title={"Loại bất động sản"}
              data={lbds}
              onSelect={(item) => {
                console.log('Router.beforePopState', Router.pathname);
                if (Router.pathname == `/${PathRoute.ProjectTNR}/[type]`) {
                  Router.replace(`/${PathRoute.ProjectTNR}/${item.id}`)
                } else {
                  Router.push(`/${PathRoute.ProjectTNR}/${item.id}`)
                }
              }}
            />
            <MenuDropdown title={"Dự Án"} data={Duan} />
            <Button>
              <TextLink>Khuyến mãi</TextLink>
            </Button>
            <Button>
              <Link
                href={"https://tnrvietnam.com.vn/sites/tnr/tin-tuc/"}
                passHref
              >
                <TextLink target={"_blank"}>Tin tức</TextLink>
              </Link>
            </Button>
          </div>
        </WrapMenuItem>
        <WrapRightItem>
          <ButtonBuyHelp
            onClick={() => {
              Router.push({ pathname: PathRoute.BuyingGuide });
            }}
          >
            <span>Hướng dẫn mua online</span>
          </ButtonBuyHelp>
          <IconAccountWrap>
            <span
              onClick={() => {
                Router.push({ pathname: PathRoute.Profile });
              }}
            >
              <IconUser />
            </span>
            <IconHeart />
            <IconBag total={10} />
          </IconAccountWrap>
        </WrapRightItem>
      </BodyContainer>
    </ContainerNavTop>
  );
};

export default HeaderBot;
