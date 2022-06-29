import ContainerSearch from "@components/Container/ContainerSearch";
import ItemSearch from "@components/SearchPage/ItemSearch";
import { searchLocationResponse } from "interface/searchIF";

type dataProps = {
  searchData: searchLocationResponse[];
  setSearch?: any;
  totalElement?: number;
  pageNumber?: number;
};

const HotProductsComponent = ({ searchData }: dataProps) => {
  return (
    <ContainerSearch title={"Sản phẩm nổi bật"} checkBread={true}>
      <div>
	  <ItemSearch data={searchData} />
	  </div>
    </ContainerSearch>
  );
};
export default HotProductsComponent;
