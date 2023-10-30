import { Card, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { fNumber } from "../../utils/formatNumber";

function ProfileScoreCard({ profile }) {
  const { friendCount, postCount } = profile;
  return (
    <Card sx={{ p: 3 }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack width={1} alignItems="center">
          <Typography variant="h4">{fNumber(friendCount)}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Friends
          </Typography>
        </Stack>
        <Stack width={1} alignItems="center">
          <Typography variant="h4">{fNumber(postCount)}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Post
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
export default ProfileScoreCard;
