const IconHuyLoc = ({
  style,
  disabled,
  className,
}: {
  style?: React.CSSProperties;
  disabled?: boolean;
  className?: any;
}) => {
  return (
    <div className={className} style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8ZM10.8229 11.5772L8.00004 8.75429L5.17716 11.5772L4.42292 10.8229L7.24579 8.00004L4.42292 5.17716L5.17716 4.42292L8.00004 7.24579L10.8229 4.42292L11.5772 5.17716L8.75429 8.00004L11.5772 10.8229L10.8229 11.5772Z"
          fill="#1B3459"
        />
      </svg>
      <span style={{ marginLeft: 8 }}>Hủy Lọc</span>
    </div>
  );
};

export default IconHuyLoc;
