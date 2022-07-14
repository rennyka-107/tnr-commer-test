import styled from "@emotion/styled";
import { searchLocationResponse } from "interface/searchIF";
import ItemSearch from "./ItemSearch";
import { Button, SelectChangeEvent, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import ContainerSearch from "@components/Container/ContainerSearch";
import { makeStyles } from "@mui/styles";
import SelectSeach from "@components/CustomComponent/SelectInputComponent/SelectSeach";
import { IconFilterSearch } from "@components/Icons";
import { isEmpty } from "lodash";
import SelectLocationSearch from "@components/CustomComponent/SelectInputComponent/SelectLocationSearch";
import SelectInputComponent from "@components/CustomComponent/SelectInputComponent";
import SelectCategory from "@components/CustomComponent/SelectInputComponent/SelectCategory";
import SelectKhoanGia from "@components/CustomComponent/SelectInputComponent/SelectKhoanGia";
import SelectDienTich from "@components/CustomComponent/SelectInputComponent/SelectDienTich";
import SilderGroup from "@components/CustomComponent/SliderGroupComponent";
import SliderComponent from "@components/CustomComponent/SliderComponent";
import { FormatFilterText } from "utils/FormatText";

type dataProps = {
  searchData?: searchLocationResponse[];
  setSearch?: any;
  totalElement?: number;
  totalTextSearch?: number;
  pageNumber?: number;
};

const ContainerSearchPage = styled.div``;

const TextTotalSeach = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #8190a7;
`;
const NumberTotalStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputBase-root": {
      borderRadius: "8px",
      height: 40,
    },
  },
}));
const SearchCompare = ({
  searchData,
  setSearch,
  totalElement,
  totalTextSearch,
  pageNumber,
}: dataProps) => {
  const classes = useStyles();

  const changePage = (e: any) => {
    setSearch({
      page: e,
      size: 12,
    });
  };

  const router = useRouter();
  const [filter, setFilter] = useState<any>({ location: "" });
  const {
    listMenuBarType,
    listMenuBarProjectType,
    listMenuLocation,
    listCategory,
  } = useSelector((state: RootState) => state.menubar);
  const {
    categoryId,
    provinceId,
    projectId,
    projectTypeId,
    priceFrom,
    priceTo,
    areaFrom,
    areaTo,
  } = router.query;
  const [location, setLocation] = useState<string[]>([]);
  const [categoryName, setCategoryName] = useState<string[]>([]);
  const [productName, setProductName] = useState<string[]>([]);
  const [projectName, setProjectName] = useState<string[]>([]);
  const [filterSearch, setFilterSearch] = useState({
    categoryId: categoryId,
    provinceId: provinceId,
    projectTypeId: projectTypeId,
    projectId: projectId,
    priceFrom: priceFrom,
    priceTo: priceTo,
    areaFrom: areaFrom,
    areaTo: areaTo,
  });
  const [valueKhoangGia, setValueKhoangGia] = useState([
    {
      name: "Tất cả",
      value: [0, 0],
    },
    {
      name: "1 Tỷ - 10 Tỷ",
      value: [1, 10],
    },
    {
      name: "10 Tỷ - 20 Tỷ",
      value: [10, 20],
    },
    {
      name: "20 Tỷ - 40 Tỷ",
      value: [20, 40],
    },
  ]);
  const [valueDienTich, setValueDienTich] = useState([
    {
      name: "Tất Cả",
      value: [],
    },
    {
      name: "30 m2 - 50 m2",
      value: [30, 50],
    },
    {
      name: "50 m2 - 100 m2",
      value: [50, 100],
    },
    {
      name: "100 m2 - 150 m2",
      value: [100, 150],
    },
    {
      name: "150 m2 - 200 m2",
      value: [150, 200],
    },
  ]);
  const [dataKhoangGia, setDataKhoangGia] = useState<number[]>([1, 20]);
  const [dataDienTich, setDataDienTich] = useState<number[]>([30, 200]);

  useEffect(() => {
    const dataLocation = listMenuLocation.filter(
      (x) => x.ProvinceID === Number(provinceId)
    );
    if (!isEmpty(dataLocation)) {
      setLocation([dataLocation[0].ProvinceName]);
    }
    const dataCategory = listCategory.filter((x) => x.id === categoryId);
    if (!isEmpty(dataCategory)) {
      setCategoryName([dataCategory[0].name]);
    }
    const dataProject = listMenuBarProjectType.filter(
      (x) => x.id === projectTypeId
    );
    if (!isEmpty(dataProject)) {
      setProjectName(
        typeof dataProject[0].name === "string"
          ? dataProject[0].name.split(",")
          : dataProject[0].name
      );
    }
    const dataProduct = listMenuBarType.filter((x) => x.id === projectId);
    if (!isEmpty(dataProduct)) {
      setProductName(
        typeof dataProduct[0].name === "string"
          ? dataProduct[0].name.split(",")
          : dataProduct[0].name
      );
    }
    if (
      (areaFrom !== "" || areaTo !== "") &&
      typeof areaFrom === "string" &&
      typeof areaTo === "string"
    ) {
      setDataDienTich([parseInt(areaFrom), parseInt(areaTo)]);
    }
    if (
      (priceFrom !== "" || priceTo !== "") &&
      typeof priceFrom === "string" &&
      typeof priceTo === "string"
    ) {
      setDataKhoangGia([parseInt(priceFrom), parseInt(priceTo)]);
    }
  }, [
    provinceId,
    projectId,
    projectTypeId,
    areaFrom,
    areaTo,
    priceFrom,
    priceTo,
    listMenuBarType,
    listMenuBarProjectType,
    listMenuLocation,
    listCategory,
  ]);
  useEffect(() => {
    setFilter({
      location: router?.query.textSearch,
    });
  }, [router.query.textSearch]);

  useEffect(() => {
    const data = listMenuLocation.filter(
      (x) => x.ProvinceName === filter.location
    );
    if (!isEmpty(data)) {
      setFilterSearch({
        ...filterSearch,
        provinceId: data[0].ProvinceID.toString(),
      });
    }
    const projectIdData = listMenuBarType.filter(
      (x) => x.id === router.query.projectId
    );
    if (!isEmpty(projectIdData)) {
      // setFilter({ ...filterSearch, projectId: data[0].name });
      setProductName(
        typeof projectIdData[0].name === "string"
          ? projectIdData[0].name.split(",")
          : projectIdData[0].name
      );
    }
  }, [filter]);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;

    const data = listMenuLocation.filter((x) => x.ProvinceName === value);

    setFilter({
      location: value,
    });
    setFilterSearch({
      ...filterSearch,
      provinceId: data[0]?.ProvinceID.toString(),
    });
  };
  const handleSelectCategory = (
    event: SelectChangeEvent<typeof categoryName>
  ) => {
    const {
      target: { value },
    } = event;
    const data = listCategory.filter((x) => x.name === value);
    setCategoryName(typeof value === "string" ? value.split(",") : value);
    setFilterSearch({ ...filterSearch, categoryId: data[0].id });
  };
  const handleSelectProject = (
    event: SelectChangeEvent<typeof projectName>
  ) => {
    const {
      target: { value },
    } = event;
    const data = listMenuBarProjectType.filter((x) => x.name === value);
    setProjectName(typeof value === "string" ? value.split(",") : value);
    setFilterSearch({ ...filterSearch, projectTypeId: data[0].id });
  };
  const handleSelectProduct = (
    event: SelectChangeEvent<typeof productName>
  ) => {
    const {
      target: { value },
    } = event;
    const data = listMenuBarType.filter((x) => x.name === value);
    setProductName(typeof value === "string" ? value.split(",") : value);
    setFilterSearch({ ...filterSearch, projectId: data[0].id });
  };

  const handleChangeKhoangGia = (event: any) => {
    const {
      target: { value },
    } = event;
    setDataKhoangGia(value);
    setFilterSearch({
      ...filterSearch,
      priceFrom: value[0].toString(),
      priceTo: value[1].toString(),
    });
  };

  const handleChangeLocation = (
    event: SelectChangeEvent<typeof projectName>
  ) => {
    const {
      target: { value },
    } = event;
    const data = listMenuLocation.filter((x) => x.ProvinceName === value);
    setSearch({ ...filterSearch, provinceId: data[0].ProvinceID });
    setLocation(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeDienTich = (event: any) => {
    const {
      target: { value },
    } = event;

    if (value.length === 0) {
      setDataDienTich(value);
      setFilterSearch({
        ...filterSearch,
        areaFrom: "",
        areaTo: "",
      });
    } else {
      setDataDienTich(value);
      setFilterSearch({
        ...filterSearch,
        areaFrom: value[0].toString(),
        areaTo: value[1].toString(),
      });
    }
  };

  const handleSearch = () => {
    router.push(
      `/compare-search?projectId=${filterSearch.projectId}&&projectTypeId=${filterSearch.projectTypeId}&&priceTo=${filterSearch.priceTo}&&priceFrom=${filterSearch.priceFrom}&&areaTo=${filterSearch.areaTo}&&areaFrom=${filterSearch.areaFrom}&&categoryId=${filterSearch.categoryId}`
    );
  };

  return (
    <ContainerSearch
      title={"So sánh bất động sản"}
      checkBread={true}
      // rightContent={fetchRight()}
    >
      <ContainerSearchPage>
        <div style={{ display: "flex", gap: 50 }}>
          <SelectSeach
            label="Loại BĐS"
            data={listMenuBarProjectType}
            value={projectName}
            onChange={handleSelectProject}
            placeholder="Loại BĐS"
            style={{ width: 180, height: 40 }}
          />
          <SelectSeach
            label="Chọn dự án"
            data={listMenuBarType}
            value={productName}
            onChange={handleSelectProduct}
            placeholder="Chọn dự án"
            style={{ width: 180 }}
          />
          <SilderGroup
            // label={"Khác"}
            text={FormatFilterText([
              {
                text: `${filterSearch.priceFrom} tỷ ~ ${filterSearch.priceTo} tỷ`,
                hasValue: Boolean(filterSearch.priceFrom),
              },
              {
                text: (
                  <>
                    {filterSearch.areaFrom} m<sup>2</sup> -&nbsp;
                    {filterSearch.areaTo} m<sup>2</sup>
                  </>
                ),
                hasValue: Boolean(filterSearch.areaFrom),
              },
            ])}
          >
            <SliderComponent
              label="Khoảng giá"
              onChange={handleChangeKhoangGia}
              numberMin={1}
              numberMax={20}
              value={dataKhoangGia}
              unit="tỷ"
              sx={{
                "& .MuiTypography-root": {
                  color: "#1B3459",
                },
                "& .MuiSlider-valueLabelLabel": {
                  color: "#1B3459",
                },
              }}
            />
            <SliderComponent
              label="Diện tích (m2)"
              onChange={handleChangeDienTich}
              numberMin={30}
              numberMax={200}
              value={dataDienTich}
              unit="m2"
              sx={{
                "& .MuiTypography-root": {
                  color: "#1B3459",
                },
                "& .MuiSlider-valueLabelLabel": {
                  color: "#1B3459",
                },
              }}
            />
          </SilderGroup>
          <Button
            style={{
              background: "#1B3459",
              width: 125,
              marginTop: 24,
              borderRadius: 8,
              height: 40,
            }}
            onClick={handleSearch}
          >
            <IconFilterSearch />
            <span
              style={{
                color: "#ffffff",
                textTransform: "none",
                marginLeft: 5,
              }}
            >
              Lọc
            </span>
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            marginBottom: 21,
          }}
        >
          <NumberTotalStyled>{totalTextSearch}</NumberTotalStyled>
          <TextTotalSeach>Sản phẩm phù hợp kết quả tìm kiếm</TextTotalSeach>
        </div>
        {/* {data.map((item) => ( */}
        {!isEmpty(searchData) ? (
          <>
            <ItemSearch data={searchData} />
          </>
        ) : (
          <>
            <div style={{ textAlign: "center" }}>
              <span>Không có kết quả tìm kiếm</span>
            </div>
          </>
        )}

        {/* ))} */}
      </ContainerSearchPage>
    </ContainerSearch>
  );
};
export default SearchCompare;
