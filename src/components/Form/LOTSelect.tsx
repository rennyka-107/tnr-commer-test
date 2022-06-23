import { useEffect, useState } from "react";
import { apiGetLOT, apiGetPropductCategory } from "../../../pages/api/getDataSelectApi";
import ControllerSelect from "./ControllerSelect";

interface PropsI {
    name: string,
    label: string,
    control: any,
    setValue: any,
    idProject: string;
    required?:boolean;
    isClear?:boolean;
}

interface optionI { label: string, value: number }

const LOTSelect = (props: PropsI) => {
    const { control, label, name, setValue, idProject ,required,isClear} = props;
    const [data, setData] = useState<optionI[]>([]);
    const getList = (id: string) => {
        try {
            apiGetLOT(id).then((response) => {
                if (response?.responseCode === "00") {
                    const temp = response?.responseData?.map((el) => {
                        const district: optionI = {
                            label: el?.name,
                            value: el?.id
                        }
                        return district;
                    })
                    setData(temp);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!!idProject) {
            getList(idProject);
            return ;
        }
        if (data?.length != 0) setData([]);
    }, [idProject])
    return (
        <ControllerSelect
            variant="outlined"
            name={name}
            label={label}
            control={control}
            setValue={setValue}
            dataSelect={data}
            required={required}
            isClear={isClear}
        />
    )
}

export default LOTSelect;