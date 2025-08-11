export default function AddTask() {
  return (
    <div>
      <h1>Add a New Task</h1>
      <form>
        <input type="text" placeholder="Task Title" />
        <textarea placeholder="Task Description"></textarea>
        <button type="submit">Save Task</button>
      </form>
    </div>
  );
}
