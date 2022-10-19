import React, { Fragment, useEffect, useState } from "react";
import {
  CloseIcon,
  IconBag,
  IconHeart,
  IconUser,
  Logo,
  MenuIcon,
} from "@components/Icons";
import styled from "@emotion/styled";
import { Button, Skeleton, useMediaQuery } from "@mui/material";
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
import { getListFavourite } from "../../../../pages/api/FavouriteApi";
import LocalStorage from "utils/LocalStorage";
import SessionStorage from "utils/SessionStorage";
import DrawerMobile from "./DrawerMobile";
import {
  HeaderContainer,
  ButtonBuyHelp,
  ContainerNavTop,
  IconAccountWrap,
  ResponsiveLayout,
  TextLink,
  WrapMenuItem,
  WrapRightItem,
  ContentLeftHeader,
} from "./styled";
import { MenuMoblie } from "./MenuMoblie/MenuMoblie";

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

  const matches = useMediaQuery("(max-width:1110px)");
  const [checkSale, setCheckSale] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { cart } = useSelector((state: RootState) => state.carts);
  const [listFavourite, setListFavourite] = useState<any>();
  const { title, typeAction } = useSelector(
    (state: RootState) => state?.shortcut
  );
  const userToken = LocalStorage.get("accessToken");

  const { checkUp } = useSelector((state: RootState) => state.favourites);
  const fetchFavourite = async () => {
    try {
      const response: any = await getListFavourite();

      setListFavourite(response.responseData);
    } catch (error) {}
  };

  useEffect(() => {
    if (LocalStorage.get("accessToken") || SessionStorage.get("accessToken")) {
      fetchFavourite();
    }
  }, [checkUp]);

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
    // setCheckSale(true);
    // if (Router.pathname === "/") {
    //   const mainRoot = document.getElementById("uu-dai");
    //   if (mainRoot) {
    //     mainRoot.scrollIntoView({ behavior: "smooth", block: "center" });
    //   } else {
    //     return;
    //   }
    // } else {
    //   Router.replace(`/sales`);
    // }
    Router.push("/sales");
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

  const handleSelectTypeProject = (data: any) => {
    const arr: any = [];
    arr.push(data.id);

    localStorage.setItem("listParamsLSProjectType", JSON.stringify(arr));
    localStorage.removeItem("listDataLSProvince");
    localStorage.removeItem("listParamsLSProvince");
    Router.push(`/${PathRoute.ProjectTNR}?type=${data.id}`);
  };

  const handleToggleMenuMoblie = () => {
    setIsOpenMenu(!isOpenMenu);
  };
  const pressShortcut = (type: typeShortcut) => {
    switch (type) {
      case "BANG_HANG":
        Router.replace("/productTable");
        break;
      case "HUONG_DAN_OL":
        handleScrollHuongDan();
        break;

      default:
        break;
    }
  };
  const fetchListDropdown = () => {
    return (
      <ContentLeftHeader>
        {!isEmpty(menuDataProject) ? (
          <MenuDropdown
            title={"Loại bất động sản"}
            data={menuDataProject}
            onSelect={(item) => {
              handleSelectTypeProject(item);
            }}
          />
        ) : (
          <Skeleton
            animation="wave"
            style={{ width: 200, height: 42, opacity: "40%" }}
          />
        )}
        {!isEmpty(menuData) ? (
          <MenuDropdown
	
            title={"Dự án"}
            data={menuData}
            onSelect={(item) => {
              // Router.replace(`/products?idProject=${item.id}`);
              Router.replace(`/project-detail/${item.id}`);
            }}
          />
        ) : (
          <Skeleton
            animation="wave"
            style={{ width: 111, height: 42, opacity: "40%" }}
          />
        )}
        {!isEmpty(menuDataProject) ? (
          <Button onClick={() => scrollView()}>
            <TextLink>Khuyến mãi</TextLink>
          </Button>
        ) : (
          <Skeleton
            animation="wave"
            style={{ width: 111, height: 42, opacity: "40%" }}
          />
        )}
        {!isEmpty(menuDataProject) ? (
          <Button>
            <Link
              href={"https://tnrvietnam.com.vn/sites/tnr/tin-tuc/"}
              passHref
            >
              <TextLink target={"_blank"}>Tin tức</TextLink>
            </Link>
          </Button>
        ) : (
          <Skeleton
            animation="wave"
            style={{ width: 111, height: 42, opacity: "40%" }}
          />
        )}
      </ContentLeftHeader>
    );
  };

  return (
    <Fragment>
      <ContainerNavTop>
        <ResponsiveLayout>
          <HeaderContainer>
            <WrapMenuItem>
              <Link href="/">
                <a>
                  <Logo />
                </a>
              </Link>
              {fetchListDropdown()}
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
                {userToken !== null ? (
                  <>
                    <MenuDropdown
                      customButton={
                        <IconUser />
                        // <span
                        //   onClick={() => {
                        //     Router.push({ pathname: PathRoute.Profile });
                        //   }}
                        // >
                        //   <IconUser />
                        // </span>
                      }
                      data={menuUser}
                      title=""
                      onSelect={handleNavigateUser}
                    />
                  </>
                ) : (
                  <>
                    <MenuDropdown
					 customButton={
                        // <IconUser />
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
                  </>
                )}

                <Link href="/favorite-products">
                  <a>
                    <IconHeart total={listFavourite?.numberOfElements} />
                  </a>
                </Link>
                <Link href="/payment-cart">
                  <a>
                    <IconBag total={!isEmpty(cart) ? 1 : 0} />
                  </a>
                </Link>
                <div onClick={handleToggleMenuMoblie} className="menu-icon">
                  {isOpenMenu ? <CloseIcon /> : <MenuIcon />}
                </div>
              </IconAccountWrap>
            </WrapRightItem>
          </HeaderContainer>
        </ResponsiveLayout>
      </ContainerNavTop>
      {isOpenMenu && <MenuMoblie onSelect={handleSelectTypeProject} />}
    </Fragment>
  );
};

export default HeaderBot;
