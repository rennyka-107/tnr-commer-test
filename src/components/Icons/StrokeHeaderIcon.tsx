const StrokeHeaderIcon = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <>
      <svg
        width="9"
        height="6"
        viewBox="0 0 9 6"
        fill="none"
		style={{marginLeft: 5}}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.5 1.5L4.5 4.5L7.5 1.5"
          stroke="#0E1D34"
          strokeLinecap="square"
        />
      </svg>
    </>
  );
};

export default StrokeHeaderIcon;
