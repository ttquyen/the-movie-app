import React from "react";
import useAuth from "../../hooks/useAuth";
import FriendStatus from "../friend/FriendStatus";
import { Avatar, Box, Typography, alpha, styled } from "@mui/material";

const RootStyle = styled("div")(({ theme }) => ({
  "&:before": {
    backdropFilter: `blur(1px)`,
    backgroundColor: alpha(theme.palette.primary.darker, 0.7),
    top: 0,
    zIndex: 9,
    content: "''",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
}));

const InfoStyle = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: "absolute",
  marginTop: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    right: "auto",
    display: "flex",
    alignItems: "center",
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

function ProfileCover({ profile }) {
  const { user } = useAuth();
  const currentUserId = user?._id;
  const {
    _id: targetUserId,
    name,
    jobTitle,
    coverUrl,
    avatarUrl,
    friendship,
  } = profile;
  const friendStatus = (
    <FriendStatus
      sx={{ marginTop: 1 }}
      currentUserId={currentUserId}
      targetUserId={targetUserId}
      friendship={friendship}
    />
  );
  const handleError = (e) => {
    const imgIndex = Math.floor(Math.random() * 5) + 1;
    e.target.src = `/covers/cover_${imgIndex}.jpeg`;
    e.target.onError = null;
  };

  return (
    <RootStyle>
      <InfoStyle>
        <Avatar
          src={avatarUrl}
          alt={name}
          sx={{
            mx: "auto",
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
            borderColor: "common.white",
            borderStyle: "solid",
            borderWidth: 2,
          }}
        />
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: "common.white",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography variant="h5">{name}</Typography>
          <Typography sx={{ opacity: 0.72 }}>{jobTitle}</Typography>
          {friendStatus}
        </Box>
      </InfoStyle>
      <Box sx={{ overflow: "hidden" }}>
        <img
          src={coverUrl}
          alt="profile cover"
          width="100%"
          height="100%"
          onError={handleError}
        />
      </Box>
    </RootStyle>
  );
}

export default ProfileCover;
