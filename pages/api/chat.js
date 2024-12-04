import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyCYMSEQrEONQJaLo2-DsdDyEFj-V-k0TEo');

export default async function handler(req, res) {
  
  try {
    const { prompt } = req.body; 
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([prompt]);

    res.status(200).json({ response: result.response.text() });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ message: 'Failed to generate content' });
  }

}
