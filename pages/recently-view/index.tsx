import Page from '@layouts/Page';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

interface ListRecentlyViewProps {
}

const ListRecentlyView: FC<ListRecentlyViewProps> = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [paramsSearch, setParamsSearch] = useState({
    page: 0,
    size: 12,
  });

  const changePage = (e: any) => {
    setParamsSearch({
      page: e,
      size: 12,
    });
  };
  // const pageNumber = Math.ceil(totalElement / paramsSearch.size);

  return (
    <Page
      meta={{
        title: "TNR Ecommerce Product",
        description: "TNR Ecommerce Product", 
      }}
    >

    </Page>
  )
}

export default ListRecentlyView;