import styled from "@emotion/styled";
import { searchLocationResponse } from "interface/searchIF";
import ItemSearch from "./ItemSearch";
import {
  Button,
  Fade,
  Paper,
  Popper,
  PopperPlacementType,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import ContainerSearch from "@components/Container/ContainerSearch";
import { makeStyles } from "@mui/styles";
import SelectSeach from "@components/CustomComponent/SelectInputComponent/SelectSeach";
import {
  IconEmptyFav,
  IconFilterSearch,
  IconHuyLoc,
  IconSapxep,
} from "@components/Icons";
import { isEmpty } from "lodash";
import SilderGroup from "@components/CustomComponent/SliderGroupComponent";
import SliderComponent from "@components/CustomComponent/SliderComponent";
import { FormatFilterText } from "utils/FormatText";
import { getProjectByType } from "../../../pages/api/projectApi";
import ProjectTypeRadio from "@components/CustomComponent/ListRadioSearchCompare/ProjectTypeRadio";
import SliderGroupFilterSearch from "@components/CustomComponent/SliderGroupComponent/SliderGroupFilterSearch";
import ProjectRadio from "@components/CustomComponent/ListRadioSearchCompare/ProjectRadio";
import PopperRadioComponent from "@components/CustomComponent/ListRadioSearchCompare/PopperRadioComponent";
import PopperRadioProject from "@components/CustomComponent/ListRadioSearchCompare/PopperRadioProject";
import { removeAllComparePopUpItem } from "../../../store/productCompareSlice";
import SwitchComponent from "@components/SearchCompare/SwitchComponent";
import ContainerComparePage from "@components/Container/ContainerComparePage";


type dataProps = {
  searchData?: searchLocationResponse[];
  setSearch?: any;
  totalElement?: number;
  totalTextSearch?: number;
  pageNumber?: number;
};
const minDistance2 = 10;
const minDistance = 400;

const ContainerSearchPage = styled.div`

`;

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
const LinkStyled = styled.a`
  cursor: pointer;
  :hover,
  :hover fill {
    color: #ea242a;
  }
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
  const [typeProduct, setTypeProduct] = useState("0");
  const [typeSaleProduct, setTypeSaleProduct] = useState("0");
  const [filterSearch, setFilterSearch] = useState({
    categoryId: categoryId,
    provinceId: provinceId,
    projectTypeId: projectTypeId,
    projectId: projectId,
    priceFrom: (priceFrom as string) ?? "0",
    priceTo: (priceTo as string) ?? "50",
    areaFrom: (areaFrom as string) ?? "0",
    areaTo: (areaTo as string) ?? "200",
    projectTypeIdList: [],
  });
  const [projectList, setProjectList] = useState<any[]>([]);
  const [dataKhoangGia, setDataKhoangGia] = useState<number[]>([0, 50]);
  const [dataDienTich, setDataDienTich] = useState<number[]>([0, 1000]);
  const [listParamsProjectType, setParamsProjectType] = useState([]);
  const [listIdProject, setListIdProject] = useState([]);
  const [listDataLSProvince, setListDataLSProvince] = useState([]);
  const [listDataLSProject, setListDataLSProject] = useState([]);
  const [listDataLSProjectType, setListDataLSProjectType] = useState([]);
  const [checkSelectProjectType, setCheckSelectProjectType] = useState(false);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacementType>();
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

  const fetchProjectByType = async (data: any, updateProject?: boolean) => {
    const body = {
      projectTypeIdList: data ? data : [],
    };
    setCheckSelectProjectType(false);
    try {
      const res = await getProjectByType(body);
      if (res.responseCode === "00") {
        setCheckSelectProjectType(true);

        setProjectList(res.responseData);
        if (res.responseData.length > 0) {
          if (updateProject) {
            setProductName(res.responseData[0].name.split(","));
          }
          setFilterSearch({
            ...filterSearch,
            projectId: updateProject ? res.responseData[0].id : projectId,
            // projectTypeIdList: data,
          });
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  //   useEffect(() => {
  //     if (!isEmpty(projectList)) {
  //       const bodyArr: any = [];
  //       bodyArr.push(projectList[0]);
  //       localStorage.setItem("listDataLSProject", JSON.stringify(bodyArr));
  //     }
  //   }, [projectList]);

  //   useEffect(() => {
  //     const projectIdData = listMenuBarType.filter(
  //       (x) => x.id === router.query.projectId
  //     );
  //     if (!isEmpty(projectIdData)) {
  //       setProductName(
  //         typeof projectIdData[0].name === "string"
  //           ? projectIdData[0].name.split(",")
  //           : projectIdData[0].name
  //       );
  //     }
  //   }, [filter]);

  //   useEffect(() => {
  //     if (!isEmpty(projectList)) {
  //       localStorage.setItem(
  //         "listDataLSProject",
  //         JSON.stringify([projectList[0]])
  //       );
  //       localStorage.setItem(
  //         "listParamsIdProject",
  //         JSON.stringify([projectList[0].id])
  //       );
  //     }
  //   }, [projectList]);

  const handleSelectProject = (dataProjectType: any) => {
    const bodySearch: any = [];
    const arrayData: any = [];
    arrayData.push(dataProjectType);
    bodySearch.push(dataProjectType.id);
    fetchProjectByType(bodySearch);
    setCheckSelectProjectType(true);
    setParamsProjectType(bodySearch);
    setListDataLSProjectType(arrayData);
  };

  const handleSelectProduct = (data: any) => {
    if (data) {
      const bodySearch: any = [];
      const arr: any = [];
      // data.map((item) => {
      bodySearch.push(data.id);
      arr.push(data);
      // })
      setListDataLSProject(arr);
      setListIdProject(bodySearch);
    }
  };

  const handleChangeKhoangGia = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  )=> {
    if (!Array.isArray(newValue)) {
		return;
	  }
	  if (activeThumb === 0) {
		setDataKhoangGia([
		  Math.min(newValue[0], dataKhoangGia[1] - minDistance2),
		  dataKhoangGia[1],
		]);
	  } else {
		setDataKhoangGia([
			dataKhoangGia[0],
		  Math.max(newValue[1], dataKhoangGia[0] + minDistance2),
		]);
	  }
  };
  const handleChangeDienTich = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  )=> {
    if (!Array.isArray(newValue)) {
		return;
	  }
	  if (activeThumb === 0) {
		setDataDienTich([
		  Math.min(newValue[0], dataDienTich[1] - minDistance),
		  dataDienTich[1],
		]);
	  } else {
		setDataDienTich([
			dataDienTich[0],
		  Math.max(newValue[1], dataDienTich[0] + minDistance),
		]);
	  }
  };

//   const handleChangeDienTich = (event: any) => {
//     const {
//       target: { value },
//     } = event;

//     setDataDienTich(value);
//   };

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const listProjectType = localStorage?.getItem("listParamsLSProjectType");
      const listProjectData = localStorage?.getItem("listDataLSProjectType");
      const listDataIdProject = localStorage?.getItem("listDataLSProject");
      const listParamsIdProject = localStorage?.getItem("listParamsIdProject");
      const bodyProjectID = JSON.parse(listProjectType);
      if (!isEmpty(listProjectType)) {
        fetchProjectByType(bodyProjectID);
        setParamsProjectType(JSON.parse(listProjectType));
      } else {
        fetchProjectByType("");
        localStorage.removeItem("listParamsLSProjectType");
      }
      if (!isEmpty(listProjectData)) {
        setListDataLSProjectType(JSON.parse(listProjectData));
      } else {
        localStorage.removeItem("listDataLSProjectType");
      }
      if (!isEmpty(listDataIdProject)) {
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

  const handleSearch = () => {
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
    localStorage.setItem("typeProduct", JSON.stringify(typeProduct));
    localStorage.setItem("typeSaleProduct", JSON.stringify(typeSaleProduct));
    router.push(
      `/compare-search?priceTo=${filterSearch.priceTo}&priceFrom=${filterSearch.priceFrom}&areaTo=${filterSearch.areaTo}&areaFrom=${filterSearch.areaFrom}`
    );
  };

  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpenModal((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  const handleResetFilter = () => {
    setFilterSearch({
      categoryId: "",
      provinceId: "",
      projectTypeId: "",
      projectId: "",
      priceFrom: (priceFrom as string) ?? "0",
      priceTo: (priceTo as string) ?? "50",
      areaFrom: (areaFrom as string) ?? "0",
      areaTo: (areaTo as string) ?? "1000",
      projectTypeIdList: [""],
    });
    localStorage.removeItem("listDataLSProjectType");
    localStorage.removeItem("listParamsLSProjectType");
    localStorage.removeItem("listDataLSProject");
    localStorage.removeItem("listParamsIdProject");
    // localStorage.removeItem("typeProduct"),
    // localStorage.removeItem("typeSaleProduct");
    router.push(
      `/compare-search?priceTo=&priceFrom=&areaTo=&areaFrom=&categoryId=`
    );
  };

  const fetchComponent = () => {
    return (
      <>
        {!isEmpty(listParamsProjectType) || !isEmpty(listIdProject) ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
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
    <ContainerComparePage title={"So sánh bất động sản"} checkBread={true}>
      <ContainerSearchPage>
        <div
          style={{
            display: "flex",
            gap: 90,
            alignItems: "center",
            marginBottom: 43,
            justifyContent: "space-between",
          }}
        >
          {/* <ProjectTypeRadio
            label="Loại BĐS"
            data={listMenuBarProjectType}
            // checkSelectProvince={checkSelectProvince}
            listProjectType={projectName}
            onChange={handleSelectProject}
            placeholder="Loại BĐS"
            style={{ width: 150, height: 40 }}
          /> */}
          <PopperRadioComponent
            label="Loại BĐS"
            data={listMenuBarProjectType}
            // checkSelectProvince={checkSelectProvince}
            listProjectType={projectName}
            onChange={handleSelectProject}
            placeholder="Loại BĐS"
            style={{ width: 150, height: 40 }}
          />
          <PopperRadioProject
            label="Chọn dự án"
            data={projectList}
            checkSelectProjectType={checkSelectProjectType}
            listProjectType={productName}
            onChange={handleSelectProduct}
            placeholder="Chọn dự án"
            style={{ width: 150, height: 40 }}
          />
          {/* <ProjectRadio
            label="Chọn dự án"
            data={projectList}
            checkSelectProjectType={checkSelectProjectType}
            listProjectType={productName}
            onChange={handleSelectProduct}
            placeholder="Chọn dự án"
            style={{ width: 150, height: 40 }}
          /> */}
          <SliderGroupFilterSearch
            label={"Khác"}
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
              numberMin={0}
              numberMax={50}
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
              numberMin={0}
              numberMax={1000}
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
          {/* <div style={{ width: 150 }}>{fetchComponent()}</div> */}
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
              <SwitchComponent
                setTypeProduct={setTypeProduct}
                setTypeSaleProduct={setTypeSaleProduct}
              />
            </PaperStyled>
          </Fade>
        )}
      </Popper>
      </ContainerSearchPage>

    </ContainerComparePage>
  );
};
export default SearchCompare;
