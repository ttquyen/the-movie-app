import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";
import { useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth";
import { reSendEmailAsync } from "../features/user/userSlice";

function VerifyEmailPage() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleResendEmail = () => {
    console.log(user);
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
        <Button variant="contained" sx={{ m: 2 }} onClick={handleResendEmail}>
          Resend Verification Email
        </Button>
        <Button to="/" variant="contained" component={RouterLink}>
          Back to HomePage
        </Button>
      </Box>
    </Container>
  );
}
export default VerifyEmailPage;
