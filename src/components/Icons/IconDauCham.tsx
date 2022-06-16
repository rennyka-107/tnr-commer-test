const IconDauCham = ({
  style,
  active,
}: {
  style?: React.CSSProperties;
  active: boolean;
}) => {
  return (
    <>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.5 5.5H14.5M2 9.5H8M10 9.5H13M0.5 3.5L0.5 11.5C0.5 12.0523 0.947716 12.5 1.5 12.5L13.5 12.5C14.0523 12.5 14.5 12.0523 14.5 11.5V3.5C14.5 2.94772 14.0523 2.5 13.5 2.5L1.5 2.5C0.947716 2.5 0.5 2.94772 0.5 3.5Z"
		  stroke={active === true ? "rgb(27, 52, 89)" : "#8190A7"}
        />
      </svg>
    </>
  );
};

export default IconDauCham;