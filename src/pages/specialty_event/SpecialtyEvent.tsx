import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  fetchSpecialtyEvents,
  createSpecialtyEvent,
  updateSpecialtyEvent,
} from "../../services/specialtyEventAPI";
import { SpecialtyEvent } from "../../types";
import useAuthGuard from "../../hooks/useAuthGuard";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import SpecialtyEventList from "../../components/specialty_event/SpecialtyEvent";
import SpecialtyEventForm from "../../components/specialty_event/SpecialtyEventForm";

const SpecialtyEventPage = () => {
  useAuthGuard();
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [specialtyEvents, setSpecialtyEvents] = useState<SpecialtyEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<SpecialtyEvent | null>(null);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const data = await fetchSpecialtyEvents();
      setSpecialtyEvents(data);
      setLoading(false);
    };
    load();
  }, [user]);

  const handleSubmit = async (event: SpecialtyEvent) => {
    try {
      let result;
      if (event.id) {
        result = await updateSpecialtyEvent(event.id, event);
      } else {
        result = await createSpecialtyEvent(event);
      }

      const updated = await fetchSpecialtyEvents();
      setSpecialtyEvents(updated);
      setSelectedEvent(null);
    } catch (err) {
      console.error("保存失敗:", err);
    }
  };

  const handleCancel = () => {
    setSelectedEvent(null);
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
      <main className="flex flex-col items-center flex-1 p-4">
        <SpecialtyEventList events={specialtyEvents} onEdit={setSelectedEvent} />
        <div className="mt-6 w-full max-w-md">
          <SpecialtyEventForm
            initialData={selectedEvent || undefined}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SpecialtyEventPage;
