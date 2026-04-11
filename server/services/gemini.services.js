
const gemini_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent"

export const generateGeminiResponse = async (prompt) => {
    try {
         const response = await fetch(`${gemini_url}?key=${process.env.GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: prompt
                }]
            }]
        })

    })

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Gemini API error: ${err}`);
    }
    const data = await response.json();

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
        throw new Error("Gemini API error: No text content in response");
    }

    const cleanText = text.replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

    return JSON.parse(cleanText);
    } catch (error) {
        console.log("Gemini API FETCH error:", error);
        throw new Error("Failed to generate content from Gemini API");
    }
}
