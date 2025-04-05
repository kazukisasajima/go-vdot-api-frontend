import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import useAuthGuard from "../../hooks/useAuthGuard";
import VdotTabs from '../../components/vdot/VdotTabs';
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const VdotTraining = () => {
  useAuthGuard(); // 認証チェック
  const user = useSelector((state: RootState) => state.auth.user);

  const [loading, setLoading] = useState(true);
  const [paceZones, setPaceZones] = useState<Array<Record<string, Array<Record<string, { lower_pace: string; upper_pace: string }>>>>>([]);

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
        console.log("pace_zones", data.pace_zones);
        setPaceZones(data.pace_zones);
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

  // 距離のヘッダーは最初のゾーンから取り出す
  const firstZoneObj = paceZones[0];
  const firstZoneKey = Object.keys(firstZoneObj)[0]; // 例: "E"
  const firstDistanceArray = firstZoneObj[firstZoneKey]; // 配列

  const distanceKeys = firstDistanceArray.map((entry) => Object.keys(entry)[0]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <VdotTabs />
      <div>
        <h1 className="text-4xl mb-4">VDOTトレーニング</h1>
        <div className="flex flex-col items-center justify-center h-screen">
          <table className="table-auto border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">タイプ</th>
                {distanceKeys.map((distance) => (
                  <th key={distance} className="border border-gray-400 px-4 py-2">{distance}</th>
                ))}
              </tr>
            </thead>
            <tbody>
            {paceZones.map((zoneObj) => {
                const zone = Object.keys(zoneObj)[0]; // "E", "M", ...
                const distanceArray = zoneObj[zone]; // 距離の配列

                return (
                  <tr key={zone}>
                    <td className="border border-gray-400 px-4 py-2">{zone}</td>
                    {distanceArray.map((entry) => {
                      const distance = Object.keys(entry)[0];
                      const paceData = entry[distance];
                      return (
                        <td key={`${zone}-${distance}`} className="border border-gray-400 px-4 py-2">
                          {paceData
                            ? zone === "E"
                              ? `${paceData.lower_pace} ~ ${paceData.upper_pace}`
                              : `${paceData.lower_pace}`
                            : "-"}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VdotTraining;