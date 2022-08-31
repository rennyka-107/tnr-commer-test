
const IconCarsouelLeftProduct = ({ style }: { style?: React.CSSProperties }) => {
	return (
	  <>
		<svg
		  width="50"
		  height="50"
		  viewBox="0 0 50 50"
		  fill="none"
		  xmlns="http://www.w3.org/2000/svg"
		  style={style}
		  className="icon icon-LeftArow-prod"
		>
		  <ellipse cx="25" cy="25" rx="25" ry="25" fill="#F3F4F6" className="ellipse icon-elippse" />
		  <path
			d="M27 31.0664L20 24.9998L27 18.9331"
			stroke="#C7C9D9"
			strokeLinecap="square"
		  />
		</svg>
	  </>
	);
  };
  
  export default IconCarsouelLeftProduct;
  