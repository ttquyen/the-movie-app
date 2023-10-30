import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { FTextField, FormProvider } from "../../components/form";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, InputAdornment, Stack, styled } from "@mui/material";
import { updateAccountAsync } from "./userSlice";
import { capitalCase } from "change-case";
import { LoadingButton } from "@mui/lab";
const IconStyle = styled(Box)(({ theme }) => ({
  width: 20,
  height: 20,
  marginBottom: 8,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));
const SOCIALS = [
  {
    value: "facebookLink",
    icon: (
      <IconStyle color="#1c9cea">
        <FacebookIcon sx={{ fontSize: 30 }} />
      </IconStyle>
    ),
  },
  {
    value: "instagramLink",
    icon: (
      <IconStyle color="#D7336D">
        <InstagramIcon sx={{ fontSize: 30 }} />
      </IconStyle>
    ),
  },
  {
    value: "twitterLink",
    icon: (
      <IconStyle color="#1c9cea">
        <TwitterIcon sx={{ fontSize: 30 }} />
      </IconStyle>
    ),
  },
  {
    value: "linkedInLink",
    icon: (
      <IconStyle color="#006097">
        <LinkedInIcon sx={{ fontSize: 30 }} />
      </IconStyle>
    ),
  },
];
function AccountSocialLink({ account }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const defaultValues = {
    facebookLink: account?.facebookLink || "",
    instagramLink: account?.instagramLink || "",
    linkedinLink: account?.linkedinLink || "",
    twitterLink: account?.twitterLink || "",
  };
  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (data) => {
    dispatch(updateAccountAsync({ id: account._id, ...data }));
  };
  return (
    <Card sx={{ p: 3, width: "100%" }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} alignItems="flex-end">
          {SOCIALS.map((social) => (
            <FTextField
              key={social.value}
              name={social.value}
              // value={}
              label={capitalCase(social.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {social.icon}
                  </InputAdornment>
                ),
              }}
            />
          ))}
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting || isLoading}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default AccountSocialLink;
