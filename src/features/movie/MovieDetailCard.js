import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  IconButton,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GradeIcon from "@mui/icons-material/Grade";

function MovieDetailCard({ movie }) {
  console.log(movie);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <Link
          to={`/movies/detail/${movie._id}`}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <CardMedia
            component="img"
            height="140"
            image={`https://image.tmdb.org/t/p/original${
              movie ? movie.backdrop_path : ""
            }`}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {movie.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.overview}
            </Typography>
            <Stack direction="row" alignItems="center">
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, fontSize: 20 }}
              >
                {movie ? movie.vote_average?.toFixed(2) : ""}{" "}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, mx: 0.5 }}>
                /10
              </Typography>
              <GradeIcon color="warning" />
            </Stack>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <IconButton>
          <FavoriteIcon color="error" />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default MovieDetailCard;
