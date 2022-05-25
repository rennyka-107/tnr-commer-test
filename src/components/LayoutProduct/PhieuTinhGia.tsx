import React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";

import {
  FakeDataTable1,
  FakeDataTable2,
  FakeDataTable3,
  FakeDataTable4,
} from "./fakeData";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IconDropDown } from "@components/Icons";

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

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const WrapBodyStyped = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 58px;
  gap: 30px;
`;
const ContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 539px;
  gap: 35px;
`;
const ContainerBottomLeft = styled.div`
  background: #f8fafe;
  border-radius: 20px;
  padding: 34px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const ContainerCenterRight = styled.div`
  background: #f8fafe;
  border-radius: 20px;
  padding: 34px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const ContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 540px;
  gap: 35px;
`;

const TitleStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;
  color: #1b3459;
`;

const WrapCardItem = styled.div`
  border: 1px solid #d8d8d8;
  border-radius: 20px;
  padding: 22px 50px 22px 50px;
`;
const WrapItemOnCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
`;

const TextLeftOnCardLeft = styled(Typography)`
  width: 50%;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 38px;
  text-align: right;
  color: #1b3459;
`;

const TextRightOnCardLeft = styled(Typography)`
  width: 50%;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 38px;
  color: #1b3459;
`;

const TextOnCardRight = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  color: #1b3459;
`;

const WrapRightCardText = styled.div`
  display: flex;
  gap: 14px;
  right: 0;
`;

const TitleBottomWrap = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  color: #1b3459;
  margin-bottom: 5px;
`;

const SubTitleBottomWrap = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #1b3459;
`;
const TextBoldInWrapBottom = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #1b3459;
`;
const TextInWrapBottom = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #1b3459;
`;

const TextCenterRight = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #1b3459;
  margin-bottom: 9px;
`;
const SubTextCenterRight = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #1b3459;
  text-align: right;
`;

const ButtonStyled = styled(Button)`
  width: 100%;
  height: 50px;
  background: #ea242a;
  border-radius: 8px;
  padding: 13px;
  :hover {
    background: #ffffff;
    box-shadow: 4px 8px 24px #f2f2f5;
    border: 1px solid #48576d;
    border-radius: 8px;
    color: #48576d;
    font-weight: 400;
  }
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  text-transform: none;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 4px;
  margin-top: 39px;
`;

const names = ["Oliver Hansen", "Van Henry", "April Tucker", "Ralph Hubbard"];

