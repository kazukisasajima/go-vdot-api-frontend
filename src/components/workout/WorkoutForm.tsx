import { Workout } from "../../types";
import { useState, useEffect } from "react";

interface Props {
  initialData?: Workout;
  onSubmit: (data: Workout) => void;
  onCancel: () => void;
}

const WorkoutForm = ({ initialData, onSubmit, onCancel }: Props) => {
  const [formData, setFormData] = useState<Workout>(
    initialData || {
      date: "",
      start_time: "",
      workout: "",
      lap_time: "",
      mileage: 0,
      mileage_unit: "km",
      weather: "",
    }
  );

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
  
    const newValue = type === "number"
      ? parseFloat(value) // 数値に変換（type="number" の場合）
      : value;
  
    setFormData(prev => ({ ...prev, [name]: newValue }));
  };
  
  return (
    <div className="border p-4 rounded">
      <h2 className="text-xl mb-2">{initialData ? "更新" : "作成"}フォーム</h2>
      <input type="date" name="date" value={formData.date} onChange={handleChange} />
      <input type="time" name="start_time" value={formData.start_time} onChange={handleChange} />
      <textarea name="workout" placeholder="練習内容" value={formData.workout} onChange={handleChange} />
      <textarea name="lap_time" placeholder="ラップタイム" value={formData.lap_time} onChange={handleChange} />
      <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} />
      <input type="text" name="mileage_unit" value={formData.mileage_unit} onChange={handleChange} />
      <input type="text" name="weather" placeholder="晴れ" value={formData.weather} onChange={handleChange} />
      <div className="flex gap-2 mt-2">
        <button onClick={() => onSubmit(formData)} className="bg-blue-500 text-white px-2 py-1 rounded">保存</button>
        <button onClick={onCancel} className="bg-gray-300 px-2 py-1 rounded">キャンセル</button>
      </div>
    </div>
  );
};

export default WorkoutForm;
