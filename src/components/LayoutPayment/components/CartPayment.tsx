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
import { filter, isEmpty } from "lodash";
import SelectRadioComponent from "@components/CustomComponent/ListRadioPaymentCartComponent/SelectRadioComponent";
import SelectCheckboxComponent from "@components/CustomComponent/ListRadioPaymentCartComponent/SelectCheckboxComponent";
import { getProductPTG } from "../../../../store/productSlice";
import { IconDropDown } from "@components/Icons";
import { setReferenceCode } from "../../../../store/paymentSlice";
import LocalStorage from "utils/LocalStorage";
import useNotification from "hooks/useNotification";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 315,
      marginLeft: "1.1rem",
    },
  },
};
type Props = {};

const CartPayment = (props: Props) => {
  const dispatch = useDispatch();
  const productItem = useSelector(
    (state: RootState) => state.products.productItem
  );
  const notification = useNotification();
  const { cart } = useSelector((state: RootState) => state.carts);
  const [selectedPromotionIds, setSelectedPromotionIds] = useState<number[]>(
    LocalStorage.get("promotions") ?? []
  );
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>(
    LocalStorage.get("PaymentSelect") ?? ""
  );
  const [listPrice, setListPrice] = useState([]);
  const [paymentName, setPaymentName] = useState([]);
  const [paymentPrice, setPaymentPrice] = useState([]);

  const [priceIdSelect, setPriceIdSelect] = React.useState(0);

  const [filterPtg, setFilterPtg] = React.useState({
    productId: "0",
    priceID: 0,
    scheduleId: "",
    promotions: [],
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const dataSelectLS = localStorage?.getItem("IdTCBG");
      const dataSelectLS2 = localStorage?.getItem("PaymentSelect");
      const dataSelectLS3 = localStorage?.getItem("promotions");
      const dataSelectLS4 = localStorage?.getItem("scheduleId");
      const arr: any = JSON.parse(dataSelectLS);
      const arr2: any = JSON.parse(dataSelectLS2);
      const arr3: any = JSON.parse(dataSelectLS3);
      const arr4: any = JSON.parse(dataSelectLS4);
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
      // if (!isEmpty(arr3)) {
      //   setSelectedPromotionIds([...arr3]);
      // } else {
      //   if (!isEmpty(listPrice)) {
      //     setPriceIdSelect(listPrice[0].PriceID);
      //     setPaymentName(listPrice[0].PriceName);
      //   }
      // }
      // if (!isEmpty(arr4)) {
      //   setSelectedScheduleId(arr4);
      // } else {
      //   if (!isEmpty(listPrice)) {
      //     setPriceIdSelect(listPrice[0].PriceID);
      //     setPaymentName(listPrice[0].PriceName);
      //   }
      // }
    }
  }, [listPrice]);

  const handleChange = (event: SelectChangeEvent<typeof paymentPrice>) => {
    const {
      target: { value },
    } = event;
    setPaymentPrice(typeof value === "string" ? value.split(",") : value);
    const findScheduleId = productItem.ListSchedule.find(
      (item) => item.ScheduleName === value
    );
    if (!isEmpty(findScheduleId)) {
      setFilterPtg({
        ...filterPtg,
        scheduleId: findScheduleId.ScheduleID.toString(),
        promotions: [],
      });
      localStorage.removeItem("IdTCBG");
      localStorage.removeItem("PaymentSelect");
      localStorage.removeItem("promotions");
      localStorage.removeItem("scheduleId");
    }
  };

  useEffect(() => {
    LocalStorage.set("filterPtg", filterPtg);
    return () => {
      LocalStorage.remove("filterPtg");
    };
  }, [
    filterPtg.priceID,
    filterPtg.productId,
    filterPtg.promotions,
    filterPtg.scheduleId,
  ]);

  const handleChangeTieuChuan = (event: any) => {
    const datafilter = listPrice.filter((p) => p.PriceName === event.PriceName);
    if (!isEmpty(datafilter)) {
      setPriceIdSelect(datafilter[0].PriceID);
      setPaymentName(event.PriceName);
      // setSelectedPromotionIds([]);
      localStorage.removeItem("IdTCBG");
      localStorage.removeItem("PaymentSelect");
      localStorage.removeItem("promotions");
      localStorage.removeItem("scheduleId");
    }
  };

  useEffect(() => {
    (async () => {
      const response = await getPriceListByProductLandsoft(cart.idls);
      if (response.responseCode === "00" && !isEmpty(response.responseData)) {
        setListPrice(response.responseData);
      } else {
        notification({
          error: response.responseMessage,
          title: "Load phiếu tính giá"
        })
        dispatch(
          getProductPTG({
            ListPolicy: [],
            ListPromotion: [],
            ListSchedule: [],
            MaintainanceFee: null,
            LandPrice: 0,
            BuildPrice: 0,
            BuildMoney: 0,
            LandMoney: 0,
            ProductPrice: null,
            ProductQuotation: null,
            PromotionMoney: null,
            TotalMoney: null,
            TotalMoneyText: "",
            VAT: 0,
            MaintenanceFee: 0,
            PreTotalMoney: 0,
            priceId: null,
            scheduleId: "",
            TimeOfPayment: 0,
            TimeOfPaymentUnit: "",
          })
        );
      }
    })();
  }, [cart]);

  useEffect(() => {
    setFilterPtg({
      productId: cart.id,
      priceID: priceIdSelect,
      scheduleId: selectedScheduleId,
      promotions: selectedPromotionIds,
    });
  }, [priceIdSelect, selectedScheduleId]);

  useEffect(() => {
    setFilterPtg({
      productId: cart.id,
      priceID: priceIdSelect,
      scheduleId: selectedScheduleId,
      promotions: !isEmpty(selectedPromotionIds) ? selectedPromotionIds : [],
    });
  }, [selectedPromotionIds]);

  async function fetchPtg(data: typeof filterPtg) {
    try {
      if (data.priceID !== 0) {
        const response = await getProductPtgApi(data);
        if (!isEmpty(response.responseData)) {
          dispatch(
            getProductPTG({
              ...response.responseData,
              priceId: filterPtg.priceID,
            })
          );
        } else {
          notification({
            error: response.responseMessage,
            title: "Load phiếu tính giá"
          })
          dispatch(
            getProductPTG({
              ListPolicy: [],
              ListPromotion: [],
              ListSchedule: [],
              MaintainanceFee: null,
              LandPrice: 0,
              BuildPrice: 0,
              BuildMoney: 0,
              LandMoney: 0,
              ProductPrice: null,
              ProductQuotation: null,
              PromotionMoney: null,
              TotalMoney: null,
              TotalMoneyText: "",
              VAT: 0,
              MaintenanceFee: 0,
              PreTotalMoney: 0,
              priceId: null,
              scheduleId: "",
              TimeOfPayment: 0,
              TimeOfPaymentUnit: "",
            })
          );
        }
        return !isEmpty(response.responseData) ? response.responseData : null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  useEffect(() => {
    if (!isEmpty(filterPtg.scheduleId)) {
      (async () => {
        const res = await fetchPtg({
          ...filterPtg,
          promotions: [],
        });
        if (!isEmpty(res)) {
          const lsPromotions = LocalStorage.get("promotions");
          
          if(!isEmpty(lsPromotions)) {
            const arrCk = res.ListPromotion.map(item => item.PromotionID);
            const found = lsPromotions.some(idf => arrCk.includes(idf));
            if(found) {
              setFilterPtg({
                ...filterPtg,
                promotions: lsPromotions
              });
              setSelectedPromotionIds([...lsPromotions]);
              fetchPtg({ ...filterPtg, promotions: lsPromotions });
            } else {
              setFilterPtg({
                ...filterPtg,
                promotions: [],
              });
              if (!isEmpty(selectedPromotionIds)) {
                setSelectedPromotionIds([]);
              }
            }
          } else {
            setFilterPtg({
              ...filterPtg,
              promotions: [],
            });
            if (!isEmpty(selectedPromotionIds)) {
              setSelectedPromotionIds([]);
            }
          }
        }
      })();
    }
  }, [filterPtg.scheduleId]);

  useEffect(() => {
    (async () => {
      const res = await fetchPtg({
        ...filterPtg,
        scheduleId: "",
        promotions: [],
      });
      if (!isEmpty(res) && !isEmpty(res.ListSchedule)) {
        const lsScheduleId = LocalStorage.get("scheduleId");
        const findSchedule = lsScheduleId
          ? res.ListSchedule.find(
              (item) => item.ScheduleID.toString() === lsScheduleId.toString()
            )
          : null;
        if(lsScheduleId && findSchedule) {
          setFilterPtg({
            ...filterPtg,
            scheduleId: lsScheduleId.toString(),
            promotions: [],
          });
          setSelectedScheduleId(lsScheduleId.toString());
          setPaymentPrice(findSchedule.ScheduleName);
        } else {
          setPaymentPrice([res.ListSchedule[0].ScheduleName]);
          if (
            filterPtg.scheduleId.toString() !==
            res.ListSchedule[0].ScheduleID.toString()
          ) {
            setFilterPtg({
              ...filterPtg,
              scheduleId: res.ListSchedule[0].ScheduleID.toString(),
              promotions: [],
            });
            setSelectedScheduleId(res.ListSchedule[0].ScheduleID.toString());
          } else {
            await fetchPtg({ ...filterPtg, promotions: [] });
            if (!isEmpty(selectedPromotionIds)) {
              setSelectedPromotionIds([]);
            }
          }
          if (!isEmpty(selectedPromotionIds)) {
            setSelectedPromotionIds([]);
          }
        }
      }
    })();
  }, [filterPtg.priceID]);

  return (
    <Box width={637} mt={"10px"}>
      <WrapperBoxBorderStyled padding={"20px"} margin={"0px 0px 16px"}>
        <RowStyled>
          <Text18Styled mw={200}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span style={{ width: 112 }}>Mã giới thiệu </span>
              <span style={{ color: "red" }}>*</span>
            </div>
          </Text18Styled>
          <TextField
            placeholder="Nhập mã"
            fullWidth
            required
            onChange={(e) => {
              dispatch(setReferenceCode(e.target.value));
            }}
            sx={{
              maxWidth: 317,
              marginLeft: 15,
              paddingTop: 0,
              paddingBottom: 0,
            }}
            InputProps={{
              style: {
                height: "44px",
                borderRadius: "8px",
              },
            }}
          />
        </RowStyled>
      </WrapperBoxBorderStyled>
      <WrapperBoxBorderStyled padding={"20px"}>
        <RowStyled>
          <Text18Styled mw={200}>
            Tiêu chuẩn bàn giao <span style={{ color: "red" }}>*</span>
          </Text18Styled>

          <SelectRadioComponent
            label="Tiêu chuẩn bàn giao"
            data={listPrice}
            listProjectType={paymentName}
            onChange={handleChangeTieuChuan}
            placeholder="Chọn Tiêu chuẩn bàn giao"
            style={{ width: 150, height: 40 }}
          />
        </RowStyled>
      </WrapperBoxBorderStyled>
      <WrapperBoxBorderStyled padding={"20px"} marginTop="1rem">
        <RowStyled>
          <Text18Styled mw={200}>
            Tiến độ thanh toán <span style={{ color: "red" }}>*</span>
          </Text18Styled>
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
                  return selected;
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
                <MenuItem key={index} value={name.ScheduleName}>
                  {name.ScheduleName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </RowStyled>
      </WrapperBoxBorderStyled>
      <WrapperBoxBorderStyled padding={"20px"} marginTop="1rem">
        <RowStyled>
          <Text18Styled mw={132}>
            Chiết khấu <span style={{ color: "red" }}>*</span>
          </Text18Styled>
          <SelectCheckboxComponent
            label="Vị Trí"
            data={productItem?.ListPromotion}
            onChange={() => console.log("abcd")}
            placeholder="Chọn vị trí"
            style={{ width: 305, height: 54 }}
            selectedPromotionIds={selectedPromotionIds}
            setSelectedPromotionIds={setSelectedPromotionIds}
            callback={(promotions) => {
              localStorage.removeItem("IdTCBG");
              localStorage.removeItem("PaymentSelect");
              localStorage.removeItem("promotions");
              localStorage.removeItem("scheduleId");
              fetchPtg({ ...filterPtg, promotions });
            }}
          />
        </RowStyled>
      </WrapperBoxBorderStyled>
    </Box>
  );
};

export default CartPayment;
