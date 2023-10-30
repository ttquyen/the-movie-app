import {
  Box,
  Card,
  CardHeader,
  Link,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import PinDropIcon from "@mui/icons-material/PinDrop";
import EmailIcon from "@mui/icons-material/Email";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
const IconStyle = styled(Box)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));
function ProfileAbout({ profile }) {
  const { city, email, aboutMe, company, country } = profile;

  return (
    <Card>
      <CardHeader title="About" variant="h6" />
      <Stack sx={{ px: 3, py: 2 }} spacing={2}>
        <Typography variant="body2">{aboutMe}</Typography>
        <Stack direction="row">
          <IconStyle>
            <PinDropIcon />
          </IconStyle>
          <Typography variant="body2">
            <Link component="span" variant="subtitle2" color="text.primary">
              {city} - {country}
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle>
            <EmailIcon />
          </IconStyle>
          <Typography variant="body2">
            <Link component="span" variant="subtitle2" color="text.primary">
              {email}
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle>
            <BusinessCenterIcon />
          </IconStyle>
          <Typography variant="body2">
            <Link component="span" variant="subtitle2" color="text.primary">
              {company}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ProfileAbout;
