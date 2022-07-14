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

  const [filterSearch, setFilterSearch] = useState({
    textSearch: "",
    provinceId: "",
    projectTypeId: "",
    projectId: "",
    priceFrom: "",
    priceTo: "",
    categoryId: "",
    areaFrom: "",
    areaTo: "",
  });

  const { listMenuBarType, listMenuBarProjectType } = useSelector(
    (state: RootState) => state.menubar
  );

  useEffect(() => {
    console.log(filterSearch);
  });

  useEffect(() => {
    if (listMenuBarProjectType?.length > 0) {
      setProjectTypeName(listMenuBarProjectType[0].name.split(","));
    }
    if (listMenuBarType?.length > 0) {
      setProjectName(listMenuBarType[0].name.split(","));
    }
    if (listMenuBarProjectType?.length > 0 && listMenuBarType?.length > 0) {
      setFilterSearch({
        ...filterSearch,
        projectTypeId: listMenuBarProjectType[0].id,
        projectId: listMenuBarType[0].id,
      });
    }
  }, [listMenuBarProjectType, listMenuBarType]);

  const handleSelectProject = (
    event: SelectChangeEvent<typeof projectTypeName>
  ) => {
    const {
      target: { value },
    } = event;
    const data = listMenuBarProjectType.filter((x) => x.name === value);
    setProjectTypeName(typeof value === "string" ? value.split(",") : value);
    setFilterSearch({ ...filterSearch, projectTypeId: data[0].id });
  };

  const handleSelectProjectName = (
    event: SelectChangeEvent<typeof projectName>
  ) => {
    const {
      target: { value },
    } = event;
    const data = listMenuBarType.filter((x) => x.name === value);
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
    if (activeThumb === 0) {
      setValueDientich([
        Math.min(newValue[0], valueDienTich[1] - minDistance),
        valueDienTich[1],
      ]);
      setFilterSearch({
        ...filterSearch,
        areaFrom: valueDienTich[0].toString(),
        areaTo: valueDienTich[1].toString(),
      });
    } else {
      setValueDientich([
        valueDienTich[0],
        Math.max(newValue[1], valueDienTich[0] + minDistance),
      ]);
      setFilterSearch({
        ...filterSearch,
        areaFrom: valueDienTich[0].toString(),
        areaTo: valueDienTich[1].toString(),
      });
    }
  };

  const handleChange2 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValueKhoangGia([
        Math.min(newValue[0], valueKhoanGia[1] - minDistance2),
        valueKhoanGia[1],
      ]);
      setFilterSearch({
        ...filterSearch,
        priceFrom: valueKhoanGia[0].toString(),
        priceTo: valueKhoanGia[1].toString(),
      });
    } else {
      setValueKhoangGia([
        valueKhoanGia[0],
        Math.max(newValue[1], valueKhoanGia[0] + minDistance2),
      ]);
      setFilterSearch({
        ...filterSearch,
        priceFrom: valueKhoanGia[0].toString(),
        priceTo: valueKhoanGia[1].toString(),
      });
    }
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
              data={listMenuBarType}
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
