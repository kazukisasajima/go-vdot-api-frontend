import axios from "axios";
import { AppDispatch } from "../store";
import { setAuth, clearAuth } from "../features/authSlice";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// CSRFトークンを取得する関数
let csrfToken = "";

export const setCsrfToken = (token: string) => {
  csrfToken = token;
};

// 認証が必要な API クライアント
const apiClientAuth = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 毎回リクエスト時に CSRF トークンをヘッダーに付与するインターセプター
apiClientAuth.interceptors.request.use((config) => {
  if (csrfToken) {
    config.headers["X-CSRF-Token"] = csrfToken;
  }
  return config;
});

export { apiClientAuth };

// 認証不要な API クライアント
const apiClientPublic = axios.create({
  baseURL: BASE_URL,
});

// 認証不要な API など（略）

export const getCsrfToken = async () => {
  const res = await apiClientPublic.get("/api/auth/csrf", {
    withCredentials: true,
  });
  return res.data.csrf_token;
};

// 認証不要な API
export const registerUser = async (name: string, email: string, password: string) => {
  return apiClientPublic.post(`/api/auth/signup`, { name, email, password });
};

export const resetPassword = async (email: string) => {
  return apiClientPublic.post(`/api/auth/users/reset_password/`, { email });
};

export const resetPasswordConfirm = async (uid: string, token: string, newPassword: string, reNewPassword: string) => {
  return apiClientPublic.post(`/api/auth/users/reset_password_confirm/`, {
    uid,
    token,
    new_password: newPassword,
    re_new_password: reNewPassword,
  });
};

// 認証チェック
export const checkAuth = async (dispatch: AppDispatch): Promise<boolean> => {
  try {
    const res = await apiClientAuth.get("/api/auth/check");
    dispatch(setAuth({ user: res.data.user })); // user情報を返すようにしておくと便利
    return true;
  } catch (err) {
    dispatch(clearAuth());
    return false;
  }
};

export const login = async (email: string, password: string) => {
  console.log("login", email, password);
  // return apiClientPublic.post(`/api/auth/login`, { email, password }, {withCredentials: true});
  return apiClientAuth.post(`/api/auth/login`, { email, password });
};

// ログアウト
export const logout = async (): Promise<void> => {
  await apiClientAuth.post("/api/auth/logout");
};

// ログアウト API は Django 側で `/api/auth/logout/` を実装する
export const logoutUser = async () => {
  return apiClientAuth.post(`/api/auth/logout`);
};

export const updateUser = async (payload: any) => {
  console.log("payload", payload);
  return apiClientAuth.patch(`/api/user`, payload);
};

export const deleteUser = async (current_password: string) => {
  return apiClientAuth.delete(`/api/user`, {
    data: { current_password },
  });
};
