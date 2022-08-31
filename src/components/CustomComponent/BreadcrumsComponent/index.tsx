import { Breadcrumbs, Typography } from "@mui/material";
import styled from "@emotion/styled";
import Link from "next/link";

const LinkStyled = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #0063F7;
  cursor: pointer;
  :hover  {
  text-decoration-line: underline;
  }
`;
const TypographyStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`;
type BreadProps = {
  breaditem?: {
    id: number;
    value: string;
    path?: string;
  }[];
  activePage?: string;
};

const BreadcrumsComponent = ({ breaditem, activePage }: BreadProps) => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        {breaditem.map((item, index) => (
          <Link key={index} href={`${item.path ?? '/'}`}>
            <LinkStyled>{item.value}</LinkStyled>
          </Link>
        ))}

        <TypographyStyled color="inherit"> {activePage}</TypographyStyled>
      </Breadcrumbs>
    </>
  );
}
export default BreadcrumsComponent;