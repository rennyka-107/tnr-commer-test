const IconError = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        style={style}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20ZM27.0573 28.9429L20.0001 21.8857L12.9429 28.9429L11.0573 27.0573L18.1145 20.0001L11.0573 12.9429L12.9429 11.0573L20.0001 18.1145L27.0573 11.0573L28.9429 12.9429L21.8857 20.0001L28.9429 27.0573L27.0573 28.9429Z"
          fill="#FF3B3B"
        />
      </svg>
    </>
  );
};

export default IconError;
