import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListMenuBarProject, getListMenuBarProjectTypeApi } from "../../../../pages/api/menuBarApi";
import { getListMenuBarProjectType } from "../../../../store/menuBarSlice";
import { RootState } from "../../../../store/store";
import FooterBot from "./FooterBot";
import FooterTop from "./FooterTop";

const Footer = () => {
	const dispatch = useDispatch();
  const {  listMenuBarProjectType } = useSelector(
    (state: RootState) => state.menubar
  );


  useEffect(() => {
    (async () => {
      try {
        const responseList: any = await getListMenuBarProjectTypeApi();
        dispatch(getListMenuBarProjectType(responseList.responseData));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);
  return (
    <>
      <FooterTop />
      <FooterBot listMenuBarProjectType={listMenuBarProjectType} />
    </>
  );
};

export default Footer;
