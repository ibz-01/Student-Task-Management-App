export async function fetchAiTasks(SYSTEM_PROMPT, title, description, deadline, instructions, timeslots) {
  const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

  const userMessage =
    SYSTEM_PROMPT +
    `My Task Title: ${title}, My task description: ${description}, my task deadline: ${deadline}, special instructions: ${instructions}. Please break down my main task into sub-tasks to be completed till the deadline. break the goal down into smaller goals. Then, assign a time for each goal. You can design it in a way to keep the workload balanced till the deadline. Give the tasks in a format of Day and date first, and then bullet points of subtasks with time (e.g. 8:00pm-9:00pm). When you give an output, just give the answer, no conclusion or intro para. Also, just plan day/date format. no next day or today. These are the tasks already assigned and you cannot use the times which are already used: ${timeslots}`;

  const payload = {
    model: "meta-llama/llama-3.3-70b-instruct:free",
    messages: [
      {
        role: "user",
        content: userMessage
      }
    ]
  };

  let response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_API_KEY}`
    },
    body: JSON.stringify(payload)
  });

  response = await response.json();

  // Convert OpenRouter response format to match the old Gemini format
  // so ai_addtask.js doesn't need changes
  if (response.choices && response.choices.length > 0) {
    return {
      candidates: [
        {
          content: {
            parts: [
              {
                text: response.choices[0].message.content
              }
            ]
          }
        }
      ]
    };
  }

  // If error, log and return the raw response so the caller handles it
  console.error("OpenRouter API error:", response);
  return response;
}
