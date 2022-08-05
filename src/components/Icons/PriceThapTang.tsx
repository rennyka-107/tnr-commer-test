const PriceThapTang = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <>
      <svg
        width="14"
        height="16"
        viewBox="0 0 14 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
		style={style}
      >
        <path
          d="M1.66602 11.2C1.66602 12.9673 3.0987 14.4 4.86602 14.4H9.13268C10.9 14.4 12.3327 12.9673 12.3327 11.2C12.3327 9.43269 10.9 8 9.13268 8H4.86602C3.0987 8 1.66602 6.56731 1.66602 4.8C1.66602 3.03269 3.0987 1.6 4.86602 1.6H9.13268C10.9 1.6 12.3327 3.03269 12.3327 4.8M6.99935 0V1.6M6.99935 16V14.4"
          stroke="#1B3459"
          strokeWidth="1.5"
        />
      </svg>
    </>
  );
};

export default PriceThapTang;
