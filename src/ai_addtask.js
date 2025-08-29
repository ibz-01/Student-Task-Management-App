
import { HfInference } from "@huggingface/inference";
import { useState } from "react";
import { getCurrentDateTime, buildSystemPrompt, parseAiOutput} from "./utilities/ai_addTaskUtils";
import { fetchAiTasks } from "./utilities/aiActions";



export async function getTasks(title,description,deadline,instructions,timeslots)
{
    const fullDateTime = getCurrentDateTime()
    const SYSTEM_PROMPT = buildSystemPrompt(fullDateTime)

    try {
        
        const response = await fetchAiTasks(SYSTEM_PROMPT, title, description, deadline, instructions, timeslots)        

        if (
            !response ||
            !response.candidates ||
            !Array.isArray(response.candidates) ||
            response.candidates.length === 0 ||
            !response.candidates[0].content ||
            !response.candidates[0].content.parts ||
            response.candidates[0].content.parts.length === 0
        ) 
        {
            console.error("Invalid AI response format:", response);
            return null;
        }


        let AiOutput = response.candidates[0].content.parts[0].text

        AiOutput = AiOutput.replace(/```json\s*|\s*```/g, "").trim();

        return parseAiOutput(AiOutput, title);


    } catch(err) {
        console.error(err.message)
    }
}