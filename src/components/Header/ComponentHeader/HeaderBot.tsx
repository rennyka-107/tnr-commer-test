import { IconBag, IconHeart, IconUser, Logo } from "@components/Icons";
import styled from "@emotion/styled";
import { Route } from "@mui/icons-material";
import { Button } from "@mui/material";
import useAuth from "hooks/useAuth";
import { useScroll } from "hooks/useScroll";
import MenuDropdown from "ItemComponents/MenuDropdown";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect } from "react";
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

const lbds = [
  {
    id: "1",
    name: "Chung cư",
  },
  {
    id: "2",
    name: "Căn hộ dịch vụ",
  },
  {
    id: "3",
    name: "Bất động sản nghỉ dưỡng",
  },
  {
    id: "4",
    name: "Khu đô thị",
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
interface ItemValueUserProps {
  id: number;
  value: string;
}

interface ItemValueProps {
  id: string;
  name: string;
}

interface MenuProps {
  menuData?: ItemValueProps[];
  menuDataProject?: ItemValueProps[];
}

const HeaderBot = ({ menuDataProject, menuData }: MenuProps) => {
  const Router = useRouter();

  const menuUser: ItemValueProps[] = [
    { id: "Profile", name: "Thông tin cá nhân" },
    { id: "logout", name: "Đăng xuất" },
  ];
  const { logout } = useAuth();

  const handleNavigateUser = useCallback((value: ItemValueProps) => {
    switch (value.id) {
      case "Profile":
        Router.push({ pathname: PathRoute.Profile });
        break;
      case "logout":
        logout();
        break;

      default:
        break;
    }
  }, []);
  const scrollView = () => {
    const mainRoot = document.getElementById("uu-dai");
    if (mainRoot) {
      mainRoot.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      return;
    }
  };
  const handleScrollHuongDan = () => {
    const mainRoot = document.getElementById("huongdan-online");
    if (mainRoot) {
      mainRoot.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      return;
    }
  };

  return (
    <ContainerNavTop>
      <BodyContainer>
        <WrapMenuItem>
          <Link href="https://tnre-customer-test.vercel.app">
            <a>
              <Logo />
            </a>
          </Link>
          <div style={{ display: "flex", gap: 35, marginLeft: 38 }}>
            <MenuDropdown
              title={"Loại bất động sản"}
              data={menuDataProject}
              onSelect={(item) => {
                Router.replace(`/${PathRoute.ProjectTNR}?type=${item.id}`);
              }}
            />
            <MenuDropdown
              title={"Dự Án"}
              data={menuData}
              onSelect={(item) => {
                Router.replace(`/products?idProject=${item.id}`);
              }}
            />
            <Button onClick={() => scrollView()}>
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
          <ButtonBuyHelp onClick={() => handleScrollHuongDan()}>
            <span>Hướng dẫn mua online</span>
          </ButtonBuyHelp>
          <IconAccountWrap>
            {/* <span
              onClick={() => {
                Router.push({ pathname: PathRoute.Profile });
              }}
            >
              <IconUser />
            </span> */}
            <MenuDropdown
              customButton={
                <span
                  onClick={() => {
                    Router.push({ pathname: PathRoute.Profile });
                  }}
                >
                  <IconUser />
                </span>
              }
              data={menuUser}
              title=""
              onSelect={handleNavigateUser}
            />
            <IconHeart />
            <Link href="/payment-cart">
              <a>
                <IconBag total={10} />
              </a>
            </Link>
          </IconAccountWrap>
        </WrapRightItem>
      </BodyContainer>
    </ContainerNavTop>
  );
};

export default HeaderBot;
