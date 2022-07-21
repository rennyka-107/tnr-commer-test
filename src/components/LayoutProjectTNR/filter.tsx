import BoxContainer from "@components/CustomComponent/BoxContainer";
import SelectLocationProjectType from "@components/CustomComponent/SelectInputComponent/SelectLocationProjectType";
import SelectLocationSearch from "@components/CustomComponent/SelectInputComponent/SelectLocationSearch";
import { IconHuyLoc } from "@components/Icons";
import styled from "@emotion/styled";
import { SelectChangeEvent } from "@mui/material";
import { BodyListProjectI } from "@service/ProjectList";
import isEmpty from "lodash.isempty";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
const TextStyled = styled.span`
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
const TextFilterStyled = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  /* identical to box height, or 100% */

  /* Brand/Main color */

  color: #1b3459;

`;
const LinkStyled = styled.a`
cursor: pointer;
:hover, :hover span {
    color:#ea242a;
}
`

const Filter = (props: PropsI) => {
  const { onSubmit, body } = props;

  const { listMenuBarType, listMenuBarProjectType, listMenuLocation } =
    useSelector((state: RootState) => state.menubar);
  const [location, setLocation] = useState<string[]>([]);

  const handleChangeLocation = (event: SelectChangeEvent<typeof location>) => {
    const {
      target: { value },
    } = event;
    const data = listMenuLocation.filter((x) => x.ProvinceName === value);
    onSubmit({ ...body, provinceId: data[0].ProvinceID.toString() });
    setLocation(typeof value === "string" ? value.split(",") : value);
  };
const handleResetFilter = () => {
	setLocation([]);
	onSubmit({...body, provinceId: ''})
}
  const fetchComponent = () => {
    return (
      <>
        {!isEmpty(location) ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: 20,
              marginTop: 15,
              gap: 10,
            }}
          >
           
              <IconHuyLoc />  <LinkStyled onClick={handleResetFilter}><TextFilterStyled>Hủy lọc</TextFilterStyled> </LinkStyled>
           
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };
  useEffect(() => {
    fetchComponent();
  }, [location]);
  return (
    <div
      style={{ display: "flex", flexDirection: "row", justifyContent: "end" }}
    >
      <div
        style={{ display: "flex", flexDirection: "column", marginRight: 10 }}
      >
        <TextStyled>Vị trí</TextStyled>
        <SelectLocationProjectType
          label="Vị Trí"
          data={listMenuLocation}
          value={location}
          onChange={handleChangeLocation}
          placeholder="Chọn vị trí"
          style={{ width: 150, height: 40 }}
        />
      </div>
      {fetchComponent()}
    </div>
  );
};

export default Filter;
