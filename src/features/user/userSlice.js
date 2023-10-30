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
      toast.error(error.message);
    }
  };
export const updateAccountAsync =
  ({ id, ...params }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const imageUrl=await
      const data = {
        name: params?.name,
      };

      const response = await apiService.put(`/users/${id}`, data);

      dispatch(slice.actions.updateUserProfileSuccess(response.data));
      toast.success("Update Profile successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
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
export default slice.reducer;
