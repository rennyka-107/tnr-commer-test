import WithAuth from "@HOCs/WithAuth";
import Page from "@layouts/Page";
import styled from "@emotion/styled";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import { useRouter } from "next/router";

const Container = styled.div`
  padding: 29px 0px;
  margin-top: 127px;
  display: flex;
`;

const PolicySale = () => {
	const router = useRouter();
	const {id} = router.query;

	
  return (
    <Page
      meta={{
        title: "TNR Ecommerce Chính sách bán hàng",
        description: "TNR Ecommerce  Chính sách bán hàng",
        isHomePage: true,
      }}
    >
      <FlexContainer>
        <Container>
          <span> Chính sách bán hàng</span>
        </Container>
      </FlexContainer>
    </Page>
  );
};

export default PolicySale;
