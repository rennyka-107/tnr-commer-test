import React, { ReactNode, StyleHTMLAttributes } from "react";
import styled from "@emotion/styled";

type Props = {
    children?: ReactNode;
    customStyle?: React.CSSProperties
};


const RowWapper = styled.div`
    display:flex;
`;

const Row: React.FC<Props> = (props: Props) => {
    const { children, customStyle } = props
    return (
        <RowWapper style={customStyle}>
            {children}
        </RowWapper>
    );
};
export default Row;
