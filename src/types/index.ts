export type Task = {
  id: number
  title: string
  created_at: Date
  updated_at: Date
}

export type CsrfToken = {
  csrf_token: string
}

export type Credential = {
  email: string
  password: string
}

export interface Workout {
  id?: number;
  date: string;       // yyyy-mm-dd
  start_time: string; // hh:mm
  workout: string;
  lap_time?: string;
  mileage: number;
  mileage_unit: string;
  weather: string;
}
