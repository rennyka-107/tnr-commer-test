import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from 'prop-types';
import React from "react";
import Breadscrumb from "utils/BreadScrumb";

const Container = styled.div`
    display:flex;
`;

const LinkLabel = styled.a`
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #1F70E8;
    cursor:pointer;
    &:hover {
        text-decoration: underline;
    }
`
const Path = styled.span`
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #1F70E8;
    cursor:pointer;
    padding:0px 5px;
`;
const TypographyStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`;
export default function Breadcrumbs({ title }) {
    const Router = useRouter();
    const paths = Router.pathname.split('/').filter((path) => !path.includes('[') && !path.includes(']'));
    return (
        <Container>
            {paths.map((path, index) => {
                if (path.length == 0) {
                    return (
                        <React.Fragment key={index}>
                            <Link href={'/'} passHref>
                                <LinkLabel key={index} href={`/`}>
                                    Trang chủ
                                </LinkLabel>
                            </Link>
                            {index != paths.length - 1 && <Path>/</Path>}
                        </React.Fragment>
                    )
                }
                return (
                    <React.Fragment key={index}>
                        <Link href={`/${path}`} passHref>
                            {/* <LinkLabel key={index} href={`/${path}`}> */}
                                {/* {Breadscrumb.find((el) => el.path == path)?.title} */}
								<TypographyStyled color="inherit">{title}</TypographyStyled>
								
                            {/* </LinkLabel> */}
                        </Link>
                        {index !== paths.length - 1 && <Path>/</Path>}
                    </React.Fragment>
                )
            })}
        </Container>
    )
}

Breadcrumbs.defaultProps = {
    title: 'Trang chủ'
}
Breadcrumbs.prototype = {
    title: PropTypes.string,
}