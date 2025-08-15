import CarouselData from "./CarouselData";
import { useContext } from "react";
import { TaskContext } from "../components/TaskList";

export default function Carousel() {
  const { tasks } = useContext(TaskContext);
  return <CarouselData tasks={tasks} />;
}
