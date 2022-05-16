import React, { ReactNode, StyleHTMLAttributes } from "react";
import styled from "@emotion/styled";

type Props = {
    children?: ReactNode;
};


const RowWapper = styled.div`
    display:flex;
`;

const Row: React.FC<Props> = (props: Props) => {
    const { children } = props
    return (
        <RowWapper>
            {children}
        </RowWapper>
    );
};
export default Row;
