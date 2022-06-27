import styled from "@emotion/styled";
import { searchLocationResponse } from "interface/searchIF";
import ItemSearch from "./ItemSearch";
import {
  Button,
  FormControl,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
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
  const { listMenuBarType, listMenuBarProjectType, listMenuLocation } =
    useSelector((state: RootState) => state.menubar);
  const [location, setLocation] = useState<string[]>([]);
  const [productName, setProductName] = useState<string[]>([]);
  const [projectName, setProjectName] = useState<string[]>([]);
  const [filterSearch, setFilterSearch] = useState({
    provinceId: "",
    projectTypeId: "",
    projectId: "",
    priceFrom: "",
    priceTo: "",
    areaFrom: null,
    areaTo: null,
  });

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
      setFilterSearch({ ...filterSearch, provinceId: data[0].ProvinceID.toString() });
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
  const handleSelectProject = (
    event: SelectChangeEvent<typeof projectName>
  ) => {
    const {
      target: { value },
    } = event;
    const data = listMenuBarProjectType.filter((x) => x.name === value);
    setProjectName(typeof value === "string" ? value.split(",") : value);
    setFilterSearch({ ...filterSearch, projectId: data[0].id });
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

  const handleSearch = () => {
    router.push(
      `/search?Type=Advanded&&provinceId=${filterSearch.provinceId}&&projectTypeId=${filterSearch.projectTypeId}&&projectId=${filterSearch.projectId}&&priceTo=${filterSearch.priceTo}&&priceFrom=${filterSearch.priceFrom}&&areaTo=${filterSearch.areaTo}&&areaFrom=${filterSearch.areaFrom}`
    );
  };

  return (
    <ContainerSearch
      title={"So sánh bất động sản"}
      checkBread={true}
      // rightContent={fetchRight()}
    >
      <ContainerSearchPage>

          <div style={{display: 'flex', gap: 50}}>
            <SelectLocationSearch
              label="Chung cư"
              data={[]}
              value={[]}
              onChange={handleChangeLocation}
              placeholder="Chung cư"
              style={{ width: 180, height: 40 }}
            />
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
            <SelectSeach
              label="Khoảng giá"
              data={[]}
              value={[]}
              onChange={() => console.log("abc")}
              placeholder="Khoảng giá"
              style={{ width: 180 }}
            />
            <SelectSeach
              label="Diên tích..."
              data={[]}
              value={[]}
              onChange={() => console.log("abc")}
              placeholder="Diên tích..."
              style={{ width: 180 }}
            />
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
