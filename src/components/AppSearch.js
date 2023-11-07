import React, { useCallback, useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { getMovieListAsync } from "../features/movie/movieSlice";
import { useLocation } from "react-router-dom";
import { debounce } from "lodash";
const Search = styled("form")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.95),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
function AppSearch() {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const listType = location.pathname?.substring(1);
  const handleSearchMovie = (e) => {
    e.preventDefault();
    dispatch(getMovieListAsync({ listType, title: searchValue }));
  };
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleGetMovie = () => {
    dispatch(getMovieListAsync({ listType, title: searchValue }));
  };
  // eslint-disable-next-line
  const delayedQuery = useCallback(debounce(handleGetMovie, 500), [
    searchValue,
  ]);
  useEffect(() => {
    delayedQuery();

    // Cancel previous debounce calls during useEffect cleanup.
    return delayedQuery.cancel;
  }, [searchValue, delayedQuery]);
  return (
    <Search onSubmit={handleSearchMovie}>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={searchValue}
        name="Seach"
        onChange={onChange}
      />
      <IconButton sx={{ position: "absolute", right: 0, borderRadius: "8px" }}>
        <SearchIcon />
      </IconButton>
    </Search>
  );
}

export default AppSearch;
