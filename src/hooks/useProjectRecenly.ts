import { useEffect, useState } from "react";
import LocalStorage from "utils/LocalStorage";
import SessionStorage from "utils/SessionStorage";
import { getProjectRecenly } from "../../pages/api/profileApi";

export interface ProductRecenlyI {
  abbreviationName?: null;
  avatar?: string | null;
  code?: string | null;
  commune?: string | null;
  constructArea?: string | null;
  density?: string | null;
  description?: string | null;
  diaChi?: string | null;
  district?: string | null;
  funcDivision?: string | null;
  id?: string | null;
  location?: string | null;
  lsName?: string | null;
  modifyDate?: string | null;
  name?: string | null;
  ownership?: string | null;
  provincial?: string | null;
  scale?: string | null;
  status?: string | null;
  tongBanGhi?: string | null;
  tradeName?: string | null;
  type?: string | null;
  viewNum?: number | null;
  paymentStatus?: string | number | null;
}

const AllProject = {
  id: "1",
  name: "Tất cả",
};

const useProjectRecenly = () => {
  const [dataProductRecenly, setDataProductRecenly] = useState<
    ProductRecenlyI[]
  >([]);
  const getList = () => {
    try {
      if (
        LocalStorage.get("accessToken") ||
        SessionStorage.get("accessToken")
      ) {
        getProjectRecenly().then((response) => {
          if (response?.responseCode === "00") {
            const dataProject = [
              // {
              //   id: "1",
              //   name: "Tất cả dự án",
              // },
            ];
            const newDataProject = dataProject.concat(response?.responseData);
            setDataProductRecenly(newDataProject);
          }
        });
      }
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
