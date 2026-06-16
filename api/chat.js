import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const { question } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
You are KCSE AI Tutor.
Give accurate educational answers.
Explain clearly.
Use simple language for students.
`
        },
        {
          role: "user",
          content: question
        }
      ],
      max_tokens: 1000
    });

    const answer =
      completion.choices[0].message.content;

    return res.status(200).json({
      answer
    });

  } catch (error) {

    return res.status(500).json({
      answer: "AI service temporarily unavailable."
    });

  }
}
