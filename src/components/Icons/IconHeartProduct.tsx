const IconHeartProduct = ({
  style,
  onClick,
}: {
  style?: React.CSSProperties;
  onClick?: any;
}) => {
  return (
    <>
      <svg
        width="29"
        height="27"
        viewBox="0 0 101.5 87.52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="icon-heart"
        style={style}
        onClick={onClick}
      >
        <path
          d="M8.15,43.86l42.6,42.6,42.6-42.6A25.25,25.25,0,1,0,57.64,8.15L50.75,15,43.86,8.15A25.25,25.25,0,1,0,8.15,43.86Z"
          fill="white"
          //   stroke="white"
        />
      </svg>
    </>
  );
};

export default IconHeartProduct;
