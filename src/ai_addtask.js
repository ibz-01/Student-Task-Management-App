

import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `

    You are an assistant that will design a study plan for a topic. You will recieve the title of a task, description of the task, deadline of the task, and any special instructions (for e.g. I cannot work today). Your task is to break the goal down into smaller goals. Then, assign a time for each goal. You can design it in a way to keep the workload balanced till the deadline. Give the tasks in a format of Day and date first, and then bullet points of subtasks with time (e.g. 8:00pm-9:00pm). When you give an output, just give the answer, no conclusion or intro para. Also, just plan day/date format. no next day or today.
`

const HF_ACCESS_TOKEN = "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"


const hf = new HfInference(HF_ACCESS_TOKEN)


export async function getTasks(title,description,deadline,instructions)
{
    const userInput = "abc"
    try {
        const response = await hf.chatCompletion( {
            model: "meta-llama/Meta-Llama-3.1-8B-Instruct",
            messages: [
               { role: "system", content: SYSTEM_PROMPT },
               { role: "user", content: `My Task Title: ${title}, My task description: ${description}, my task deadline: ${deadline}, special instructions: ${instructions}. Please break down my main task into sub-tasks to be completed till the deadline.`},
            
            ],
            max_tokens: 1024,

        })
        return response.choices[0].message.content
    } catch(err) {
        console.error(err.message)
    }
}