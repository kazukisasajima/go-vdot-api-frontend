import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { updateUser } from "../services/authAPI";
import { setAuth } from "../features/authSlice"; 
import useAuthGuard from "../hooks/useAuthGuard";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Profile = () => {
  useAuthGuard(); // 認証チェック
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  // タブの状態管理
  const [activeTab, setActiveTab] = useState<"username" | "email" | "password">("username");

  // 入力状態管理
  const [username, setUsername] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // フォーム送信処理
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let payload = {};
      if (activeTab === "username") {
        payload = { name: username };
      } else if (activeTab === "email") {
        payload = { email };
      } else if (activeTab === "password") {
        payload = { password };
      }

      const res = await updateUser(payload); // API に PATCH リクエスト
      dispatch(setAuth({ user: res.data }));
      setMessage("プロフィールを更新しました");
    } catch (error) {
      setMessage("更新に失敗しました");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-96">
          <h2 className="text-xl font-semibold mb-4">プロフィール編集</h2>

          {/* タブ切り替え */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveTab("username")}
              className={`py-2 px-4 rounded ${activeTab === "username" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              名前
            </button>
            <button
              onClick={() => setActiveTab("email")}
              className={`py-2 px-4 rounded ${activeTab === "email" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              メールアドレス
            </button>
            <button
              onClick={() => setActiveTab("password")}
              className={`py-2 px-4 rounded ${activeTab === "password" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              パスワード
            </button>
          </div>

          {/* 編集フォーム */}
          <form onSubmit={handleUpdate} className="space-y-4">
            {activeTab === "username" && (
              <div>
                <label className="block mb-2">ユーザー名</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            )}
            {activeTab === "email" && (
              <div>
                <label className="block mb-2">メールアドレス</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            )}
            {activeTab === "password" && (
              <div>
                <label className="block mb-2">新しいパスワード</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            )}
            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded w-full">
              更新
            </button>
          </form>

          {message && <p className="mt-4 text-green-500">{message}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
