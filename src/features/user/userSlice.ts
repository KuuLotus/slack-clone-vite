import { createSlice } from "@reduxjs/toolkit";
import { signInWithGoogle } from "../auth/auth";
import { getUser, postUser } from "./userAPI";
import { User } from "@/types/User";

const initialState = {
  userId: "",
};

export const googleSignInAndUserSetup = async () => {
  try {
    const result = await signInWithGoogle();
    const loginUser = result.user;
    const user = await getUser(loginUser.uid);

    if (!user) {
      const newUser: User = {
        displayName: loginUser.displayName ?? "",
        email: loginUser.email ?? "",
        profile_picture: loginUser.photoURL ?? "",
      };
      await postUser({
        uid: loginUser.uid,
        user: newUser,
      });
    }
    return loginUser.uid;
  } catch (e) {
    console.error("Login failed", e);
  }
};

export const userSlice = createSlice({
  name: "userId",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userId = action.payload;
    },
    logout: (state) => {
      state.userId = "";
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
