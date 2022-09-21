import {
  TextField,
  Box,
  Autocomplete,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ButtonStyled,
  RowStyled,
  Text18Styled,
  WrapperBoxBorderStyled,
} from "../../StyledLayout/styled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import {
  getPriceListByProductLandsoft,
  getProductPtgApi,
} from "../../../../pages/api/productsApi";
import { isEmpty } from "lodash";
import SelectRadioComponent from "@components/CustomComponent/ListRadioPaymentCartComponent/SelectRadioComponent";
import SelectCheckboxComponent from "@components/CustomComponent/ListRadioPaymentCartComponent/SelectCheckboxComponent";
import { getProductPTG } from "../../../../store/productSlice";
import { IconDropDown } from "@components/Icons";
import { setReferenceCode } from "../../../../store/paymentSlice";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
type Props = {};

const CartPayment = (props: Props) => {
  const dispatch = useDispatch();
  const productItem = useSelector(
    (state: RootState) => state.products.productItem
  );
  const { cart } = useSelector((state: RootState) => state.carts);
  const [listPrice, setListPrice] = useState([]);
  const [paymentName, setPaymentName] = useState([]);
  const [paymentPrice, setPaymentPrice] = useState([]);

  const [priceIdSelect, setPriceIdSelect] = React.useState(0);

  const [filterPtg, setFilterPtg] = React.useState({
    productId: '0',
    priceID: 0,
  });

  //   useEffect(() => {
  // 	if (typeof window !== "undefined") {
  // 		const dataSelectLS = localStorage?.getItem("IdTCBG");
  // 		const arr: any = JSON.parse(dataSelectLS);
  // 		console.log("arr",arr)
  // 		// if(arr){
  // 		// 	setPaymentPrice(arr);
  // 		// }
  // 	}
  //   },[])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const dataSelectLS = localStorage?.getItem("IdTCBG");
      const dataSelectLS2 = localStorage?.getItem("PaymentSelect");
      const arr: any = JSON.parse(dataSelectLS);
      const arr2: any = JSON.parse(dataSelectLS2);
      if (arr2) {
        setPaymentPrice(arr2);
      } else {
        if (!isEmpty(listPrice)) {
          setPriceIdSelect(listPrice[0].PriceID);
          setPaymentName(listPrice[0].PriceName);
        }
      }
      if (arr) {
        setPriceIdSelect(arr);
        // setPaymentName(listPrice[0].PriceName);
      } else {
        if (!isEmpty(listPrice)) {
          setPriceIdSelect(listPrice[0].PriceID);
          setPaymentName(listPrice[0].PriceName);
        }
      }
    }
  }, [listPrice]);

  //   useEffect(() => {
  //     if (typeof window !== "undefined") {
  //       const dataSelectLS = localStorage?.getItem("PaymentSelect");
  //       const arr: any = JSON.parse(dataSelectLS);
  //       if (arr) {
  //         setPaymentPrice(arr);
  //       }
  //     }
  //   }, []);

  const handleChange = (event: SelectChangeEvent<typeof paymentPrice>) => {
    const {
      target: { value },
    } = event;
    setPaymentPrice(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeTieuChuan = (event: any) => {
    const datafilter = listPrice.filter((p) => p.PriceName === event.PriceName);
	if(!isEmpty(datafilter)){
		setPriceIdSelect(datafilter[0].PriceID);
		setPaymentName(event.PriceName);
	}

  };

  useEffect(() => {
    (async () => {
      const response = await getPriceListByProductLandsoft(cart.idls);
      if (response.responseCode === "00" && !isEmpty(response.responseData)) {
        setListPrice(response.responseData);
      }
    })();
  }, [cart]);
  useEffect(() => {
    // if (!isEmpty(listPrice)) {
    setFilterPtg({
      productId: cart.id,
      priceID: priceIdSelect,
    });
    // }
  }, [priceIdSelect]);

  //   useEffect(() => {
  //     if (typeof window !== "undefined") {
  //       const dataSelectLS = localStorage?.getItem("IdTCBG");
  //       const arr: any = JSON.parse(dataSelectLS);

  //       if (arr) {
  //         setFilterPtg({
  //           ...filterPtg,
  //           priceID: arr,
  //         });
  //       }
  //     }
  //   }, []);

  useEffect(() => {
    // console.log("filterPtg",priceIdSelect)
    {
      (async () => {
        try {
          if (filterPtg.priceID !== 0) {
            const response = await getProductPtgApi(filterPtg);
            dispatch(
              getProductPTG({
                ...response.responseData,
                priceId: filterPtg.priceID,
              })
            );
            // setPaymentPrice([
            //   response.responseData.ListSchedule[0].ScheduleName,
            // ]);
            // setFilterpayment({
            //   LandMoney: response.responseData.LandMoney,
            //   BuildMoney: response.responseData.BuildMoney,
            //   FoundationMoney: response.responseData.FoundationMoney,
            //   TotalMoney: response.responseData.TotalMoney,
            //   ScheduleID: response.responseData.ListSchedule[0].ScheduleID,
            // });
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [filterPtg, dispatch]);

  return (
    <Box width={637} mt={"10px"}>
      <WrapperBoxBorderStyled padding={"20px"} margin={"0px 0px 16px"}>
        <RowStyled>
          <Text18Styled mw={109}>Mã giới thiệu</Text18Styled>
          <TextField
            placeholder="Nhập mã"
            fullWidth
            required
            onChange={(e) => {
              dispatch(setReferenceCode(e.target.value));
            }}
            style={{ maxWidth: 317, marginLeft: 21 }}
          />
        </RowStyled>
      </WrapperBoxBorderStyled>
      <WrapperBoxBorderStyled padding={"20px"}>
        <RowStyled>
          <Text18Styled mw={200}>Tiêu chuẩn bàn giao</Text18Styled>
          {/* <Autocomplete
            popupIcon={<KeyboardArrowDownIcon fontSize="medium" />}
            disablePortal
            id="combo-box-demo"
            options={listPrice}
            sx={{ maxWidth: 317 }}
            renderInput={(params) => (
              <TextField
                sx={{ width: 317 }}
                {...params}
                placeholder="Chọn chiết khấu"
              />
            )}
          /> */}
          <SelectRadioComponent
            label="Tiêu chuẩn bàn giao"
            data={listPrice}
            // checkSelectProvince={checkSelectProvince}
            listProjectType={paymentName}
            onChange={handleChangeTieuChuan}
            placeholder="Chọn Tiêu chuẩn bàn giao"
            style={{ width: 150, height: 40 }}
          />
          {/* <TextField fullWidth style={{ maxWidth: 317 }} /> */}
        </RowStyled>
      </WrapperBoxBorderStyled>
      <WrapperBoxBorderStyled padding={"20px"} marginTop="1rem">
        <RowStyled>
          <Text18Styled mw={132}>Chiết khấu</Text18Styled>
          {/* <Text18Styled mw={132}>Chiết khấu</Text18Styled>
          <Autocomplete
            popupIcon={<KeyboardArrowDownIcon fontSize="medium" />}
            disablePortal
            id="combo-box-demo"
            options={[
              { label: "Chiết khấu 1", id: "1" },
              { label: "Chiết khấu 2", id: "2" },
            ]}
            sx={{ maxWidth: 317 }}
            renderInput={(params) => (
              <TextField
                sx={{ width: 317 }}
                {...params}
                placeholder="Chọn chiết khấu"
              />
            )}
          /> */}
          <SelectCheckboxComponent
            label="Vị Trí"
            data={productItem?.ListPromotion}
            //   listLocation={location}
            onChange={() => console.log("abcd")}
            placeholder="Chọn vị trí"
            style={{ width: 305, height: 54 }}
          />
          {/* <TextField fullWidth style={{ maxWidth: 317 }} /> */}
        </RowStyled>
      </WrapperBoxBorderStyled>

      <WrapperBoxBorderStyled padding={"20px"} marginTop="1rem">
        <RowStyled>
          <Text18Styled mw={200}>Tiến độ thanh toán</Text18Styled>
          {/* <Text18Styled mw={200}>Tiến độ thanh toán</Text18Styled>
          <Autocomplete
            popupIcon={<KeyboardArrowDownIcon fontSize="medium" />}
            disablePortal
            id="combo-box-demo"
            options={[
              { label: "Bước 1", id: "1" },
              { label: "Bước 2", id: "2" },
            ]}
            sx={{ maxWidth: 317 }}
            renderInput={(params) => (
              <TextField
                sx={{ width: 317 }}
                {...params}
                placeholder="Chọn tiến độ thanh toán"
              />
            )}
          /> */}
          <FormControl style={{ height: 44, width: 317 }}>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              displayEmpty
              value={paymentPrice}
              onChange={handleChange}
              input={<OutlinedInput style={{ height: 44, borderRadius: 8 }} />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <span>Tiến độ thanh toán</span>;
                } else {
                  return selected.join(", ");
                  // return <span>Tiến độ thanh toán</span>
                }
              }}
              IconComponent={null}
              endAdornment={<KeyboardArrowDownIcon />}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
              SelectDisplayProps={{
                style: {
                  paddingLeft: 20,
                },
              }}
            >
              {productItem?.ListSchedule?.map((name, index) => (
                <MenuItem
                  key={index}
                  value={name.ScheduleName}
                  // style={getStyles(name.ScheduleID, personName, theme)}
                >
                  {name.ScheduleName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </RowStyled>
      </WrapperBoxBorderStyled>
    </Box>
  );
};

export default CartPayment;
