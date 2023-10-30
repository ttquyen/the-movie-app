import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import { FTextField, FormProvider, FUploadImage } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, Button, DialogContent, Stack, alpha } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";

import { editPostAsync } from "./postSlice";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

export default function EditPostDialog({ open, setOpen, post, callback }) {
  const defaultValues = {
    content: post?.content || "",
    image: post?.image || "",
  };
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

  const handleDrop = React.useCallback(
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
    dispatch(editPostAsync({ ...data, postId: post._id })).then(() => reset());
    setOpen(false);
    callback("OK");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title" sx={{ minWidth: 400 }}>
          {"Edit Post"}
        </DialogTitle>
        <DialogContent>
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
                <Button onClick={handleClose}>Cancel</Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  size="small"
                  loading={isSubmitting || isLoading}
                  sx={{ ml: 2 }}
                >
                  Update
                </LoadingButton>
              </Box>
            </Stack>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}
