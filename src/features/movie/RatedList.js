import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRatedListAsync } from "./movieSlice";
import { LoadingButton } from "@mui/lab";
import { Box, Typography, Container, Stack } from "@mui/material";
import MovieDetailCard from "./MovieDetailCard";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function RatedList({ userId }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const { totalMovies, totalPages, movies, isLoading } = useSelector(
    (state) => state.movie
  );
  const sortFilter = [
    { id: "highest", label: "Highest to Lowest" },
    { id: "lowest", label: "Highest to Lowest" },
  ];

  useEffect(() => {
    if (userId) {
      dispatch(getRatedListAsync({ userId, page, sort }));
    }
  }, [userId, page, sort, dispatch]);
  const handleChange = (event) => {
    setSort(event.target.value);
    //TODO
    //use lodash sort by
  };
  return (
    <Container sx={{ px: { md: 20 } }}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="sort-rated-movie">Sort by:</InputLabel>
          <Select value={sort} label="Sort" onChange={handleChange}>
            {sortFilter.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Stack>
        {movies?.map((p) => (
          <MovieDetailCard movie={p} key={p._id} />
        ))}
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {totalMovies ? (
          <LoadingButton
            variant="outlined"
            size="small"
            loading={isLoading}
            onClick={() => {
              setPage((page) => page + 1);
            }}
            disabled={Boolean(totalMovies) && movies.length >= totalMovies}
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

export default RatedList;
