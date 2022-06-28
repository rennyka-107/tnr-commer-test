import { useEffect, useState } from "react";
import {
  BodyListProjectI,
  getListProjectTNR,
  ParamsListProjectI,
} from "@service/ProjectList";
import { useRouter } from "next/router";
import isEmpty from "lodash.isempty";

const useProjectList = () => {
  const router = useRouter();
  const { type } = router.query;
  const [data, setData] = useState<any[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [totalPage, setTotalPage] = useState(0);
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
      setBody({ ...body, projectTypeId: type });
      setParams({ pageNumber: 0, pageSize: 10 });
    }
  }, [type]);

  useEffect(() => {
    if (!body) return;
    const fetch = async () => {
      setLoading(true);

      try {
        if (type && typeof body.projectTypeId !== undefined) {
          const res = await getListProjectTNR(params, body);
          setData(res?.responseData);
          let count = 0;
          if (res?.responseData.length > 0) {
            count = Number(res?.responseData?.[0].tongBanGhi) / params.pageSize;
          }
          setTotalPage(Math.ceil(count));
        }
      } catch (error) {
        setError(error?.response);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [body]);

  return {
    data,
    loading,
    error,
    changePageNumber,
    totalPage,
    changeBody,
    body,
    params,
  };
};

export default useProjectList;
