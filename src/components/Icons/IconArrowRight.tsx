const IconArrowRight = ({ color }: { color?: string }) => {
  return (
    <>
      <svg
        width="9"
        height="15"
        viewBox="0 0 9 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 14L8 7.5L1 1"
          stroke={color ?? "#1B3459"}
          strokeLinecap="square"
        />
      </svg>
    </>
  );
};

export default IconArrowRight;
