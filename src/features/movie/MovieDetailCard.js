import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, IconButton, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GradeIcon from "@mui/icons-material/Grade";
import ShareIcon from "@mui/icons-material/Share";

function MovieDetailCard({ movie, isFavorite = false }) {
  const navigate = useNavigate();
  const handleSelectCard = () => {
    navigate(`/movies/detail/${movie._id}`);
  };
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { md: "row", xs: "column" },
        m: { md: 1, xs: 0.5 },
        bgcolor: "#fdf5f587",
      }}
    >
      <CardActionArea
        sx={{ display: "flex", p: { xs: 1, md: 2 } }}
        onClick={handleSelectCard}
      >
        <CardMedia
          component="img"
          sx={{ width: 140 }}
          // width="100%"
          image={`https://image.tmdb.org/t/p/original${
            movie ? movie.poster_path : ""
          }`}
          alt="poster_img"
        />
        <CardContent sx={{ p: { xs: 1, md: 2 } }}>
          <Typography gutterBottom variant="h5" component="div">
            {movie.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            paragraph
            sx={{ display: { xs: "none", md: "block" } }}
          >
            {movie.overview}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            paragraph
            sx={{ display: { md: "none", xs: "block" } }}
          >
            {movie.overview.slice(0, 100)}...
          </Typography>
          {isFavorite ? (
            <FavoriteIcon color="error" />
          ) : (
            <Stack direction="row" alignItems="center">
              <Typography variant="subtitle2">Rated: </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, fontSize: 20, pl: 1 }}
              >
                {movie ? movie.user_rated?.toFixed(2) : ""}{" "}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, mx: 0.5 }}>
                /10
              </Typography>
              <GradeIcon color="warning" />
            </Stack>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: { xs: "flex-end" },
          pt: 0,
        }}
      >
        {/* <IconButton size="small" disabled>
          <FavoriteBorderIcon color="error" />
        </IconButton> */}
        <IconButton size="small">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default MovieDetailCard;
