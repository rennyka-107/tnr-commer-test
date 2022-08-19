import React from "react";

type Props = {
	style: any;
	onClick?: () => void
};

const IconBackTransation = (props: Props) => {
  return (
    <>
      <svg
        width="11"
        height="17"
        viewBox="0 0 11 17"
		style={props.style}
		onClick={props.onClick}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 2L2 8.5L9 15"
          stroke="#1B3459"
          strokeWidth="2"
          strokeLinecap="square"
        />
      </svg>
    </>
  );
};

export default IconBackTransation;
