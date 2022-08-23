import * as React from "react";
import Button from "@mui/material/Button";
import { IconSearchAdvan } from "@components/Icons";
import styled from "@emotion/styled";
import { Fade, Paper, Popper, PopperPlacementType } from "@mui/material";
import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material/Select";
import { Theme } from "@mui/material/styles";
import SliderComponent from "@components/CustomComponent/SliderComponent";
import SelectInputComponent from "@components/CustomComponent/SelectInputComponent";
import SliderSearchKhoangGia from "@components/CustomComponent/SliderComponent/SliderSearchKhoangGia";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useRouter } from "next/router";
import SlectLocation from "@components/CustomComponent/SelectInputComponent/SlectLocation";
import LocationMultipeCheckbox from "@components/CustomComponent/ListCheckboxSearchAdvand/LocationMultipeCheckbox";
import ProjectTypeCheckboxDropdown from "@components/CustomComponent/ListCheckboxSearchAdvand/ProjectTypeCheckboxDropdown";
import ProjectDropdown from "@components/CustomComponent/ListCheckboxSearchAdvand/ProjectDropDown";
import {
  getListProjectByProjectType,
  getListProjectTypeByListIdProvince,
} from "../../../../pages/api/paramSearchApi";
import {
  getListProjectResponse,
  getListProjectTypeResponse,
} from "../../../../store/paramsSearchSlice";
import { isEmpty } from "lodash";
import GitHubLabel from "@components/CustomComponent/ListCheckboxSearchAdvand/PopperComponent";
import PopperProjectType from "@components/CustomComponent/ListCheckboxSearchAdvand/PopperProject";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 10;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const TextBannerBottom = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */s

  text-align: right;

  /* Brand/Sub 1 */

  color: #fec83c;
  text-transform: none;
  margin-left: 13px;
`;
const BodyContainer = styled.div`
  width: 1115px;
  height: 350px;
  background: #1b3459;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.12);
