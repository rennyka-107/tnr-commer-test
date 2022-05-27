import IconPageBack from '@components/Icons/IconPageBack';
import IconPagForward from '@components/Icons/IconPageForward';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import * as React from 'react';

interface PaginationI {
  count: number;
  onChange?: (event: React.ChangeEvent, page: number) => void;
  page: number;
}

export default function PaginationComponent(props: PaginationI) {
  const { count, onChange, page } = props
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        renderItem={(item) => {
          return (
            <PaginationItem
              components={{ previous: IconPageBack, next: IconPagForward }}
              page={page}
              {...item}
            />
          )
        }}
        onChange={onChange}
      />
    </Stack>
  );
}
