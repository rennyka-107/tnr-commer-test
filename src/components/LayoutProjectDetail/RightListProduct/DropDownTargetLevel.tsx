import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useEffect, useState } from "react";
import { setGeoJsonData, setTarget } from "../../../../store/projectMapSlice";
import isEmpty from "lodash.isempty";
import {
  apiGetListChildMapByIdLevel,
  apiGetListChildMapByIdParent,
} from "../../../../pages/api/mapProject";

export default function DropDownTargetLevel({ level }: any) {
  const Target = useSelector((state: RootState) => state.projectMap.Target);
  const [formatList, setFormatList] = useState<any[]>([]);
  const dispatch = useDispatch();
  const [label, setLabel] = useState("");

  function fetData(datas: any[]) {
    setFormatList(datas);
    const geojsonArray = [];
    datas.forEach((data) => {
      if (!isEmpty(data.map)) {
        const geodata = JSON.parse(data.map);
        geojsonArray.push({
          ...geodata,
          properties: {
            ...geodata.properties,
            lock: data.status === "1",
            id: data.id,
          },
        });
      }
    });
    dispatch(setGeoJsonData(geojsonArray));
  }

  useEffect(() => {
    if (!isEmpty(level)) {
      setLabel(level.name);
      if (isEmpty(Target) && isEmpty(level.parentId)) {
        apiGetListChildMapByIdLevel(level.id)
          .then((response) => {
            fetData(response.responseData);
          })
          .catch((err) => console.log(err));
      }
      if (!isEmpty(Target)) {
        if (Target.level === level.level - 1) {
          apiGetListChildMapByIdParent(Target.id)
            .then((response) => {
              fetData(response.responseData);
            })
            .catch((err) => console.log(err));
        } else {
          if (Target.level < level.level) {
            setFormatList([]);
          }
        }
      }
    }
  }, [level, Target]);

  return !isEmpty(formatList) ? (
    <Autocomplete
      disablePortal
      disableClearable
      id="combo-box-demo"
      options={formatList}
      sx={{ width: "300px" }}
      popupIcon={<KeyboardArrowDownIcon fontSize="medium" />}
      onChange={(e, value) => {
        dispatch(setTarget({ ...value, level: level.level }));
      }}
      renderInput={(params) => (
        <TextField
          variant="standard"
          {...params}
          placeholder={`Tất cả ${label}`}
          InputProps={{
            ...params.InputProps,
            style: {
              fontSize: "20px",
              fontWeight: "400",
              lineHeight: "23.44px",
            },
            disableUnderline: true,
          }}
        />
      )}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
    />
  ) : (
    <></>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [{ label: "Tiểu khu Nguyệt Quế 1", id: "1" }];
