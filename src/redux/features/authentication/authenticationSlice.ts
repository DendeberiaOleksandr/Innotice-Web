import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";

export interface Authentication {
  accessToken: string | undefined;
  tokenType: string | undefined;
  expiresIn: number | undefined;
  refreshToken: string | undefined;
  scope: string | undefined;
}

export interface AuthenticationState {
  authentication: Authentication;
  isLoading: boolean;
}

const initialState: AuthenticationState = {
  authentication: {
    accessToken: "",
    tokenType: "",
    expiresIn: 0,
    refreshToken: "",
    scope: "",
  },
  isLoading: false,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    clear: (state) => {
      state.authentication.accessToken = "";
      state.authentication.tokenType = "";
      state.authentication.expiresIn = 0;
      state.authentication.refreshToken;
      state.authentication.scope;
      state.isLoading = false;
    },
    save: (state, action: PayloadAction<Authentication>) => {
      state.authentication.accessToken = action.payload.accessToken;
      state.authentication.expiresIn = action.payload.expiresIn;
      state.authentication.refreshToken = action.payload.refreshToken;
      state.authentication.scope = action.payload.scope;
      state.authentication.tokenType = action.payload.tokenType;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
});

export const { clear, save, setLoading } = authenticationSlice.actions;
export default authenticationSlice.reducer;
