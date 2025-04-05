// import { useEffect } from "react";
// import AppRoutes from "./routes";
// import axios from 'axios'
// import { CsrfToken } from './types'
// import './index.css';

// const App = () => {
//   useEffect(() => {
//     axios.defaults.withCredentials = true
//     const getCsrfToken = async () => {
//       const { data } = await axios.get<CsrfToken>(
//         `${import.meta.env.VITE_API_BASE_URL}/api/auth/csrf`
//       )
//       axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token
//     }
//     getCsrfToken()
//   }, [])

//   return <AppRoutes />;
// };

// export default App;

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
