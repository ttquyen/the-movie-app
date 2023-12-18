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
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import apiService from "../../app/apiService";
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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
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
  const [personName, setPersonName] = React.useState([]);
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

    setPersonName(
      genreList.filter((obj) => defaultValues.genre_ids.includes(obj.id))
    );
    // console.log(currentGenres);
  }, [defaultValues, setValue, methods, genreList]);

  const onSubmit = (data) => {
    if (movie) {
      dispatch(updateMovieAsync({ ...data, _id: movie._id }));
      handleClose();
    } else {
      dispatch(addMovieAsync({ ...data }));
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
    setPersonName(typeof value === "string" ? value.split(",") : value);
    console.log(personName);
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
                {/* <FTextField name="genres_ids" label="Genres" /> */}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Select
                name="genres_ids"
                label="Genres"
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                fullWidth
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
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
                    key={genre._id}
                    value={genre}
                    style={getStyles(genre, personName, theme)}
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
          <Button onClick={handleClose}>Cancel</Button>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {movie ? "Save" : " Add"}
          </LoadingButton>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
