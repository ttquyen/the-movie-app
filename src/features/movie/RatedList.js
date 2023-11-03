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
import LoadingScreen from "../../pages/LoadingScreen";
import _ from "lodash";

function RatedList({ userId }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const { totalMovies, movies, isLoading } = useSelector(
    (state) => state.movie
  );
  let sortedMovies = _.cloneDeep(movies);
  const sortFilter = [
    { id: "highest", label: "Highest to Lowest" },
    { id: "lowest", label: "Highest to Lowest" },
  ];

  useEffect(() => {
    if (userId) {
      dispatch(getRatedListAsync({ userId, page }));
    }
  }, [userId, page, dispatch]);
  const handleChange = (event) => {
    setSort(event.target.value);
    //TODO
    //use lodash sort by
    switch (event.target.value) {
      case "highest":
        // sortedMovies = _.sortBy(sortedMovies, ["star"]);

        break;
      case "lowest":
        break;

      default:
        break;
    }
  };
  return (
    <Container sx={{ px: { md: 20 } }}>
      {isLoading && <LoadingScreen />}
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
        {sortedMovies?.map((p) => (
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
            disabled={
              Boolean(totalMovies) && sortedMovies.length >= totalMovies
            }
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
