import BoxContainer from "@components/CustomComponent/BoxContainer";
import Column from "@components/CustomComponent/Column";
import Row from "@components/CustomComponent/Row";
import IconCircleChecked from "@components/Icons/IconCircleChecked";
import IconCircleClose from "@components/Icons/IconCircleClose";
import IconWatingCircle from "@components/Icons/IconWatingCircle";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { ContractI } from "@service/Profile";
import ImageWithHideOnError from "hooks/ImageWithHideOnError";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import FormatFns from "utils/DateFns";
import { dayOfWeekToString, getDateFromStringDMY } from "utils/helper";
import Product3 from "../../../public/images/product3.png";

const DynamicHorizontalLine = dynamic(() =>
  import("@components/CustomComponent/HorizontalLine").then(
    (m) => m.default,
    (e) => null as never
  )
);

const ImageProduct = styled(Image)`
  border-radius: 8px;
`;
const HeaderTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentProduct = styled.div`
  padding-left: 31px;
  width: 582px;
`;

const Title = styled(Typography)`
  color: #8190a7;
  font-family: Roboto;
  font-style: normal;
`;

const TitleProject = styled(Title)`
  font-weight: 400;
  font-size: 14px;
  line-height: 16.41px;
`;

const TitleTime = styled(Title)`
  font-weight: 400;
  font-size: 12px;
  line-height: 14.84px;
`;

const TitleProduct = styled(Title)`
  font-weight: 500;
  font-size: 18px;
  line-height: 21.09px;
  color: #0e1d34;
`;

const CodeProduct = styled.span`
  color: #0e1d34;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21.09px;
  margin-bottom: 20px;
`;

const TextProduct = styled.span<{ color?: string }>`
  color: #1b3459;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16.41px;
  color: ${({ color }) => color};
  display: inline-flex;
  align-items: center;
`;

interface Props {
  item: ContractI;
  isLast?: boolean;
}

