import HeaderBot from "./HeaderBot";
import HeaderTop from "./HeaderTop";

const Header = () => {
  return (
    <div style={{ position: "fixed", width: "100%"}}>
      <HeaderTop />
      <HeaderBot />
    </div>
  );
};

export default Header;
