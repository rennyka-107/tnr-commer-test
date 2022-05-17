import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

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


export default function Breadcrumbs() {

    const Router = useRouter();
    const paths = Router.asPath.split('/');
    return (
        <Container>
            {paths.map((path, index) => {
                if (path.length == 0) {
                    return (
                        <>
                            <Link href={'/'} passHref>
                                <LinkLabel key={index} href={`/`}>
                                    Trang chủ
                                </LinkLabel>
                            </Link>
                            {index != paths.length - 1 && <Path>/</Path>}
                        </>

                    )
                }
                return (
                    <>
                        <Link href={`/${path}`} passHref>
                            <LinkLabel key={index} href={`/${path}`}>
                                {path}
                            </LinkLabel>
                        </Link>
                        {index !== paths.length - 1 && <Path>/</Path>}
                    </>

                )
            })}
        </Container>
    )
}