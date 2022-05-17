import FlexContainer from "@components/CustomComponent/FlexContainer";
import Page from "@layouts/Page";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { BreadcrumsComponent } from "../../src/components/CustomComponent/BreadcrumsComponent";
import styled from "@emotion/styled";
import { ItemProduct } from "@components/LayoutProduct/ItemProduct";

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
		value: 'Trang chủ'
	},
	{
		id: 2,
		value: 'Đất nền'
	},

]

const ListProduct = () => {
  return (
    <Page
      meta={{
		  
        title: "TNR Ecommerce Product",
        description: "TNR Ecommerce Product",
      }}
    >
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
            <BreadcrumsComponent
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
			  marginBottom: 56
            }}
          >
            <TextHeaderStyled>
              TNR Stars Lam Sơn - NGUYỆT QUẾ 1
            </TextHeaderStyled>
            <div>
              <FormControl style={{ width: 115, marginRight: 10 , height: 48}}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
				style={{ height: 48}}
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
					style={{ height: 48}}
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
		<ItemProduct />
      </FlexContainer>
    </Page>
  );
};

export default ListProduct;
