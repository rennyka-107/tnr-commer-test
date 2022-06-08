const IconBell = ({
  style,
  active,
}: {
  style?: React.CSSProperties;
  active?: boolean;
}) => {
  return (
    <>
      <svg
        width="17"
        height="21"
        viewBox="0 0 17 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.13281 13.8997H15.8661M2.83281 13.8997V8.23307C2.83281 5.10346 5.36987 2.56641 8.49948 2.56641C11.6291 2.56641 14.1661 5.10346 14.1661 8.23307V13.8997M6.23281 15.5997V16.1664C6.23281 17.4183 7.24763 18.4331 8.49948 18.4331C9.75132 18.4331 10.7661 17.4183 10.7661 16.1664V15.5997"
          stroke={active === true ? "rgb(27, 52, 89)" : "#8190A7"}
        />
      </svg>
    </>
  );
};

export default IconBell;
