import styled from "@emotion/styled";
import React, { ReactNode } from "react";

type Props = {
    children?: ReactNode;
    customStyle?: React.CSSProperties
};

const RowWrapper = styled.div`
    display: flex;
`;

const Row: React.FC<Props> = (props: Props) => {
    const { children, customStyle } = props
    return (
        <RowWrapper style={customStyle}>
            {children}
        </RowWrapper>
    );
};
export default Row;
