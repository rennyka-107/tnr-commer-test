import BoxContainer from "@components/CustomComponent/BoxContainer";
import LocationMultipeCheckbox from "@components/CustomComponent/ListCheckboxDropdown/LocationMultipeCheckbox";
import ProjectTypeCheckboxDropdown from "@components/CustomComponent/ListCheckboxDropdown/ProjectTypeCheckboxDropdown";
import PopperProjectType from "@components/CustomComponent/ListCheckboxDropdown/PopperProject";
import SelectLocationProjectType from "@components/CustomComponent/SelectInputComponent/SelectLocationProjectType";
import SelectLocationSearch from "@components/CustomComponent/SelectInputComponent/SelectLocationSearch";
import {
  IconFilterSearch,
  IconHuyLoc,
  SearchIconSearchPage,
} from "@components/Icons";
import styled from "@emotion/styled";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { BodyListProjectI } from "@service/ProjectList";
import isEmpty from "lodash.isempty";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListProjectByProjectType,
  getListProjectTypeByListIdProvince,
} from "../../../pages/api/paramSearchApi";
import {
  getListProjectResponse,
  getListProjectTypeResponse,
} from "../../../store/paramsSearchSlice";
import PopperComponent from "@components/CustomComponent/ListCheckboxDropdown/PopperComponent";
import { RootState } from "../../../store/store";
interface PropsI {
  onSubmit?: (values: BodyListProjectI) => void;
  body?: BodyListProjectI;
}

const DynamicMenuDropdown = dynamic(() =>
  import("ItemComponents/MenuDropdown").then(
    (m) => m.default,
    (e) => null as never
  )
);
const TextStyled = styled(InputBase)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  width: 250px;
  background: #ffffff;
  border: 1px solid #c7c9d9;
  border-radius: 8px;
  height: 40px;
  color: #8190a7;
  padding: 19px;
`;
const TextFilterStyled = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  /* identical to box height, or 100% */

  /* Brand/Main color */

  color: #1b3459;
  ". &muiinputbase-root-muioutlinedinput-root": {
    height: 40px;
  }
`;
const LinkStyled = styled.a`
  cursor: pointer;
  :hover,
  :hover span {
    color: #ea242a;
  }
`;
const useStyles = makeStyles((theme) => ({
  //   root: {
  //     "& .MuiInputBase-root": {
  //       borderRadius: "8px",
  //       height: 40,
  //     },
  //   },
}));

const LabelStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  /* identical to box height, or 24px */

  letter-spacing: 0.005em;

  /* Shades/Dark 3 */

  color: #8190a7;
`;

const ContainerFilter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 60px;
  @media screen and (max-width: 1440px) {
    flex-direction: column;
    gap: 0px;
    justify-content: center;
    align-items: center;
  }
`;
const ContainerLoc = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  @media screen and (max-width: 1440px) {
    width: 400px;
    margin-left: 160px;
  }
