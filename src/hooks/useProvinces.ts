import { useEffect, useState } from "react";
import { apiGetListProvinces } from "../../pages/api/locationApi";

interface ProvinceI {
  provinceId: number;
  provinceName: string;
  syncDate: string;
  syncFrom: string;
}

const useProvinces = () => {
  const [dataProvinces, setDataProvinces] = useState<ProvinceI[]>([]);

  const getList = () => {
    try {
      apiGetListProvinces().then((response) => {
        if (response?.responseCode === "00") {
          setDataProvinces(response?.responseData);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getList();
  }, []);

  return { dataProvinces };
};

export default useProvinces;
