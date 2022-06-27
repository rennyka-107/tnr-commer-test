import { useEffect, useState } from "react";
import { getProjectRecenly } from "../../pages/api/profileApi";

export interface ProductRecenlyI {
  abbreviationName: null;
  avatar: string|null;
  code: string|null;
  commune: string|null;
  constructArea: string|null;
  density: string|null;
  description: string|null;
  diaChi: string|null;
  district: string|null;
  funcDivision: string|null;
  id: string|null;
  location: string|null;
  lsName: string|null;
  modifyDate: string|null;
  name:string|null;
  ownership: string|null;
  provincial: string|null;
  scale: string|null;
  status: string|null;
  tongBanGhi: string|null;
  tradeName: string|null;
  type: string|null;
  viewNum: number|null;
  paymentStatus?:string|number|null;
}

const useProjectRecenly = () => {
  const [dataProductRecenly, setDataProductRecenly] = useState<ProductRecenlyI[]>([]);
  const getList = () => {
    try {
      getProjectRecenly().then((response) => {
        if (response?.responseCode === "00") {
          setDataProductRecenly(response?.responseData);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getList();
  }, []);

  return { dataProductRecenly };
};

export default useProjectRecenly;
