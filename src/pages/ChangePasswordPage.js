import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
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
import { useDispatch } from "react-redux";
import { changePassWordAsync } from "../features/user/userSlice";
import TokenDialog from "./TokenDialog";

const registerSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "At least 6 characters in length"),
  passwordConfirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Password must match"),
});

const defaultValues = {
  currentPassword: "",
  password: "",
  passwordConfirmation: "",
};
function ChangePasswordPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const methods = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = methods;
  const [showCurrentPassWord, setShowCurrentPassWord] = useState(false);
  const [showPassWord, setShowPassWord] = useState(false);
  const [showPassWordConfirmation, setShowPassWordConfirmation] =
    useState(false);

  const onSubmit = async (data) => {
    let { currentPassword, password } = data;
    console.log(data);
    console.log("call api change pasword");
    setOpenDialog(true);
    try {
      //TODO
      dispatch(changePassWordAsync({ currentPassword, newPassword: password }));
    } catch (error) {
      reset();
      setError("responseError", error.response.data.errors);
    }
  };
  const handleCallback = (token) => {
    const formData = {
      currentPassword: getValues("currentPassword"),
      newPassword: getValues("password"),
      token,
    };
    dispatch(changePassWordAsync(formData));
  };
  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}

          <FTextField
            name="currentPassword"
            type={showCurrentPassWord ? "text" : "password"}
            label="Current Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowCurrentPassWord((pre) => !pre)}
                  >
                    {showCurrentPassWord ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FTextField
            name="password"
            type={showPassWord ? "text" : "password"}
            label="Password"
            helperText="At least 6 characters in length"
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
          Change Password
        </LoadingButton>
      </FormProvider>
      <TokenDialog
        open={openDialog}
        setOpen={setOpenDialog}
        callback={handleCallback}
      />
    </Container>
  );
}

export default ChangePasswordPage;
