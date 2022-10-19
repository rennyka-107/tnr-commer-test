const IconCarouelHRightArrow = ({
  style,
}: {
  style?: React.CSSProperties;
}) => {
  return (
    <>
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        className="icon icon-rightArow"
      >
        <ellipse
          cx="25"
          cy="25"
          rx="25"
          ry="25"
          transform="rotate(-180 25 25)"
          fill="#48576D"
          className="ellipse icon-elippse"
        />
        <path
          d="M23 18.9336L30 25.0002L23 31.0669"
		  className="stroke-line-elippse"
          stroke="#1B3459"
          strokeLinecap="square"
        />
      </svg>
    </>
  );
};

export default IconCarouelHRightArrow;
