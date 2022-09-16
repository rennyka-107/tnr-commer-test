const CircleArrow = ({ style, onClick }: { style?: React.CSSProperties, onClick?: ()=> void }) => {
  return (
    <svg
	onClick={onClick}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
    >
      <path
        d="M0.500002 25C0.500003 11.469 11.469 0.5 25 0.500002C38.531 0.500003 49.5 11.469 49.5 25C49.5 38.531 38.531 49.5 25 49.5C11.469 49.5 0.500001 38.531 0.500002 25Z"
        fill="#F3F4F6"
        stroke="#C7C9D9"
      />
      <rect
        width="15"
        height="14"
        transform="matrix(1 8.74228e-08 8.74228e-08 -1 18 32)"
        fill="#F3F4F6"
      />
      <path
        d="M23 18.9333L30 25L23 31.0666"
        stroke="#C7C9D9"
        strokeLinecap="square"
      />
    </svg>
  );
};
export default CircleArrow;
