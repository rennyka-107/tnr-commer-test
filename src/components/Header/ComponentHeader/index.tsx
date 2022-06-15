import SelectSearchInputComponent from "@components/CustomComponent/SelectInputComponent/SelectSearchInputComponent";
import { SEOProps } from "@components/SEO";
import { FormControl, TextField } from "@mui/material";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getListLocation,
  getListMenuBarProject,
  getListMenuBarProjectTypeApi,
} from "../../../../pages/api/menuBarApi";
import {
  getListMenuBarProjectType,
  getListMenuBarType,
  getListMenuLocation,
} from "../../../../store/menuBarSlice";
import { RootState } from "../../../../store/store";
import HeaderBot from "./HeaderBot";
import HeaderTop from "./HeaderTop";
import HeaderNavSearch from "./HedaerNavSearch";


const Header = () => {
  const dispatch = useDispatch();
  const { listMenuBarType, listMenuBarProjectType,listMenuLocation } = useSelector(
    (state: RootState) => state.menubar
  );

  useEffect(() => {
    (async () => {
      try {
        const responseList: any = await getListMenuBarProjectTypeApi();
        const res: any = await getListMenuBarProject();
		const reslocation: any = await getListLocation();
        dispatch(getListMenuBarProjectType(responseList.responseData));
        dispatch(getListMenuBarType(res.responseData));
		dispatch(getListMenuLocation(reslocation.responseData));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  return (
    <div style={{ position: "fixed", width: "100%", zIndex: 1000 }}>
      <HeaderTop />
      <HeaderBot
        menuDataProject={listMenuBarProjectType}
        menuData={listMenuBarType}
      />
      {/* {meta?.isSearchPage && <HeaderNavSearch />} */}
    </div>
  );
};

export default Header;
