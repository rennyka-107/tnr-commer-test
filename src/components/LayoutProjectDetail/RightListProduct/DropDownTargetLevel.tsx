import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useEffect, useRef, useState } from "react";
import {
  setGeoJsonData,
  setListChild,
  setTarget,
  setImgMap,
} from "../../../../store/projectMapSlice";
import isEmpty from "lodash.isempty";
import {
  apiGetListChildMapByIdLevel,
  apiGetListChildMapByIdParent,
} from "../../../../pages/api/mapProject";

export default function DropDownTargetLevel({ level }: any) {
  const Target = useSelector((state: RootState) => state.projectMap.Target);
  const TargetShape = useSelector(
    (state: RootState) => state.projectMap.TargetShape
  );
  const ListLevel = useSelector(
    (state: RootState) => state.projectMap.ListLevel
  );
  const [formatList, setFormatList] = useState<any[]>([]);
  const [value, setValue] = useState<any>(null);
  const dispatch = useDispatch();
  const [label, setLabel] = useState("");
  const ref = useRef<any>(null);

  useEffect(() => {
    if (!isEmpty(TargetShape) && TargetShape.level === level.level) {
      const newTarget = formatList.find((data) => data.id === TargetShape.id);
      if (!isEmpty(newTarget) && !isEmpty(ref?.current)) {
        dispatch(setTarget(newTarget));
        setValue(newTarget);
      }
    }
  }, [TargetShape]);

  function fetData(datas: any[]) {
    const geojsonArray = [];
    setFormatList(
      datas.map((data) => {
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
        return { ...data, level: level.level };
      })
    );
    dispatch(setGeoJsonData(geojsonArray));
  }

  useEffect(() => {
    if (!isEmpty(Target)) {
      if (Target.type === "1" && !isEmpty(Target.imgMap)) {
        dispatch(setImgMap(Target.imgMap));
      } else {
        if (Target.level === level.level - 1) {
          const parent = formatList.find((item) => item.id === Target.parentId);
          if (!isEmpty(parent) && !isEmpty(parent.imgMap)) {
            dispatch(setImgMap(parent.imgMap));
          } else {
            dispatch(setImgMap(ListLevel[0]["map"]));
          }
        }
      }
    }
  }, [Target, ListLevel, formatList]);

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
          if (
            Target.level === level.level &&
            Target.level === ListLevel.length - 2
          ) {
            apiGetListChildMapByIdParent(Target.id)
              .then((response) => {
                dispatch(
                  setListChild(
                    response.responseData.map((data) => ({
                      ...data,
                      level: ListLevel.length - 1,
                    }))
                  )
                );
              })
              .catch((err) => console.log(err));
          }
        }
      }
    }
  }, [level, Target]);

  return !isEmpty(formatList) ? (
    <Autocomplete
      ref={ref}
      value={value}
      disablePortal
      disableClearable
      id="combo-box-demo"
      options={formatList}
      sx={{ width: "300px" }}
      popupIcon={<KeyboardArrowDownIcon fontSize="medium" />}
      onChange={(e, value) => {
        dispatch(setTarget(value));
        setValue(value);
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
