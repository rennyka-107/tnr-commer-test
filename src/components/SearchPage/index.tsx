import styled from "@emotion/styled";
import { searchLocationResponse } from "interface/searchIF";
import ItemSearch from "./ItemSearch";
import {
  Button,
  Fade,
  IconButton,
  InputBase,
  Paper,
  Popper,
  PopperPlacementType,
} from "@mui/material";
import Typography from "@mui/material/Typography";

import FormControl from "@mui/material/FormControl";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { makeStyles } from "@mui/styles";
import {
  IconFilterSearch,
  IconHuyLoc,
  IconSapxep,
  SearchIconSearchPage,
} from "@components/Icons";
import isEmpty from "lodash/isEmpty";
import useFavourite from "hooks/useFavourite";
import ContainerSearchPage from "@components/Container/ContainerSearchPage";
import {
  getListProjectByProjectType,
  getListProjectTypeByListIdProvince,
} from "../../../pages/api/paramSearchApi";
import {
  getListProjectResponse,
  getListProjectTypeResponse,
} from "../../../store/paramsSearchSlice";
import ProjectTypeCheckboxDropdown from "@components/CustomComponent/ListCheckboxDropdown/ProjectTypeCheckboxDropdown";
import ProjectDropdown from "@components/CustomComponent/ListCheckboxDropdown/ProjectDropdown";
import SliderComponent from "@components/CustomComponent/SliderComponent";
import { FormatFilterText } from "utils/FormatText";
import SliderGroupFilterSearch from "@components/CustomComponent/SliderGroupComponent/SliderGroupFilterSearch";
import NoProductComponent from "@components/CustomComponent/NoProductComponent";

import SwitchComponent from "./SwitchComponent";
import PopperProjectType from "@components/CustomComponent/ListCheckboxDropdown/PopperProject";
import PopperComponent from "@components/CustomComponent/ListCheckboxDropdown/PopperComponent";

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
const TextStyled = styled(InputBase)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  width: 245px;
  /* Shades/Dark 3 */

  color: #8190a7;
`;
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputBase-root": {
      borderRadius: "8px",
      height: 40,
    },
  },
}));
const LinkStyled = styled.a`
  cursor: pointer;
  :hover,
  :hover fill {
    color: #ea242a;
  }
`;
const fakeData = [
  {
    name: "good first issue",
    color: "#7057ff",
    description: "Good for newcomers",
  },
  {
    name: "help wanted",
    color: "#008672",
    description: "Extra attention is needed",
  },
  {
    name: "priority: critical",
    color: "#b60205",
    description: "",
  },
  {
    name: "priority: high",
    color: "#d93f0b",
    description: "",
  },
  {
    name: "priority: low",
    color: "#0e8a16",
    description: "",
  },
];
const TextFilterStyled = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  /* identical to box height, or 100% */

  /* Brand/Main color */
  :hover {
    color: #ea242a;
  }
  color: #1b3459;
`;

