import React from 'react'

const IconSetting = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <svg width="92" height="92" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <g filter="url(#filter0_d_1037_12557)">
        <circle cx="46" cy="50" r="25" fill="#1B3459" />
      </g>
      <path d="M37 50C37 50.5523 36.5523 51 36 51C35.4477 51 35 50.5523 35 50C35 49.4477 35.4477 49 36 49C36.5523 49 37 49.4477 37 50Z" fill="white" />
      <path d="M47 50C47 50.5523 46.5523 51 46 51C45.4477 51 45 50.5523 45 50C45 49.4477 45.4477 49 46 49C46.5523 49 47 49.4477 47 50Z" fill="white" />
      <path d="M57 50C57 50.5523 56.5523 51 56 51C55.4477 51 55 50.5523 55 50C55 49.4477 55.4477 49 56 49C56.5523 49 57 49.4477 57 50Z" fill="white" />
      <path d="M37 50C37 50.5523 36.5523 51 36 51C35.4477 51 35 50.5523 35 50C35 49.4477 35.4477 49 36 49C36.5523 49 37 49.4477 37 50Z" stroke="white" strokeWidth="3" />
      <path d="M47 50C47 50.5523 46.5523 51 46 51C45.4477 51 45 50.5523 45 50C45 49.4477 45.4477 49 46 49C46.5523 49 47 49.4477 47 50Z" stroke="white" strokeWidth="3" />
      <path d="M57 50C57 50.5523 56.5523 51 56 51C55.4477 51 55 50.5523 55 50C55 49.4477 55.4477 49 56 49C56.5523 49 57 49.4477 57 50Z" stroke="white" strokeWidth="3" />
      <defs>
        <filter id="filter0_d_1037_12557" x="0" y="0" width="92" height="92" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1037_12557" />
          <feOffset dy="-4" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1037_12557" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1037_12557" result="shape" />
        </filter>
      </defs>
    </svg>

  )
}

export default IconSetting