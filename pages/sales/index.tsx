import Page from "@layouts/Page";
import styled from "@emotion/styled";
import FlexContainer from "@components/CustomComponent/FlexContainer";

const Container = styled.div`
  padding: 29px 0px;
  margin-top: 127px;
  display: flex;
`;

const AboutSupport = () => {
  return (
    <Page
      meta={{
        title: "TNR Ecommerce Thông tin khuyến mãi",
        description: "TNR Ecommerce  Thông tin khuyến mãi",
        isHomePage: true,
      }}
    >
      <FlexContainer>
        <Container>
          <span> Thông tin khuyến mãi</span>
        </Container>
      </FlexContainer>
    </Page>
  );
};

export default AboutSupport;
