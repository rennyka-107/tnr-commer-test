const IconSapxep = ({
  style,
  disabled,
  className,
}: {
  style?: React.CSSProperties;
  disabled?: boolean;
  className?: any;
}) => {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <svg
        width="16"
        height="12"
        viewBox="0 0 16 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 1.20046H0V0.133789H16V1.20046ZM12.8 6.53379H3.2V5.46712H12.8V6.53379ZM10.6667 11.8671H5.33333V10.8005H10.6667V11.8671Z"
          fill="#1B3459"
        />
      </svg>

      <span style={{ marginLeft: 8, textTransform: 'none',fontFamily:'Roboto',color: '#1B3459', fontSize: 16 ,fontWeight: 400}}>Sắp xếp</span>
    </div>
  );
};

export default IconSapxep;
