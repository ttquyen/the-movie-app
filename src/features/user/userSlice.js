import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  updatedProfile: null,
  selectedUser: null,
};
const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUserByIdSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedUser = action.payload;
    },
    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.updatedProfile = action.payload;
    },
    resendEmailSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    verifyEmailSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});
export const getUserByIdAsync =
  ({ id }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/users/${id}`);

      dispatch(slice.actions.getUserByIdSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error?.response?.data?.errors?.message);
    }
  };
export const updateAccountAsync =
  ({ name }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const imageUrl=await

      const response = await apiService.put(`/users/me`, { name });

      dispatch(slice.actions.updateUserProfileSuccess(response.data));
      toast.success("Update Profile successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error?.response?.data?.errors?.message);
    }
  };
export const getCurrentUserProfile = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/users/me");
    dispatch(slice.actions.updateUserProfileSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};
export const changePassWordAsync =
  ({ currentPassword, newPassword, token }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put("/auth/changepassword", {
        currentPassword,
        newPassword,
        token,
      });

      dispatch(slice.actions.updateUserProfileSuccess(response.data));
      toast.success(response.message);
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.response.data.errors.message);
    }
  };
export const resetPasswordAsync =
  ({ email }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/auth/reset", {
        email,
      });
      toast.success(response.message);
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.response.data.errors.message);
    }
  };
export const reSendEmailAsync =
  ({ email, type }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/users/resend-email", {
        email,
        type,
      });
      dispatch(slice.actions.resendEmailSuccess(response.data));
      toast.success(response.message);
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error?.response?.data?.errors?.message);
    }
  };
export const verifyEmailAsync =
  ({ userId, token }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/users/verify/${userId}/${token}`);
      dispatch(slice.actions.verifyEmailSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error?.response?.data?.errors?.message);
    }
  };
export default slice.reducer;
