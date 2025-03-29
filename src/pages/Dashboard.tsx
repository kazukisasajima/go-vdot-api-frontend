import { useSelector } from "react-redux";
import { RootState } from "../store";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import useAuthGuard from "../hooks/useAuthGuard";

const Dashboard = () => {
  useAuthGuard();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-6">ダッシュボード</h2>
        <p className="text-lg text-gray-700">
          ようこそ、<strong>{user?.name}</strong> さん！
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;