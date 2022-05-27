import React from 'react'

const IconTimes = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path d="M0.799805 0.799805L23.1998 23.1998M0.799805 23.1998L23.1998 0.799805" stroke={style?.color ?? "#1B3459"} strokeWidth="2" />
    </svg>
  )
}

export default IconTimes