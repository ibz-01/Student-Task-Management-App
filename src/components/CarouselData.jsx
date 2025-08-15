import CarouselDisplay from "./CarouselDislay";


export default function CarouselData({ tasks = [] }) {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const getDateLabel = (dateString) => {
    const [weekday, month, day] = dateString.replace(",", "").split(" "); // ["Friday", "August", "16"]
    const dateObj = new Date(`${month} ${day}, ${new Date().getFullYear()}`); // Add current year

    dateObj.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);

    if (dateObj.getTime() === today.getTime()) return "Today";
    if (dateObj.getTime() === tomorrow.getTime()) return "Tomorrow";
    return dateString;
  };


  // Flatten all subtasks
  const allSubtasks = tasks.flatMap((task) =>
    task.days.flatMap((day) =>
      day.subtasks.map((subtask) => ({
        day: day.date,
        start: subtask.time.split("-")[0],
        end: subtask.time.split("-")[1],
        task: subtask.name,
      }))
    )
  );

  // Group tasks by date
  const groupedTasks = allSubtasks.reduce((acc, t) => {
    const label = getDateLabel(t.day);
    if (!acc[label]) acc[label] = [];
    acc[label].push(t);
    return acc;
  }, {});

  return <CarouselDisplay groupedTasks={groupedTasks} />;
}
