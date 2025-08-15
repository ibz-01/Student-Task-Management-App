
import { HfInference } from "@huggingface/inference";
import { useState } from "react";



const currentTime = new Date()

    
    const hour = currentTime.getHours();
    const weekday = currentTime.toLocaleString("en-US", { weekday: "long" });
    const month = currentTime.toLocaleString("en-US", { month: "long" });
    const day = currentTime.getDate();
    const time = currentTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    });

    const fullDateTime = `${weekday}, ${month} ${day} | ${time}`;





const SYSTEM_PROMPT = `
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
  },
  ...
]

Rules:
- Include multiple entries for each day if needed.
- Times must be in 12-hour(AM/PM) format (HH:mm).
- Sort tasks in chronological order.
- Avoid overlaps with reserved times completely.
- No intro or conclusion, only JSON.
-Make the timetable realistic. A student cannot study all day. A student cannot study continously (subtask starting after another subtask ends) The times should be in the day, not after midnight unless necessary.
`;


const HF_ACCESS_TOKEN = "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"

   
const hf = new HfInference(HF_ACCESS_TOKEN)


export async function getTasks(title,description,deadline,instructions,timeslots)
{

    try {
        
    //     const response = await hf.chatCompletion( {
    //         model: "meta-llama/Meta-Llama-3.1-8B-Instruct",
    //         messages: [
    //            { role: "system", content: SYSTEM_PROMPT },
    //            { role: "user", content: `My Task Title: ${title}, My task description: ${description}, my task deadline: ${deadline}, special instructions: ${instructions}. Please break down my main task into sub-tasks to be completed till the deadline. break the goal down into smaller goals. Then, assign a time for each goal. You can design it in a way to keep the workload balanced till the deadline. Give the tasks in a format of Day and date first, and then bullet points of subtasks with time (e.g. 8:00pm-9:00pm). When you give an output, just give the answer, no conclusion or intro para. Also, just plan day/date format. no next day or today. These are the tasks already assigned and you cannot use the times which are already used: ${timeslots}`},
            
    //         ],
    //         max_tokens: 1024,

    //     })
    //     return response.choices[0].message.content


        const payload = {
            "contents": [{
                "parts": [{"text": SYSTEM_PROMPT + `My Task Title: ${title}, My task description: ${description}, my task deadline: ${deadline}, special instructions: ${instructions}. Please break down my main task into sub-tasks to be completed till the deadline. break the goal down into smaller goals. Then, assign a time for each goal. You can design it in a way to keep the workload balanced till the deadline. Give the tasks in a format of Day and date first, and then bullet points of subtasks with time (e.g. 8:00pm-9:00pm). When you give an output, just give the answer, no conclusion or intro para. Also, just plan day/date format. no next day or today. These are the tasks already assigned and you cannot use the times which are already used: ${timeslots}` }]
            }]
        }
        const GEMINI_API_KEY = "AIzaSyCswoNTY7IoeM4-2dLEgLsjLSlSOU88M04";

        let response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }
        );


        response = await response.json()
        console.log(response.candidates[0].content.parts[0].text)

        let AiOutput = response.candidates[0].content.parts[0].text

        AiOutput = AiOutput.replace(/```json\s*|\s*```/g, "").trim();

        let parsed;
        try {
        parsed = JSON.parse(AiOutput);
        } catch (e) {
        console.error("AI output is not valid JSON", e);
        return null;
        }

        // Restructure into the format ViewTasks expects
        const structuredTask = {
        title,
        days: parsed.reduce((acc, item) => {
            let dayObj = acc.find(d => d.date === item.day);
            if (!dayObj) {
            dayObj = { date: item.day, subtasks: [] };
            acc.push(dayObj);
            }
            dayObj.subtasks.push({
            time: `${item.start}-${item.end}`,
            name: item.task
            });
            return acc;
        }, [])
        };

        return structuredTask;
                






    } catch(err) {
        console.error(err.message)
    }
}