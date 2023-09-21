import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function AppPagination({ page, count, handleChangePagination }) {
  return (
    <Stack spacing={1} alignItems="center">
      {/* <Typography>Page: {page}</Typography> */}
      <Pagination
        count={count}
        page={page}
        onChange={handleChangePagination}
        siblingCount={0}
      />
    </Stack>
  );
}
