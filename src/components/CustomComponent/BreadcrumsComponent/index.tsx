import { Breadcrumbs, Link, Typography } from "@mui/material";
import styled from "@emotion/styled";

const LinkStyled = styled(Link)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
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
  }[];
  activePage?: string;
};

const BreadcrumsComponent = ({ breaditem, activePage }: BreadProps) => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        {breaditem.map((item, index) => (
          <LinkStyled key={index} underline="hover" color="#0063F7" href="/">
            {item.value}
          </LinkStyled>
        ))}

        <TypographyStyled color="inherit"> {activePage}</TypographyStyled>
      </Breadcrumbs>
    </>
  );
}
export default BreadcrumsComponent;