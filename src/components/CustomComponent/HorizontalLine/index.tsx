import styled from "@emotion/styled";
import React from "react";

interface Props {
    mb?: number;
    mt?: number;
}

const Line = styled.div<Props>`
    border: 1px solid #C7C9D9;
    width:100%;
    margin-top:${(props: Props) => props?.mt ? props?.mt + "px" : "16px"};
    margin-bottom:${(props: Props) => props?.mb ? props?.mb + "px" : "16px"}
`;

const HorizontalLine = (props: Props) => {
    return <Line {...props} />;
};
export default HorizontalLine;
