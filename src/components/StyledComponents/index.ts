import styled from "@emotion/styled";

const BoxTextOver = styled.div<{ numberLine?: number }>`
    margin:7px 0px;
    width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: ${({ numberLine }) => numberLine ?? 5};
    -webkit-box-orient: vertical;  
`;

export { BoxTextOver }