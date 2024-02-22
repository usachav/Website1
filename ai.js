const { GoogleGenerativeAI } = require ('@google/generative-ai')



 async function generateText(
    prompt,
    temperature = 0.9, // Gemini default
    model = "gemini-pro",
    apiKey = process.env.GEN_AI_API_KEY,
) {
    const ai = new GoogleGenerativeAI(apiKey)
    const llm = ai.getGenerativeModel({ model })
    llm.generationConfig.temperature = temperature

    console.log('Generating text from prompt:\n\n', prompt, '\n\n')
    const result = await llm.generateContent(prompt)
    const response = result.response.text()
    // console.log('Got response:\n\n', response, '\n\n')
    return response

}
module.exports = {generateText}