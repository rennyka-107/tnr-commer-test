const IconAddHearProduct = ({
  style,
  onClick,
}: {
  style?: React.CSSProperties;
  onClick: any;
}) => {
  return (
    <>
      <svg
        width="29"
        height="27"
        viewBox="0 0 101.5 87.52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="icon-heart-add"
        style={style}
        onClick={onClick}
      >
         <path
          d="M8.15,43.86l42.6,42.6,42.6-42.6A25.25,25.25,0,1,0,57.64,8.15L50.75,15,43.86,8.15A25.25,25.25,0,1,0,8.15,43.86Z"
          fill="#EA242A"
          stroke="#EA242A"
          strokeWidth="1.5"
        />
      </svg>
	  
      {/* <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.03553 7.03553L8 13L13.9645 7.03553C14.6275 6.37249 15 5.47322 15 4.53553C15 2.58291 13.4171 1 11.4645 1C10.5268 1 9.62751 1.37249 8.96447 2.03553L8 3L7.03553 2.03553C6.37249 1.37249 5.47322 1 4.53553 1C2.58291 1 1 2.58291 1 4.53553C1 5.47322 1.37249 6.37249 2.03553 7.03553Z"
          fill="#EA242A"
          stroke="#EA242A"
          stroke-width="1.5"
        />
      </svg> */}
    </>
  );
};

export default IconAddHearProduct;
