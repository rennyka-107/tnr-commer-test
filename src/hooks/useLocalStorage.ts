import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import LocalStorage from "utils/LocalStorage";

export default function useLocalStorage(key, inititalValue) {
  const [data, setData] = useState(inititalValue);

  useEffect(() => {
    const dataStorage = LocalStorage.get(key);
    if (dataStorage) setData(dataStorage);
  }, []);

  useEffect(() => {
    if (isEqual(data, inititalValue)) LocalStorage.remove(key);
    else LocalStorage.set(key, data);
  }, [data]);
  
  return [data, setData];
}
