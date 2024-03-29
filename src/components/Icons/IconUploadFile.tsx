import React from "react";

const IconUploadFile = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <svg
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 4.0001C0 2.67461 1.07452 1.6001 2.4 1.6001H9.13137L12.3314 4.8001H21.6C22.9255 4.8001 24 5.87461 24 7.2001V20.0001C24 21.3256 22.9255 22.4001 21.6 22.4001H2.4C1.07452 22.4001 0 21.3256 0 20.0001V4.0001ZM11.2 17.6001V14.4001H8V12.8001H11.2V9.6001H12.8V12.8001H16V14.4001H12.8V17.6001H11.2Z"
        fill="#0063F7"
      />
    </svg>
  );
};

export default IconUploadFile;
