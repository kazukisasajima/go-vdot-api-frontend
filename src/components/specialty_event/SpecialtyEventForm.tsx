import { useState, useEffect } from "react";
import { SpecialtyEvent } from "../../types";

const EVENT_CHOICES = [
  "800m", "1500m", "1mile", "3000m", "3000mSC",
  "2mile", "5000m", "10000m", "ハーフマラソン", "フルマラソン",
];

interface Props {
  initialData?: SpecialtyEvent;
  onSubmit: (data: SpecialtyEvent) => void;
  onCancel: () => void;
}

const SpecialtyEventForm = ({ initialData, onSubmit, onCancel }: Props) => {
  const [formData, setFormData] = useState<SpecialtyEvent>({
    id: 0,
    event_name: "",
    best_time: "",
    recorded_at: new Date().toISOString().slice(0, 10),
    deleted_at: null,
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">{initialData ? "編集" : "新規登録"}フォーム</h2>

      <label className="block mb-2">
        種目:
        <select
          name="event_name"
          value={formData.event_name}
          onChange={handleChange}
          className="block w-full border rounded px-2 py-1"
          required
        >
          <option value="">選択してください</option>
          {EVENT_CHOICES.map(choice => (
            <option key={choice} value={choice}>{choice}</option>
          ))}
        </select>
      </label>

      <label className="block mb-2">
        ベストタイム:
        <input
          type="text"
          name="best_time"
          value={formData.best_time}
          onChange={handleChange}
          className="block w-full border rounded px-2 py-1"
          required
          placeholder={'例: 2:22:25 または 4\'12"11'}
        />
      </label>

      <label className="block mb-4">
        記録日:
        <input
          type="date"
          name="recorded_at"
          value={formData.recorded_at}
          onChange={handleChange}
          className="block w-full border rounded px-2 py-1"
        />
      </label>

      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">保存</button>
        <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">キャンセル</button>
      </div>
    </form>
  );
};

export default SpecialtyEventForm;
