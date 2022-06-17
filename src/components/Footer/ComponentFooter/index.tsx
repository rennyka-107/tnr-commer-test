import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListMenuBarProject, getListMenuBarProjectTypeApi } from "../../../../pages/api/menuBarApi";
import { getListUserManualApi } from "../../../../pages/api/userManualApi";
import { getListMenuBarProjectType } from "../../../../store/menuBarSlice";
import { RootState, wrapper } from "../../../../store/store";
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

  useEffect(() => {
    (async () => {
      try {
        const responseList: any = await getListMenuBarProjectTypeApi();
        dispatch(getListMenuBarProjectType(responseList.responseData));
		const response = await getListUserManualApi();
		dispatch(getListUserManual(response.responseData));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);
  return (
    <>
      <FooterTop />
      <FooterBot listMenuBarProjectType={listMenuBarProjectType} listUserManual={listUserManual}/>
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
