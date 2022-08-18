import styled from "@emotion/styled";
import React, { MouseEventHandler, ButtonHTMLAttributes } from "react";

const BaseButton = styled.button`
  background: #1B3459;
  border-radius: 8px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  padding: 14px 70px;
  cursor: pointer;
  border: unset;
  width:100%;

  :hover {
    background: #FEC83C;
    // box-shadow: 4px 8px 24px #f2f2f5;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
    // border-radius: 60px;
    color: #ffffff;
  }

  // :hover {
  //   background: #ffffff;
  //   box-shadow: 4px 8px 24px #f2f2f5;
  //   color: #0e1d34;
  // }
`;
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function CustomButton({ label, style, onClick, ...res }: Props) {
  return (
    <BaseButton onClick={onClick} style={style} {...res}>
      {label}
    </BaseButton>
  );
}
