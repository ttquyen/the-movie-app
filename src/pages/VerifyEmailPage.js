import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import { reSendEmailAsync } from "../features/user/userSlice";
import { LoadingButton } from "@mui/lab";

function VerifyEmailPage() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { isLoading } = useSelector((state) => state.user);

  const handleResendEmail = () => {
    dispatch(reSendEmailAsync({ email: user?.email, type: "register" }));
  };

  return (
    <Container sx={{ display: "flex", height: "100%", alignItems: "center" }}>
      <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
        <Typography variant="h4" paragraph>
          Verify Your Email
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: "1rem" }}>
          You're almost there.
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: "1rem" }}>
          Please check your mailbox to complete your signup.
        </Typography>
        <LoadingButton
          variant="contained"
          sx={{ m: 2 }}
          onClick={handleResendEmail}
          loading={isLoading}
        >
          Resend Verification Email
        </LoadingButton>
        <Button to="/" variant="contained" component={RouterLink}>
          Back to HomePage
        </Button>
      </Box>
    </Container>
  );
}
export default VerifyEmailPage;
