import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useEffect, useState } from "react";

export default function DropDownTargetLevel() {
  const ListChild = useSelector((state: RootState) => state.projectMap.ListChild);
  const [formatList, setFormatList] = useState<any[]>([]);
  useEffect(() => {
    setFormatList(ListChild.map((child)=>({
      ...child, label: child.name
    })))
  }, [ListChild])
  
  return (
    <Autocomplete
      disablePortal
      disableClearable
      id="combo-box-demo"
      options={formatList}
      sx={{ width: 250 }}
      popupIcon={<KeyboardArrowDownIcon fontSize="medium" />}
      renderInput={(params) => (
        <TextField
          variant="standard"
          {...params}
          // label={`Chọn ...`}
          placeholder={`Chọn ...`}
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
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [{ label: "Tiểu khu Nguyệt Quế 1", id: '1' }];
