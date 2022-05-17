import styled from "@emotion/styled";
import React, { ReactNode } from "react";

type Props = {
    children?: ReactNode;
    col?: number;
    customStyle?: React.CSSProperties;
};


const ColumnWapper = styled.div<{ col?: number }>`
    flex:${({ col }) => col ?? 1};
    padding:0px 30px;
`
const Column: React.FC<Props> = ({ children, col, customStyle }) => {
    return (
        <ColumnWapper col={col} style={customStyle}>
            {children}
        </ColumnWapper>
    );
};
export default Column;
