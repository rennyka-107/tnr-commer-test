import { PhoneIconPage, UpIconPage } from "@components/Icons";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const StyledPhoneContainer = styled.a`
  display: block;
  width: 40px;
  height: 40px;
  background: #ea242a;
  border-radius: 8px;
  text-align: center;
  padding: 6px;
  z-index: 10000;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
`;

const StyledUpContainer = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  background: #c7c9d9;
  border-radius: 8px;
  text-align: center;
  padding: 10px;
  z-index: 500;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
`;
const ScrollPage = () => {
  const generalInfo = useSelector((state: RootState) => state.generalInfo);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <div
        style={{
          position: "fixed",
          right: 0,
          bottom: "10%",
          marginRight: 20,
          zIndex: 1000,
        }}
      >
        <StyledPhoneContainer
          style={{ marginBottom: 9 }}
          href={`tel:${generalInfo.phoneNumber}`}
        >
          <PhoneIconPage />
        </StyledPhoneContainer>
        <StyledUpContainer onClick={scrollToTop}>
          <UpIconPage />
        </StyledUpContainer>
      </div>
    </>
  );
};
export default ScrollPage;
