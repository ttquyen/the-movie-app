import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteListAsync } from "./movieSlice";
import { LoadingButton } from "@mui/lab";
import { Box, Typography, Container, Stack } from "@mui/material";
import MovieDetailCard from "./MovieDetailCard";

function FavoriteList({ userId }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { totalMovie, totalPages, movies, isLoading } = useSelector(
    (state) => state.movie
  );

  useEffect(() => {
    if (userId) {
      dispatch(getFavoriteListAsync({ userId, page }));
    }
  }, [userId, page, dispatch]);

  return (
    <Container>
      <Stack>
        {movies?.map((p) => (
          <MovieDetailCard movie={p} key={p._id} />
        ))}
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {totalMovie ? (
          <LoadingButton
            variant="outlined"
            size="small"
            loading={isLoading}
            onClick={() => {
              setPage((page) => page + 1);
            }}
            disabled={Boolean(totalMovie) && movies.length >= totalMovie}
          >
            Load more
          </LoadingButton>
        ) : (
          <Typography variant="h6">No Movie Yet</Typography>
        )}
      </Box>
    </Container>
  );
}

export default FavoriteList;
