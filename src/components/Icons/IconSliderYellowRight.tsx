const IconSliderYellowRight = ({ style, className }: { style?: React.CSSProperties, className }) => {
  return (
    <>
      <svg
        width="70"
        height="69"
        viewBox="0 0 70 69"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
      >
        <g>
          <path
            d="M10.5 33C10.5 19.469 21.469 8.5 35 8.5C48.531 8.5 59.5 19.469 59.5 33C59.5 46.531 48.531 57.5 35 57.5C21.469 57.5 10.5 46.531 10.5 33Z"
            fill="white"
            stroke="#FEC83C"
          />
          <path
            d="M33 26.9336L40 33.0002L33 39.0669"
            stroke="#FEC83C"
            strokeLinecap="square"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_516_8114"
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
              result="effect1_dropShadow_516_8114"
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
              result="effect1_dropShadow_516_8114"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_516_8114"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default IconSliderYellowRight;
