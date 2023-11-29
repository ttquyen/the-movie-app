import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FTextField from "../components/form/FTextField";
import FormProvider from "../components/form/FormProvider";
import { Alert, Container, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { resetPasswordAsync } from "../features/user/userSlice";

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const defaultValues = {
  email: "",
};
function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const methods = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    let { email } = data;
    try {
      //TODO call api
      dispatch(resetPasswordAsync({ email }));
    } catch (error) {
      reset();
      setError("responseError", error.response.data.errors);
      console.log(error);
    }
  };
  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ mb: 2 }}>
          <Typography variant="title">
            {" "}
            Please enter your email to reset password
          </Typography>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <FTextField name="email" label="Email Address" />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Submit
        </LoadingButton>
      </FormProvider>
    </Container>
  );
}

export default ForgotPasswordPage;
