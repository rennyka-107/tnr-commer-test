import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListMenuBarProject,
  getListMenuBarProjectTypeApi,
} from "../../../../pages/api/menuBarApi";
import {
  getListMenuBarProjectType,
  getListMenuBarType,
} from "../../../../store/menuBarSlice";
import { RootState } from "../../../../store/store";
import HeaderBot from "./HeaderBot";
import HeaderTop from "./HeaderTop";


const Header = (props) => {
  const dispatch = useDispatch();
  const { listMenuBarType, listMenuBarProjectType } = useSelector(
    (state: RootState) => state.menubar
  );

  useEffect(() => {
    (async () => {
      try {
        const responseList: any = await getListMenuBarProjectTypeApi();
        const res: any = await getListMenuBarProject();
        dispatch(getListMenuBarProjectType(responseList.responseData));
        dispatch(getListMenuBarType(res.responseData));
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
    </div>
  );
};

export default Header;
