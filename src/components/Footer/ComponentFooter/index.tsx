import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getListMenuBarProjectTypeApi } from "../../../../pages/api/menuBarApi";
import { getListUserManualApi } from "../../../../pages/api/userManualApi";
import { getListMenuBarProjectType } from "../../../../store/menuBarSlice";
import { RootState } from "../../../../store/store";
import { getListUserManual } from "../../../../store/userManualSlice";
import FooterBot from "./FooterBot";
import FooterTop from "./FooterTop";

const Footer = () => {
	const dispatch = useDispatch();
  const {  listMenuBarProjectType } = useSelector(
    (state: RootState) => state.menubar
  );
  const { listUserManual } = useSelector(
    (state: RootState) => state.userManual  );
	const menuBarProjectType = listMenuBarProjectType?.filter(
		(item) => item.id !== "1"
	  );
  useEffect(() => {
    (async () => {
      try {
        // const responseList: any = await getListMenuBarProjectTypeApi();
		const response = await getListUserManualApi();
        // dispatch(getListMenuBarProjectType(responseList.responseData));
		dispatch(getListUserManual(response.responseData));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);
  return (
    <>
      <FooterTop />
      <FooterBot listMenuBarProjectType={menuBarProjectType} listUserManual={listUserManual}/>
    </>
  );
};
// export const getServerSideProps = wrapper.getServerSideProps(
// 	(store) => async () => {
// 	  try {
// 		const response = await getListUserManualApi();
// 		store.dispatch(getListUserManual(response.responseData));
// 	  } catch (err) {
// 		console.log(err);
// 	  }
// 	  return {
// 		props: {},
// 	  };
// 	}
//   );
export default Footer;
