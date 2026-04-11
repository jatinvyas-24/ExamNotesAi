import note from "../models/notes.model.js"
import userModel from "../models/user.model.js"
import { generateGeminiResponse } from "../services/gemini.services.js"
import { buildPrompt } from "../utils/promptBuilder.js"


export const generateNotes = async (req, res) => {
    try {
        const { topic,
            classLevel,
            examType,
            revisionMode = false,
            includeDiagram = false,
            includeChart = false } = req.body
        if (!topic) {
            return res.status(400).json({ message: "Topic is required" })
        }

        const user = await userModel.findById(req.userId)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        if (user.credits < 10) {
            user.isCreditAvailable = false
            await user.save()
            return res.status(403).json({ message: "Not enough credits" })
        }

        const prompt = buildPrompt({
            topic,
            classLevel,
            examType,
            revisionMode,
            includeDiagram,
            includeChart
        })

        const aiResponse = await  generateGeminiResponse(prompt)
        console.log("AI Response:", aiResponse)

        const notes = await note.create({
            user: user._id,
            topic,
            classLevel,
            examType,
            revisionMode,
            includeDiagram,
            includeChart,
            content:aiResponse


        })

        user.credits -= 1
        if (user.credits < 10) {
            user.isCreditAvailable = false
        }

        if(!Array.isArray(user.notes)){
            user.notes = []
        }
        user.notes.push(notes._id)
        await user.save()
        return res.status(200).json({
            data:aiResponse,
            notesId: notes._id,
                remainingCredits: user.credits
        })



    } catch (error) {
        console.log("Generate notes error:", error)
        return res.status(500).json({ error : "AI  generation failed",
            message: error.message
         });

    }
} 