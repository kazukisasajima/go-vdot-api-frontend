import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import VdotTabs from '../../components/vdot/VdotTabs';
import useAuthGuard from "../../hooks/useAuthGuard";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

type RaceTime = {
  race: string;
  predicted_time: string;
  pace_per_km: string;
};

const VdotEquivalent = () => {

  useAuthGuard(); // 認証チェック
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [raceTimes, setRaceTimes] = useState<RaceTime[]>([]);

  useEffect(() => {
    const fetchUserVdot = async () => {
      if (!user) return;
      try {
        const response = await fetch(`http://localhost:8080/api/vdots/value`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: "include",
        });

        const data = await response.json();
        console.log("data", data);
        console.log("data.race_times", data.race_times)
        setRaceTimes(data.race_times);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchUserVdot();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <VdotTabs />
        <div>
          <h1 className="text-4xl mb-4">VDOTレースタイム予想</h1>
          <div className="flex flex-col items-center justify-center h-screen">
            <table className="table-auto border-collapse border border-gray-400">
              <thead>
                <tr>
                  <th className="border border-gray-400 px-4 py-2">レース</th>
                  <th className="border border-gray-400 px-4 py-2">タイム</th>
                  <th className="border border-gray-400 px-4 py-2">ペース</th>
                </tr>
              </thead>
              <tbody>
                {raceTimes.map((raceTime: any, index: number) => (
                  <tr key={index}>
                    <td className="border border-gray-400 px-4 py-2">{raceTime.race}</td>
                    <td className="border border-gray-400 px-4 py-2">{raceTime.predicted_time}</td>
                    <td className="border border-gray-400 px-4 py-2">{raceTime.pace_per_km}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      <Footer />
    </div>
  )
}

export default VdotEquivalent