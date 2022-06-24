import FlexContainer from "@components/CustomComponent/FlexContainer";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import isEmpty from "lodash/isEmpty";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import { ProductsResponse } from "interface/product";
import { ProjectResponse } from "interface/project";
import { useSelector } from "react-redux";
import ContainerProduct from "@components/Container/ContainerProduct";
import { RootState } from "../../../store/store";
import { useEffect, useMemo, useState } from "react";
import SelectLocationProductPage from "@components/CustomComponent/SelectInputComponent/SelectLocationProductPage";
import SelectLocationSearch from "@components/CustomComponent/SelectInputComponent/SelectLocationSearch";
import SelectTypeProductPage from "@components/CustomComponent/SelectInputComponent/SelectTypeProductPage";
import { useRouter } from "next/router";

interface ProductsProps {
  listProducts?: ProductsResponse[];
  listProject?: ProjectResponse[];
}

const TextHeaderStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 33px;

  /* Brand */

  color: #1b3459;
`;

const DynamicItemProductComponent = dynamic(
  () => import("@components/LayoutProduct/ItemProduct"),
  { loading: () => <p>...</p> }
);

const ProductPages = ({ listProducts, listProject }: ProductsProps) => {
  const Router = useRouter();
  const { idProject, provinceId, projectTypeId } = Router.query;

    const { listMenuBarProjectType, listMenuLocation } = useSelector(
      (state: RootState) => state.menubar
    );
    const [filterSearch, setFilterSearch] = useState({
      projectTypeId: projectTypeId,
      provinceId: provinceId,
      idProject: idProject,
    });

    const [valueLocation, setValueLocation] = useState<string[]>([]);
    const [valueType, setValueType] = useState<string[]>([]);

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
        // Router.replace(`/products?idProject=${filterSearch.idProject}&&provinceId=${filterSearch.provinceId}&&projectTypeId=${filterSearch.projectTypeId}`)
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
      Router.replace(
        `/products?idProject=${filterSearch.idProject}&&provinceId=${filterSearch.provinceId}&&projectTypeId=${filterSearch.projectTypeId}`
      );
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
  
  return (
    <FlexContainer>
      <ContainerProduct
        title={listProject ? listProject[0]?.name : ""}
        rightContent={fetchRight()}
      >
        <DynamicItemProductComponent data={listProducts} />
      </ContainerProduct>
    </FlexContainer>
  );
};

export default ProductPages;
