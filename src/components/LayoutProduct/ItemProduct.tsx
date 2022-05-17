// import FlexContainer from "@components/CustomComponent/FlexContainer";
import ItemProductCard from "@components/CustomComponent/ItemProductCard";
// import Product1 from "../../../../public/images/product1.png";
import Product2 from "../../../public/images/product2.png";
// import Product3 from "../../../../public/images/product3.png";
import styled from "@emotion/styled";
import PaddingComponent from "@components/CustomComponent/PagingComponent";
import Link from "next/link";

const ProductWrap = styled.div`
  display: grid;
  gap: 31px;
  grid-template-columns: repeat(3, 1fr);
`;
export function ItemProduct() {
  return (
    <>
      <ProductWrap>
		 
        <ItemProductCard
          src={Product2}
          title="TNR Stars Lam Sơn"
          subTitle="90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội"
          dataItem={{
            item1: "02",
            item2: "02",
            item3: "80",
            item4: "Đông Nam",
          }}
          priceListed={3018933000}
          priceSub={40580174}
          ticketCard="TRN Star"
		  activeSoSanh={true}
        />{" "}

        <ItemProductCard
          src={Product2}
          title="TNR Stars Lam Sơn"
          subTitle="90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội"
          dataItem={{
            item1: "02",
            item2: "02",
            item3: "80",
            item4: "Đông Nam",
          }}
          priceListed={3018933000}
          priceSub={40580174}
          ticketCard="TRN Star"
		  activeSoSanh={true}
        />
        <ItemProductCard
          src={Product2}
          title="TNR Stars Lam Sơn"
          subTitle="90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội"
          dataItem={{
            item1: "02",
            item2: "02",
            item3: "80",
            item4: "Đông Nam",
          }}
          priceListed={3018933000}
          priceSub={40580174}
          ticketCard="TRN Star"
		  activeSoSanh={true}
        />
        <ItemProductCard
          src={Product2}
          title="TNR Stars Lam Sơn"
          subTitle="90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội"
          dataItem={{
            item1: "02",
            item2: "02",
            item3: "80",
            item4: "Đông Nam",
          }}
          priceListed={3018933000}
          priceSub={40580174}
          ticketCard="TRN Star"
		  activeSoSanh={true}
        />
        <ItemProductCard
          src={Product2}
          title="TNR Stars Lam Sơn"
          subTitle="90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội"
          dataItem={{
            item1: "02",
            item2: "02",
            item3: "80",
            item4: "Đông Nam",
          }}
          priceListed={3018933000}
          priceSub={40580174}
          ticketCard="TRN Star"
		  activeSoSanh={true}
        />
        <ItemProductCard
          src={Product2}
          title="TNR Stars Lam Sơn"
          subTitle="90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội"
          dataItem={{
            item1: "02",
            item2: "02",
            item3: "80",
            item4: "Đông Nam",
          }}
          priceListed={3018933000}
          priceSub={40580174}
          ticketCard="TRN Star"
		  activeSoSanh={true}
        />
        <ItemProductCard
          src={Product2}
          title="TNR Stars Lam Sơn"
          subTitle="90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội"
          dataItem={{
            item1: "02",
            item2: "02",
            item3: "80",
            item4: "Đông Nam",
          }}
          priceListed={3018933000}
          priceSub={40580174}
          ticketCard="TRN Star"
		  activeSoSanh={true}
        />
        <ItemProductCard
          src={Product2}
          title="TNR Stars Lam Sơn"
          subTitle="90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội"
          dataItem={{
            item1: "02",
            item2: "02",
            item3: "80",
            item4: "Đông Nam",
          }}
          priceListed={3018933000}
          priceSub={40580174}
          ticketCard="TRN Star"
		  activeSoSanh={true}
        />
        <ItemProductCard
          src={Product2}
          title="TNR Stars Lam Sơn"
          subTitle="90 đường Láng, Thịnh Quang, Đống Đa, Hà Nội"
          dataItem={{
            item1: "02",
            item2: "02",
            item3: "80",
            item4: "Đông Nam",
          }}
          priceListed={3018933000}
          priceSub={40580174}
          ticketCard="TRN Star"
		  activeSoSanh={true}
        />
      </ProductWrap>
      <PaddingComponent />
    </>
  );
}
