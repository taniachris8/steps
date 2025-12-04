export function isValidDate(input: string): boolean {
  const regex = /^\d{2}\.\d{2}\.\d{2}$/;
  if (!regex.test(input)) return false;

  const [day, month, year] = input.split(".").map(Number);
  const fullYear = 2000 + year;

  const date = new Date(fullYear, month - 1, day);

  return (
    date.getFullYear() === fullYear &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function isValidDistance(input: string): boolean {
  const regex = /^\d+\.\d$/;
  return regex.test(input);
}

export function validateForm(date: string, distance: string): boolean {
  if (!isValidDate(date)) {
    alert("Введите дату в формате ДД.ММ.ГГ, например: 04.12.2025");
    return false;
  }

  if (!isValidDistance(distance)) {
    alert("Введите расстояние в формате X.Y, например: 1.0");
    return false;
  }

  return true;
}
