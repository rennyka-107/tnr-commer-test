import React, { useEffect, useState } from "react";
import { IconBag, IconHeart, IconUser, Logo } from "@components/Icons";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import useAuth from "hooks/useAuth";
import MenuDropdown from "ItemComponents/MenuDropdown";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import PathRoute from "utils/PathRoute";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import isEmpty from "lodash.isempty";
import {
  setShortcut,
  shortcut,
  typeShortcut,
} from "../../../../store/shortcut";

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
  const [checkSale, setCheckSale] = useState(false);
  const { cart } = useSelector((state: RootState) => state.carts);
  const { title, typeAction } = useSelector(
    (state: RootState) => state?.shortcut
  );

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
    setCheckSale(true);
    if (Router.pathname === "/") {
      const mainRoot = document.getElementById("uu-dai");
      if (mainRoot) {
        mainRoot.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        return;
      }
    } else {
      Router.replace(`/sales`);
    }
  };

  const handleScrollHuongDan = () => {
    if (Router.pathname === "/") {
      const mainRoot = document.getElementById("huongdan-online");
      if (mainRoot) {
        mainRoot.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        return;
      }
    } else {
      Router.replace(
        `/buyingGuide?idUserManual=3e63c59e-7995-4f8b-b553-740d131a052f&&selected=0`
      );
    }
  };

  const pressShortcut = (type: typeShortcut) => {
    switch (type) {
      case "BANG_HANG":
        Router.replace('/productTable');
        break;
      case "HUONG_DAN_OL":
        handleScrollHuongDan()
        break;

      default:
        break;
    }
  };

  return (
    <ContainerNavTop>
      <BodyContainer>
        <WrapMenuItem>
          <Link href="/">
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
                // Router.replace(`/products?idProject=${item.id}`);
                Router.replace(`/project-detail/${item.id}`);
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
          <ButtonBuyHelp onClick={() => pressShortcut(typeAction)}>
            <span>{title}</span>
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
            <Link href="/favorite-products">
              <a>
                <IconHeart />
              </a>
            </Link>
            <Link href="/payment-cart">
              <a>
                <IconBag total={!isEmpty(cart) ? 1 : 0} />
              </a>
            </Link>
          </IconAccountWrap>
        </WrapRightItem>
      </BodyContainer>
    </ContainerNavTop>
  );
};

export default HeaderBot;
