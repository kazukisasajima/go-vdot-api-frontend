import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";

import { Workout } from "../../types";

interface Props {
  workouts: Workout[];
  onDateClick: (dateStr: string) => void;
  onEventClick: (workout: Workout) => void;
}

const WorkoutCalendar = ({ workouts, onDateClick, onEventClick }: Props) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]} // ✅ interactionPlugin を追加
      initialView="dayGridMonth"
      events={workouts.map(w => ({
        title: w.start_time,
        date: w.date,
        extendedProps: w,
      }))}
      dateClick={(info: DateClickArg) => {
        onDateClick(info.dateStr);
      }}
      eventClick={(info: EventClickArg) => {
        onEventClick(info.event.extendedProps as Workout);
      }}
    />
  );
};

export default WorkoutCalendar;
