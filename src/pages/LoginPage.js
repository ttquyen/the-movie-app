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
import FCheckbox from "../components/form/FCheckbox";
import { LoadingButton } from "@mui/lab";
import Link from "@mui/material/Link";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};
function LoginPage() {
  const auth = useAuth();
  const methods = useForm({
    resolver: yupResolver(loginSchema),
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
  const [showPassWord, setshowPassWord] = useState(false);

  const onSubmit = async (data) => {
    //receive the location from AuthRequire
    const from = location.state?.from?.pathname || "/";
    let { email, password } = data;
    try {
      await auth.login({ email, password }, () => {
        navigate(from, { replace: true }); //navigate to exact location received above
      });
    } catch (error) {
      reset();
      setError("responseError", error);
      console.log(error);
    }
  };
  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <Alert severity="info" color="primary">
            Don't have an account?{" "}
            <Link variant="subtitle2" to="/register" component={RouterLink}>
              Get started
            </Link>
          </Alert>
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
                    onClick={() => setshowPassWord((pre) => !pre)}
                  >
                    {showPassWord ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <FCheckbox name="remember" label="Remember me" />
          {/* <Link variant="subtitle2" to="/" component={RouterLink} aria-disabled>
            Forgot Password?
          </Link> */}
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </FormProvider>
    </Container>
  );
}

export default LoginPage;
