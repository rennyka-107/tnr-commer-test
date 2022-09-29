import { IconPlusProduct } from "@components/Icons";
import styled from "@emotion/styled";
import {
  Button,
  Card,
  Box,
  Modal,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControlLabel,
} from "@mui/material";
import React, { MouseEventHandler, useState } from "react";
import { IconTimes } from "@components/Icons";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { priceRange } from "constant/filter";
import { useRouter } from "next/router";
import LocalStorage from "utils/LocalStorage";
import {
  getCompareItem,
  getComparePopUpItem,
} from "../../../../store/productCompareSlice";
import PlusAddCompare from "@components/Icons/PlusAddCompare";

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  filter: any;
  onChangeFilter: (filter: any) => void;
};

const ItemScreenDynamic = dynamic(() => import("./ItemScreen"));

const WrapperContent = styled(Card)`
  width: 284px;
  height: 286px;
  border-radius: 20px;
  background: #f2f2f2;
  box-shadow: none;
  border: none;
  margin-bottom: 20px;
`;
const TextStyled = styled.span`
  margin-top: 20px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #0e1d34;
  text-transform: none;
`;
const ButtonStyled = styled(Button)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BoxInputStyled = styled(Box)({
  height: 59,
  padding: "0px 0px 4px 12px",
  borderBottom: "1px solid #dcdcdc",
  display: "flex",
  alignItems: "end",
});
const TitleModal = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 26px;
  color: #000;
  margin-bottom: 32px;
  text-align: center;
`;
const BoxModalStyled = styled(Box)`
  width: 1275px;
  min-height: 650px;
  background: #fff;
  border: none;
  box-sizing: border-box;
  padding: 32px 85px 90px;
  position: relative;
`;
const BoxTimes = styled(Button)`
  position: absolute;
  top: 22px;
  right: 22px;
`;
const BoxSearchModalStyled = styled(Box)`
  width: 100%;
  background: #1b3459;
  height: 170px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0px 145px;
`;
const ButtonSearchModalStyled = styled(Button)`
  width: 154px;
  height: 48px;
  border-radius: 8px;
  border: none;
  background: #d60000;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #fff;
  &:hover {
    background: #d60000;
  }
`;

const ItemImport = ({ onChangeFilter, filter }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const { compareParams, compareItems } = useSelector(
    (state: RootState) => state.productCompareSlice
  );
  const { listMenuBarProjectType, listCategory } = useSelector(
    (state: RootState) => state.menubar
  );
  const [priceRangeValue, setPriceRangeValue] = useState<number[]>([0, 0]);
  const router = useRouter();
  const dispatch = useDispatch();

  

  const handleOnClick = () => {
    // setOpen(true);
    const param = LocalStorage.get("compare-url");
	const projectIdLS = LocalStorage.get("listParamsIdProject");
    const projectTypeIDLs = LocalStorage.get("listParamsLSProjectType");
    if (!param) return;

    dispatch(
      getComparePopUpItem(
        compareItems.map((item) => {
          return {
            projectName: item.projectName,
            thumbnail: item.thumbnail,
            name: item.productName,
            productId: item.productId,
            projectId: projectIdLS[0],
            projectType: projectTypeIDLs[0],
          };
        })
      )
    );
    router.push({
      pathname: `/compare-search`,
      query: {
        ...param,
      },
    });
  };

  const handleClickScreen = () => {
    setOpen(false);
  };

  const changeFilter = (e: SelectChangeEvent<any>) => {
    if (e.target.name === "priceRange") {
      setPriceRangeValue(e.target.value);
      onChangeFilter({
        priceFrom: e.target.value[0].toString(),
        priceTo: e.target.value[1].toString(),
      });
    } else {
      onChangeFilter({
        [e.target.name]: e.target.value,
      });
    }
  };

  const onCompare = () => {
    router.push({
      pathname: `/compare-search`,
      query: {
        ...filter,
      },
    });
  };

  return (
    <Box maxWidth={289}>
      {/* <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-content"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BoxModalStyled>
          <BoxTimes onClick={() => setOpen(false)}>
            <IconTimes />
          </BoxTimes>
          <TitleModal>Sản phẩm đã xem gần nhất</TitleModal>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <ItemScreenDynamic
                onClick={handleClickScreen}
                src={"https://picsum.photos/308/200"}
              />
            </Grid>
            <Grid item xs={4}>
              <ItemScreenDynamic src={"https://picsum.photos/308/200"} />
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
          <TitleModal style={{ marginTop: 33 }}>Hoặc tìm sản phẩm</TitleModal>
          <BoxSearchModalStyled>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <Select
                    onChange={changeFilter}
                    defaultValue={"1"}
                    value={filter.categoryId ?? "1"}
                    style={{ background: "white" }}
                    name={"categoryId"}
                    placeholder={'Chọn dòng sản phẩm'}
                  >
                    {listCategory.map((item) => (
                      <MenuItem value={item.id} key={item.code}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <Select
                    value={priceRangeValue}
                    style={{ background: "white" }}
                    onChange={changeFilter}
                    name={"priceRange"}
                    placeholder={'Khoảng giá'}
                  >
                    {priceRange.map((item, index) => (
                      <MenuItem value={item.value} key={index}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <Select
                    defaultValue={null}
                    value={filter.projectTypeId ?? "1"}
                    style={{ background: "white" }}
                    onChange={changeFilter}
                    name={"projectTypeId"}
                    placeholder={'Loại BĐS'}
                  >
                    {listMenuBarProjectType.map((item) => (
                      <MenuItem value={item.id} key={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <ButtonSearchModalStyled onClick={onCompare}>So sánh</ButtonSearchModalStyled>
              </Grid>
            </Grid>
          </BoxSearchModalStyled>
        </BoxModalStyled>
      </Modal> */}
      <WrapperContent>
        <ButtonStyled onClick={handleOnClick}>
          {/* <IconPlusProduct
            style={{ width: 46.6, height: 46.6, marginTop: 10 }}
          /> */}
		  <PlusAddCompare />
          <TextStyled>Thêm sản phẩm so sánh</TextStyled>
        </ButtonStyled>
      </WrapperContent>
      {compareParams
        .filter((item) => item.type === "Thông tin chung")
        .map((item) => (
          <BoxInputStyled key={item.id} />
        ))}
    </Box>
  );
};

export default ItemImport;
