import { SpecialtyEvent } from "../types";
import { apiClientAuth } from "./authAPI";

export const fetchSpecialtyEvents = async () => {
  const res = await apiClientAuth.get("/api/specialty_events");
  console.log("Fetched specialty events:", res.data);
  return res.data;
};

export const createSpecialtyEvent = async (event: SpecialtyEvent) => {
  try {
    console.log("Creating specialty event:", event);
    const res = await apiClientAuth.post("/api/specialty_events", event);
    console.log("Created specialty event:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("Specialty event 作成エラー:", error.response?.data || error.message);
    throw error;
  }
};

export const updateSpecialtyEvent = async (id: number, event: SpecialtyEvent) => {
  const res = await apiClientAuth.patch(`/api/specialty_events/${id}`, event);
  return res.data;
};
