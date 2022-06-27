import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BodyListProductI, ParamsListProductI } from "@service/ProductList";
import { searchListProductByProjectIdApi } from "../../pages/api/productsApi";
import isEmpty from "lodash/isEmpty";

const useProductList = () => {
  const Router = useRouter();
  const { projectTypeId, provinceId } = Router.query;

  const [data, setData] = useState<any[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [totalPage, setTotalPage] = useState(0);
  const [body, setBody] = useState<BodyListProductI>({
    projectTypeId: projectTypeId,
    provinceId: provinceId,
  });
  const [params, setParams] = useState<ParamsListProductI>({
    page: 0,
    size: 12,
  });

  const changePageNumber = (page: number) => {
    setParams({ ...params, page: page });
  };

  const changeBody = (values: BodyListProductI) => {
    setBody({ ...values });
    setParams({ page: 0, size: 12 });
  };

  useEffect(() => {
    if (!isEmpty(Router.query) && Router.isReady === true) {
      setBody({
        ...body,
        projectTypeId: (projectTypeId as string) ?? "",
        provinceId: provinceId,
      });

      setParams({ page: 0, size: 12 });
    }
  }, [projectTypeId, provinceId]);

  useEffect(() => {
    if (!body) return;
    const fetch = async () => {
      setLoading(true);

      try {
        if (provinceId || projectTypeId) {
          const res = await searchListProductByProjectIdApi(params, body);
          setData(res.responseData);
          let count = 0;
          if (res.responseData.length > 0) {
            count = Number(res.responseData?.[0].tongBanGhi) / params.size;
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
  }, [params]);

  return {
    data,
    loading,
    error,
    changePageNumber,
    totalPage,
    changeBody,
    body,
    params,
    setBody,
  };
};

export default useProductList;
