export async function fetchAiTasks(SYSTEM_PROMPT, title, description, deadline, instructions, timeslots) {
  const payload = {
    contents: [
      {
        parts: [
          {
            text:
              SYSTEM_PROMPT +
              `My Task Title: ${title}, My task description: ${description}, my task deadline: ${deadline}, special instructions: ${instructions}. Please break down my main task into sub-tasks to be completed till the deadline. break the goal down into smaller goals. Then, assign a time for each goal. You can design it in a way to keep the workload balanced till the deadline. Give the tasks in a format of Day and date first, and then bullet points of subtasks with time (e.g. 8:00pm-9:00pm). When you give an output, just give the answer, no conclusion or intro para. Also, just plan day/date format. no next day or today. These are the tasks already assigned and you cannot use the times which are already used: ${timeslots}`
          }
        ]
      }
    ]
  };

  const GEMINI_API_KEY = "AIzaSyCswoNTY7IoeM4-2dLEgLsjLSlSOU88M04";

  let response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }
  );

  response = await response.json();

  return response;
}
