import React from "react";
import useAuth from "../hooks/useAuth";
import { Container, Stack, Typography } from "@mui/material";
import FavoriteList from "../features/movie/RatedList";

function FavoriteMoviePage() {
  const { user } = useAuth(); //get current user
  return (
    <Container sx={{ display: "flex", height: "100%", alignItems: "center" }}>
      {/* <ProfileCover profile={user} /> */}
      <Stack sx={{ mt: 10 }}>
        <Typography variant="h5">My Rated Movies:</Typography>
        <FavoriteList userId={user?._id} />
      </Stack>
    </Container>
  );
}

export default FavoriteMoviePage;
