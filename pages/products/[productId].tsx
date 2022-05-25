import React, { useEffect, useState } from "react";
import Page from "@layouts/Page";

import dynamic from "next/dynamic";
import { wrapper } from "../../store/store";
// import { getProductPTG } from "../api/productsApi";

const DynamicProductId = dynamic(() =>
  import("../../src/components/LayoutProduct/ProductIdpage"),  { loading: () => <p>...</p> }
);

const Product = () => {
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

// 		const response =  await getProductPTG(params);
// 		console.log(response)
// 	})();
// },[])

  return (
    <Page
      meta={{
        title: "TNR Ecommerce Product ProductName",
        description: "TNR Ecommerce Product ProductName",
      }}
    >
      <DynamicProductId />
    </Page>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
	
//   (store) => async () => {

//     // store.dispatch(getListMenuBarType(response.responseData));
// 	// console.log(response)
// 	return{
// 		props: {}
// 	}
//   }
// );

export default Product;
