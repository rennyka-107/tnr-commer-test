import { BodyResponseSalePolicy } from "interface/register";
import styled from "@emotion/styled";
import ImageWithHideOnError from "hooks/ImageWithHideOnError";
import Product3 from "../../../public/images/product3.png";
import { Typography } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";

const ContainerStyled = styled.div`
  display: flex;
  width: 1200px;
  flex-direction: column;
  gap: 50px;
`;
const ItemWrapStyled = styled.div`
display: flex;
flex-direction: row;
gap: 50px;
`;
const TypoGraphyStyled = styled(Typography)`
font-family: Roboto;
font-style: normal;
font-weight: 500;
font-size: 32px;
line-height: 38px;
text-align: center;
color: rgb(50, 47, 80);
margin-bottom: 40px;
`
const TitleStyled = styled.a`
font-family: Roboto;
font-style: normal;
font-size: 13px;
font-weight: 600;
line-height: 20px;
color: rgb(50, 47, 80);
margin-bottom: 20px;
cursor: pointer;
:hover {
    color: #EA242A;
  }
`
const DescriptionStyled = styled(Typography)`
font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    color: #707070;
`
const DateStyled = styled(Typography)`
font-size: 11px;
    font-weight: 400;
    line-height: 20px;
    color: #707070;
	margin-top: 20px;
`
type Props = {
  listSalePolicy: BodyResponseSalePolicy[];
  idPolicy: any;
};

type ItemProps = {
  avatar: string;
  createdDate: string;
  id: string;
  name: string;
  project: string;
  projectId: string;
  shortDescription: string;
  idPolicy: string;
};

const PolicySales = ({ listSalePolicy,idPolicy }: Props) => {
 const Router = useRouter();
  return (
    <>
      <ContainerStyled>
		<TypoGraphyStyled>Chính Sách Bán Hàng</TypoGraphyStyled>
        {listSalePolicy.map((item: any, index: any) => (
          <ItemWrapStyled key={index}>
            <div style={{minWidth: 360, minHeight: 200}}>
              <ImageWithHideOnError
                className="logo"
                src={item.avatar ? item?.avatar : Product3}
                fallbackSrc={Product3}
                height={190}
                width={350}
                title={"Logo "}
                alt={"Logo "}
                priority
                unoptimized={true}
                objectFit="cover"
              />
            </div>
            <div>
              <TitleStyled  
			  onClick={() => {
                Router.replace(
                  `/policyById/${item.id}`,
                  undefined,
                  { shallow: true }
                );
              }}>{item.name}</TitleStyled>
              <DescriptionStyled>{item.shortDescription}</DescriptionStyled>
			  <DateStyled>{item.createdDate}</DateStyled>
            </div>
          </ItemWrapStyled>
        ))}
      </ContainerStyled>
    </>
  );
};
export default PolicySales;
