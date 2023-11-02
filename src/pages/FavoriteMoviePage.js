import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import Profile from "../features/user/Profile";
import { Box, Card, Container, Tab, Tabs } from "@mui/material";
// import { capitalCase } from "change-case";
import ProfileCover from "../features/user/ProfileCover";
import { styled } from "@mui/material/styles";
import FavoriteList from "../features/movie/FavoriteList";

function FavoriteMoviePage() {
  const { user } = useAuth(); //get current user
  console.log(user);
  return (
    <Container>
      <ProfileCover profile={user} />
      <FavoriteList userId={user?._id} />
    </Container>
  );
}

export default FavoriteMoviePage;
