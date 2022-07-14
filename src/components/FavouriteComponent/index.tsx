const FavouriteComponent = () => {
	// const [bodySearch, setBodySearch] = useState<any>();
	// const {
	//   productFavorite,
	//   productFavoriteType,
	//   productLocation,
	//   productCondition,
	// } = useSelector((state: RootState) => state.products);
  
	// const dispatch = useDispatch();
  
	// useEffect(() => {
	//   (async () => {
	// 	try {
	// 	  const response = await getProductFavoriteApi(bodySearch);
	// 	  dispatch(getProductFavorite(response.responseData));
	// 	  const responseType = await getProductTypeApi();
	// 	  dispatch(getProductType(responseType.responseData));
	// 	  const responseLocation = await getProductLocationApi();
	// 	  dispatch(getProductLocation(responseLocation.responseData));
	// 	  const responseOrder = await getProductOrderConditionApi();
	// 	  dispatch(getProductOrderCondition(responseOrder.responseData));
	// 	} catch (error) {
	// 	  console.log(error);
	// 	}
	//   })();
	// }, [bodySearch]);
  return (
    <>
      {/* <ContentWrapper>
        <Link href={"/"} passHref>
          <ContentLeftWrapper>
            <IconArrowLeft />
            &nbsp;
            <TextProduct>Sản phẩm yêu thích</TextProduct>
          </ContentLeftWrapper>
        </Link>
        <div style={{ flex: 1 }}>
          <BoxContainer
            styleCustom={{
              borderRadius: 8,
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <DynamicMenuDropdown
              title="Vị trí"
              data={productLocation}
              onSelect={(values) => setBodySearch({ location: values.name })}
            />
            <DynamicMenuDropdown
              title="Loại"
              data={productFavoriteType}
              onSelect={(values) => setBodySearch({ type: values.name })}
            />
            <DynamicMenuDropdown
              title="Khoảng giá"
              data={[
                { id: "1", name: "Khoảng từ 1 tỷ đến 5 tỷ" },
                { id: "2", name: "Khoảng từ 5 tỷ đến 10 tỷ" },
              ]}
              onSelect={(values) => setBodySearch(values.name)}
            />
            <DynamicMenuDropdown
              title="Sắp xếp theo"
              data={(productCondition || []).map((elm) => ({
                id: elm.value,
                name: elm.key,
              }))}
              onSelect={(values) =>
                setBodySearch({ orderCondition: values.name })
              }
            />
          </BoxContainer>
        </div>
      </ContentWrapper> */}
    </>
  );
};
export default FavouriteComponent;
