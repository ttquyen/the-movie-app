import React, { createContext, useEffect, useReducer } from "react";
import apiService from "../app/apiService";
import { isValidToken } from "../utils/jwt";
import { useSelector } from "react-redux";

const initialState = {
  isInitialized: false, //help to handle refreshing page
  isAuthenticated: false, //help to control log in
  isVerified: false, //help to check user verification
  user: null, //store user info
};
const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const VERIFY_SUCCESS = "AUTH.VERIFY_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";
const UPDATE_PROFILE = "AUTH.UPDATE_PROFILE";

const AuthContext = createContext({ ...initialState });
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case INITIALIZE:
      return {
        ...state,
        isInitialized: true,
        isAuthenticated: payload.isAuthenticated,
        user: payload.user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isVerified: true,
        user: payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case UPDATE_PROFILE:
      const { name } = action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          name,
        },
      };
    default:
      return state;
  }
};
const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    //LOGOUT
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const updatedProfile = useSelector((state) => state.user.updatedProfile);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await apiService.get("/users/me");
          const user = response.data;
          dispatch({
            type: INITIALIZE,
            payload: { user, isAuthenticated: true },
          });
        } else {
          setSession(null);
          dispatch({
            type: INITIALIZE,
            payload: { user: null, isAuthenticated: false },
          });
        }
      } catch (error) {
        setSession(null);
        dispatch({
          type: INITIALIZE,
          payload: { user: null, isAuthenticated: false },
        });
      }
    };

    initialize();
  }, []);
  useEffect(() => {
    if (updatedProfile) {
      dispatch({ type: UPDATE_PROFILE, payload: updatedProfile });
    }
  }, [updatedProfile]);

  const login = async ({ email, password }, callback) => {
    const response = await apiService.post("/auth/login", {
      email,
      password,
    });
    const { user, accessToken } = response.data;
    setSession(accessToken); //save the accessToken to header of apiService
    dispatch({ type: LOGIN_SUCCESS, payload: { user } });
    callback(); //navigate to homepage when login success
  };

  const register = async ({ email, password, name }, callback) => {
    const response = await apiService.post("/users", {
      name,
      email,
      password,
    });
    const { user, accessToken } = response.data;
    setSession(accessToken); //save the accessToken to header of apiService
    dispatch({ type: REGISTER_SUCCESS, payload: { user } });
    callback();
  };

  const logout = (callback) => {
    setSession(null);
    dispatch({ type: LOGOUT });
    callback();
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
