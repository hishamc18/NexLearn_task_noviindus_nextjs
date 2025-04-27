import Cookies from "js-cookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendOtp, verifyOtp, createProfile } from "@/services/authServices";
import { AuthResponse, CreateProfileRequest, SendOtpRequest, VerifyOtpRequest } from "@/types/auth.types";

interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  mobile: string;
  message: string;
  success: boolean;
}

const initialState: AuthState = {
  loading: false,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  success: false,
  mobile: "",
  message: "",
};

// Thunks
export const sendOtpThunk = createAsyncThunk("auth/sendOtp", async (data: SendOtpRequest) => {  
  const response: AuthResponse = await sendOtp(data);
  console.log(response);
  return response;
});

export const verifyOtpThunk = createAsyncThunk("auth/verifyOtp", async (data: VerifyOtpRequest) => {  
  const response: AuthResponse = await verifyOtp(data);
  console.log(response);
  return response;
});

export const createProfileThunk = createAsyncThunk("auth/create-Profile", async (data: CreateProfileRequest) => {
  const response: AuthResponse = await createProfile(data);
  console.log(response);
  
  return response;
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.mobile = "";
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
    },
    
    setMobile: (state, action) => {
      state.mobile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtpThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendOtpThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = payload.message;
        state.success = false;
      })
      .addCase(verifyOtpThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOtpThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = payload.success;
        state.message = payload.message;
      
        if (payload.login && payload.access_token && payload.refresh_token) {
          state.isAuthenticated = true;
          state.accessToken = payload.access_token;
          state.refreshToken = payload.refresh_token;
      
          // Set cookies
          Cookies.set("access_token", payload.access_token);
          Cookies.set("refresh_token", payload.refresh_token);
        }
      })
      .addCase(createProfileThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.accessToken = payload.access_token ?? null;
        state.refreshToken = payload.refresh_token ?? null;
        state.message = payload.message;
      
        // Set cookies
        if (payload.access_token && payload.refresh_token) {
          Cookies.set("access_token", payload.access_token);
          Cookies.set("refresh_token", payload.refresh_token);
        }
      });
  },
});

export const { logout, setMobile } = authSlice.actions;
export default authSlice.reducer;
