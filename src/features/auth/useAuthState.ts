import { useDispatch } from "react-redux";
import { auth } from "./auth";
import { login, logout } from "../user/userSlice";
import { useEffect } from "react";

const useAuthState = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((loginUser) => {
      if (loginUser) {
        dispatch(login(loginUser.uid));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return;
};

export default useAuthState;
