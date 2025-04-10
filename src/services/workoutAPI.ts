import { Workout } from "../types";
import { apiClientAuth } from "./authAPI";

export const fetchWorkouts = async (year: number, month: number) => {
  const res = await apiClientAuth.get("/api/workouts", {
    params: { year, month },
  });
  console.log("Fetched workouts:", res.data);
  return res.data;
};

export const createWorkout = async (workout: Workout) => {
  try {
    console.log("Creating workout:", workout);
    const res = await apiClientAuth.post("/api/workouts", workout);
    console.log("Created workout:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("Workout 作成エラー:", error.response?.data || error.message);
    throw error;
  }
};

export const updateWorkout = async (id: number, workout: Workout) => {
  const res = await apiClientAuth.patch(`/api/workouts/${id}`, workout);
  return res.data;
};