const PaperStyled = styled(Paper)`
  position: relative;
  width: 318px;
  height: auto;

  /* White */

  background: #ffffff;
  /* Global */

  box-shadow: 0px 4px 64px 24px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
`;

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
  const dispatch = useDispatch();

  const { listMenuLocation } = useSelector((state: RootState) => state.menubar);

  const { projectTypeListResponse, projectListResponse } = useSelector(
    (state: RootState) => state.paramsSearch
  );

  const [checkSelectProvince, setCheckSelectProvince] = useState(false);
  const [checkSelectProjectType, setCheckSelectProjectType] = useState(false);
  const [listParamsProvince, setListParamsProvince] = useState([]);
  const [listParamsProjectType, setParamsProjectType] = useState([]);
  const [listIdProject, setListIdProject] = useState([]);
  const [listDataLSProvince, setListDataLSProvince] = useState([]);
  const [listDataLSProject, setListDataLSProject] = useState([]);
  const [listDataLSProjectType, setListDataLSProjectType] = useState([]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacementType>();
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
  const [filterSearch, setFilterSearch] = useState({
    textSearch: textSearch,
    provinceId: provinceId,
    projectTypeId: projectTypeId,
    projectId: projectId,
    priceFrom: (priceFrom as string) ?? "1",
    priceTo: (priceTo as string) ?? "20",
    areaFrom: (areaFrom as string) ?? "30",
    areaTo: (areaTo as string) ?? "200",
    // provinceIdList: [],
    // projectTypeIdList: [],
    // projectIdList: [],
    // projectCategoryIdList: [],
  });
  const [location, setLocation] = useState<string[]>([]);
  const [productName, setProductName] = useState<string[]>([]);
  const [projectName, setProjectName] = useState<string[]>([]);
  const { checkReload } = useFavourite();
  const [dataKhoangGia, setDataKhoangGia] = useState<number[]>([1, 20]);
  const [dataDienTich, setDataDienTich] = useState<number[]>([30, 200]);

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

  const handleSelectProduct = (data: any) => {
    if (!isEmpty(data)) {
      const bodySearch: any = [];
      const arr: any = [];
      // data.map((item) => {
      bodySearch.push(data.id);
      arr.push(data);
      // })
      setListDataLSProject(arr);
      setListIdProject(bodySearch);
    }

    // console.log(data)
  };

  const handleChangeLocation = (data: any) => {
    if (!isEmpty(data)) {
      const bodySearch: any = [];
      const arrayData: any = [];
      data.map((item) => {
        bodySearch.push(item.ProvinceID.toString());
        arrayData.push(item);
      });

      setCheckSelectProvince(true);
      setListParamsProvince(bodySearch);
      fetchListProjectType(bodySearch);
      setListDataLSProvince(arrayData);
      setListIdProject([]);
      setListDataLSProjectType([]);
      setListDataLSProjectType([]);
      setParamsProjectType([]);
      fetchListProjectTypeByProvince(bodySearch);
    }
  };

  const handleSelectProject = (dataProjectType: any) => {
    if (!isEmpty(dataProjectType)) {
      const bodySearch: any = [];
      const arrayData: any = [];
      dataProjectType.map((item) => {
        bodySearch.push(item.id);
        arrayData.push(item);
      });
      setCheckSelectProjectType(true);
      fetchListProject(bodySearch);
      setParamsProjectType(bodySearch);
      setListDataLSProjectType(arrayData);
    }
  };

  const fetchListProjectType = async (data: any) => {
    const body = {
      provinceIdList: data,
    };
    setCheckSelectProvince(false);
    try {
      const response: any = await getListProjectTypeByListIdProvince(body);
      if (response.responseCode === "00") {
        dispatch(getListProjectTypeResponse(response.responseData));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchListProjectTypeByProvince = async (data: any) => {
    const body = {
      provinceIdList: data,
    };
    setCheckSelectProvince(false);
    try {
      const response: any = await getListProjectByProjectType(body);
      if (response.responseCode === "00") {
        dispatch(getListProjectResponse(response.responseData));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchListProject = async (data: any) => {
    const body = {
      projectTypeIdList: data,
      provinceIdList: listParamsProvince,
    };
    setCheckSelectProjectType(false);
    try {
      const response: any = await getListProjectByProjectType(body);
      if (response.responseCode === "00") {
        dispatch(getListProjectResponse(response.responseData));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
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
  }, [areaFrom, areaTo, priceFrom, priceTo]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTextSearchValue(textSearch);
      const listProvince = localStorage?.getItem("listParamsLSProvince");
      const listProvinceData = localStorage?.getItem("listDataLSProvince");
      const listProjectType = localStorage?.getItem("listParamsLSProjectType");
      const listProjectData = localStorage?.getItem("listDataLSProjectType");
      const listDataIdProject = localStorage?.getItem("listDataLSProject");
      const listParamsIdProject = localStorage?.getItem("listParamsIdProject");
      if (!isEmpty(listProvince)) {
        fetchListProject(JSON.parse(listProjectType));
        fetchListProjectType(JSON.parse(listProvince));
        setListParamsProvince(JSON.parse(listProvince));
        fetchListProjectTypeByProvince(JSON.parse(listProvince));
      } else {
        fetchListProjectType([]);
      }
      if (!isEmpty(listProvinceData)) {
        setListDataLSProvince(JSON.parse(listProvinceData));
      }

      if (!isEmpty(listProjectType) && !isEmpty(listParamsProjectType)) {
        fetchListProject(JSON.parse(listProjectType));
        setParamsProjectType(JSON.parse(listProjectType));
      } else {
        localStorage.removeItem("listParamsLSProjectType");
      }
      if (!isEmpty(listProjectData)) {
        setListDataLSProjectType(JSON.parse(listProjectData));
      } else {
        localStorage.removeItem("listDataLSProjectType");
      }
      if (!isEmpty(listDataIdProject) && !isEmpty(listIdProject)) {
        setListDataLSProject(JSON.parse(listDataIdProject));
      } else {
        localStorage.removeItem("listDataLSProject");
      }
      if (!isEmpty(listParamsIdProject)) {
        setListIdProject(JSON.parse(listParamsIdProject));
      } else {
        localStorage.removeItem("listParamsIdProject");
      }
    }
  }, [router]);

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

    if (value.length === 0) {
      setDataDienTich(value);
    } else {
      setDataDienTich(value);
    }
  };
  const handleSearch = () => {
    localStorage.setItem(
      "listDataLSProvince",
      JSON.stringify(listDataLSProvince)
    );
    localStorage.setItem(
      "listParamsLSProvince",
      JSON.stringify(listParamsProvince)
    );
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
      priceFrom: (priceFrom as string) ?? "1",
      priceTo: (priceTo as string) ?? "20",
      areaFrom: (areaFrom as string) ?? "30",
      areaTo: (areaTo as string) ?? "200",
    });
    localStorage.removeItem("listDataLSProvince");
    localStorage.removeItem("listParamsLSProvince");
    localStorage.removeItem("listDataLSProjectType");
    localStorage.removeItem("listParamsLSProjectType");
    localStorage.removeItem("listDataLSProject");
    localStorage.removeItem("listParamsIdProject");
    router.push(
      `/search?Type=Advanded&&textSearch=&&provinceId=&&projectTypeId=&&projectId=&&priceFrom=&&priceTo=&&areaFrom=0&&areaTo=200`
    );
  };

  const handleClickSearch = () => {
    router.push(
      `/search?Type=Advanded&&textSearch=${filterSearch.textSearch}&&provinceId=${filterSearch.provinceId}&&projectTypeId=${filterSearch.projectTypeId}&&projectId=${filterSearch.projectId}&&priceFrom=${filterSearch.priceFrom}&&priceTo=${filterSearch.priceTo}&&areaFrom=${filterSearch.areaFrom}&&areaTo=${filterSearch.areaTo}`
    );
  };
  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpenModal((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  const fetchComponent = () => {
    return (
      <>
        {!isEmpty(listParamsProjectType) ||
        !isEmpty(listParamsProvince) ||
        !isEmpty(listIdProject) ||
		!isEmpty(listDataLSProjectType) ||
        !isEmpty(textSearch) ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "20px 20px 0px 20px",
              marginTop: 15,
              gap: 10,
            }}
          >
            <LinkStyled onClick={handleResetFilter}>
              <IconHuyLoc className="icon-huyloc" />
            </LinkStyled>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <ContainerSearchPage
      title={"Tìm kiếm bất động sản"}
      rightContent={
        <div>
          <FormControl
            sx={{ m: 1 }}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <TextStyled
              className={classes.root}
              onChange={handleChange}
              placeholder="Nhập tên hoặc mã sản phẩm/ dự án..."
              value={textSearchValue}
              inputProps={{ "aria-label": "search google maps" }}
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  router.push(
                    `/search?Type=Advanded&&textSearch=${filterSearch.textSearch}&&provinceId=${filterSearch.provinceId}&&projectTypeId=${filterSearch.projectTypeId}&&projectId=${filterSearch.projectId}&&priceFrom=${filterSearch.priceFrom}&&priceTo=${filterSearch.priceTo}&&areaFrom=${filterSearch.areaFrom}&&areaTo=${filterSearch.areaTo}`
                  );
                  ev.preventDefault();
                }
              }}
            />
            <IconButton
              type="submit"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={handleClickSearch}
            >
              <SearchIconSearchPage />
            </IconButton>
          </FormControl>
        </div>
      }
    >
      <div>
        <div
          style={{
            display: "flex",
            marginBottom: 31,
            alignItems: "center",
            gap: 90,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: 90,
            }}
          >
            <PopperComponent
              label="Vị Trí"
              data={listMenuLocation}
              listLocation={location}
              onChange={handleChangeLocation}
              listDataLSProvince={listDataLSProvince}
              placeholder="Chọn vị trí"
              style={{ width: 150, height: 40 }}
            />
            <PopperProjectType
              label="Loại BĐS"
              data={projectTypeListResponse}
              checkSelectProvince={checkSelectProvince}
              listProjectType={projectName}
              onChange={handleSelectProject}
              placeholder="Loại BĐS"
              style={{ width: 150, height: 40 }}
            />
            <ProjectDropdown
              label="Chọn dự án"
              data={projectListResponse}
              listProject={productName}
              checkSelectProvince={checkSelectProvince}
              checkSelectProjectType={checkSelectProjectType}
              onChange={handleSelectProduct}
              placeholder="Chọn dự án"
              style={{ width: 150, height: 40 }}
            />
            <SliderGroupFilterSearch
              label={"Khác"}
              text={"Bộ lọc khác"}
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
            </SliderGroupFilterSearch>
          </div>
          <div style={{ display: "flex" }}>
            <Button
              style={{
                background: "#1B3459",
                width: 125,
                marginTop: 35,
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
            {fetchComponent()}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
          <div>
            <Button onClick={handleClick("bottom")}>
              <LinkStyled>
                <IconSapxep className="icon-sapxep" />
              </LinkStyled>
            </Button>
          </div>
        </div>
        {/* {data.map((item) => ( */}
        {!isEmpty(searchData) ? (
          <>
            <ItemSearch data={searchData} />
          </>
        ) : (
          <>
            <NoProductComponent />
          </>
        )}

        {/* ))} */}
      </div>
      <Popper
        open={openModal}
        anchorEl={anchorEl}
        placement={placement}
        transition
        style={{ zIndex: 300 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <PaperStyled>
              <SwitchComponent />
            </PaperStyled>
          </Fade>
        )}
      </Popper>
    </ContainerSearchPage>
  );
};
export default SearchPage;
