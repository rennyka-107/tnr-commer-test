import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListCategoryApi,
  getListLocation,
  getListMenuBarProject,
  getListMenuBarProjectTypeApi,
} from "../../../../pages/api/menuBarApi";
import {
  getListCategory,
  getListMenuBarProjectType,
  getListMenuBarType,
  getListMenuLocation,
} from "../../../../store/menuBarSlice";
import { RootState } from "../../../../store/store";
import HeaderBot from "./HeaderBot";
import HeaderTop from "./HeaderTop";
import styled from "@emotion/styled";

const Header = () => {
  const dispatch = useDispatch();
  const { listMenuBarType, listMenuBarProjectType } = useSelector(
    (state: RootState) => state.menubar
  );

  const menuBarProjectType = listMenuBarProjectType?.filter(
    (item) => item.id !== "1"
  );
  const menuBarType = listMenuBarType?.filter((item) => item.id !== "1");

  useEffect(() => {
    (async () => {
      try {
        const responseList: any = await getListMenuBarProjectTypeApi();
        const res: any = await getListMenuBarProject();
        const reslocation: any = await getListLocation();
        const responseCategory: any = await getListCategoryApi();

        dispatch(getListMenuBarProjectType(responseList.responseData));
        dispatch(getListMenuBarType(res.responseData));
        dispatch(getListMenuLocation(reslocation.responseData));
        // dispatch(getListMenuBarProjectFilter(res.responseData))
        dispatch(getListCategory(responseCategory.responseData));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);
  
  const HeaderWrapperStyled = styled.div`
  position: fixed;
  width: 100%;
  z-index: 1000;
  box-shadow: 0px -4px 20px 1px rgba(0, 0, 0, 0.15);
  `
  return (
    <HeaderWrapperStyled>
      <HeaderTop />
      <HeaderBot menuDataProject={menuBarProjectType} menuData={menuBarType} />
      {/* {meta?.isSearchPage && <HeaderNavSearch />} */}
    </HeaderWrapperStyled>
  );
};

export default Header;
