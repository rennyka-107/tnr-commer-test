import FlexContainer from "@components/CustomComponent/FlexContainer";
import PaginationComponent from "@components/CustomComponent/PaginationComponent";
import Row from "@components/CustomComponent/Row";
import styled from "@emotion/styled";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { BodyListProjectI } from "@service/ProjectList";
import useProjectList from "hooks/useProjectList";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Container from "@components/Container";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useRouter } from "next/router";
import isEmpty from "lodash.isempty";
import LoadingComponent from "@components/LoadingComponent";
import ContainerProjectTypePage from "@components/Container/ContainerProjectTypePage";
import NoProductComponent from "@components/CustomComponent/NoProductComponent";
import NoProjectComponent from "@components/CustomComponent/NoProductComponent/NoProjectComponent";
export interface ProjectInforI {
  id: string;
  category: string;
  name: string;
  location: string;
  constructArea: number | null;
  density: number | null;
  type: string;
  scale: string;
  funcDivision: string;
  ownership: string;
  description: string;
  avatar: string;
  tongBanGhi: number;
}

const DynamicFilter = dynamic(() =>
  import("./filter").then(
    (m) => m.default,
    (e) => null as never
  )
);

const DynamicProductCard = dynamic(() =>
  import("./ProjectCard").then(
    (m) => m.default,
    (e) => null as never
  )
);

const ContainerProduct = styled.div`
  display: flex;
  justify-content: center;
`;
const NumberTotalStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
`;
const TextTotalSeach = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #8190a7;
`;
const ProjectPages = () => {
  const router = useRouter();
  const { type } = router.query;
  const {
    data,
    error,
    loading,
    changePageNumber,
    totalPage,
    changeBody,
    body,
    totalElement,
    params,
  } = useProjectList();

  const [titleData, setTitleData] = useState<string>("");

  const { listMenuBarType, listMenuBarProjectType } = useSelector(
    (state: RootState) => state.menubar
  );

  const onSubmit = (values: BodyListProjectI) => {
    changeBody({
      projectTypeId: values.projectTypeId !== "undefined" ? values.projectTypeId : [],
      provinceId: values.provinceId,
      textSearch: values.textSearch,
    });
  };
  useEffect(() => {
    const items = listMenuBarProjectType.find(
      (item) => item.id === body?.projectTypeId
    );
    setTitleData(items?.name);
  }, [body, type, listMenuBarProjectType]);

  const fetchComponent = () => {
    return (
      <>
        {loading === true ? (
          <>
            <div style={{ textAlign: "center", marginTop: 300 }}>
              <LoadingComponent />
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                marginBottom: 21,
                marginLeft: 10,
              }}
            >
              <NumberTotalStyled>{totalElement}</NumberTotalStyled>
              <TextTotalSeach>Sản phẩm phù hợp kết quả tìm kiếm</TextTotalSeach>
            </div>
            <Grid container spacing={6} style={{ paddingLeft: 0 }}>
              {data?.map((el, index) => (
                <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
                  <ContainerProduct>
                    <DynamicProductCard
                      id={el.id}
                      el={el}
                      src={el.avatar}
                      title={el?.name}
                      subTitle={el?.location}
                      ticketCard={el?.category}
                      description={el?.description}
                    />
                  </ContainerProduct>
                </Grid>
              ))}
            </Grid>
            <Row customStyle={{ marginTop: 84, justifyContent: "center" }}>
              <PaginationComponent
                count={totalPage}
                onChange={(event, page) => {
                  changePageNumber(page - 1);
                }}
                page={params.pageNumber + 1}
              />
            </Row>
            {/* </ContainerProjectTypePage> */}
          </>
        )}
      </>
    );
  };
  useEffect(() => {
    // if (!isEmpty(listMenuBarType)) {
    fetchComponent();
    // }
  }, [loading, listMenuBarType]);

  return (
    <FlexContainer>
      <ContainerProjectTypePage
        title={titleData}
        rightContent={<DynamicFilter onSubmit={onSubmit} body={body} />}
      >
        {!isEmpty(data) ? (
          <> {fetchComponent()}</>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <NumberTotalStyled>0</NumberTotalStyled>
              <TextTotalSeach>Sản phẩm phù hợp kết quả tìm kiếm</TextTotalSeach>
            </div>
            <NoProjectComponent />
          </>
        )}
      </ContainerProjectTypePage>
    </FlexContainer>
  );
};

export default ProjectPages;
