import { useEffect, useState } from "react";
import {
  apiGetLOT,
  apiGetPropductCategory,
} from "../../../pages/api/getDataSelectApi";
import ControllerSelect from "./ControllerSelect";

interface PropsI {
  name: string;
  label: string;
  control: any;
  setValue: any;
  idProject: string;
  required?: boolean;
  isClear?: boolean;
  idProjectType: string;
  style?: any;
}

interface optionI {
  label: string;
  value: number;
}

const LOTSelect = (props: PropsI) => {
  const {
    control,
    label,
    name,
    setValue,
    idProject,
    required,
    isClear,
    style,
    idProjectType,
  } = props;
  const [data, setData] = useState<optionI[]>([]);
  const getList = (idProject: string, idProjectType: string) => {
    try {
      apiGetLOT(idProject, idProjectType).then((response) => {
        if (response?.responseCode === "00") {
          const temp = response?.responseData?.map((el) => {
            const district: optionI = {
              label: el,
              value: el,
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
    if (!!idProject && !!idProjectType) {
      getList(idProject, idProjectType);
      return;
    }
    if (data?.length != 0) setData([]);
  }, [idProject, idProjectType]);
  return (
    <ControllerSelect
      style={style}
      variant="outlined"
      name={name}
      label={label}
	  
      control={control}
      setValue={setValue}
      dataSelect={data}
      required={required}
      isClear={isClear}
    />
  );
};

export default LOTSelect;
