import {
  ButtonAction,
  ButtonStyled,
  RowStyled,
  Text14Styled,
  Text18Styled,
} from "@components/StyledLayout/styled";
import { Box, Checkbox } from "@mui/material";
import Link from "next/link";

type Props = {};

const ChangeApartmentRequest = (props: Props) => {
  return (
    <Box
      sx={{
        borderRadius: "20px",
        border: "1px solid #D8D8D8",
        padding: "30px",
        margin: "0 8rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Box width={350}>
        <RowStyled>
          <Checkbox
          // value={acceptPolicy}
          // onChange={(e, checked) => {
          //   setAcceptPolicy(checked);
          // }}
          />
          <Text14Styled>
            Ấn “Gửi yêu cầu thanh lý” đồng nghĩa với việc bạn đồng ý tuân theo&nbsp;
            <span style={{ color: "#0063F7", textDecoration: "underline" }}>
              <Link href={"/"}>Điều Khoản TNR</Link>
            </span>
          </Text14Styled>
        </RowStyled>
        <ButtonAction
          // disabled={
          //   formInfo.open || !acceptPolicy || data.paymentStatus !== 0
          // }
          margin={"12px auto"}
          // onClick={handleSubmit((values) => handleOnSubmit(values, 1))}
        >
          <Text18Styled color={"#fff"}>Gửi yêu cầu thanh lý</Text18Styled>
        </ButtonAction>
        <ButtonStyled
          type="submit"
          bg="#FFFFFF"
          // bg={
          //   !isEmpty(transactionCode) && data.paymentStatus !== 0
          //     ? isEqual(
          //         initialValue?.paymentIdentityInfos,
          //         data.paymentIdentityInfos
          //       ) &&
          //       isEqual(
          //         initialValue.paymentIdentityInfos.find(
          //           (info) => info.mainUser === 1
          //         ),
          //         { ...watch() }
          //       ) &&
          //       !validUpload
          //       ? "#E7E9EC"
          //       : "red"
          //     : "white"
          // }
          border={"1px solid #c7c9d9"}
          // disabled={
          //   isEqual(
          //     initialValue?.paymentIdentityInfos,
          //     data.paymentIdentityInfos
          //   ) &&
          //   isEqual(
          //     initialValue.paymentIdentityInfos.find(
          //       (info) => info.mainUser === 1
          //     ),
          //     { ...watch() }
          //   ) &&
          //   !validUpload
          // }
        >
          <Text18Styled>Hủy yêu cầu</Text18Styled>
        </ButtonStyled>
      </Box>
    </Box>
  );
};

export default ChangeApartmentRequest;
