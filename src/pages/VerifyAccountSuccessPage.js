import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";
import { useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth";
import { reSendEmailAsync } from "../features/user/userSlice";
import { useEffect } from "react";

function VerifyAccountSuccessPage() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  console.log(user);
  useEffect(() => {
    //
    //TODO: call api verify here
  }, []);

  return (
    <Container sx={{ display: "flex", height: "100%", alignItems: "center" }}>
      <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
        <Typography variant="h4" paragraph>
          Welcome to The Movie Application
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: "1rem" }}>
          🍿 Greetings, movie aficionado! Your ticket to a world of
          entertainment awaits. Explore genres, curate your watchlist, and let
          the movie marathon begin. Enjoy the show!
        </Typography>
        <Button to="/" variant="contained" component={RouterLink}>
          Back to HomePage
        </Button>
      </Box>
    </Container>
  );
}
export default VerifyAccountSuccessPage;
