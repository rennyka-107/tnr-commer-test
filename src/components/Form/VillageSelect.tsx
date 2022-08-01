import React, { useEffect, useState } from "react";
import { apiGetListDistrict } from "../../../pages/api/locationApi";
import ControllerSelectAutoComplete from "./ControllerSelectAutoComplete";

interface PropsI {
  name: string;
  label: string;
  control: any;
  setValue: any;
  districtId: number;
}

interface optionI {
  label: string;
  value: number;
}

const VillageSelect = (props: PropsI) => {
  const { control, label, name, setValue, districtId } = props;
  const [data, setData] = useState<optionI[]>([]);
  const getList = (id: number) => {
    try {
      apiGetListDistrict({ provinceId: id, pageNumber: 0, pageSize: 999 }).then(
        (response) => {
          if (response?.responseCode === "00") {
            const temp = response?.responseData?.map((el) => {
              const district: optionI = {
                label: el.DistrictName,
                value: el.DistrictID,
              };
              return district;
            });
            setData(temp);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!!districtId) {
      getList(districtId);
    }
  }, [districtId]);
  
  return (
    <ControllerSelectAutoComplete
      variant="outlined"
      name={name}
      label={label}
      control={control}
      setValue={setValue}
      options={data}
    />
  );
};

export default VillageSelect;