`;

const Filter = (props: PropsI) => {
  const { onSubmit, body } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const { type } = router.query;
  const { listMenuBarType, listMenuBarProjectType, listMenuLocation } =
    useSelector((state: RootState) => state.menubar);
  const { projectTypeListResponse, projectListResponse } = useSelector(
    (state: RootState) => state.paramsSearch
  );
  const [checkSelectProvince, setCheckSelectProvince] = useState(false);
  const [location, setLocation] = useState<string[]>([]);
  const [textSearchValue, setTextSearchValue] = useState<any>("");
  const [listParamsProvince, setListParamsProvince] = useState([]);
  const [listDataLSProvince, setListDataLSProvince] = useState([]);
  const [dataRouter, setDataRouter] = useState([]);
  const [projectName, setProjectName] = useState<string[]>([]);
  const [listParamsProjectType, setParamsProjectType] = useState([]);
  const [listDataLSProjectType, setListDataLSProjectType] = useState([]);

  useEffect(() => {
    if (!isEmpty(type)) {
      localStorage.setItem("listParamsLSProjectType", JSON.stringify([type]));
      setParamsProjectType([type]);
    } else if (type !== undefined) {
      localStorage.setItem("listParamsLSProjectType", JSON.stringify([]));
      setParamsProjectType([]);
    } else {
    }
  }, [router]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const filterData = listMenuBarProjectType.filter(
        (item) => item.id === type
      );
      if (filterData) {
        localStorage.setItem(
          "listDataLSProjectType",
          JSON.stringify(filterData)
        );
        setListDataLSProjectType(filterData);
      }
    }
  }, [listMenuBarProjectType, type]);

  const handleResetFilter = () => {
    onSubmit({ ...body, provinceId: "", textSearch: "", projectTypeId: "" });
    localStorage.removeItem("listDataLSProvince");
    localStorage.removeItem("listParamsLSProvince");
    localStorage.removeItem("listDataLSProjectType");
    localStorage.removeItem("listParamsLSProjectType");
    setListDataLSProvince([]);
    setListParamsProvince([]);
    setListDataLSProjectType([]);
    setParamsProjectType([]);
    setTextSearchValue("");
    router.push(`projectTNR?type=&textSearch=""`);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      //   setTextSearchValue(textSearch);
      const listProvince = localStorage?.getItem("listParamsLSProvince");
      const listProvinceData = localStorage?.getItem("listDataLSProvince");
      const listProjectType = localStorage?.getItem("listParamsLSProjectType");
      const listProjectData = localStorage?.getItem("listDataLSProjectType");
      if (!isEmpty(listProvince)) {
        fetchListProjectType(JSON.parse(listProvince));
        setListParamsProvince(JSON.parse(listProvince));
        fetchListProjectTypeByProvince(JSON.parse(listProvince));
      } else {
        fetchListProjectType([]);
        setListDataLSProvince([]);
        setListParamsProvince([]);
      }
      if (!isEmpty(listProvinceData)) {
        setListDataLSProvince(JSON.parse(listProvinceData));
      }
      if (
        (!isEmpty(listProjectType) && !isEmpty(listParamsProjectType)) ||
        type !== ""
      ) {
        setParamsProjectType(JSON.parse(listProjectType));
      } else {
        setListDataLSProjectType([]);
        setParamsProjectType([]);
        // localStorage.removeItem("listParamsLSProjectType");
      }
      if (!isEmpty(listProjectData) || type !== "") {
        setListDataLSProjectType(JSON.parse(listProjectData));
      } else {
        localStorage.removeItem("listDataLSProjectType");
      }
    }
  }, [router, listMenuBarProjectType]);

  const fetchComponent = () => {
    return (
      <>
        {!isEmpty(listParamsProjectType) ||
        !isEmpty(listParamsProvince) ||
        !isEmpty(textSearchValue) ||
        type ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "20px 0px 0px 0px",
              marginTop: 15,
              gap: 10,
              width: 200,
            }}
          >
            <LinkStyled onClick={handleResetFilter}>
              <IconHuyLoc className="icon-huyloc" />
            </LinkStyled>
            {/* <LinkStyled onClick={handleResetFilter}>
              <TextFilterStyled>Hủy lọc</TextFilterStyled>{" "}
            </LinkStyled> */}
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };
  useEffect(() => {
    fetchComponent();
  }, [listParamsProjectType]);

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

  const handleClickSearch = () => {
    router.push(
      `/projectTNR?type=${
        !isEmpty(listParamsProjectType[0]) ? listParamsProjectType[0] : ""
      }&textSearch=${textSearchValue}`
    );
    onSubmit({ ...body, provinceId: "", textSearch: textSearchValue });
  };
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    // setFilterSearch({
    //   ...filterSearch,
    //   textSearch: value,
    // });
    setTextSearchValue(value);
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
    fetchListProjectTypeByProvince(bodySearch);
  };

  const handleSelectProject = (dataProjectType: any) => {
    // if (dataProjectType) {
    const bodySearch: any = [];
    const arrayData: any = [];
    dataProjectType.map((item) => {
      bodySearch.push(item?.id);
      arrayData.push(item);
    });
    setParamsProjectType(bodySearch);
    setListDataLSProjectType(arrayData);
    // }
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

    router.push(
      `/projectTNR?type=${
        !isEmpty(listParamsProjectType[0]) ? listParamsProjectType[0] : ""
      }`
    );
    onSubmit({ ...body, provinceId: "", textSearch: textSearchValue });
  };

  return (
    <ContainerFilter>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginRight: 10,
          alignItems: "center",
          gap: 60,
        }}
      >
        <FormControl sx={{ m: 1, mt: 3, width: 250 }}>
          <LabelStyled>Tìm kiếm</LabelStyled>
          <TextStyled
            // className={classes.root}
            onChange={handleChange}
            placeholder="Nhập tên dự án..."
            value={textSearchValue}
            inputProps={{ "aria-label": "search google maps" }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  type="submit"
                  aria-label="search"
                  onClick={handleClickSearch}
                >
                  <SearchIconSearchPage />
                </IconButton>
              </InputAdornment>
            }
            onKeyPress={(ev) => {
              if (ev.key === "Enter") {
                router.push(`/projectTNR?type=&textSearch=${textSearchValue}`);
                ev.preventDefault();
              }
            }}
          />
        </FormControl>
        {/* <LocationMultipeCheckbox
          label="Vị Trí"
          data={listMenuLocation}
          listLocation={location}
          onChange={handleChangeLocation}
          placeholder="Chọn vị trí"
          style={{ width: 150, height: 40 }}
        />
        <ProjectTypeCheckboxDropdown
          label="Loại BĐS"
          data={projectTypeListResponse}
          checkSelectProvince={checkSelectProvince}
          listProjectType={projectName}
          onChange={handleSelectProject}
          placeholder="Loại BĐS"
          style={{ width: 150, height: 40 }}
        /> */}
        <PopperComponent
          label="Vị Trí"
          data={listMenuLocation}
          listLocation={location}
          onChange={handleChangeLocation}
          listDataLSProvince={listDataLSProvince}
          placeholder="Chọn vị trí"
          style={{ width: 250, height: 60 }}
        />
        <PopperProjectType
          label="Loại BĐS"
          data={projectTypeListResponse}
          checkSelectProvince={checkSelectProvince}
          listProjectType={projectName}
          onChange={handleSelectProject}
          placeholder="Loại BĐS"
          style={{ width: 250, height: 60 }}
        />
      </div>
      <ContainerLoc>
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
      </ContainerLoc>
    </ContainerFilter>
  );
};

export default Filter;
