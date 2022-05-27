import React, { useEffect, useState } from "react";
import Page from "@layouts/Page";

import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useRouter } from "next/router";
import { getListProductApi } from "../api/productsApi";
import { getListProduct } from "../../store/productSlice";

const DynamicProductId = dynamic(() =>
  import("../../src/components/LayoutProduct/ProductIdpage"),  { loading: () => <p>...</p> }
);

const Product = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [navKey, setNavKey] = useState('');
	
	const { listProductResponse } = useSelector(
		(state: RootState) => state.products
	  );
	
	const { listProjectResponse } = useSelector(
		(state: RootState) => state.projects
	  );

	const {productId} = router.query
	const paramsSearch = {
		page: 1,
		size: 10,
	  };

	  const searchList = {
		projectId: productId,
		location: "",
		projectTypeId: "",
	  };

	  useEffect(() => {
		(async () => {
		  try {
			const response = await getListProductApi(paramsSearch, searchList);
			dispatch(getListProduct(response.responseData));
			// setNavKey(localStorage.getItem('navKey'))
			console.log(response)
		  } catch (error) {
			console.log(error);
		  }
		})();
	  }, [router, dispatch]);
	
  return (
    <Page
      meta={{
        title: "TNR Ecommerce Product ProductName",
        description: "TNR Ecommerce Product ProductName",
      }}
    >
      <DynamicProductId listProject={listProjectResponse} navKey={navKey}/>
    </Page>
  );
};

export default Product;
