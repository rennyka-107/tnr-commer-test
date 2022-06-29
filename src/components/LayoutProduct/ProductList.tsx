import ContainerProduct from "@components/Container/ContainerProduct";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import PaginationComponent from "@components/CustomComponent/PaginationComponent";
import Row from "@components/CustomComponent/Row";
import SelectLocationProductPage from "@components/CustomComponent/SelectInputComponent/SelectLocationProductPage";
import SelectTypeProductPage from "@components/CustomComponent/SelectInputComponent/SelectTypeProductPage";
import LoadingComponent from "@components/LoadingComponent";
import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import useProductList from "hooks/useProductList";
import isEmpty from "lodash/isEmpty";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";


const DynamicItemProductComponent = dynamic(
  () => import("@components/LayoutProduct/ItemProduct"),
  { loading: () => <p>...</p> }
);

const ProductList = () => {
  const { listMenuBarProjectType, listMenuLocation } = useSelector(
    (state: RootState) => state.menubar
  );
  const Router = useRouter();
  const { provinceId, projectTypeId } = Router.query;
  const {
    data,
    error,
    loading,
    changePageNumber,
    totalPage,
    changeBody,
    setBody,
    body,
    params,
  } = useProductList();
  const [titleData, setTitleData] = useState("");
  const [valueLocation, setValueLocation] = useState<string[]>([]);
  const [valueType, setValueType] = useState<string[]>([]);

  const [filterSearch, setFilterSearch] = useState<any>({
    projectTypeId: "",
    provinceId: "",
  });
  
  useMemo(() => {
    setFilterSearch({
      projectTypeId: projectTypeId,
      provinceId: provinceId,
    });
  }, [body]);

  useEffect(() => {
	const dataLocation = listMenuLocation.filter(
	  (x) => x.ProvinceID === Number(provinceId)
	);
	if (!isEmpty(dataLocation)) {
	  setValueLocation([dataLocation[0].ProvinceName]);
	}
	const dataProject = listMenuBarProjectType.filter(
	  (x) => x.id === projectTypeId
	);
	if (!isEmpty(dataProject)) {
	  setValueType(
		typeof dataProject[0].name === "string"
		  ? dataProject[0].name.split(",")
		  : dataProject[0].name
	  );
	}
  }, [projectTypeId, provinceId, listMenuBarProjectType, listMenuLocation]);
  
  useEffect(() => {
    const items = listMenuBarProjectType?.find(
      (item) => item.id === projectTypeId
    );
    setTitleData(items?.name);
  }, [listMenuBarProjectType,projectTypeId]);

  const handleChangeLocation = (event: any) => {
    const {
      target: { value },
    } = event;
    const dataLocation = listMenuLocation.filter(
      (x) => x.ProvinceName === value
    );
    setValueLocation(
      typeof dataLocation[0].ProvinceName === "string"
        ? dataLocation[0].ProvinceName.split(",")
        : dataLocation[0].ProvinceName
    );
    if (!isEmpty(dataLocation)) {
      setFilterSearch({
        ...filterSearch,
        provinceId: dataLocation[0].ProvinceID.toString(),
      });
    }
  };

  const handleChangeType = (event: any) => {
	const {
	  target: { value },
	} = event;
	const dataType = listMenuBarProjectType.filter((x) => x.name === value);
	setValueType(
	  typeof dataType[0].name === "string"
		? dataType[0].name.split(",")
		: dataType[0].name
	);
	if (!isEmpty(dataType)) {
	  setFilterSearch({
		...filterSearch,
		projectTypeId: dataType[0].id,
	  });
	}
  //   Router.push(`/products?idProject=${filterSearch.idProject}&&provinceId=${filterSearch.provinceId}&&projectTypeId=${filterSearch.projectTypeId}`)
  };

  useEffect(() => {
    if (typeof filterSearch.provinceId === "string") {
      Router.replace(
        `/productTNR?provinceId=${filterSearch.provinceId}&&projectTypeId=${filterSearch.projectTypeId}`
      );
    }
  }, [filterSearch]);

  const fetchRight = () => {
    return (
      <>
        <FormControl style={{ width: 155, marginRight: 10, height: 48 }}>
          <SelectLocationProductPage
            label="Vị Trí"
            data={listMenuLocation}
            value={valueLocation}
            onChange={handleChangeLocation}
            placeholder="Chọn vị trí"
            style={{ width: 150, height: 40 }}
          />
        </FormControl>
        <FormControl style={{ width: 200, height: 48 }}>
          <SelectTypeProductPage
            label="Loại"
            data={listMenuBarProjectType}
            value={valueType}
            onChange={handleChangeType}
            placeholder="Chọn Loại"
            style={{ width: 200, height: 40 }}
          />
        </FormControl>
      </>
    );
  };

  const fetchComponent = () => {
    return (
      <>
        {loading === true ? (
          <>
            <div style={{ textAlign: "center", marginTop: 300 }}>
              <LoadingComponent />
            </div>
          </>
        ) : (
          <>
            <DynamicItemProductComponent data={data} />
          </>
        )}
      </>
    );
  };

  useEffect(() => {
    fetchComponent();
  }, [loading]);

  return (
    <FlexContainer>
      <ContainerProduct
        title={titleData ? titleData : ""}
        rightContent={fetchRight()}
      >
        <>{fetchComponent()}</>
        <>
          <Row customStyle={{ padding: 70, justifyContent: "center" }}>
            <PaginationComponent
              count={totalPage}
              onChange={(event, page) => {
                changePageNumber(page - 1);
              }}
              page={params.page + 1}
            />
          </Row>
        </>
      </ContainerProduct>
    </FlexContainer>
  );
};

export default ProductList;
