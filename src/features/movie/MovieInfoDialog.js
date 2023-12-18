import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useEffect, useMemo } from "react";
import { Grid, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, FTextField } from "../../components/form";
import { Button, DialogContent } from "@mui/material";
import { addMovieAsync } from "./movieSlice";
import { useDispatch } from "react-redux";
const UpdateUserSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  overview: yup.string().required("Title is required"),
});
export default function MovieInfoDialog({ open, setOpen, movie, callback }) {
  const dispatch = useDispatch();
  const defaultValues = useMemo(() => {
    return {
      title: movie?.title || "",
      overview: movie?.overview || "",
      backdrop_path:
        movie?.backdrop_path ||
        "https://annenberg.usc.edu/sites/default/files/AII.8.17.23.jpg",
      poster_path: movie?.poster_path || "",
      imdb_id: movie?.imdb_id || "",
      release_date: movie?.release_date || "",
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
  }, [defaultValues, setValue, methods]);

  const onSubmit = (data) => {
    if (movie) {
      console.log("Update------");
      console.log(movie);
    } else {
      console.log("Post------");

      dispatch(addMovieAsync({ ...data }));
    }
  };

  const handleClose = () => {
    setOpen(false);
    console.log("cancel");
    reset();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{"Movie Infomation"}</DialogTitle>
      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Stack spacing={1} alignItems="flex-end">
                <FTextField name="title" label="Title" />
                <FTextField name="tagline" label="Tag Line" />
                <FTextField name="genres_ids" label="Genres" />
              </Stack>
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

                <FTextField
                  name="overview"
                  multiline
                  rows={4}
                  label="Overview"
                />
              </Stack>
            </Grid>
          </Grid>
          <Button onClick={handleClose}>Cancel</Button>

          <Button type="submit" variant="contained">
            {movie ? "Save" : " Add"}
          </Button>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
