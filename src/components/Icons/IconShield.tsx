const IconShield = ({ style, active }: { style?: React.CSSProperties, active?: boolean }) => {
  return (
    <>
      <svg
        width="17"
        height="21"
        viewBox="0 0 17 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.566406 6.09974L8.49974 1.56641L16.4331 6.09974V6.91562C16.4331 11.7994 13.1956 16.0914 8.49974 17.4331C3.8039 16.0914 0.566406 11.7994 0.566406 6.91562V6.09974Z"
		  stroke={active === true ? "rgb(27, 52, 89)" : "#8190A7"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export default IconShield;
