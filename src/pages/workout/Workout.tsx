import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import WorkoutCalendar from "../../components/workout/WorkoutCalendar";
import WorkoutForm from "../../components/workout/WorkoutForm";
import { RootState } from "../../store";
import { fetchWorkouts, createWorkout, updateWorkout } from "../../services/workoutAPI";
import { Workout } from "../../types";
import useAuthGuard from "../../hooks/useAuthGuard";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const WorkoutPage = () => {
  useAuthGuard(); // 認証チェック
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [showForm, setShowForm] = useState(false);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const data = await fetchWorkouts(year, month);
      setWorkouts(data);
      setLoading(false);
    };
    load();
  }, [year, month]);

  const handleCreateOrUpdate = async (data: Workout) => {
    if (data.id) {
      await updateWorkout(data.id, data);
    } else {
      await createWorkout(data);
    }
    setShowForm(false);
    setSelectedWorkout(null);
    const refreshed = await fetchWorkouts(year, month);
    setWorkouts(refreshed);
  };

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
      <div className="flex">
        <div className="w-2/3">
          <WorkoutCalendar
            workouts={workouts}
            onDateClick={(date) => {
              setSelectedWorkout({ date, start_time: "", workout: "", mileage: 0, mileage_unit: "km", weather: "" });
              setShowForm(true);
            }}
            onEventClick={(workout) => {
              setSelectedWorkout(workout);
              setShowForm(true);
            }}
          />
        </div>
        <div className="w-1/3 p-4">
          {showForm && (
            <WorkoutForm
              initialData={selectedWorkout || undefined}
              onSubmit={handleCreateOrUpdate}
              onCancel={() => {
                setShowForm(false);
                setSelectedWorkout(null);
              }}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WorkoutPage;
