import { useEffect, useState } from "react";
import {
  apiGetFloorBoard,
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
  projectLevel1: string;
  style?: any;
}

interface optionI {
  label: string;
  value: number;
}

const FLOORSelect = (props: PropsI) => {
  const {
    control,
    label,
    name,
    setValue,
    idProject,
    required,
    isClear,
    style,
    projectLevel1,
  } = props;
  const [data, setData] = useState<optionI[]>([]);
  const getList = (idProject: string, projectLevel1: string) => {
    try {
      apiGetFloorBoard(idProject, projectLevel1).then((response) => {
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
    if (!!idProject && !!projectLevel1) {
      getList(idProject, projectLevel1);
      return;
    }
    if (data?.length != 0) setData([]);
  }, [idProject, projectLevel1]);
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

export default FLOORSelect;
