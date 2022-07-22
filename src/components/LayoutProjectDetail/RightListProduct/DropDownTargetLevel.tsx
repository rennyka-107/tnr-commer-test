import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useEffect, useState } from "react";
import {
  setGeoJsonData,
  setListChild,
  setTarget,
  setImgMap,
  setArrayImgMap,
  setListTarget,
  setListChildTarget,
  setTargetShape,
  setGeoJsonDataProduct,
} from "../../../../store/projectMapSlice";
import isEmpty from "lodash.isempty";
import {
  apiGetListChildMapByIdLevel,
  apiGetListChildMapByIdParent,
  apiGetListProductByIdDetail,
} from "../../../../pages/api/mapProject";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

export default function DropDownTargetLevel({ level }: any) {
  const Target = useSelector((state: RootState) => state.projectMap.Target);
  const ListChild = useSelector(
    (state: RootState) => state.projectMap.ListChild
  );
  const TargetShape = useSelector(
    (state: RootState) => state.projectMap.TargetShape
  );
  const ListLevel = useSelector(
    (state: RootState) => state.projectMap.ListLevel
  );
  const ArrayImgMap = useSelector(
    (state: RootState) => state.projectMap.ArrayImgMap
  );
  const ListTarget = useSelector(
    (state: RootState) => state.projectMap.ListTarget
  );
  const GeoJsonData = useSelector(
    (state: RootState) => state.projectMap.GeoJsonData
  );
  const allOption = {
    id: "all-options",
    level: level.level,
    name: "Tất cả",
  };
  const [formatList, setFormatList] = useState<any[]>([]);
  const [value, setValue] = useState<any>(null);
  const dispatch = useDispatch();
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (!isEmpty(value)) {
      let newListTarget = [];
      if (!isEmpty(ListTarget)) {
        const existLevelValue = ListTarget.find(
          (tg) => tg.level === value.level
        );
        if (!isEmpty(existLevelValue)) {
          newListTarget = ListTarget.map((tg) => {
            if (tg.level === level.level) {
              return {
                name: value.name,
                level: value.level,
                levelName: level.name,
              };
            }
            return tg;
          });
        } else {
          newListTarget = [
            ...ListTarget,
            { name: value.name, level: value.level, levelName: level.name },
          ];
        }
        dispatch(setListTarget(newListTarget));
      } else {
        dispatch(
          setListTarget([
            { name: value.name, level: value.level, levelName: level.name },
          ])
        );
      }
      if (!isEmpty(value.imgMap) && value.type === "1") {
        let newArray = [];
        const existValue = ArrayImgMap.find((vl) => vl.level === value.level);
        if (!isEmpty(existValue)) {
          newArray = ArrayImgMap.map((vl) => {
            if (vl.level === value.level) {
              return { ...vl, imgMap: value.imgMap };
            }
            return vl;
          });
        } else {
          newArray = [
            ...ArrayImgMap,
            { level: value.level, imgMap: value.imgMap },
          ];
        }
        dispatch(setArrayImgMap(newArray));
      } else {
        const formatArray = ArrayImgMap.filter(
          (vl) => vl.level !== value.level
        );
        dispatch(setArrayImgMap(formatArray));
      }
    }
  }, [value]);

  useEffect(() => {
    if (!isEmpty(TargetShape) && TargetShape.level === level.level) {
      const newTarget = formatList.find((data) => data.id === TargetShape.id);
      if (!isEmpty(newTarget)) {
        dispatch(setTarget({ ...newTarget, level: level.level }));
        if (!isEmpty(newTarget.imgMap) && newTarget.type === "1") {
          dispatch(setImgMap(newTarget.imgMap));
          dispatch(setGeoJsonData([]));
          dispatch(setGeoJsonDataProduct([]));
        }
        setValue(newTarget);
      }
    } else {
      if (!isEmpty(TargetShape) && TargetShape.level === "PRODUCT") {
        const newTarget = ListChild.find((data) => data.id === TargetShape.id);
        dispatch(setTarget(newTarget));
        if (!isEmpty(newTarget.imgMap) && newTarget.type === "1") {
          dispatch(setImgMap(newTarget.imgMap));
          dispatch(setGeoJsonData([]));
          dispatch(setGeoJsonDataProduct([]));
        }
      }
    }
  }, [TargetShape]);

  function fetData(
    datas: any[],
    resetProducts: boolean = true,
  ) {
    const geojsonArray = [];
    if (resetProducts) {
      dispatch(setListChild([]));
    }
      setValue(null);
    const formatData = datas.map((data) => {
      if (!isEmpty(data.map)) {
        const geodata = JSON.parse(data.map);
        geojsonArray.push({
          ...geodata,
          properties: {
            ...geodata.properties,
            lock: data.status === "1",
            id: data.id,
            name: data.name,
          },
        });
      }
      return { ...data, level: level.level };
    });
    if (!isEmpty(formatData)) {
      setFormatList([allOption, ...formatData]);
    }
    if (!isEmpty(Target) && Target.type === "1" && isEmpty(Target.imgMap)) {
      dispatch(setListChildTarget(formatData));
    } else {
      dispatch(setListChildTarget([]));
    }
    dispatch(setGeoJsonData(geojsonArray));
  }

  useEffect(() => {
    if (!isEmpty(Target)) {
      if (Target.type === "1" && !isEmpty(Target.imgMap)) {
        dispatch(setImgMap(Target.imgMap));
      } else {
        if (Target.level === level.level) {
          if (!isEmpty(ArrayImgMap)) {
            const sortArray = [...ArrayImgMap];
            sortArray.sort((a, b) => a.level - b.level);
            const filterArray = sortArray.filter(
              (vl) => vl.level < Target.level
            );
            if (!isEmpty(filterArray)) {
              dispatch(
                setImgMap(filterArray[filterArray.length - 1]["imgMap"])
              );
            } else {
              dispatch(setImgMap(ListLevel[0]["map"]));
            }
          } else {
            dispatch(setImgMap(ListLevel[0]["map"]));
          }
        }
      }
    }
  }, [Target, ListLevel, formatList]);

  useEffect(() => {
    if (!isEmpty(level)) {
      if (isEmpty(Target)) {
        if (level.level === 1) {
          apiGetListChildMapByIdLevel(level.id)
            .then((response) => {
              fetData(response.responseData);
            })
            .catch((err) => console.log(err));
        } else {
          setFormatList([]);
        }
        dispatch(setGeoJsonDataProduct([]));
      }
      if (!isEmpty(Target)) {
        if (Target.level === level.level - 1) {
          apiGetListChildMapByIdParent(Target.id)
            .then((response) => {
              fetData(response.responseData, false);
            })
            .catch((err) => console.log(err));
        } else {
          if (Target.level < level.level) {
            setFormatList([]);
          }
          if (Target.level === level.level) {
            const features = GeoJsonData.features;
            if(!isEmpty(features)) {
              const findItem = features.find(item => item.properties.id === Target.id);
              if(!isEmpty(findItem)) {
                dispatch(setGeoJsonData([]));
              }
            }
            apiGetListProductByIdDetail(Target.id)
              .then((response) => {
                const geojsonArray = [];
                dispatch(
                  setListChild(
                    response.responseData.map((data) => {
                      if (!isEmpty(data.map)) {
                        const geodata = JSON.parse(data.map);
                        geojsonArray.push({
                          ...geodata,
                          properties: {
                            ...geodata.properties,
                            status: data.status,
                            id: data.id,
                            name: data.name,
                            level: "PRODUCT",
                          },
                        });
                      }
                      return {
                        ...data,
                        level: "PRODUCT",
                      };
                    })
                  )
                );
                dispatch(setGeoJsonDataProduct(geojsonArray));
              })
              .catch((err) => console.log(err));
          }
        }
      }
    }
  }, [level, Target]);
  return !isEmpty(formatList) ? (
    <Box>
      <Autocomplete
        value={value}
        disablePortal
        disableClearable
        id={`combo-box-demo-${level.id}`}
        options={formatList}
        sx={{ minWidth: "250px" }}
        popupIcon={<ArrowForwardIosIcon fontSize="medium" />}
        getOptionDisabled={(option) =>
          option.id === "all-options" && isEmpty(value)
        }
        onChange={(e, vl) => {
          if (!isEmpty(vl) && vl.id !== "all-options") {
            dispatch(setTargetShape({ id: vl.id, level: level.level }));
            // setValue(vl);
          } else {
            if (!isEmpty(value) && value.parentId !== id) {
              dispatch(
                setTargetShape({
                  id: value.parentId,
                  level: level.level - 1,
                })
              );
            } else {
              if (level.level === 1) {
                dispatch(setTarget(null));
              }
            }
          }
        }}
        renderInput={(params) => (
          <TextField
            variant="standard"
            {...params}
            placeholder={`Tất cả`}
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
    </Box>
  ) : (
    <></>
  );
}
