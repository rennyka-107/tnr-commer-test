import React, { useEffect, useState } from "react";
import { apiGetListCommune } from "../../../pages/api/locationApi";
import ControllerSelectAutoComplete from "./ControllerSelectAutoComplete";

interface PropsI {
  name: string;
  label: string;
  control: any;
  setValue: any;
  districtName: string;
  provinceName: string;
  disabled?: boolean;
  required?: boolean;
}

interface optionI {
  label: string;
  value: string;
}

const CommuneSelect = (props: PropsI) => {
  const { control, label, name, setValue, districtName, provinceName, disabled, required } = props;
  const [data, setData] = useState<optionI[]>([]);

  const getList = (provinceName: string, districtName: string) => {
    try {
      apiGetListCommune(provinceName, districtName).then((response) => {
        if (response?.responseCode === "00") {
          const temp = response?.responseData?.map((el) => {
            const district: optionI = {
              label: el.CommuneName,
              value: el.CommuneName,
            };
            return district;
          });
          setData(temp);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!!districtName && !!provinceName) {
      getList(provinceName, districtName);
    }
  }, [districtName, provinceName]);

  return (
    <ControllerSelectAutoComplete
    fzLabel="16px"
      variant="outlined"
      required={required}
      name={name}
      label={label}
      control={control}
      setValue={setValue}
      options={data}
      disabled={disabled}
    />
  );
};

export default CommuneSelect;
