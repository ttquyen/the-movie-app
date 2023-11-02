import React from "react";
import { Avatar, Box, Typography, Container, Stack } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
function ProfileCover({ profile }) {
  const { _id: userId, name, email } = profile;

  return (
    <Container>
      <Stack direction="row">
        <Avatar
          // src={avatarUrl}
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
        <Stack>
          <Typography variant="h5">{name}</Typography>
          <Stack className="email" direction="row" alignItems="center">
            <EmailIcon />
            <Typography variant="subtitle2" color="text.secondary">
              {email}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}

export default ProfileCover;
