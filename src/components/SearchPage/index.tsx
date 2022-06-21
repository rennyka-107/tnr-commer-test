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
  searchData: searchLocationResponse[];
  setSearch: any;
  totalElement: number;
  totalTextSearch: number;
  pageNumber: number;
  setSearchAction?: any;
  searchAction: boolean;
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
}: dataProps) => {
  const classes = useStyles();
  const router = useRouter();
  const [textSearch, setTextSearch] = useState<any>("");
  const { listMenuBarType, listMenuBarProjectType, listMenuLocation } =
    useSelector((state: RootState) => state.menubar);
  const [location, setLocation] = useState<string[]>([]);
  const [productName, setProductName] = useState<string[]>([]);
  const [projectName, setProjectName] = useState<string[]>([]);
  const [filterSearch, setFilterSearch] = useState({
    textSearch: "",
    provinceId: "",
    projectTypeId: "",
    projectId: "",
    priceFrom: "",
    priceTo: "",
    areaFrom: null,
    areaTo: null,
  });

  const { provinceId } = router.query;

  useEffect(() => {
    const value = router?.query.textSearch;
    setTextSearch(value);
    // setLocation()

    const dataLocation = listMenuLocation.filter(
		(x) => x.ProvinceID === Number(provinceId)
		);

  }, [router.query]);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setFilterSearch({
      ...filterSearch,
      textSearch: value,
    });
    setTextSearch(value);
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
    setFilterSearch({ ...filterSearch, provinceId: data[0].ProvinceID });
    setLocation(typeof value === "string" ? value.split(",") : value);
  };

  const handleSearch = () => {
    router.push(
      `/search?Type=Advanded&&textSearch=${filterSearch.textSearch}&&provinceId=${filterSearch.provinceId}&&projectTypeId=${filterSearch.projectTypeId}&&projectId=${filterSearch.projectId}&&priceTo=${filterSearch.priceTo}&&priceFrom=${filterSearch.priceFrom}&&areaTo=${filterSearch.areaTo}&&areaFrom=${filterSearch.areaFrom}`
    );
    setSearchAction(!searchAction);
  };

  return (
    <ContainerSearch
      title={"Kết quả tìm kiếm"}
      checkBread={true}
      // rightContent={fetchRight()}
    >
      <ContainerSearchPage>
        <div style={{ display: "flex", marginBottom: 31 }}>
          <div>
            <FormControl sx={{ m: 1, width: 250, mt: 3 }}>
              <TextField
                id="outlined-required"
                value={textSearch}
                placeholder="Nhập tên dự án , địa chỉ hoặc thành phố"
                onChange={handleChange}
                // style={{borderRadius: '8px !important'}}
                className={classes.root}
                sx={{
                  input: {
                    background: "#ffffff",
                    borderRadius: 8,
                  },
                }}
                onKeyPress={(ev) => {
                  if (ev.key === "Enter") {
                    // Do code here
                    router.push(`/search?textSearch=${textSearch}`);
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
              style={{ width: 150 }}
            />
            {/* <SelectSeach
              label="Block/ Khu"
              data={[]}
              value={[]}
              onChange={() => console.log("abc")}
              placeholder="Block/ Khu"
              style={{ width: 150 }}
            /> */}
            <SelectSeach
              label="Khoảng giá"
              data={[]}
              value={[]}
              onChange={() => console.log("abc")}
              placeholder="Khoảng giá"
              style={{ width: 150 }}
            />
            {/* <SelectSeach
              label="Phòng"
              data={[]}
              value={[]}
              onChange={() => console.log("abc")}
              placeholder="Phòng"
              style={{ width: 150 }}
            /> */}
            <SelectSeach
              label="Diên tích..."
              data={[]}
              value={[]}
              onChange={() => console.log("abc")}
              placeholder="Diên tích..."
              style={{ width: 150 }}
            />
          </div>
          <div>
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
