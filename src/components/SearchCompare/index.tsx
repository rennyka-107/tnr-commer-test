import styled from "@emotion/styled";
import { searchLocationResponse } from "interface/searchIF";
import ItemSearch from "./ItemSearch";
import { Button, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import ContainerSearch from "@components/Container/ContainerSearch";
import { makeStyles } from "@mui/styles";
import SelectSeach from "@components/CustomComponent/SelectInputComponent/SelectSeach";
import { IconEmptyFav, IconFilterSearch } from "@components/Icons";
import { isEmpty } from "lodash";
import SilderGroup from "@components/CustomComponent/SliderGroupComponent";
import SliderComponent from "@components/CustomComponent/SliderComponent";
import { FormatFilterText } from "utils/FormatText";
import { getProjectByType } from "../../../pages/api/projectApi";

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

const StyledTitle = styled(Typography)`
  color: #1b3459;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
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
  const { listMenuBarType, listMenuBarProjectType } = useSelector(
    (state: RootState) => state.menubar
  );
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
  const [productName, setProductName] = useState<string[]>([]);
  const [projectName, setProjectName] = useState<string[]>([]);
  const [filterSearch, setFilterSearch] = useState({
    categoryId: categoryId,
    provinceId: provinceId,
    projectTypeId: projectTypeId,
    projectId: projectId,
    priceFrom: (priceFrom as string) ?? "1",
    priceTo: (priceTo as string) ?? "20",
    areaFrom: (areaFrom as string) ?? "30",
    areaTo: (areaTo as string) ?? "200",
  });
  const [projectList, setProjectList] = useState<any[]>([]);
  const [dataKhoangGia, setDataKhoangGia] = useState<number[]>([1, 20]);
  const [dataDienTich, setDataDienTich] = useState<number[]>([30, 200]);

  useEffect(() => {
    const dataProject = listMenuBarProjectType.filter(
      (x) => x.id === projectTypeId
    );
    if (!isEmpty(dataProject)) {
      setProjectName(
        typeof dataProject[0].name === "string"
          ? dataProject[0].name.split(",")
          : dataProject[0].name
      );
      fetchProjectByType(dataProject[0].id);
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
    listMenuBarProjectType,
  ]);
  useEffect(() => {
    setFilter({
      location: router?.query.textSearch,
    });
  }, [router.query.textSearch]);

  const fetchProjectByType = async (
    typeId: string,
    updateProject?: boolean
  ) => {
    try {
      const res = await getProjectByType(typeId);
      if (res.responseCode === "00") {
        setProjectList(res.responseData);
        if (res.responseData.length > 0) {
          if (updateProject) {
            setProductName(res.responseData[0].name.split(","));
          }
          setFilterSearch({
            ...filterSearch,
            projectId: updateProject ? res.responseData[0].id : projectId,
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
    const projectIdData = listMenuBarType.filter(
      (x) => x.id === router.query.projectId
    );
    if (!isEmpty(projectIdData)) {
      setProductName(
        typeof projectIdData[0].name === "string"
          ? projectIdData[0].name.split(",")
          : projectIdData[0].name
      );
    }
  }, [filter]);

  const handleSelectProject = (
    event: SelectChangeEvent<typeof projectName>
  ) => {
    const {
      target: { value },
    } = event;
    const data = listMenuBarProjectType.filter((x) => x.name === value);
    setProjectName(typeof value === "string" ? value.split(",") : value);
    fetchProjectByType(data[0].id, true);
  };

  const handleSelectProduct = (
    event: SelectChangeEvent<typeof productName>
  ) => {
    const {
      target: { value },
    } = event;
    const data = projectList.filter((x) => x.name === value);
    setProductName(typeof value === "string" ? value.split(",") : value);
    setFilterSearch({ ...filterSearch, projectId: data[0].id });
  };

  const handleChangeKhoangGia = (event: any) => {
    const {
      target: { value },
    } = event;
    setDataKhoangGia(value);
  };

  const handleChangeDienTich = (event: any) => {
    const {
      target: { value },
    } = event;

    setDataDienTich(value);
  };

  const onFilterApply = () => {
    setFilterSearch({
      ...filterSearch,
      areaFrom: dataDienTich[0].toString(),
      areaTo: dataDienTich[1].toString(),
      priceFrom: dataKhoangGia[0].toString(),
      priceTo: dataKhoangGia[1].toString(),
    });
  };

  const onFilterCancel = () => {
    setDataDienTich([
      parseInt(filterSearch.areaFrom),
      parseInt(filterSearch.areaTo),
    ]);
    setDataKhoangGia([
      parseInt(filterSearch.priceFrom),
      parseInt(filterSearch.priceTo),
    ]);
  };

  const handleSearch = () => {
    router.push(
      `/compare-search?projectId=${filterSearch.projectId}&projectTypeId=${filterSearch.projectTypeId}&priceTo=${filterSearch.priceTo}&priceFrom=${filterSearch.priceFrom}&areaTo=${filterSearch.areaTo}&areaFrom=${filterSearch.areaFrom}&categoryId=${filterSearch.categoryId}`
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
            data={projectList}
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
            handleApply={onFilterApply}
            handleCancel={onFilterCancel}
          >
            <SliderComponent
              label="Khoảng giá"
              onChange={handleChangeKhoangGia}
              numberMin={1}
              numberMax={20}
              value={dataKhoangGia}
              key={"priceRange"}
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
              key={"areaRange"}
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
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            <IconEmptyFav />
            <StyledTitle>
              Chưa có bất động sản phù hợp kết quả tìm kiếm
            </StyledTitle>
          </Stack>
        )}

        {/* ))} */}
      </ContainerSearchPage>
    </ContainerSearch>
  );
};
export default SearchCompare;
