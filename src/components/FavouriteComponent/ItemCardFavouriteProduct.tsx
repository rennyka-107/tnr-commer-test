import _, { isEmpty } from "lodash";
import ItemProductCard from "@components/CustomComponent/ItemProductCard";
import Product2 from "../../../public/images/product2.png";
import styled from "@emotion/styled";
import PaddingComponent from "@components/CustomComponent/PagingComponent";
import Link from "next/link";
import { ProductsResponse } from "interface/product";
import Router, { useRouter } from "next/router";
import {
  Button,
  Fade,
  Grid,
  Paper,
  Popper,
  PopperPlacementType,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import useAddToCart from "hooks/useAddToCart";
import ContainerSearch from "@components/Container/ContainerSearch";
import { useDispatch, useSelector } from "react-redux";
import { getComparePopUpItem } from "../../../store/productCompareSlice";
import {
  IconEmptyFav,
  IconFilterSearch,
  IconHuyLoc,
  IconSapxep,
} from "@components/Icons";
import { RootState } from "../../../store/store";
import LocalStorage from "utils/LocalStorage";
import ContainerProductFavorite from "@components/Container/ContainerProductFavorite";
import PopperProjectType from "@components/CustomComponent/ListCheckboxDropdown/PopperProject";
import PopperComponent from "@components/CustomComponent/ListCheckboxDropdown/PopperComponent";

import { useEffect, useState } from "react";
import ProjectDropdown from "@components/CustomComponent/ListCheckboxDropdown/ProjectDropdown";
import SliderGroupFilterSearch from "@components/CustomComponent/SliderGroupComponent/SliderGroupFilterSearch";
import SliderComponent from "@components/CustomComponent/SliderComponent";
import {
  getListProjectByProjectType,
  getListProjectTypeByListIdProvince,
} from "../../../pages/api/paramSearchApi";
import {
  getListProjectResponse,
  getListProjectTypeResponse,
} from "../../../store/paramsSearchSlice";
import { FormatFilterText } from "utils/FormatText";
import SwitchComponent from "@components/SearchCompare/SwitchComponent";
import SwitchComponentFavorite from "./SwitchComponentFavorite";

interface ProductsProps {
  data?: ProductsResponse[];
  setSearch: any;
  setSearchAction?: any;
  searchAction: boolean;
  setSearchBody?: any;
  totalTextSearch: any;
}
const minDistance2 = 10;
const minDistance = 400;
const ContainerProduct = styled.div`
  display: flex;
  justify-content: center;
`;
const ProductWrap = styled.div`
  display: grid;
  gap: 31px;
  grid-template-columns: repeat(4, 1fr);
  @media only screen and (max-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
  }
`;

const StyledButton = styled(Button)`
  padding: 16px 32px;
  gap: 32px;
  background: #1b3459;
  border-radius: 8px;
  width: 339px;
  height: 53px;
  text-transform: none;
  :hover {
    background: #1b3459;
  }
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
const ContainerFilter = styled.div`
  display: flex;
  margin-bottom: 31px;
  gap: 90px;
  align-items: center;
  @media screen and (max-width: 1440px) {
    flex-direction: column;
    gap: 1px;
  }
  @media screen and (max-width: 1204px) {
    flex-direction: column;
    gap: 1px;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 90px;
  @media screen and (max-width: 1680px) {
    gap: 70px;
  }
  @media screen and (max-width: 1630px) {
    gap: 60px;
  }
  @media screen and (max-width: 1600px) {
    gap: 50px;
  }
  @media screen and (max-width: 1560px) {
    gap: 32px;
  }
  @media screen and (max-width: 1300px) {
    gap: 25px;
  }
  @media screen and (max-width: 1260px) {
    gap: 20px;
  }
  @media screen and (max-width: 800px) {
    gap: 5px;
  }
`;
const HuyLocStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
  margin-left: 13px;
  padding: 20px 0px 0px 0px;
  @media screen and (max-width: 1024px) {
    padding: 0px 0px 0px 0px;
  }
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
const ItemCardFavouriteProduct = ({
  data,
  setSearchAction,
  searchAction,
  totalTextSearch,
  setSearchBody,
}: ProductsProps) => {
  const { listMenuBarType, listMenuBarProjectType } = useSelector(
    (state: RootState) => state.menubar
  );
  const { listMenuLocation } = useSelector((state: RootState) => state.menubar);
  const { projectTypeListResponse, projectListResponse } = useSelector(
    (state: RootState) => state.paramsSearch
  );
  const router = useRouter();
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

  const matches = useMediaQuery("(max-width:1204px)");

  const addToCart = useAddToCart();
  const dispatch = useDispatch();
  const [location, setLocation] = useState<string[]>([]);
  const [productName, setProductName] = useState<string[]>([]);
  const [projectName, setProjectName] = useState<string[]>([]);
  //   const { checkReload } = useFavourite();
  const [dataKhoangGia, setDataKhoangGia] = useState<number[]>([0, 50]);
  const [dataDienTich, setDataDienTich] = useState<number[]>([0, 1000]);
  const [checkSelectProvince, setCheckSelectProvince] = useState(false);
  const [checkSelectProjectType, setCheckSelectProjectType] = useState(false);
  const [listParamsProvince, setListParamsProvince] = useState([]);
  const [listParamsProjectType, setParamsProjectType] = useState([]);
  const [listIdProject, setListIdProject] = useState([]);
  const [listDataLSProvince, setListDataLSProvince] = useState([]);
  const [listDataLSProject, setListDataLSProject] = useState([]);
  const [listDataLSProjectType, setListDataLSProjectType] = useState([]);
  const [typeProduct, setTypeProduct] = useState("0");
  const [typeSaleProduct, setTypeSaleProduct] = useState("0");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacementType>();

  const [filterSearch, setFilterSearch] = useState({
    textSearch: textSearch,
    provinceId: provinceId ? provinceId : "",
    projectTypeId: projectTypeId ? projectTypeId : "",
    projectId: projectId ? projectId : "",
    priceFrom: (priceFrom as string) ?? "0",
    priceTo: (priceTo as string) ?? "50",
    areaFrom: (areaFrom as string) ?? "0",
    areaTo: (areaTo as string) ?? "1000",
  });

  const handleChangeLocation = (data: any) => {
    const bodySearch: any = [];
    if (!isEmpty(data)) {
      const arrayData: any = [];
      data.map((item) => {
        bodySearch.push(item.ProvinceID.toString());
        arrayData.push(item);
      });

      setListParamsProvince(bodySearch);
      fetchListProjectType(bodySearch);
      setListDataLSProvince(arrayData);
      setListIdProject([]);
      setListDataLSProjectType([]);
      setListDataLSProjectType([]);
      setParamsProjectType([]);
      fetchListProjectTypeByProvince(bodySearch);
    }
    fetchListProjectTypeByProvince(bodySearch);
    setCheckSelectProvince(true);
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
      //   setTextSearchValue(textSearch);
      const listProvince = localStorage?.getItem("listParamsLSProvince");
      const listProvinceData = localStorage?.getItem("listDataLSProvince");
      const listProjectType = localStorage?.getItem("listParamsLSProjectType");
      const listProjectData = localStorage?.getItem("listDataLSProjectType");
      const listDataIdProject = localStorage?.getItem("listDataLSProject");
      const listParamsIdProject = localStorage?.getItem("listParamsIdProject");
      //   if (!isEmpty(listProvince)) {
      fetchListProject(JSON.parse(listProjectType));
      fetchListProjectType(JSON.parse(listProvince));
      setListParamsProvince(JSON.parse(listProvince));
      fetchListProjectTypeByProvince(JSON.parse(listProvince));
      //   } else {
      //     fetchListProjectType([]);
      //   }
      //   if (!isEmpty(listProvinceData)) {
      setListDataLSProvince(JSON.parse(listProvinceData));
      //   }

      //   if (!isEmpty(listProjectType) && !isEmpty(listParamsProjectType)) {
      fetchListProject(JSON.parse(listProjectType));
      setParamsProjectType(JSON.parse(listProjectType));
      //   } else {
      //     localStorage.removeItem("listParamsLSProjectType");
      //   }
      //   if (!isEmpty(listProjectData)) {
      setListDataLSProjectType(JSON.parse(listProjectData));
      //   } else {
      //     localStorage.removeItem("listDataLSProjectType");
      //   }
      //   if (!isEmpty(listDataIdProject) && !isEmpty(listIdProject)) {
      setListDataLSProject(JSON.parse(listDataIdProject));
      //   } else {
      //     localStorage.removeItem("listDataLSProject");
      //   }
      //   if (!isEmpty(listParamsIdProject)) {
      setListIdProject(JSON.parse(listParamsIdProject));
      //   } else {
      //     localStorage.removeItem("listParamsIdProject");
      //   }
    }
  }, [router]);

  const handleSelectProject = (dataProjectType: any) => {
    const bodySearch: any = [];
    if (!isEmpty(dataProjectType)) {
      const arrayData: any = [];
      dataProjectType.map((item) => {
        bodySearch.push(item.id);
        arrayData.push(item);
      });

      fetchListProject(bodySearch);
      setParamsProjectType(bodySearch);
      setListDataLSProjectType(arrayData);
    }
    setCheckSelectProjectType(true);
    setCheckSelectProvince(true);
    fetchListProject(bodySearch);
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

  const handleChangeKhoangGia = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
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
  ) => {
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
    localStorage.setItem("typeProduct", JSON.stringify(typeProduct));
    localStorage.setItem("typeSaleProduct", JSON.stringify(typeSaleProduct));
    router.push(
      `/favorite-products?Type=Advanded&&textSearch=${filterSearch.textSearch}&&provinceId=${filterSearch.provinceId}&&projectTypeId=${filterSearch.projectTypeId}&&projectId=${filterSearch.projectId}&&priceFrom=${filterSearch.priceFrom}&&priceTo=${filterSearch.priceTo}&&areaFrom=${filterSearch.areaFrom}&&areaTo=${filterSearch.areaTo}&&sortType=${typeProduct}&&isPayment=${typeSaleProduct}&&favouriteSearch=1`
    );
    setSearchAction(!searchAction);
  };

  const handleResetFilter = () => {
    setSearchBody({
      textSearch: "",
      provinceId: "",
      projectTypeId: "",
      projectId: "",
      priceFrom: (priceFrom as string) ?? "0",
      priceTo: (priceTo as string) ?? "50",
      areaFrom: (areaFrom as string) ?? "0",
      areaTo: (areaTo as string) ?? "1000",
      favouriteSearch: 1,
    });
    localStorage.removeItem("listDataLSProvince");
    localStorage.removeItem("listParamsLSProvince");
    localStorage.removeItem("listDataLSProjectType");
    localStorage.removeItem("listParamsLSProjectType");
    localStorage.removeItem("listDataLSProject");
    localStorage.removeItem("listParamsIdProject");
    localStorage.removeItem("typeProduct");
    localStorage.removeItem("typeSaleProduct");

    router.push(
      `/favorite-products?Type=Advanded&&textSearch=&&provinceId=&&projectTypeId=&&projectId=&&priceFrom=&&priceTo=&&areaFrom=0&&areaTo=1000`
    );
  };

  const fetchComponent = () => {
    return (
      <>
        {!isEmpty(listParamsProjectType) ||
        !isEmpty(listParamsProvince) ||
        !isEmpty(listIdProject) ||
        !isEmpty(listDataLSProjectType) ||
        !isEmpty(textSearch) ||
        !isEmpty(filterSearch.priceFrom) ||
        !isEmpty(filterSearch.priceTo) ||
        (!isEmpty(filterSearch.areaFrom) && filterSearch.areaFrom !== "0") ||
        !isEmpty(filterSearch.areaTo) ? (
          <HuyLocStyled>
            <LinkStyled onClick={handleResetFilter}>
              <IconHuyLoc className="icon-huyloc" />
            </LinkStyled>
          </HuyLocStyled>
        ) : (
          <></>
        )}
      </>
    );
  };
  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpenModal((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };
  const onCompare =
    (
      projectId: string,
      projectType: string,
      thumbnail: string,
      projectName: string,
      name: string,
      productId: string
    ) =>
    () => {
      const dataProjectType = listMenuBarProjectType.filter(
        (item) => item.id === projectType
      );
      const dataProject = listMenuBarType.filter(
        (item) => item.id === projectId
      );
      localStorage.setItem(
        "listDataLSProjectType",
        JSON.stringify([dataProjectType[0]])
      );
      localStorage.setItem(
        "listParamsLSProjectType",
        JSON.stringify([dataProjectType[0].id])
      );
      localStorage.setItem(
        "listDataLSProject",
        JSON.stringify([dataProject[0]])
      );
      localStorage.setItem(
        "listParamsIdProject",
        JSON.stringify([dataProject[0].id])
      );

      dispatch(
        getComparePopUpItem([
          {
            thumbnail: thumbnail,
            projectName: projectName,
            name: name,
            productId: productId,
            projectId: projectId,
            projectType: projectType,
          },
        ])
      );
      // () => {
      //   dispatch(
      //     getComparePopUpItem([
      //       {
      //         thumbnail: thumbnail,
      //         projectName: projectName,
      //         name: name,
      //         productId: productId,
      //         projectId: projectId,
      //         projectType: projectType,
      //       },
      //     ])
      //   );
      router.push({
        pathname: "/compare-search",
        query: {
          //   projectId: projectId,
          //   projectTypeId: projectType,
          priceTo: "50",
          priceFrom: "0",
          areaTo: "1000",
          areaFrom: "0",
        },
      });
      LocalStorage.set("compare-url", {
        projectId: projectId,
        projectTypeId: projectType,
        priceTo: "50",
        priceFrom: "0",
        areaTo: "1000",
        areaFrom: "0",
        categoryId: "",
      });
    };

  const onAdd = () => {
    router.push(
      `/search?Type=Advanded&textSearch=&provinceId=&projectTypeId=&projectId=&priceFrom=&priceTo=&areaFrom=0&areaTo=200`
    );
  };

  return (
    <div style={{ marginTop: 55, width: "100%" }}>
      <ContainerProductFavorite title={"Sản phẩm yêu thích"} checkBread={true}>
        <ContainerFilter>
          <FlexContainer>
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
              //   checkSelectProvince={checkSelectProvince}
              //   checkSelectProjectType={checkSelectProjectType}
              onChange={handleSelectProduct}
              placeholder="Chọn dự án"
              style={{ width: 150, height: 40 }}
            />
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
                      {filterSearch.areaFrom} m2 -&nbsp;
                      {filterSearch.areaTo} m2
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
          </FlexContainer>
          <div style={{ display: "flex" }}>
            <Button
              style={{
                background: "#1B3459",
                width: 125,
                marginTop: matches ? 10 : 35,
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
        </ContainerFilter>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: 5,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              marginBottom: 21,
            }}
          >
            <NumberTotalStyled>{totalTextSearch}</NumberTotalStyled>
            <TextTotalSeach>Sản phẩm yêu thích</TextTotalSeach>
          </div>
          <div>
            <Button style={{ padding: 0 }} onClick={handleClick("bottom")}>
              <LinkStyled>
                <IconSapxep className="icon-sapxep" />
              </LinkStyled>
            </Button>
          </div>
        </div>
        <div>
          {!isEmpty(data) ? (
            <ProductWrap>
              {data?.map((product, index) => (
                <ItemProductCard
                  key={index}
                  id={product.productId}
                  src={product.thumbnail}
                  title={product.name}
                  subTitle={product.projectLocation}
                  build={product.build}
                  projectName={product.projectName}
                  dataItem={{
                    item1:
                      product.projectTypeCode === "1"
                        ? product.buildArea
                        : product.clearArea,
                    item2: product.numBath,
                    item3: product.numBed,
                    item4: product.doorDirection,
                  }}
                  projectTypeCode={product.projectTypeCode}
                  minFloor={product.minFloor}
                  maxFloor={product.maxFloor}
                  priceListed={product.totalPrice}
                  priceSub={product.unitPrice}
                  ticketCard={product.category}
                  floor={product.floor}
                  floorHeight={product.floorHeight}
                  activeSoSanh={true}
                  onCompare={onCompare(
                    product.projectId,
                    product.projectTypeId,
                    product.thumbnail,
                    product.projectName,
                    product.name,
                    product.productionId
                  )}
                  onClick={() => addToCart(product.productionId)}
                  buyDisabled={product.paymentStatus !== 2}
                />
              ))}
            </ProductWrap>
          ) : (
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={4}
            >
              <IconEmptyFav />
              <StyledTitle>
                Chưa có bất động sản nào được quý khách đưa vào yêu thích
              </StyledTitle>
              <StyledButton variant="contained" onClick={onAdd}>
                Thêm bất động sản yêu thích ngay
              </StyledButton>
            </Stack>
          )}
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
                <SwitchComponentFavorite
                  setTypeProduct={setTypeProduct}
                  setTypeSaleProduct={setTypeSaleProduct}
                />
              </PaperStyled>
            </Fade>
          )}
        </Popper>
      </ContainerProductFavorite>
    </div>
  );
};
export default ItemCardFavouriteProduct;
