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
      }}
    >
      {/* <ProfileCover profile={user} /> */}
      <Stack alignItems="center">
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
      {listType === "favorites" ? (
        // <Stack sx={{ mt: 10 }}>
        <FavoriteList userId={user?._id} />
      ) : (
        // </Stack>
        // <Stack sx={{ mt: 10 }}>
        <RatedList userId={user?._id} />
        // </Stack>
      )}
    </Container>
  );
}

export default CustomMovieListPage;
