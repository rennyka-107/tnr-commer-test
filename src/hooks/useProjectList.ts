import { useEffect, useState } from "react";
import { BodyListProjectI, getListProjectTNR, ParamsListProjectI } from "@service/ProjectList"
import { useRouter } from "next/router";

const useProjectList = () => {
    const { type } = useRouter().query;
    const [data, setData] = useState<any[]>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [totalPage, setTotalPage] = useState(0);
    const [body, setBody] = useState<BodyListProjectI>()
    const [params, setParams] = useState<ParamsListProjectI>({
        pageNumber: 0,
        pageSize: 10
    })

    const changePageNumber = (pageNumber: number) => {
        setParams({ ...params, pageNumber: pageNumber });
    }

    const changeBody = (values: BodyListProjectI) => {
        setBody({ ...values });
        setParams({ pageNumber: 1, pageSize: 10 });
    }

    useEffect(() => {
        setBody({ ...body, projectTypeId: type as string ?? '' });
        setParams({ pageNumber: 1, pageSize: 10 });

    }, [type])

    useEffect(() => {
        if (!body) return;
        const fetch = async () => {
            setLoading(true);
            try {
                const res = await getListProjectTNR(params, body);
                setData(res?.responseData);
                let count = 0;
                if (res?.responseData.length > 0) {
                    count = (Number(res?.responseData?.[0].tongBanGhi)) / params.pageSize
                }
                setTotalPage(Math.ceil(count));
            } catch (error) {
                setError(error?.response)
            } finally {
                setLoading(false);
            }
        }
        fetch();
    }, [params])

    return { data, loading, error, changePageNumber, totalPage, changeBody, body, params }
}

export default useProjectList;