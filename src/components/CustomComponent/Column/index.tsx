import React, { ReactNode, StyleHTMLAttributes } from "react";
import styled from "@emotion/styled";

type Props = {
    children?: ReactNode;
    col?: number;
};


const ColumnWapper = styled.div<{ col?: number }>`
    flex:${({ col }) => col ?? 1};
    padding:0px 30px;
`
const Column: React.FC<Props> = ({ children, col }) => {
    return (
        <ColumnWapper col={col}>
            {children}
        </ColumnWapper>
    );
};
export default Column;
