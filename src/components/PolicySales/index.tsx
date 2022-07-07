import { BodyResponseSalePolicy } from "interface/register";
import styled from "@emotion/styled";
import ImageWithHideOnError from "hooks/ImageWithHideOnError";
import Product3 from "../../../public/images/product3.png";
import { Paper, Typography } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import ItemProjectCard from "@components/LayoutProjectTNR/ProjectCard";

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
`;
const TitleStyled = styled(Typography)`
  text-align: center;
  font-family: Roboto;
  font-style: normal;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  color: rgb(50, 47, 80);

`;
const DescriptionStyled = styled(Typography)`
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  color: #707070;
`;
const DateStyled = styled(Typography)`
  font-size: 11px;
  font-weight: 400;
  line-height: 20px;
  color: #707070;
  margin-top: 20px;
`;
const LinkStyled = styled.a`
  text-align: center;
  color: rgb(50, 47, 80);
  font-weight: 500;
  &:hover {
    color: #ea242a;
  }
`;
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

const PolicySales = ({ listSalePolicy, idPolicy }: Props) => {
  const Router = useRouter();
  return (
    <>
      <ContainerStyled>
        <TypoGraphyStyled>Chính Sách Bán Hàng</TypoGraphyStyled>
        {listSalePolicy.map((item: any, index: any) => (
          <Paper elevation={3} style={{ padding: 20 }} key={index}>
            {/* <ItemWrapStyled key={index}> */}

            <TitleStyled>{item.name}</TitleStyled>
            <div style={{ border: "1px solid #C7C9D9" , marginTop: 20, marginBottom: 20}} />
            <div style={{ textAlign: "center" }}>
              <LinkStyled href={item.pdf} target="_blank">
                Xem chính sách
              </LinkStyled>
            </div>
            {/* <DescriptionStyled>{item.shortDescription}</DescriptionStyled>
              <DateStyled>{item.createdDate}</DateStyled> */}
            {/* <div style={{minWidth: 360, minHeight: 200}}>
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
            </div> */}
            {/* <div>
               
              </div> */}
            {/* </ItemWrapStyled> */}
          </Paper>
        ))}
      </ContainerStyled>
    </>
  );
};
export default PolicySales;
