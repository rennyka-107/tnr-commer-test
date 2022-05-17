const IconDropDown = (props) => {
  return (
    <>
      <svg
        width="30"
        height="30"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
		style={{marginRight: 20, top: 'auto'}}
		{...props}
      >
        <path
          d="M4.5 6.5L7.5 9.5L10.5 6.5"
          stroke="#0E1D34"
          strokeLinecap="square"
        />
      </svg>
    </>
  );
};

export default IconDropDown;
