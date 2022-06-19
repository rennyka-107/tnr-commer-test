import React from "react";

const IconPlusCircle = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <circle cx="22" cy="22" r="21.5" fill="white" stroke="#EA242A" />
      <path d="M12.2227 22H22.0004H31.7782" stroke="#EA242A" />
      <path d="M22 31.7773V21.9996V12.2218" stroke="#EA242A" />
    </svg>
  );
};

export default IconPlusCircle;
