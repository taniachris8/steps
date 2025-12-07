import { convertDateToStr } from "../formatDate";
import type { FormDataProps } from "./TrainingForm";

type DataTableProps = {
  trainings: FormDataProps[];
  setTrainings: React.Dispatch<React.SetStateAction<FormDataProps[]>>;
  setInputDate: React.Dispatch<React.SetStateAction<string>>;
  setInputDistance: React.Dispatch<React.SetStateAction<string>>;
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
};

export function DataTable({
  trainings,
  setTrainings,
  setInputDate,
  setInputDistance,
  setEditingId,
}: DataTableProps) {
  const deleteTraining = (trainingId: string) => {
    setTrainings(trainings.filter((t) => t.id !== trainingId));
  };

  const editTraining = (training: FormDataProps) => {
    setInputDate(training.date.toISOString().slice(0, 10));
    setInputDistance(training.distance.toString());
    setEditingId(training.id);
  };

  return (
    <div className="data-table">
      <div className="table-header">
        <div className="col-date">Дата (ДД.ММ.ГГГГ)</div>
        <div className="col-distance">Пройдено км</div>
        <div className="col-actions">Действия</div>
      </div>

      <div className="table-body" id="tableBody">
        {trainings.length === 0 ? (
          <div className="empty-state">Нет данных о тренировках</div>
        ) : (
          trainings.map((training) => (
            <div
              className="table-row"
              data-date={training.date}
              key={training.id}>
              <div className="col-date">{convertDateToStr(training.date)}</div>
              <div className="col-distance">{training.distance} </div>
              <div className="col-actions">
                <button
                  className="action-btn edit-btn"
                  title="Редактировать"
                  onClick={() => editTraining(training)}>
                  ✎
                </button>
                <button
                  className="action-btn delete-btn"
                  title="Удалить"
                  onClick={() => deleteTraining(training.id)}>
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
