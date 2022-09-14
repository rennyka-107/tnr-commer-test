import ContainerProduct from "@components/Container/ContainerProduct";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import Page from "@layouts/Page";
import { Box } from "@mui/system";
import useProjectRecenly from "hooks/useProjectRecenly";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getRecentlyViewed } from "../api/productsApi";

interface ListRecentlyViewProps {}

const DynamicItemProductComponent = dynamic(
  () => import("@components/LayoutProduct/ItemProduct"),
  { loading: () => <p>...</p> }
);

const ListProjectRecently: FC<ListRecentlyViewProps> = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const [paramsSearch, setParamsSearch] = useState({
    page: 0,
    size: 12,
  });
  // const { dataProductRecenly }: any = useProjectRecenly();
  const [recentlyByProjectId, setRecentlyByProjectId] = useState<any>([]);

  const changePage = (e: any) => {
    setParamsSearch({
      page: e,
      size: 12,
    });
  };

  useEffect(() => {
    if (!query.projectId) return;
    getRecentlyViewed(
      {
        page: 0,
        size: 1000,
      },
      {
        projectId: query.projectId,
      }
    ).then((res) => {
      console.log("ressss", res);
      setRecentlyByProjectId(res?.responseData?.content);
    });
  }, [query]);

  return (
    <Page
      meta={{
        title: "TNR Ecommerce Product",
        description: "TNR Ecommerce Product",
      }}
    >
      <Box sx={{ mt: 4 }}>
        <FlexContainer>
          <ContainerProduct title={`${query.title}`} rightContent={<></>}>
            <DynamicItemProductComponent data={recentlyByProjectId} />
          </ContainerProduct>
        </FlexContainer>
      </Box>
    </Page>
  );
};

export default ListProjectRecently;
