export function convertDateToStr(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function convertDateToObj (date: string) : Date{
  const [day, month, year] = date.split(".");
  return new Date(`20${year}-${month}-${day}`);
};