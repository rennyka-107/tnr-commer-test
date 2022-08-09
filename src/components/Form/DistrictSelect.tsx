import React, { useEffect, useState } from "react";
import { apiGetListDistrict } from "../../../pages/api/locationApi";
import ControllerSelectAutoComplete from "./ControllerSelectAutoComplete";

interface PropsI {
  name: string;
  label: string;
  control: any;
  setValue: any;
  provinceName: string;
  disabled?: boolean;
}

interface optionI {
  label: string;
  value: string;
}

const DistricSelect = (props: PropsI) => {
  const { control, label, name, setValue, provinceName, disabled } = props;
  const [data, setData] = useState<optionI[]>([]);
  const getList = (name: string) => {
    try {
      apiGetListDistrict({ provinceName: name, pageNumber: 0, pageSize: 999 }).then(
        (response) => {
          if (response?.responseCode === "00") {
            const temp = response?.responseData?.map((el) => {
              const district: optionI = {
                label: el.DistrictName,
                value: el.DistrictName,
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
    if (!!provinceName) {
      getList(provinceName);
    }
  }, [provinceName]);
  return (
    <ControllerSelectAutoComplete
      variant="outlined"
      name={name}
      label={label}
      control={control}
      setValue={setValue}
      options={data}
      disabled={disabled}
    />
  );
};

export default DistricSelect;
