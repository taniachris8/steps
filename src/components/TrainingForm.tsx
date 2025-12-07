import { useState } from "react";
import { DataTable } from "./DataTable";
import { v4 as uuidv4 } from "uuid";
import ErrorModal from "./ErrorModal";

export type FormDataProps = {
  id: string;
  date: Date;
  distance: number;
};

export function TrainingForm() {
  const [inputDate, setInputDate] = useState<string>("");
  const [inputDistance, setInputDistance] = useState<string>("");

  const [trainings, setTrainings] = useState<FormDataProps[]>([]);
  const [modal, showModal] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (Number(inputDistance) <= 0) {
      showModal(true);
      return;
    }

    const dateObj = new Date(inputDate);
    const distanceNum = Number(inputDistance);

    if (editingId) {
      setTrainings((prev) =>
        prev.map((t) =>
          t.id === editingId
            ? { ...t, date: dateObj, distance: distanceNum }
            : t
        )
      );

      setEditingId(null);
      handleResetForm();
      return;
    }

    setTrainings((prev) => {
      const exists = prev.find(
        (t) => t.date.toISOString().slice(0, 10) === inputDate
      );

      if (exists) {
        return prev
          .map((t) =>
            t.date.toISOString().slice(0, 10) === inputDate
              ? { ...t, distance: t.distance + distanceNum }
              : t
          )
          .sort((a, b) => +b.date - +a.date);
      }

      return [
        ...prev,
        { id: uuidv4(), date: dateObj, distance: distanceNum },
      ].sort((a, b) => +b.date - +a.date);
    });

    handleResetForm();
  };

  const handleResetForm = () => {
    setInputDate("");
    setInputDistance("");
  };

  return (
    <>
      <div className="form-container">
        <form id="trainingForm" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Дата (ДД.ММ.ГГГГ)</label>
              <input
                type="date"
                max={new Date().toISOString().slice(0, 10)}
                id="date"
                required
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="distance">Пройдено км</label>
              <input
                type="number"
                id="distance"
                step="0.1"
                min="0"
                required
                placeholder="1.0"
                value={inputDistance}
                onChange={(e) => setInputDistance(e.target.value)}
              />
            </div>

            <button type="submit" className="submit-btn">
              OK
            </button>
          </div>
        </form>
      </div>

      <DataTable
        trainings={trainings}
        setTrainings={setTrainings}
        setInputDate={setInputDate}
        setInputDistance={setInputDistance}
        setEditingId={setEditingId}
      />

      <ErrorModal show={modal} onClose={() => showModal(false)} />
    </>
  );
}
