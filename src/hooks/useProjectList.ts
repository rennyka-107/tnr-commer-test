import { useEffect, useState } from "react";
import {
  BodyListProjectI,
  getListProjectTNR,
  ParamsListProjectI,
} from "@service/ProjectList";
import { useRouter } from "next/router";
import isEmpty from "lodash.isempty";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const useProjectList = () => {
  const router = useRouter();
  const { type } = router.query;
  const { listMenuBarType } = useSelector((state: RootState) => state.menubar);

  const [data, setData] = useState<any[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [totalPage, setTotalPage] = useState(0);
  const [totalElement, setTotalElement] = useState(0);
  const [body, setBody] = useState<BodyListProjectI>({
    projectTypeId: type,
  });
  const [params, setParams] = useState<ParamsListProjectI>({
    pageNumber: 0,
    pageSize: 10,
  });

  const changePageNumber = (pageNumber: number) => {
    setParams({ ...params, pageNumber: pageNumber });
  };

  const changeBody = (values: BodyListProjectI) => {
    setBody({ ...values });
    setParams({ pageNumber: 0, pageSize: 10 });
  };

  useEffect(() => {
    {
      !isEmpty(router.query);
    }
    {
      setBody({ ...body});
      setParams({ pageNumber: 0, pageSize: 10 });
    }
  }, [type]);

  useEffect(() => {
    // if (!body) return;
	console.log("run")
    if (typeof window !== "undefined") {

      const listProvince = localStorage?.getItem("listParamsLSProvince");
      const listProjectType = localStorage?.getItem("listParamsLSProjectType");
      const dataParams = {
        ...body,
        provinceIdList: listProvince ? JSON.parse(listProvince) : [],
        projectTypeIdList: listProjectType ? JSON.parse(listProjectType) : [],
      };
      const fetch = async () => {
        setLoading(true);
        // if (!isEmpty(listMenuBarType)) {
          try {
            // if (typeof body.projectTypeId === "string") {
			// 	console.log("leftRun")
              const res = await getListProjectTNR(params, dataParams);
              setData(res?.responseData);
              setTotalElement(res.totalElement);
              let count = 0;
              if (res?.responseData.length > 0) {
                count =
                  Number(res?.responseData?.[0].tongBanGhi) / params.pageSize;
              }
              setTotalPage(Math.ceil(count));
              if (res?.responseCode === "00") {
                setLoading(false);
              }
            // }
          } catch (error) {
            setError(error?.response);
          }
        // }
      };
      fetch();
    }
  }, [body]);

  return {
    data,
    loading,
    error,
    changePageNumber,
    totalPage,
    changeBody,
    body,
    totalElement,
    params,
  };
};

export default useProjectList;
