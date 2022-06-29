import Image from "next/image";
import LoadingImage from "../../../public/images/logoloading.png";
import styled from "@emotion/styled";

const ContainerStyled = styled.div`
  margin: 0px auto;
  max-width: 500px;
  animation: zoom-in-zoom-out 10s ease infinite;
  @keyframes zoom-in-zoom-out {
    0% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1.5, 1.5);
    }
    100% {
      transform: scale(1, 1);
    }
  }
`;

const LoadingComponent = () => {
  return (
    <ContainerStyled style={{ width: 'auto', height: 100 }}>
      <Image
        width={75}
        height={30}
        layout="fixed"
        src={LoadingImage}
        unoptimized={true}
      />
    </ContainerStyled>
  );
};
export default LoadingComponent;
