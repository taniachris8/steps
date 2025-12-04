import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { v4 as uuidv4 } from "uuid";
import { convertDateToObj, convertDateToStr } from "../formatDate";

export type FormDataProps = {
  id: string;
  date: Date;
  distance: number;
};

export function TrainingForm() {
  const [inputDate, setInputDate] = useState<string>("");
  const [inputDistance, setInputDistance] = useState<string>("");

  const [formData, setFormData] = useState<FormDataProps | null>(null);
  const [trainings, setTrainings] = useState<FormDataProps[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("form submitted");

    const formattedDate = convertDateToObj(inputDate);
    const formattedDistance = Number(inputDistance);
    setFormData({
      id: uuidv4(),
      date: formattedDate,
      distance: formattedDistance,
    });
    handleResetForm();
  };

  useEffect(() => {
    if (formData) {
      setTrainings((prev) => {
        const trainingAlreadyExist = prev?.some(
          (t) => convertDateToStr(t.date) === convertDateToStr(formData.date)
        );
        if (trainingAlreadyExist && prev) {
          return prev
            .map((t) =>
              convertDateToStr(t.date) === convertDateToStr(formData.date)
                ? { ...t, distance: t.distance + formData.distance }
                : t
            )
            .sort((a, b) => +b.date - +a.date);
        }
        return [...prev, formData].sort((a, b) => +b.date - +a.date);
      });
    }
  }, [formData]);

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
              <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
              <input
                type="text"
                id="date"
                name="date"
                required
                value={inputDate}
                placeholder="01.01.25"
                onChange={(e) => setInputDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="distance">Пройдено км</label>
              <input
                type="number"
                id="distance"
                name="distance"
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
      />
    </>
  );
}
