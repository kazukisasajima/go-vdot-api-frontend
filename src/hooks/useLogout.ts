// src/hooks/useLogout.ts
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authAPI";
import { clearAuth } from "../features/authSlice";
import { AppDispatch } from "../store";

export const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return async () => {
    await logout();
    dispatch(clearAuth());
    navigate("/login");
  };
};
