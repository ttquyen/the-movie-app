import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmailAsync } from "../features/user/userSlice";
import { useEffect } from "react";

function VerifyAccountSuccessPage() {
  const dispatch = useDispatch();
  const { userId, token } = useParams();
  const { error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(verifyEmailAsync({ userId, token }));
  }, [dispatch, userId, token]);

  const triggerReload = () => {
    navigate("/");
    window.location.reload();
  };
  return (
    <Container sx={{ display: "flex", height: "100%", alignItems: "center" }}>
      {error ? (
        <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
          <Typography variant="h4" paragraph>
            Something went wrong.
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: "1rem" }}>
            Please try again.
          </Typography>
          <Button to="/" variant="contained" component={RouterLink}>
            Back to HomePage
          </Button>
        </Box>
      ) : (
        <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
          <Typography variant="h4" paragraph>
            Welcome to The Movie Application
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: "1rem" }}>
            🍿 Greetings, movie aficionado! Your ticket to a world of
            entertainment awaits. Explore genres, curate your watchlist, and let
            the movie marathon begin. Enjoy the show!
          </Typography>
          <Button variant="contained" onClick={triggerReload}>
            Back to HomePage
          </Button>
        </Box>
      )}
    </Container>
  );
}
export default VerifyAccountSuccessPage;
