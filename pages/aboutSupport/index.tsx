import WithAuth from "@HOCs/WithAuth";
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
        title: "TNR Ecommerce",
        description: "TNR Ecommerce",
        isHomePage: true,
      }}
    >
      <FlexContainer>
        <Container>
          <span>Về hỗ trợ</span>
        </Container>
      </FlexContainer>
    </Page>
  );
};

export default WithAuth(AboutSupport);
