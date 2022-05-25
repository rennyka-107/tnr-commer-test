import FlexContainer from "@components/CustomComponent/FlexContainer";
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styled from "@emotion/styled";
import dynamic from "next/dynamic";


const TextHeaderStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 33px;

  /* Brand */

  color: #1b3459;
`;
const listBread = [
  {
    id: 1,
    value: "Trang chủ",
  },
  {
    id: 2,
    value: "Đất nền",
  },
];

const DynamicBreadcrumsComponent = dynamic(
	() =>
	  import("../../components/CustomComponent/BreadcrumsComponent/index"),
	{ loading: () => <p>...</p> }
  );
  const DynamicItemProductComponent = dynamic(
	() => import("@components/LayoutProduct/ItemProduct"),
	{ loading: () => <p>...</p> }
  );
  
  
const ProductPages = () => {
	return (
		<FlexContainer>
        <div
          style={{
            marginTop: 166,
            display: "flex",
            flexDirection: "column",
            width: "70%",
          }}
        >
          <div>
            <DynamicBreadcrumsComponent
              breaditem={listBread}
              activePage="Tiểu khu"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 56,
            }}
          >
            <TextHeaderStyled>
              TNR Stars Lam Sơn - NGUYỆT QUẾ 1
            </TextHeaderStyled>
            <div>
              <FormControl style={{ width: 115, marginRight: 10, height: 48 }}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  style={{ height: 48 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value="age"
                  label="Age"
                  onChange={() => console.log("abc")}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl style={{ width: 115, height: 48 }}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  style={{ height: 48 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value="age"
                  label="Age"
                  onChange={() => console.log("abc")}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <DynamicItemProductComponent />
      </FlexContainer>
	)
}

export default ProductPages;