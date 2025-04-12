import { SpecialtyEvent } from "../../types";

interface Props {
  events: SpecialtyEvent[];
  onEdit: (event: SpecialtyEvent) => void;
}

const SpecialtyEventList = ({ events, onEdit }: Props) => {
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-2">ベストタイム一覧</h2>
      {events.length === 0 ? (
        <p>データがありません</p>
      ) : (
        <table className="w-full table-auto border border-collapse border-gray-400">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">種目</th>
              <th className="border px-4 py-2">ベストタイム</th>
              <th className="border px-4 py-2">記録日</th>
              <th className="border px-4 py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td className="border px-4 py-2">{event.event_name}</td>
                <td className="border px-4 py-2">{event.best_time}</td>
                <td className="border px-4 py-2">{event.recorded_at}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => onEdit(event)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    編集
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SpecialtyEventList;
