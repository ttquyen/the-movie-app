import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import FTextField from "../components/form/FTextField";
import FormProvider from "../components/form/FormProvider";
import {
  Alert,
  Container,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import Link from "@mui/material/Link";

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Password must match"),
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};
function RegisterPage() {
  const auth = useAuth();
  const methods = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassWord, setShowPassWord] = useState(false);
  const [showPassWordConfirmation, setShowPassWordConfirmation] =
    useState(false);

  const onSubmit = async (data) => {
    //receive the location from AuthRequire
    const from = location.state?.from?.pathname || "/";
    let { email, password, name } = data;
    try {
      await auth.register({ email, password, name }, () => {
        navigate(from, { replace: true }); //navigate to exact location received above
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };
  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <Alert severity="info">
            Already have an account?{" "}
            <Link variant="subtitle2" to="/login" component={RouterLink}>
              Login
            </Link>
          </Alert>
          <FTextField name="name" label="Name" />
          <FTextField name="email" label="Email Address" />
          <FTextField
            name="password"
            type={showPassWord ? "text" : "password"}
            label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassWord((pre) => !pre)}
                  >
                    {showPassWord ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FTextField
            name="passwordConfirmation"
            type={showPassWordConfirmation ? "text" : "password"}
            label="Password Confirmation"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassWordConfirmation((pre) => !pre)}
                  >
                    {showPassWordConfirmation ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 3 }}
        >
          Register
        </LoadingButton>
      </FormProvider>
    </Container>
  );
}

export default RegisterPage;
