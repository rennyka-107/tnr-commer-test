import { useEffect, useState } from "react"
import { getListCustomerType } from "../../pages/api/profileApi";

interface CustomTypeI {
    description: string | null,
    id: string,
    name: string,
}

const useCustomType = () => {
    const [dataCustomType, setDataCustomType] = useState<CustomTypeI[]>([]);
    const getList = () => {
        try {
            getListCustomerType().then((response) => {
                if (response?.responseCode === "00") {
                    setDataCustomType(response?.responseData);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getList();
    }, []);

    return { dataCustomType }
}

export default useCustomType;