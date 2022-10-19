const IconNextProduct = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <>
	<svg
		  width="50"
		  height="50"
		  viewBox="0 0 50 50"
		  fill="none"
		  xmlns="http://www.w3.org/2000/svg"
		  style={style}
		  className="icon icon-NextProduct"
		>
		  <ellipse
			cx="25"
			cy="25"
			rx="25"
			ry="25"
			transform="rotate(-180 25 25)"
			fill="#F3F4F6"
			className="ellipse icon-elippse"
		  />
		  <path
			d="M23 18.9336L30 25.0002L23 31.0669"
			stroke="#C7C9D9"
			strokeLinecap="square"
		  />
		</svg>
      {/* <svg
        style={style}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
		className="icon icon-NextProduct"
      >
        <circle
          cx="20"
          cy="20"
          r="20"
          transform="rotate(-180 20 20)"
          fill="#F3F4F6"
        />
        <rect
          width="12"
          height="11.2"
          transform="matrix(1 8.04287e-08 9.66338e-08 -1 14.4004 25.6001)"
          fill="#F3F4F6"
        />
        <path
          d="M18.4 15.1468L24 20.0002L18.4 24.8535"
          stroke="#C7C9D9"
          strokeLinecap="square"
        />
      </svg> */}
    </>
  );
};

export default IconNextProduct;
