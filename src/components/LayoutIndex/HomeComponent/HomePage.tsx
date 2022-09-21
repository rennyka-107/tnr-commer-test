import styled from "@emotion/styled";
import { Box } from "@mui/system";
import SelectInputComponent from "@components/CustomComponent/SelectInputComponent";
import { Button, SelectChangeEvent, Stack, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SliderComponent from "@components/CustomComponent/SliderComponent";
import SliderSearchKhoangGia from "@components/CustomComponent/SliderComponent/SliderSearchKhoangGia";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { getProjectByType } from "../../../../pages/api/projectApi";
import { isEmpty } from "lodash";
import {
  IconDecorHome,
  IconDecorHome2,
  IconDecorHome3,
} from "@components/Icons";
import useProjectRecenly from "hooks/useProjectRecenly";

const DynamicBanner = dynamic(() => import("./BannerIndex"), {
  loading: () => <p>...</p>,
});
const DynamicBody = dynamic(() => import("./BodyIndex"), {
  loading: () => <p>...</p>,
  ssr: false,
});
const DynamicSliderShowComponent = dynamic(
  () => import("@components/CustomComponent/SliderShowComponent"),
  { loading: () => <p>...</p>, ssr: false }
);
const DynamicOnlineSupportSale = dynamic(() => import("./OnlineSupportSale"), {
  loading: () => <p>...</p>,
  ssr: false,
});
const DynamicSlider3dShowBottom = dynamic(
  () => import("./Slider3dShowBottom"),
  { loading: () => <p>...</p>, ssr: false }
);

const SaleWrap = styled.div`
  background: #1b3459;
  height: 416px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TitleSlide = styled.div`
  margin-bottom: 20px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 33px;
  /* identical to box height */

  /* Brand/Text */

  color: #ffffff;
`;
const CompareSwap = styled.div`
  background: #1b3459;
  height: 435px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  flex-direction: row;
  @media only screen and (max-width: 1110px) {
	height: 484px;
  }
`;
const BoxStyled = styled(Box)`
padding: 40px;
    display: flex;
    gap: 30px;
}
`;
const minDistance = 10;
const minDistance2 = 1;

const HomePage = () => {
  const router = useRouter();
  const matches = useMediaQuery('(max-width:1110px)');
  const [projectTypeName, setProjectTypeName] = useState<string[]>([]);
  const [categoryName, setCategoryName] = useState<string[]>([]);
  const [projectName, setProjectName] = useState<string[]>([]);
  const [valueDienTich, setValueDientich] = useState<number[]>([0, 1000]);
  const [valueKhoanGia, setValueKhoangGia] = useState<number[]>([0, 50]);
  const [projectList, setProjectList] = useState<any[]>([]);
  const [listParamsProjectType, setParamsProjectType] = useState<any[]>([]);
  const [listIdProject, setListIdProject] = useState([]);
  const [listDataLSProject, setListDataLSProject] = useState([]);
  const [listDataLSProjectType, setListDataLSProjectType] = useState([]);
  const [saveDataProjectType, setSaveDataProjectType] = useState([]);
  const [saveDataProject, setSaveDataProject] = useState([]);
  const { dataProductRecenly } = useProjectRecenly();

  const [filterSearch, setFilterSearch] = useState({
    textSearch: "",
    provinceId: "",
    projectTypeId: "",
    projectId: "",
    priceFrom: "0",
    priceTo: "50",
    categoryId: "",
    areaFrom: "0",
    areaTo: "1000",
  });

  const { listMenuBarProjectType } = useSelector(
    (state: RootState) => state.menubar
  );

  const fetchProjectByType = async (typeId: string) => {
    const body = {
      projectTypeIdList: [typeId],
    };
    try {
      const res = await getProjectByType(body);
      if (res.responseCode === "00") {
        setProjectList(res.responseData);
        setSaveDataProject(res.responseData);
        if (res.responseData.length > 0) {
          setProjectName(res.responseData[0].name.split(","));

          setFilterSearch({
            ...filterSearch,
            projectId: res.responseData[0].id,
            projectTypeId: typeId,
          });
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  useEffect(() => {
    if (listMenuBarProjectType?.length > 0) {
      setProjectTypeName(listMenuBarProjectType[0].name.split(","));
      saveDataProjectType.push(listMenuBarProjectType[0]);
      fetchProjectByType(listMenuBarProjectType[0].id);
    }
  }, [listMenuBarProjectType, router]);

  useEffect(() => {
    if (!isEmpty(saveDataProjectType)) {
      setParamsProjectType([saveDataProjectType[0].id]);
      setListDataLSProjectType([saveDataProjectType[0]]);
    }
  }, [saveDataProjectType, listMenuBarProjectType]);

  useEffect(() => {
    if (!isEmpty(saveDataProject)) {
      setListIdProject([saveDataProject[0].id]);
      setListDataLSProject([saveDataProject[0]]);
    }
  }, [saveDataProject, router, listMenuBarProjectType]);
  //   useEffect(() => {
  //     if (router.pathname !== "/") {
  //       listParamsProjectType.push(listMenuBarProjectType[0].id);
  //       listDataLSProjectType.push(listMenuBarProjectType[0]);
  //     }
  //   }, [router]);

  const handleSelectProject = (
    event: SelectChangeEvent<typeof projectTypeName>
  ) => {
    const {
      target: { value },
    } = event;
    const data = listMenuBarProjectType.filter((x) => x.name === value);
    setProjectTypeName(typeof value === "string" ? value.split(",") : value);

    setParamsProjectType([data[0].id]);
    setListDataLSProjectType([data[0]]);
    // setFilterSearch({ ...filterSearch, projectTypeId: data[0].id });
    fetchProjectByType(data[0].id);
  };

  const handleSelectProjectName = (
    event: SelectChangeEvent<typeof projectName>
  ) => {
    const {
      target: { value },
    } = event;
    const data = projectList.filter((x) => x.name === value);
    setListIdProject([data[0].id]);
    setListDataLSProject([data[0]]);
    setProjectName(typeof value === "string" ? value.split(",") : value);
    setFilterSearch({ ...filterSearch, projectId: data[0].id });
  };

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    setValueDientich([newValue[0], newValue[1]]);
    setFilterSearch({
      ...filterSearch,
      areaFrom: newValue[0].toString(),
      areaTo: newValue[1].toString(),
    });
  };

  const handleChange2 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    setValueKhoangGia([newValue[0], newValue[1]]);
    setFilterSearch({
      ...filterSearch,
      priceFrom: newValue[0].toString(),
      priceTo: newValue[1].toString(),
    });
  };

  const handleSearchCompare = () => {
    localStorage.setItem(
      "listDataLSProjectType",
      JSON.stringify(listDataLSProjectType)
    );
    localStorage.setItem(
      "listParamsLSProjectType",
      JSON.stringify(listParamsProjectType)
    );
    localStorage.setItem(
      "listDataLSProject",
      JSON.stringify(listDataLSProject)
    );
    localStorage.setItem("listParamsIdProject", JSON.stringify(listIdProject));

    router.push(
      `/compare-search?priceTo=${filterSearch.priceTo}&priceFrom=${filterSearch.priceFrom}&areaTo=${filterSearch.areaTo}&areaFrom=${filterSearch.areaFrom}&categoryId=${filterSearch.categoryId}`
    );
  };

  return (
    <>
      <DynamicBanner />
      <div style={{ padding: 88 }}>
        <DynamicBody />
      </div>

      <SaleWrap id="uu-dai">
        <TitleSlide>CHƯƠNG TRÌNH ƯU ĐÃI</TitleSlide>
        <DynamicSliderShowComponent />
      </SaleWrap>
      <div style={{ position: "relative", padding: 88 }}>
        <div
          style={{ position: "absolute", top: 9, right: "15%", zIndex: "-1" }}
        >
          <IconDecorHome />
        </div>
        <DynamicOnlineSupportSale />
        <div
          style={{
            position: "absolute",
            bottom: 36,
            left: "18%",
            zIndex: "-1",
          }}
        >
          <IconDecorHome2 />
        </div>
      </div>
      <CompareSwap>
        <Stack direction={"column"}>
          <Typography
            style={{
              fontWeight: 500,
              fontSize: 28,
              color: "#ffffff",
              margin: matches ? "45px 5px 0px 5px" : "45px 5px 18px 5px",
            }}
          >
            SO SÁNH
          </Typography>
          <Stack direction={matches ? "column" : "row"} spacing={5}>
            <Stack direction={"column"}>
              <BoxStyled sx={{ minWidth: 120, padding: "0px !important" }}>
                <SelectInputComponent
                  label="Loại bất động sản"
                  data={listMenuBarProjectType}
                  value={projectTypeName}
                  onChange={handleSelectProject}
                  placeholder="Chọn loại bất động sản"
                  style={{ margin: 0 }}
                />
                <SelectInputComponent
                  label="Dự án"
                  data={projectList}
                  value={projectName}
                  onChange={handleSelectProjectName}
                  placeholder="Chọn dự án"
                />
              </BoxStyled>
              <div style={{ display: "flex", gap: 50, margin: '20px 20px 20px 10px' }}>
                <SliderComponent
                  label="Diện tích (m2)"
                  onChange={handleChange1}
                  numberMin={0}
                  numberMax={1000}
                  value={valueDienTich}
                  unit="m2"
                />
                <SliderSearchKhoangGia
                  label="Khoảng giá"
                  onChange={handleChange2}
                  numberMin={0}
                  numberMax={50}
                  value={valueKhoanGia}
                  unit="tỷ"
                />
              </div>
            </Stack>
            <Stack
              direction={matches ? "row" : "column"}
              style={{ maxWidth: matches ? 700 : 400, marginBottom: 55 }}
            >
              <Typography
                style={{
                  fontWeight: 400,
                  fontSize: 16,
                  color: "#ffffff",
                  margin: matches ? "30px 50px 28px 5px" : "30px 5px 28px 5px",
				  width: matches ? 300 : 'auto'
                }}
              >
                So sánh nhanh các sản phẩm theo tiêu chí lựa chọn của bạn giúp
                cho bạn dễ dàng chọn được sản phẩm ưng ý cho mình
              </Typography>
              <Button
                style={{
                  background: "#F2C94C",
                  height: 54,
                  width: 305,
                  marginTop: 10,
                  color: "#000000",
                  textTransform: "none",
                }}
                onClick={handleSearchCompare}
              >
                So sánh nhanh
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </CompareSwap>
      {!isEmpty(dataProductRecenly) ? (
        <>
          <div style={{ position: "relative", padding: 50 }}>
            <div
              style={{
                position: "absolute",
                top: "9%",
                right: "2%",
                zIndex: "-1",
              }}
            >
              <IconDecorHome3 />
            </div>
            <DynamicSlider3dShowBottom />
            <div
              style={{
                position: "absolute",
                bottom: "20%",
                left: "20%",
                zIndex: "-1",
              }}
            >
              <IconDecorHome2 />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default HomePage;
