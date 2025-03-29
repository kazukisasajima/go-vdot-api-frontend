import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { checkAuth } from "../services/authAPI";

const ProtectedRoute = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      await checkAuth(dispatch);
      setIsLoading(false);
    };
    verify();
  }, [dispatch]);

  if (isLoading) return <div>認証確認中...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;