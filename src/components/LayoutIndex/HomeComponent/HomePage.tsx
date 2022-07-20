import styled from "@emotion/styled";
import { Box } from "@mui/system";
import SelectInputComponent from "@components/CustomComponent/SelectInputComponent";
import { Button, SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SliderComponent from "@components/CustomComponent/SliderComponent";
import SliderSearchKhoangGia from "@components/CustomComponent/SliderComponent/SliderSearchKhoangGia";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { getProjectByType } from "../../../../pages/api/projectApi";

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
  const [projectTypeName, setProjectTypeName] = useState<string[]>([]);
  const [categoryName, setCategoryName] = useState<string[]>([]);
  const [projectName, setProjectName] = useState<string[]>([]);
  const [valueDienTich, setValueDientich] = useState<number[]>([30, 200]);
  const [valueKhoanGia, setValueKhoangGia] = useState<number[]>([1, 20]);
  const [projectList, setProjectList] = useState<any[]>([]);

  const [filterSearch, setFilterSearch] = useState({
    textSearch: "",
    provinceId: "",
    projectTypeId: "",
    projectId: "",
    priceFrom: "1",
    priceTo: "20",
    categoryId: "",
    areaFrom: "30",
    areaTo: "200",
  });

  const { listMenuBarProjectType } = useSelector(
    (state: RootState) => state.menubar
  );

  const fetchProjectByType = async (typeId: string) => {
    try {
      const res = await getProjectByType(typeId);
      if (res.responseCode === "00") {
        setProjectList(res.responseData);
        if (res.responseData.length > 0) {
          setProjectName(res.responseData[0].projectName.split(","));
          setFilterSearch({
            ...filterSearch,
            projectId: res.responseData[0].projectId,
            projectTypeId: typeId,
          });
        }
      }
      console.log(res);
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  useEffect(() => {
    if (listMenuBarProjectType?.length > 0) {
      setProjectTypeName(listMenuBarProjectType[0].name.split(","));
      fetchProjectByType(listMenuBarProjectType[0].id);
    }
  }, [listMenuBarProjectType]);

  const handleSelectProject = (
    event: SelectChangeEvent<typeof projectTypeName>
  ) => {
    const {
      target: { value },
    } = event;
    const data = listMenuBarProjectType.filter((x) => x.name === value);
    setProjectTypeName(typeof value === "string" ? value.split(",") : value);
    // setFilterSearch({ ...filterSearch, projectTypeId: data[0].id });
    fetchProjectByType(data[0].id);
  };

  const handleSelectProjectName = (
    event: SelectChangeEvent<typeof projectName>
  ) => {
    const {
      target: { value },
    } = event;
    const data = projectList.filter((x) => x.projectName === value);
    setProjectName(typeof value === "string" ? value.split(",") : value);
    setFilterSearch({ ...filterSearch, projectId: data[0].projectId });
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
    router.push(
      `/compare-search?projectId=${filterSearch.projectId}&projectTypeId=${filterSearch.projectTypeId}&priceTo=${filterSearch.priceTo}&priceFrom=${filterSearch.priceFrom}&areaTo=${filterSearch.areaTo}&areaFrom=${filterSearch.areaFrom}&categoryId=${filterSearch.categoryId}`
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
      <div style={{ padding: 88 }}>
        <DynamicOnlineSupportSale />
      </div>
      <CompareSwap>
        {/* <div> */}
        <div style={{ maxWidth: 350, height: "100%" }}>
          <Typography
            style={{
              fontWeight: 500,
              fontSize: 28,
              color: "#ffffff",
              margin: "45px 5px 18px 5px",
            }}
          >
            So sánh
          </Typography>
          <Typography
            style={{
              fontWeight: 400,
              fontSize: 16,
              color: "#ffffff",
              margin: "5px 5px 28px 5px",
            }}
          >
            So sánh nhanh các sản phẩm theo tiêu chí lựa chọn của bạn giúp cho
            bạn dễ dàng chọn được sản phẩm ưng ý cho mình
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 42,
            alignItems: "end",
          }}
        >
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
              data={projectList.map((item) => {
                return { id: item.projectId, name: item.projectName };
              })}
              value={projectName}
              onChange={handleSelectProjectName}
              placeholder="Chọn dự án"
            />
          </BoxStyled>
          <div style={{ display: "flex", gap: 60 }}>
            <SliderComponent
              label="Diện tích (m2)"
              onChange={handleChange1}
              numberMin={30}
              numberMax={200}
              value={valueDienTich}
              unit="m2"
            />
            <SliderSearchKhoangGia
              label="Khoảng giá"
              onChange={handleChange2}
              numberMin={1}
              numberMax={20}
              value={valueKhoanGia}
              unit="tỷ"
            />
          </div>
          <div>
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
          </div>
        </div>
        {/* </div> */}
      </CompareSwap>
      <DynamicSlider3dShowBottom />
    </>
  );
};
export default HomePage;