const PhieuTinhGia = () => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  function currencyFormat(num) {
    if (!num) {
      return;
    }
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  return (
    <WrapBodyStyped>
      <ContainerLeft>
        <TitleStyled>Thông tin lô đất</TitleStyled>
        <WrapCardItem>
          {FakeDataTable1.map((table1, index) => (
            <WrapItemOnCard key={index}>
              <TextLeftOnCardLeft>{table1.title}:</TextLeftOnCardLeft>
              <TextRightOnCardLeft>{table1.value}</TextRightOnCardLeft>
            </WrapItemOnCard>
          ))}
        </WrapCardItem>
        <ContainerBottomLeft>
          <div>
            <TitleBottomWrap>Chiết khấu</TitleBottomWrap>
            <SubTitleBottomWrap>
              Chọn loại chiết khấu theo thứ tự ưu tiên giảm dần, giá trị giảm
              trừ
            </SubTitleBottomWrap>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 15,
              maxHeight: 535,
              overflowY: FakeDataTable3.length >= 5 ? "scroll" : "hidden",
            }}
          >
            {FakeDataTable3.map((item3, index) => (
              <>
                <div
                  style={{
                    border: "1px solid #D8D8D8",
                    borderRadius: "20px",
                    display: "flex",
                    gap: 28,
                    padding: "18px 22px 18px 21px",
                  }}
				  key={index}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      width: "50%",
                    }}
                  >
                    <TextBoldInWrapBottom>{item3.title}</TextBoldInWrapBottom>
                    <TextInWrapBottom>
                      {item3.subTitle}: {item3.valuechietkhau}&nbsp;%
                    </TextInWrapBottom>
                  </div>
                  <div style={{ border: "1px solid #E7E9EC" }} />
                  <div style={{ margin: "auto" }}>
                    <TextBoldInWrapBottom>
                      {currencyFormat(item3.toalbill)}
                    </TextBoldInWrapBottom>
                  </div>
                </div>
              </>
            ))}
          </div>
        </ContainerBottomLeft>
      </ContainerLeft>

      <ContainerRight>
        <TitleStyled>Giá trị nhà ở</TitleStyled>
        <WrapCardItem>
          {FakeDataTable2.map((item2,index) => (
            <WrapItemOnCard key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "70%",
                }}
              >
                <TextOnCardRight
                  style={{
                    color: item2.type === "total" ? "red" : "#1b3459",
                    fontWeight: item2.type === "total" ? "bold" : "400",
                  }}
                >
                  {item2.title}*:
                </TextOnCardRight>
                <TextOnCardRight
                  style={{
                    color: item2.type === "total" ? "red" : "#1b3459",
                    fontWeight: item2.type === "total" ? "bold" : "400",
                  }}
                >
                  {currencyFormat(item2.value)}
                </TextOnCardRight>
              </div>
              <WrapRightCardText>
                <TextOnCardRight
                  style={{
                    color: item2.type === "total" ? "red" : "#1b3459",
                    fontWeight: item2.type === "total" ? "bold" : "400",
                  }}
                >
                  {item2.unit}
                </TextOnCardRight>
              </WrapRightCardText>
            </WrapItemOnCard>
          ))}
          <div style={{ marginTop: 10 }}>
            <Typography
              style={{ fontSize: 16, fontWeight: 400, fontStyle: "italic" }}
            >
              *Đã bao gồm VAT
            </Typography>
            <Typography
              style={{ fontSize: 16, fontWeight: 400, fontStyle: "italic" }}
            >
              *Đơn vị tính: vnd
            </Typography>
          </div>
        </WrapCardItem>
        <ContainerCenterRight>
          <div>
            <TitleBottomWrap>Tiến độ thanh toán</TitleBottomWrap>
            <SubTitleBottomWrap>
              Chọn loại tiến độ thanh toán
            </SubTitleBottomWrap>
          </div>
          <div>
            <FormControl fullWidth style={{ height: 44 }}>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                displayEmpty
                value={personName}
                onChange={handleChange}
                input={
                  <OutlinedInput style={{ height: 44, borderRadius: 8 }} />
                }
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <span>Tiến độ thanh toán</span>;
                  }

                  return selected.join(", ");
                }}
                IconComponent={(props) => <IconDropDown {...props} />}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
                SelectDisplayProps={{
                  style: {
                    paddingLeft: 20,
                  },
                }}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div
            style={{
              maxHeight: 535,
              overflowY: FakeDataTable4.length >= 5 ? "scroll" : "hidden",
			  padding: 20
            }}
          >
            {FakeDataTable4.map((item4,index) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 15,
                  marginTop: 20,
                }}
				key={index}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <TextCenterRight>{item4.title}</TextCenterRight>
                    <SubTextCenterRight>{item4.subTitle}</SubTextCenterRight>
                  </div>
                  <div>
                    <TextCenterRight>
                      {currencyFormat(item4.value1)}
                    </TextCenterRight>
                    <SubTextCenterRight>
                      {item4.value2}% giá trị HĐ
                    </SubTextCenterRight>
                  </div>
                </div>
                <div style={{ border: "1px solid #C7C9D9" }} />
              </div>
            ))}
          </div>
        </ContainerCenterRight>
        <ContainerCenterRight style={{ padding: 38, gap: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <TextBoldInWrapBottom style={{ fontSize: 18 }}>
                Giá niêm yết
              </TextBoldInWrapBottom>
              <Typography
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  fontStyle: "italic",
                  marginTop: 3,
                }}
              >
                Đã bao gồm VAT
              </Typography>
            </div>
            <TextCenterRight
              style={{ fontSize: 18, margin: "auto", marginRight: 0 }}
            >
              4,180,000,000 vnd
            </TextCenterRight>
          </div>
          <div style={{ border: "1px solid #C7C9D9" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextBoldInWrapBottom style={{ fontSize: 18 }}>
                Giá sau chiết khấu
              </TextBoldInWrapBottom>
              <Typography
                style={{ fontSize: 18, fontWeight: 700, color: "#EA242A" }}
              >
                3,990,000,000 vnd
              </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextBoldInWrapBottom style={{ fontSize: 18 }}>
                Bằng chữ:
              </TextBoldInWrapBottom>
              <Typography
                style={{
                  width: "40%",
                  textAlign: "right",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#EA242A",
                }}
              >
                Bốn tỷ ba trăm ba mươi mốt triệu chín trăm chín mươi tám nghìn
                chín trăm đồng
              </Typography>
            </div>
          </div>
          <ButtonStyled
            onClick={() => {
              console.log("abc");
            }}
          >
            Thanh Toán
          </ButtonStyled>
        </ContainerCenterRight>
      </ContainerRight>
    </WrapBodyStyped>
  );
}
export default PhieuTinhGia;