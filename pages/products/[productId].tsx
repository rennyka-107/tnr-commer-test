import React, { useEffect, useState } from "react";
import Page from "@layouts/Page";

import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useRouter } from "next/router";
import { getListProductApi, getProducById } from "../api/productsApi";
import { getListProduct, getProductById } from "../../store/productSlice";
import { CircularProgress } from "@mui/material";

const DynamicProductId = dynamic(() =>
  import("../../src/components/LayoutProduct/ProductIdpage"),  { loading: () => <p>...</p> }
);

const Product = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [navKey, setNavKey] = useState('');
	const [loading, setLoading] = useState(false);
	const { productByID } = useSelector(
		(state: RootState) => state.products
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
			const responAPIBYID = await getProducById(productId);
			dispatch(getProductById(responAPIBYID.responseData))
			if(response.responseCode === '00' && responAPIBYID.responseCode === '00'){
				setLoading(true)
			}
		} catch (error) {
			console.log(error);
		}
	})();
}, [router, dispatch]);

	  const fetchComponent = () => {
		return (
		  <>
			{loading === true ? (
			   <DynamicProductId  navKey={navKey} dataProduct={productByID}/>
			) : (
			  <>
				<div style={{ textAlign: "center", marginTop: 200 }}>
				  <CircularProgress />
				</div>
			  </>
			)}
		  </>
		);
	  };
	  useEffect(() => {
		fetchComponent();
	  }, [loading]);
  return (
    <Page
      meta={{
        title: "TNR Ecommerce Product ProductName",
        description: "TNR Ecommerce Product ProductName",
      }}
    >
     {fetchComponent()}
    </Page>
  );
};

export default Product;
