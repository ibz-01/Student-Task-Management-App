import CarouselDisplay from "./CarouselDislay";
import { getDateLabel } from "../utilities/CarouselDataUtils";


export default function CarouselData({ tasks = [] }) {
  

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

  const groupedTasks = allSubtasks.reduce((acc, t) => {
    const label = getDateLabel(t.day);
    if (!acc[label]) acc[label] = [];
    acc[label].push(t);
    return acc;
  }, {});

  return <CarouselDisplay groupedTasks={groupedTasks} />;
}
