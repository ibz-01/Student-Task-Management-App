export function getDateLabel(dateString) {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [weekday, month, day] = dateString.replace(",", "").split(" "); 
  const dateObj = new Date(`${month} ${day}, ${new Date().getFullYear()}`);

  dateObj.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);

  if (dateObj.getTime() === today.getTime()) return "Today";
  if (dateObj.getTime() === tomorrow.getTime()) return "Tomorrow";

  return dateString;
}
