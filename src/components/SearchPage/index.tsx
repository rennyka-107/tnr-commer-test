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
import { MenuBarLocation } from "interface/menuBarList";
import SelectKhoanGia from "@components/CustomComponent/SelectInputComponent/SelectKhoanGia";
import SelectDienTich from "@components/CustomComponent/SelectInputComponent/SelectDienTich";
import IconResetFilter from "@components/Icons/IconResetFilter";

type dataProps = {
  searchData: searchLocationResponse[];
  setSearch: any;
  totalElement: number;
  totalTextSearch: number;
  pageNumber: number;
  setSearchAction?: any;
  searchAction: boolean;
  setSearchBody?: any;
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
const SearchPage = ({
  searchData,
  totalTextSearch,
  setSearchAction,
  searchAction,
  setSearchBody,
}: dataProps) => {
  const classes = useStyles();
  const router = useRouter();
  const [textSearchValue, setTextSearchValue] = useState<any>("");
  const { listMenuBarType, listMenuBarProjectType, listMenuLocation } =
    useSelector((state: RootState) => state.menubar);
  const {
    textSearch,
    provinceId,
    projectId,
    projectTypeId,
    priceFrom,
    priceTo,
    areaFrom,
    areaTo,
  } = router.query;

  const [location, setLocation] = useState<string[]>([]);
  const [productName, setProductName] = useState<string[]>([]);
  const [projectName, setProjectName] = useState<string[]>([]);
  const [valueKhoangGia, setValueKhoangGia] = useState([
    {
      name: "Tất cả",
      value: [0,0],
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
  const [dataKhoangGia, setDataKhoangGia] = useState<any[]>([]);
  const [dataDienTich, setDataDienTich] = useState<any[]>([]);

  const [filterSearch, setFilterSearch] = useState({
    textSearch: textSearch,
    provinceId: provinceId,
    projectTypeId: projectTypeId,
    projectId: projectId,
    priceFrom: priceFrom,
    priceTo: priceTo,
    areaFrom: areaFrom,
    areaTo: areaTo,
  });

  useEffect(() => {
    const dataLocation = listMenuLocation.filter(
      (x) => x.ProvinceID === Number(provinceId)
    );
    if (!isEmpty(dataLocation)) {
      setLocation([dataLocation[0].ProvinceName]);
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
    if (areaFrom !== null || areaTo !== null) {
      setDataDienTich([areaFrom, areaTo]);
    }
    if (priceFrom !== "" || priceTo !== "") {
      setDataKhoangGia([priceFrom, priceTo]);
    }
    if (textSearch !== "") {
      setTextSearchValue(textSearch);
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
  ]);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setFilterSearch({
      ...filterSearch,
      textSearch: value,
    });
    setTextSearchValue(value);
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

  const handleChangeLocation = (
    event: SelectChangeEvent<typeof projectName>
  ) => {
    const {
      target: { value },
    } = event;
    const data = listMenuLocation.filter((x) => x.ProvinceName === value);
    setFilterSearch({ ...filterSearch, provinceId: data[0].ProvinceID.toString() });
    setLocation(typeof value === "string" ? value.split(",") : value);
  };
  const handleChangeKhoangGia = (event: any) => {
    const {
      target: { value },
    } = event;
    // if (value.length === 0) {
    //   setDataKhoangGia(value);
    //   setFilterSearch({
    //     ...filterSearch,
    //     priceFrom: "",
    //     priceTo: "",
    //   });
    // } else {
      setDataKhoangGia(value);
      setFilterSearch({
        ...filterSearch,
        priceFrom: value[0].toString(),
        priceTo: value[1].toString(),
      });
    // }
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
        areaFrom: value[0],
        areaTo: value[1],
      });
    }
  };

  const handleSearch = () => {
    router.push(
      `/search?Type=Advanded&&textSearch=${filterSearch.textSearch}&&provinceId=${filterSearch.provinceId}&&projectTypeId=${filterSearch.projectTypeId}&&projectId=${filterSearch.projectId}&&priceFrom=${filterSearch.priceFrom}&&priceTo=${filterSearch.priceTo}&&areaFrom=${filterSearch.areaFrom}&&areaTo=${filterSearch.areaTo}`
    );
    setSearchAction(!searchAction);
  };
  const handleResetFilter = () => {
    setSearchBody({
      textSearch: "",
      provinceId: "",
      projectTypeId: "",
      projectId: "",
      priceFrom: "",
      priceTo: "",
      areaFrom: null,
      areaTo: null,
    });
    router.push(
      `/search?Type=Advanded&&textSearch=&&provinceId=&&projectTypeId=&&projectId=&&priceFrom=&&priceTo=&&areaFrom=null&&areaTo=null`
    );
  };

  return (
    <ContainerSearch title={"Kết quả tìm kiếm"} checkBread={true}>
      <ContainerSearchPage>
        <div style={{ display: "flex", marginBottom: 31 }}>
          <div>
            <FormControl sx={{ m: 1, width: 150, mt: 3 }}>
              <TextField
                id="outlined-required"
                value={textSearchValue}
                placeholder="Nhập tên dự án , địa chỉ hoặc thành phố"
                onChange={handleChange}
                className={classes.root}
                sx={{
                  input: {
                    background: "#ffffff",
                    borderRadius: 8,
                  },
                }}
                onKeyPress={(ev) => {
                  if (ev.key === "Enter") {
                    router.push(
                      `/search?Type=Advanded&&textSearch=${filterSearch.textSearch}&&provinceId=${filterSearch.provinceId}&&projectTypeId=${filterSearch.projectTypeId}&&projectId=${filterSearch.projectId}&&priceFrom=${filterSearch.priceFrom}&&priceTo=${filterSearch.priceTo}&&areaFrom=${filterSearch.areaFrom}&&areaTo=${filterSearch.areaTo}`
                    );
                    ev.preventDefault();
                  }
                }}
              />
            </FormControl>
          </div>
          <div>
            <SelectLocationSearch
              label="Vị Trí"
              data={listMenuLocation}
              value={location}
              onChange={handleChangeLocation}
              placeholder="Chọn vị trí"
              style={{ width: 150, height: 40 }}
            />
            <SelectSeach
              label="Loại BĐS"
              data={listMenuBarProjectType}
              value={projectName}
              onChange={handleSelectProject}
              placeholder="Loại BĐS"
              style={{ width: 150, height: 40 }}
            />
            <SelectSeach
              label="Chọn dự án"
              data={listMenuBarType}
              value={productName}
              onChange={handleSelectProduct}
              placeholder="Chọn dự án"
              style={{ width: 150, height: 40 }}
            />
            {/* <SelectSeach
              label="Block/ Khu"
              data={[]}
              value={[]}
              onChange={() => console.log("abc")}
              placeholder="Block/ Khu"
              style={{ width: 150 }}
            /> */}
            <SelectKhoanGia
              label="Khoảng giá"
              data={valueKhoangGia}
              value={dataKhoangGia}
              setDataKhoangGia={setDataKhoangGia}
              onChange={handleChangeKhoangGia}
              placeholder="Khoảng giá"
              style={{ width: 150, height: 40 }}
            />
            {/* <SelectSeach
              label="Phòng"
              data={[]}
              value={[]}
              onChange={() => console.log("abc")}
              placeholder="Phòng"
              style={{ width: 150 }}
            /> */}
            <SelectDienTich
              label="Diên tích (m2)"
              data={valueDienTich}
              value={dataDienTich}
              setDataKhoangGia={setDataDienTich}
              onChange={handleChangeDienTich}
              placeholder="Diên tích (m2)"
              style={{ width: 150, height: 40 }}
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
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
            <Button
              style={{
                background: "#1B3459",
                width: 125,
                marginTop: 24,
                borderRadius: 8,
                height: 40,
              }}
              onClick={handleResetFilter}
            >
              <IconResetFilter />
              <span
                style={{
                  color: "#ffffff",
                  textTransform: "none",
                  marginLeft: 5,
                }}
              >
                Reset filter
              </span>
            </Button>
          </div>
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
export default SearchPage;
