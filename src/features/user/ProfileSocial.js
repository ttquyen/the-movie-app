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
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
const IconStyle = styled(Box)(({ theme }) => ({
  width: 20,
  height: 20,
  marginBottom: 6,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));
function ProfileSocial({ profile }) {
  const { linkedinLink, facebookLink, twitterLink, instagramLink } = profile;
  const SOCIALS = [
    {
      name: "Facebook",
      icon: (
        <IconStyle color="#1c9cea">
          <FacebookIcon />
        </IconStyle>
      ),
      href: facebookLink,
    },
    {
      name: "Instagram",
      icon: (
        <IconStyle color="#D7336D">
          <InstagramIcon />
        </IconStyle>
      ),
      href: instagramLink,
    },
    {
      name: "Twitter",
      icon: (
        <IconStyle color="#1c9cea">
          <TwitterIcon />
        </IconStyle>
      ),
      href: twitterLink,
    },
    {
      name: "LinkedIn",
      icon: (
        <IconStyle color="#006097">
          <LinkedInIcon />
        </IconStyle>
      ),
      href: linkedinLink,
    },
  ];
  return (
    <Card>
      <CardHeader title="Social" variant="h6" />
      <Stack sx={{ px: 3, py: 2 }} spacing={2}>
        {SOCIALS.map((social) => (
          <Stack direction="row" alignItems="center" key={social.name}>
            {social.icon}
            <Typography variant="body2">
              <Link component="span" variant="subtitle2" color="text.primary">
                {social.href}
              </Link>
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

export default ProfileSocial;
