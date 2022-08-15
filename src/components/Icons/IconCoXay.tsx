const IconCoXay = ({
  style,
  active,
}: {
  style?: React.CSSProperties;
  active?: boolean;
}) => {
  return (
    <>
      <svg
        width="18"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 0.666748L9.35355 0.313195C9.15829 0.117932 8.84171 0.117932 8.64645 0.313195L9 0.666748ZM1 8.66675L0.646447 8.31319L0.5 8.45964V8.66675H1ZM17 8.66675H17.5V8.45964L17.3536 8.31319L17 8.66675ZM17.3536 8.31319L9.35355 0.313195L8.64645 1.0203L16.6464 9.0203L17.3536 8.31319ZM8.64645 0.313195L0.646447 8.31319L1.35355 9.0203L9.35355 1.0203L8.64645 0.313195ZM17.5 18.0001V8.66675H16.5V18.0001H17.5ZM0.5 8.66675V18.0001H1.5V8.66675H0.5ZM2.33333 19.8334H15.6667V18.8334H2.33333V19.8334ZM16.5 18.0001C16.5 18.4603 16.1269 18.8334 15.6667 18.8334V19.8334C16.6792 19.8334 17.5 19.0126 17.5 18.0001H16.5ZM0.5 18.0001C0.5 19.0126 1.32081 19.8334 2.33333 19.8334V18.8334C1.8731 18.8334 1.5 18.4603 1.5 18.0001H0.5Z"
          fill="#1B3459"
        />
      </svg>
    </>
  );
};

export default IconCoXay;
