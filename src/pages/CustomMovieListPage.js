import React from "react";
import useAuth from "../hooks/useAuth";
import { Container, Stack, Typography } from "@mui/material";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import RatedList from "../features/movie/RatedList";
import FavoriteList from "../features/movie/FavoriteList";
function CustomMovieListPage() {
  const { user } = useAuth(); //get current user
  const [listType, setListType] = React.useState("favorites");
  const handleChange = (event, newlistType) => {
    setListType(newlistType);
  };

  return (
    <Container
      sx={{
        px: { md: 20 },
        mt: 10,
        height: "100vh",
        position: "relative",
      }}
    >
      <Stack alignItems="center" spacing={2} sx={{ mb: 1 }}>
        <ToggleButtonGroup
          color="primary"
          value={listType}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="favorites">Favorite Movies</ToggleButton>
          <ToggleButton value="rated">Rated Movies</ToggleButton>
        </ToggleButtonGroup>
        <Typography variant="h5">
          My {listType === "favorites" ? "Favorite" : "Rated"} Movies:
        </Typography>
      </Stack>
      <Stack>
        {listType === "favorites" ? (
          <FavoriteList userId={user?._id} />
        ) : (
          <RatedList userId={user?._id} />
        )}
      </Stack>
    </Container>
  );
}

export default CustomMovieListPage;