`;
const BoxStyled = styled(Box)`
padding: 40px;
    display: flex;
    gap: 30px;
}
`;

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const minDistance = 10;
const minDistance2 = 1;
export default function ModalAdvanSearch() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { listMenuBarType, listMenuBarProjectType, listMenuLocation } =
    useSelector((state: RootState) => state.menubar);
  const { projectTypeListResponse, projectListResponse } = useSelector(
    (state: RootState) => state.paramsSearch
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();

  const [checkSelectProvince, setCheckSelectProvince] = React.useState(false);
  const [checkSelectProjectType, setCheckSelectProjectType] =
    React.useState(false);
  const [listParamsProvince, setListParamsProvince] = React.useState([]);
  const [listParamsProjectType, setParamsProjectType] = React.useState([]);
  const [listIdProject, setListIdProject] = React.useState([]);
  const [listDataLSProvince, setListDataLSProvince] = React.useState([]);
  const [listDataLSProject, setListDataLSProject] = React.useState([]);
  const [listDataLSProjectType, setListDataLSProjectType] = React.useState([]);

  const [productName, setProductName] = React.useState<string[]>([]);
  const [projectName, setProjectName] = React.useState<string[]>([]);
  const [location, setLocation] = React.useState<string[]>([]);
  const [valueDienTich, setValueDientich] = React.useState<number[]>([30, 200]);
  const [valueKhoanGia, setValueKhoangGia] = React.useState<number[]>([1, 200]);

  const [search, setSearch] = React.useState({
    textSearch: "",
    provinceId: "",
    projectTypeId: "",
    projectId: "",
    priceFrom: ("1" as string) ?? "1",
    priceTo: ("20" as string) ?? "20",
    areaFrom: ("30" as string) ?? "30",
    areaTo: ("200" as string) ?? "200",
  });
  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  const handleChange = (event: SelectChangeEvent<typeof productName>) => {
    const {
      target: { value },
    } = event;
    const data = listMenuBarProjectType.filter((x) => x.name === value);
    setSearch({ ...search, projectTypeId: data[0].id });
    setProductName(typeof value === "string" ? value.split(",") : value);
  };
  const handleChangeProject = (
    event: SelectChangeEvent<typeof projectName>
  ) => {
    const {
      target: { value },
    } = event;
    const data = listMenuBarType.filter((x) => x.name === value);
    setSearch({ ...search, projectId: data[0].id });
    setProjectName(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeLocation = (data: any) => {
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
  };
  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    setValueDientich([newValue[0], newValue[1]]);
    setSearch({
      ...search,
      areaFrom: newValue[0].toString(),
      areaTo: newValue[1].toString(),
    });
  };

  const handleChange2 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    setValueKhoangGia([newValue[0], newValue[1]]);
    setSearch({
      ...search,
      priceFrom: newValue[0].toString(),
      priceTo: newValue[1].toString(),
    });
  };

  const handleSelectProject = (dataProjectType: any) => {
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
  };
  const handleSelectProduct = (data: any) => {
    const bodySearch: any = [];
    const arr: any = [];
    // data.map((item) => {
    bodySearch.push(data.id);
    arr.push(data);
    // })
    setListDataLSProject(arr);
    setListIdProject(bodySearch);

    // console.log(data)
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
      `/search?Type=Advanded&&textSearch=&&provinceId=${search.provinceId}&&projectTypeId=${search.projectTypeId}&&projectId=${search.projectId}&&priceFrom=${search.priceFrom}&&priceTo=${search.priceTo}&&areaFrom=${search.areaFrom}&&areaTo=${search.areaTo}`
    );
  };
  React.useEffect(() => {
    fetchListProject([]);
  }, []);
  return (
    <div>
      <Button onClick={handleClick("bottom")}>
        <IconSearchAdvan />
        <TextBannerBottom>Tìm kiếm nâng cao</TextBannerBottom>
      </Button>

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
        style={{ zIndex: 1000 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <BodyContainer>
                <BoxStyled sx={{ minWidth: 120 }}>
                  {/* <LocationMultipeCheckbox
                    label="Vị Trí"
                    data={listMenuLocation}
                    listLocation={location}
                    onChange={handleChangeLocation}
                    placeholder="Chọn vị trí"
                    style={{ width: 305, height: 54 }}
                  /> */}
				  <GitHubLabel 
				      label="Vị Trí"
					  data={listMenuLocation}
					  listLocation={location}
					  onChange={handleChangeLocation}
					  placeholder="Chọn vị trí"
					  style={{ width: 305, height: 54 }}
				  />
				    <PopperProjectType 
				      label="Loại BĐS"
					  data={projectTypeListResponse}
					  checkSelectProvince={checkSelectProvince}
					  listProjectType={projectName}
					  onChange={handleSelectProject}
					  placeholder="Loại BĐS"
					  style={{ width: 305, height: 54 }}
				  />
                  {/* <ProjectTypeCheckboxDropdown
                    label="Loại BĐS"
                    data={projectTypeListResponse}
                    checkSelectProvince={checkSelectProvince}
                    listProjectType={projectName}
                    onChange={handleSelectProject}
                    placeholder="Loại BĐS"
                    style={{ width: 305, height: 54 }}
                  /> */}
                  <ProjectDropdown
                    label="Chọn dự án"
                    data={projectListResponse}
                    listProject={productName}
                    checkSelectProvince={checkSelectProvince}
                    checkSelectProjectType={checkSelectProjectType}
                    onChange={handleSelectProduct}
                    placeholder="Chọn dự án"
                    style={{ width: 305, height: 54 }}
                  />
                  {/* <SlectLocation
                    label="Vị Trí"
                    data={listMenuLocation}
                    value={location}
                    onChange={handleChangeLocation}
                    placeholder="Chọn vị trí"
                  />

                  <SelectInputComponent
                    label="Loại bất động sản"
                    data={listMenuBarProjectType}
                    value={productName}
                    onChange={handleChange}
                    placeholder="Chọn loại bất động sản"
                  />

                  <SelectInputComponent
                    label="Dự án"
                    data={listMenuBarType}
                    value={projectName}
                    onChange={handleChangeProject}
                    placeholder="Chọn Dự án"
                  /> */}
                </BoxStyled>
                <BoxStyled
                  style={{
                    justifyContent: "space-between",
                    padding: "0px 98px 40px 48px",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", gap: 50 }}>
                    <SliderComponent
                      label="Diện tích (m2)"
                      onChange={handleChange1}
                      numberMin={30}
                      numberMax={200}
                      value={valueDienTich}
                      unit="m2"
                    />
                    <SliderSearchKhoangGia
                      label="Khoảng giá"
                      onChange={handleChange2}
                      numberMin={1}
                      numberMax={20}
                      value={valueKhoanGia}
                      unit="tỷ"
                    />
                  </div>
                  <div>
                    <Button
                      style={{
                        backgroundColor: "#D60000",
                        width: 163,
                        height: 48,
                        borderRadius: 8,
                      }}
                      onClick={handleSearch}
                    >
                      <span
                        style={{
                          color: "#FFFFFF",
                          fontFamily: "Roboto",
                          fontWeight: 400,
                          fontSize: 16,
                          lineHeight: 19,
                          textTransform: "none",
                        }}
                      >
                        {" "}
                        Tìm kiếm
                      </span>
                    </Button>
                  </div>
                </BoxStyled>
              </BodyContainer>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
