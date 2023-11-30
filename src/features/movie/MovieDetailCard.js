import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, IconButton, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/Favorite";
import GradeIcon from "@mui/icons-material/Grade";
import ShareIcon from "@mui/icons-material/Share";
import RemoveFavoriteDialog from "./RemoveFavoriteDialog";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";

function MovieDetailCard({ movie, isFavorite = false }) {
  const navigate = useNavigate();
  const [openRemoveDialog, setOpenRemoveDialog] = React.useState(false);
  const [copyPath, setCopyPath] = React.useState({
    value: "",
    state: false,
  });
  const handleSelectCard = () => {
    navigate(`/movies/detail/${movie._id}`);
  };
  const handleCopyPath = () => {
    const uri = window.location.origin;
    setCopyPath({ value: `${uri}/movies/detail/${movie._id}`, state: true });
    toast.success("Copied to clipboard");
  };
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { md: "row", xs: "column" },
        m: { md: 1, xs: 0.5 },
        bgcolor: "#171f27",
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
            {movie.overview?.slice(0, 100)}...
          </Typography>
          {!isFavorite && (
            <Stack direction="row" alignItems="center">
              <Typography variant="subtitle2">Rated: </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, fontSize: { md: 20, xs: 16 }, pl: 0.5 }}
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
        {isFavorite && (
          <IconButton size="small" onClick={() => setOpenRemoveDialog(true)}>
            <FavoriteBorderIcon color="error" />
          </IconButton>
        )}
        <CopyToClipboard text={copyPath.value} onCopy={() => handleCopyPath()}>
          <IconButton size="small">
            <ShareIcon />
          </IconButton>
        </CopyToClipboard>
      </CardActions>
      <RemoveFavoriteDialog
        open={openRemoveDialog}
        setOpen={setOpenRemoveDialog}
        movie={movie}
      />
    </Card>
  );
}

export default MovieDetailCard;
