const IconSliderYellowLeft = ({
  style,
  className,
}: {
  style?: React.CSSProperties;
  className;
}) => {
  return (
    <>
      <svg
        width="68"
        height="69"
        viewBox="0 0 68 69"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
      >
        <g>
          <path
            d="M59.5 33C59.5 46.531 48.531 57.5 35 57.5C21.469 57.5 10.5 46.531 10.5 33C10.5 19.469 21.469 8.5 35 8.5C48.531 8.50001 59.5 19.469 59.5 33Z"
            fill="white"
            stroke="#FEC83C"
          />
          <path
            d="M37 39.0664L30 32.9998L37 26.9331"
            stroke="#FEC83C"
            strokeLinecap="square"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_605_23260"
            x="-1"
            y="-3"
            width="72"
            height="72"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              radius="1"
              operator="dilate"
              in="SourceAlpha"
              result="effect1_dropShadow_605_23260"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_605_23260"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_605_23260"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default IconSliderYellowLeft;
