import SelectSearchInputComponent from "@components/CustomComponent/SelectInputComponent/SelectSearchInputComponent";
import { FormControl, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

const HeaderNavSearch = () => {
  const router = useRouter();
  const [filter, setFilter] = useState<any>({ location: "" });
  const { listMenuBarType, listMenuBarProjectType } =
  useSelector((state: RootState) => state.menubar);

  useEffect(() => {
    setFilter({
      location: router?.query.textSearch,
    });
  }, [router.query.textSearch]);

  const handleChange = (e: any) => {
	setFilter({
		location: e.target.value
	})
  }


  const fetchComponent = () => {
    return (
      <>
        <div>
          <FormControl sx={{ m: 1, width: 330, mt: 3 }}>
            <TextField
              id="outlined-required"
			  value={filter.location ? filter.location : ''}
              placeholder="Nhập tên dự án , địa chỉ hoặc thành phố"
			  onChange={handleChange}
              sx={{
                input: {
                  background: "#ffffff",
                },
              }}
			  onKeyPress={(ev) => {
				if (ev.key === "Enter") {
				  // Do code here
				  router.push(`/search?textSearch=${filter.location}`);
				  ev.preventDefault();
				}
			  }}

            />
          </FormControl>
        </div>
        <div>
          <SelectSearchInputComponent
            label="Loại BĐS"
            data={[]}
            value={[]}
            onChange={() => console.log("abc")}
            placeholder="Loại BĐS"
            style={{ width: 150 }}
          />
          <SelectSearchInputComponent
            label="Chọn dự án"
            data={[]}
            value={[]}
            onChange={() => console.log("abc")}
            placeholder="Chọn dự án"
            style={{ width: 150 }}
          />
          <SelectSearchInputComponent
            label="Block/ Khu"
            data={[]}
            value={[]}
            onChange={() => console.log("abc")}
            placeholder="Block/ Khu"
            style={{ width: 150 }}
          />
          <SelectSearchInputComponent
            label="Khoảng giá"
            data={[]}
            value={[]}
            onChange={() => console.log("abc")}
            placeholder="Khoảng giá"
            style={{ width: 150 }}
          />
          <SelectSearchInputComponent
            label="Phòng"
            data={[]}
            value={[]}
            onChange={() => console.log("abc")}
            placeholder="Phòng"
            style={{ width: 150 }}
          />
          <SelectSearchInputComponent
            label="Diên tích..."
            data={[]}
            value={[]}
            onChange={() => console.log("abc")}
            placeholder="Diên tích..."
            style={{ width: 150 }}
          />
          <SelectSearchInputComponent
            label="Bộ Lọc"
            data={[]}
            value={[]}
            onChange={() => console.log("abc")}
            placeholder="Bộ Lọc"
            style={{ width: 150 }}
          />
        </div>
      </>
    );
  };
  useEffect(() => {
    fetchComponent();
  }, [filter]);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          backgroundColor: "#eac28a",
        }}
      >
        {fetchComponent()}
      </div>
    </>
  );
};
export default HeaderNavSearch;
