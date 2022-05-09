import styled from "@emotion/styled";
import React, { MouseEventHandler } from "react";

const BaseButton = styled.button`
  background: #0e1d34;
  border-radius: 8px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  padding: 14px 70px;
  cursor: pointer;
  border: unset;

  // :hover {
  //   background: #ffffff;
  //   box-shadow: 4px 8px 24px #f2f2f5;
  //   color: #0e1d34;
  // }
`;
type Props = {
  label: string;
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function CustomButton({ label, style, onClick }: Props) {
  return (
    <BaseButton onClick={onClick} style={style}>
      {label}
    </BaseButton>
  );
}