const ProductCard = (props: Props) => {
  const { item, isLast } = props;
  const router = useRouter();

  const convertDateToString = (date: Date) => {
    const house = FormatFns.format(date, "HH:mm");
    const day = FormatFns.format(date, "dd/MM/yyyy");
    const dateOfWeek = date.getDay();
    return house + " | " + dayOfWeekToString(dateOfWeek) + "," + day;
  };
  function currencyFormat(num) {
    if (!num) {
      return;
    }
    return Number(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  const handleChooseItem = (code: string) => {
    router.replace(`/profile?transCode=${code}`);
  };
  console.log(item);

  return (
    <BoxContainer
      styleCustom={{
        padding: 18,
        borderRadius: 8,
        marginBottom: isLast ? 0 : 23,
        marginTop: 18,
        display: "flex",
      }}
      key={item?.id}
    >
      <div>
        {item?.productionImage ? (
          //   <ImageProduct
          //     loader={({ src, width, quality }) => {
          //       return `${src}?w=${width}&q=${quality}`;
          //     }}
          //     src={
          //       item?.productionImage ??
          //       "https://tse3.mm.bing.net/th?id=OIP.zsEgRepQ6Uh5OYkkhJyn2gHaE5&pid=Api&P=0&w=277&h=183"
          //     }
          //     width={159}
          //     height={96}
          //     alt=""
          //   />
          <ImageWithHideOnError
            className="logo"
            src={item?.productionImage}
            fallbackSrc={Product3}
            height={120}
            width={180}
            title={"Logo "}
            alt={"Logo "}
            priority
			style={{borderRadius: 8}}
            unoptimized={true}
          />
        ) : (
          <ImageProduct
            src={Product3}
			height={120}
            width={180}
            alt=""
          />
        )}
      </div>
      <ContentProduct>
        <HeaderTitle
          style={{ cursor: "pointer" }}
          onClick={() => handleChooseItem(item.bookingCode)}
        >
          <TitleProject>{item?.projectName || "TNR"}</TitleProject>
          <TitleTime>
            C???p nh???t:{" "}
            {convertDateToString(
              getDateFromStringDMY(item?.bookingTime) ?? new Date()
            )}
          </TitleTime>
        </HeaderTitle>
        <HeaderTitle
          onClick={() => handleChooseItem(item.bookingCode)}
          style={{ marginBottom: 20, cursor: "pointer" }}
        >
          <TitleProduct>{item?.productName || "L?? A06"}</TitleProduct>
        </HeaderTitle>
        <CodeProduct>{item?.bookingCode}</CodeProduct>
        <Row>
          <Column col={2} customStyle={{ paddingLeft: 0 }}>
            <TextProduct>Kh??ch h??ng:</TextProduct>
          </Column>
          <Column col={3} customStyle={{ paddingLeft: 0 }}>
            <TextProduct>{item?.fullname}</TextProduct>
          </Column>
        </Row>
        <Row>
          <Column col={2} customStyle={{ paddingLeft: 0 }}>
            <TextProduct>M?? ?????t ch???:</TextProduct>
          </Column>
          <Column col={3} customStyle={{ paddingLeft: 0 }}>
            <TextProduct>{item?.bookingCode}</TextProduct>
          </Column>
        </Row>
        <Row>
          <Column col={2} customStyle={{ paddingLeft: 0 }}>
            <TextProduct>Th???i gian ?????t ch???:</TextProduct>
          </Column>
          <Column col={3} customStyle={{ paddingLeft: 0 }}>
            <TextProduct>
              {convertDateToString(
                getDateFromStringDMY(item?.bookingTime) ?? new Date()
              )}
            </TextProduct>
          </Column>
        </Row>
        <DynamicHorizontalLine />
        {item?.status === "?????t ch??? th??nh c??ng" ||
        item?.status === "??ang ch??? thanh to??n" ||
        item?.status === "???? ho??n thi???n h??? s??" ? (
          <>
            <Row>
              <Column col={1} customStyle={{ paddingLeft: 0 }}>
                <TextProduct>???? c???c:</TextProduct>
              </Column>
              <Column col={3} customStyle={{ paddingLeft: 0 }}>
                <TextProduct color="#8190A7">
                  {currencyFormat(item?.totalPrice)}&nbsp;??
                </TextProduct>
              </Column>
            </Row>
            <Row>
              <Column col={1} customStyle={{ paddingLeft: 0 }}>
                <TextProduct>???? thanh to??n:</TextProduct>
              </Column>
              <Column col={3} customStyle={{ paddingLeft: 0 }}>
                <TextProduct color="#8190A7">
                  {currencyFormat(item?.totalPrice)}&nbsp;??
                </TextProduct>
              </Column>
            </Row>
            <Row>
              <Column col={1} customStyle={{ paddingLeft: 0 }}>
                <TextProduct>C??n l???i:</TextProduct>
              </Column>
              <Column col={3} customStyle={{ paddingLeft: 0 }}>
                <TextProduct color="#8190A7">
                  {currencyFormat(item?.totalPrice)}&nbsp;??
                </TextProduct>
              </Column>
            </Row>
          </>
        ) : (
          <>
            <Row>
              <Column col={1} customStyle={{ paddingLeft: 0 }}>
                <TextProduct>???? c???c:</TextProduct>
              </Column>
              <Column col={3} customStyle={{ paddingLeft: 0 }}>
                <TextProduct color="#EA242A">
                  {currencyFormat(item?.totalPrice)}&nbsp;??
                </TextProduct>
              </Column>
            </Row>
            <Row>
              <Column col={1} customStyle={{ paddingLeft: 0 }}>
                <TextProduct>???? thanh to??n:</TextProduct>
              </Column>
              <Column col={3} customStyle={{ paddingLeft: 0 }}>
                <TextProduct color="#EA242A">
                  {currencyFormat(item?.totalPrice)}&nbsp;??
                </TextProduct>
              </Column>
            </Row>
            <Row>
              <Column col={1} customStyle={{ paddingLeft: 0 }}>
                <TextProduct>C??n l???i:</TextProduct>
              </Column>
              <Column col={3} customStyle={{ paddingLeft: 0 }}>
                <TextProduct color="#EA242A">
                  {currencyFormat(item?.totalPrice)}&nbsp;??
                </TextProduct>
              </Column>
            </Row>
          </>
        )}
        <DynamicHorizontalLine />
        <Row>
          <Column col={1} customStyle={{ paddingLeft: 0 }}>
            <TextProduct>Tr???ng th??i:</TextProduct>
          </Column>
          <Column col={3} customStyle={{ paddingLeft: 0 }}>
            {item?.status === "?????t ch??? th??nh c??ng" ? (
              <TextProduct color="#06C270">
                {" "}
                <div style={{ marginRight: 10 }}>
                  <IconCircleChecked />
                </div>
                ?????t ch??? th??nh c??ng
              </TextProduct>
            ) : item?.status === "??ang ch??? thanh to??n" ? (
              <TextProduct color="#FEC83C">
                <div style={{ marginRight: 10 }}>
                  {" "}
                  <IconWatingCircle />
                </div>
                ??ang ch??? thanh to??n
              </TextProduct>
            ) : item?.status === "H???t th???i gian thanh to??n" ? (
              <TextProduct color="#FF3B3B">
                <div style={{ marginRight: 10 }}>
                  {" "}
                  <IconCircleClose />
                </div>
                H???t th???i gian thanh to??n
              </TextProduct>
            ) : item?.status === "Ch??a ho??n th??nh h??? s??" ? (
              <TextProduct color="#FF3B3B">
                <div style={{ marginRight: 10 }}>
                  {" "}
                  <IconCircleClose />
                </div>
                Ch??a ho??n th??nh h??? s?? mua b??n
              </TextProduct>
            ) : item?.status === "?????t ch??? th??nh c??ng" ? (
              <TextProduct color="#06C270">
                {" "}
                <div style={{ marginRight: 10 }}>
                  <IconCircleChecked />
                </div>
                ?????t ch??? th??nh c??ng
              </TextProduct>
            ) : item?.status === "???? t???o phi???u thanh to??n" ? (
				<TextProduct color="#06C270">
                {" "}
                <div style={{ marginRight: 10 }}>
                  <IconCircleChecked />
                </div>
                ???? t???o phi???u thanh to??n
              </TextProduct>
			) : item?.status === "???? t???o b???n nh??p th??ng tin mua h??ng" ? (
				<TextProduct color="#FF3B3B">
                <div style={{ marginRight: 10 }}>
                  {" "}
                  <IconCircleClose />
                </div>
				???? t???o b???n nh??p th??ng tin mua h??ng
              </TextProduct>
			) :(
              <TextProduct color="#06C270">
                {" "}
                <div style={{ marginRight: 10 }}>
                  <IconCircleChecked />
                </div>
                ???? ho??n thi???n h??? s??
              </TextProduct>
            )}
          </Column>
        </Row>
      </ContentProduct>
    </BoxContainer>
  );
};

export default ProductCard;
