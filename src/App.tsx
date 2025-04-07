import { useEffect } from "react";
import AppRoutes from "./routes";
import { getCsrfToken, setCsrfToken } from "./services/authAPI";
import './index.css';

const App = () => {
  useEffect(() => {
    const initializeCsrfToken = async () => {
      try {
        const token = await getCsrfToken();
        setCsrfToken(token); // インターセプターで使う変数にセット
      } catch (error) {
        console.error("CSRFトークンの取得に失敗しました", error);
      }
    };

    initializeCsrfToken();
  }, []);

  return <AppRoutes />;
};

export default App;
