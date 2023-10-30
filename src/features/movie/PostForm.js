import React, { useCallback } from "react";
import { FTextField, FormProvider, FUploadImage } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, Card, Stack, alpha } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { createPostAsync } from "./movieSlice";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});
const defaultValues = {
  content: "",
  image: "",
};

function PostForm() {
  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.post);

  const handleDrop = useCallback(
    (acceptedFile) => {
      const file = acceptedFile[0];
      if (file) {
        setValue(
          "image",
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
      }
    },
    [setValue]
  );

  const onSubmit = (data) => {
    dispatch(createPostAsync(data)).then(() => reset());
  };

  return (
    <Card sx={{ p: 1.5 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <FTextField
            name="content"
            fullWidth
            multiline
            rows={4}
            placeholder="How about your today?"
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />
          {/* <FTextField name="image" placeholder="Image" /> */}
          {/* <input type="file" ref={fileInput} onChange={handleFile} /> */}
          <FUploadImage
            name="image"
            accpet="image/*"
            maxSixe={3145728}
            onDrop={handleDrop}
          />
          <Box
            sx={{
              display: "flex",
              alignItem: "center",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
            >
              Post
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default PostForm;
