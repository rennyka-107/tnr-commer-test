import React from "react";

const IconPlusDoiLoCan = ({
  style,
  stroke,
}: {
  style?: React.CSSProperties;
  stroke?: string;
}) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
	  style={{marginTop: 2}}
    >
      <path
        d="M7.99987 4.26654V11.7332M4.26654 7.99987H11.7332M7.99987 15.4665C3.87614 15.4665 0.533203 12.1236 0.533203 7.99987C0.533203 3.87614 3.87614 0.533203 7.99987 0.533203C12.1236 0.533203 15.4665 3.87614 15.4665 7.99987C15.4665 12.1236 12.1236 15.4665 7.99987 15.4665Z"
        stroke="#0063F7"
      />
    </svg>
  );
};

export default IconPlusDoiLoCan;
