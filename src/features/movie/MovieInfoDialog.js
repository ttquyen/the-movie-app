import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useEffect, useMemo, useState } from "react";
import { Grid, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, FTextField } from "../../components/form";
import { Button, DialogContent } from "@mui/material";
import { addMovieAsync, updateMovieAsync } from "./movieSlice";
import { useDispatch } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { fDate } from "../../utils/formatTime";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import apiService from "../../app/apiService";
import moment from "moment";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, genreId, theme) {
  return {
    fontWeight:
      genreId.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const UpdateUserSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  overview: yup.string().required("Title is required"),
});
export default function MovieInfoDialog({ open, setOpen, movie, callback }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [genreId, setGenreId] = React.useState([]);
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    const getGenreList = async () => {
      try {
        const res = await apiService.get(`/genres`);
        setGenreList(res.data);
      } catch (error) {}
    };
    getGenreList();
  }, []);

  const defaultValues = useMemo(() => {
    return {
      title: movie?.title || "",
      overview: movie?.overview || "",
      backdrop_path: movie?.backdrop_path || "",
      poster_path: movie?.poster_path || "",
      imdb_id: movie?.imdb_id || "",
      release_date: movie?.release_date ? fDate(movie?.release_date) : "",
      runtime: movie?.runtime || "",
      genre_ids: movie?.genre_ids || "",
      tagline: movie?.tagline || "",
      trailer:
        movie?.trailer?.length > 0
          ? `https://www.youtube.com/embed/${movie.trailer[0].key}`
          : "",
    };
  }, [movie]);

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    reset,
  } = methods;
  useEffect(() => {
    // Set default values manually using setValue
    Object.keys(defaultValues).forEach((key) =>
      setValue(key, defaultValues[key])
    );

    setGenreId(
      genreList.filter((obj) => defaultValues.genre_ids.includes(obj.id))
    );
  }, [defaultValues, setValue, methods, genreList]);

  const onSubmit = (data) => {
    if (movie) {
      dispatch(
        updateMovieAsync({
          ...data,
          _id: movie._id,
          genre_ids: genreId.map((g) => g.id),
          release_date: moment(data.release_date, "DD/MM/YYYY").toDate(),
        })
      );
      handleClose();
    } else {
      dispatch(
        addMovieAsync({
          ...data,
          genre_ids: genreId.map((g) => g.id),
          release_date: moment(data.release_date, "DD/MM/YYYY").toDate(),
        })
      );
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setGenreId(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{"Movie Infomation"}</DialogTitle>
      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <Stack spacing={1} alignItems="flex-end">
                <FTextField required name="title" label="Title" />
                <FTextField
                  required
                  name="overview"
                  multiline
                  rows={3}
                  label="Overview"
                />
                <FTextField name="tagline" label="Tag Line" />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Select
                name="genres_ids"
                label="Genres"
                multiple
                fullWidth
                value={genreId}
                onChange={handleChange}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value.id} label={value.name} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {genreList.map((genre) => (
                  <MenuItem
                    label="Genres"
                    key={genre._id}
                    value={genre}
                    style={getStyles(genre, genreId, theme)}
                  >
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={4}>
              <FTextField name="imdb_id" label="IMDB Id" />
            </Grid>
            <Grid item xs={4}>
              <FTextField name="runtime" label="Runtime" />
            </Grid>
            <Grid item xs={4}>
              <FTextField name="release_date" label="Release Date " />
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1} alignItems="flex-end">
                <FTextField name="backdrop_path" label="Backdrop Image" />
                <FTextField name="poster_path" label="Poster Image" />
                <FTextField name="trailer" label="Trailer URL" />
              </Stack>
            </Grid>
          </Grid>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              pt: 2,
            }}
          >
            <Button onClick={handleClose}>Cancel</Button>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ ml: 2 }}
            >
              {movie ? "Save" : " Add"}
            </LoadingButton>
          </Stack>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
