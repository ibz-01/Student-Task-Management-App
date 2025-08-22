export function getCurrentDateTime() {
  const currentTime = new Date();

  const weekday = currentTime.toLocaleString("en-US", { weekday: "long" });
  const month = currentTime.toLocaleString("en-US", { month: "long" });
  const day = currentTime.getDate();
  const time = currentTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return `${weekday}, ${month} ${day} | ${time}`;
}



export function buildSystemPrompt(fullDateTime) {
  return `
You are a task planner that breaks a main goal into smaller, timed subtasks until a deadline. 
You will receive:
- Task title
- Task description
- Deadline (finish work before that)
- Special instructions
- Already reserved times (you MUST avoid these times)

Right now it is ${fullDateTime}.
Break the goal into smaller, manageable subtasks.
Each subtask should be between 30 minutes and 2 hours.
Avoid all reserved times — do not even partially overlap.

Return ONLY a valid JSON array, with each object in this format:
[
  { 
    "day": "Thursday, August 15", 
    "start": "09:00", 
    "end": "11:00", 
    "task": "Review basic algebra concepts (solving single variable equations, graphing linear equations)" 
  },
  { 
    "day": "Thursday, August 15", 
    "start": "11:15", 
    "end": "12:15", 
    "task": "Practice solving simultaneous equations using substitution method" 
  }
]

Rules:
- Include multiple entries for each day if needed.
- Times must be in 12-hour (AM/PM) format (HH:mm).
- Sort tasks in chronological order.
- Avoid overlaps with reserved times completely.
- No intro or conclusion, only JSON.
- Make the timetable realistic. A student cannot study all day. 
- A student cannot study continuously (subtask starting immediately after another subtask ends). 
- The times should be in the day, not after midnight unless necessary.
  `;
}

export function parseAiOutput(AiOutput, title) 
{
    AiOutput = AiOutput.replace(/```json\s*|\s*```/g, "").trim();
    let parsed;
    try {
      parsed = JSON.parse(AiOutput);
    } catch (e) {
      console.error("AI output is not valid JSON", e, AiOutput);
      return null;
    }

    return {
      title,
      days: parsed.reduce((acc, item) => {
        let dayObj = acc.find((d) => d.date === item.day);
        if (!dayObj) {
          dayObj = { date: item.day, subtasks: [] };
          acc.push(dayObj);
        }
        dayObj.subtasks.push({
          time: `${item.start}-${item.end}`,
          name: item.task,
        });
        return acc;
      }, []),
    };
}