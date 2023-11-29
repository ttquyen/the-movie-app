import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "../features/comment/commentSlice";
import movieReducer from "../features/movie/movieSlice";
import userReducer from "../features/user/userSlice";
const rootReducer = {
  comment: commentReducer,
  movie: movieReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
