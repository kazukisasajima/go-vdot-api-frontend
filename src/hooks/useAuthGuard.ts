import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { checkAuth } from "../services/authAPI";

const useAuthGuard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const verify = async () => {
      const ok = await checkAuth(dispatch);
      if (!ok) {
        navigate("/login");
      }
    };
    verify();
  }, [dispatch, navigate]);
};

export default useAuthGuard;
