import Page from "@layouts/Page";

import dynamic from "next/dynamic";
import { useEffect } from "react";
// import { getProductPTG } from "../api/productsApi";

const DynamicPageIndex = dynamic(
  () => import("../../src/components/LayoutProduct/ProductPages"),
  { loading: () => <p>...</p> }
);

const ListProduct = () => {
// 	const params = {
// 		ProjectName: "TNR AMALUNA - TRÀ VINH",
// 		BlockName: "Liền kề",
// 		ProductName : "LK.08.32",
// 		DepositeDate: "29/04/2022",
// 		IsMortgage : true,
// 		GroupCusID : 0,
// 		ProvinceID : 0,
// 		DistrictID : 0,
// 		PriceID : 230896,
// 	}
	
// useEffect(() => {

// 	(async () => {

// 		const response = await getProductPTG(params);
// 		console.log(response)
// 	})
// },[])
  return (
    <Page
      meta={{
        title: "TNR Ecommerce Product",
        description: "TNR Ecommerce Product",
      }}
    >
      <DynamicPageIndex />
    </Page>
  );
};

export default ListProduct;
