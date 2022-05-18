const IconPrevProduct = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
	  style={style} 
	  className="icon icon-PrevProduct"
    >
      <circle cx="20" cy="20" r="20" fill="#F3F4F6" />
      <rect
        width="12"
        height="11.2"
        transform="matrix(-1 -7.66644e-09 8.40335e-09 1 25.5996 14.3999)"
        fill="#F3F4F6"
      />
      <path
        d="M21.6 24.8532L16 19.9998L21.6 15.1465"
        stroke="#C7C9D9"
        strokeLinecap="square"
      />
    </svg>
  );
};

export default IconPrevProduct;
