import React from "react";
import useAuth from "../../hooks/useAuth";
import { Grid, Stack } from "@mui/material";
import ProfileScoreCard from "./ProfileScoreCard";
import ProfileAbout from "./ProfileAbout";
import ProfileSocial from "./ProfileSocial";
import PostForm from "../post/PostForm";
import PostList from "../post/PostList";

function Profile({ profile }) {
  const { user } = useAuth(); //get current user
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        {profile && (
          <Stack spacing={3}>
            <ProfileScoreCard profile={profile} />
            <ProfileAbout profile={profile} />
            <ProfileSocial profile={profile} />
          </Stack>
        )}
      </Grid>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          {/* only show form for current user */}
          {user?._id === profile?._id && <PostForm />}
          <PostList userId={profile?._id} />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Profile;
