import React from "react";

type Props = {
  style: any;
  onClick?: () => void;
};

const IconBackPage = (props: Props) => {
  return (
    <>
      <svg
        width="12"
        height="20"
        viewBox="0 0 12 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
		style={props.style}
		onClick={props.onClick}
      >
        <path
          d="M0.444108 9.2196L9.34436 0.31951C9.55021 0.113495 9.82501 -8.96041e-08 10.118 -7.67964e-08C10.411 -6.39887e-08 10.6858 0.113495 10.8917 0.31951L11.5471 0.974789C11.9736 1.40178 11.9736 2.09576 11.5471 2.52209L4.07335 9.99585L11.5554 17.4779C11.7613 17.6839 11.8749 17.9586 11.8749 18.2514C11.8749 18.5446 11.7613 18.8192 11.5554 19.0254L10.9 19.6805C10.6939 19.8865 10.4193 20 10.1263 20C9.8333 20 9.5585 19.8865 9.35265 19.6805L0.444108 10.7723C0.237768 10.5656 0.124436 10.2897 0.125086 9.99634C0.124436 9.70187 0.237768 9.4261 0.444108 9.2196Z"
          fill="black"
        />
      </svg>
    </>
  );
};

export default IconBackPage;
