import ContainerProduct from "@components/Container/ContainerProduct";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import Page from "@layouts/Page";
import { Box } from "@mui/system";
import useProjectRecenly from "hooks/useProjectRecenly";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";

interface ListRecentlyViewProps {}

const DynamicItemProductComponent = dynamic(
  () => import("@components/LayoutProduct/ItemProduct"),
  { loading: () => <p>...</p> }
);

const ListRecentlyView: FC<ListRecentlyViewProps> = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [paramsSearch, setParamsSearch] = useState({
    page: 0,
    size: 12,
  });
  const { dataProductRecenly }: any = useProjectRecenly();

  const changePage = (e: any) => {
    setParamsSearch({
      page: e,
      size: 12,
    });
  };

  console.log("dataProductRecenly", dataProductRecenly);

  // const pageNumber = Math.ceil(totalElement / paramsSearch.size);

  return (
    <Page
      meta={{
        title: "TNR Ecommerce Product",
        description: "TNR Ecommerce Product",
      }}
    >
      <Box sx={{ mt: 4 }}>
        <FlexContainer>
          <ContainerProduct title="BĐS xem gần đây" rightContent={<></>}>
            <DynamicItemProductComponent data={dataProductRecenly} />
          </ContainerProduct>
        </FlexContainer>
      </Box>
    </Page>
  );
};

export default ListRecentlyView;
