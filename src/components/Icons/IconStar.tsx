const IconStar = ({
  style,
  fillColor,
  onMouseOver,
  onMouseOut,
  onClick,
}: {
  style?: React.CSSProperties;
  fillColor?: string;
  onMouseOver?: () => any;
  onMouseOut?: () => any;
  onClick?: () => any;
}) => {
  return (
    <svg
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      style={style}
    >
      <path
        d="M22 35.1666L9.63869 42L12 27.5267L2 17.2777L15.8193 15.1677L22 2L28.1807 15.1677L42 17.2777L32 27.5267L34.3613 42L22 35.1666Z"
        fill={fillColor}
        stroke="#FEC83C"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconStar;
