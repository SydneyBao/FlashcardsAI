import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines:
1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or piece of information.
4. Use simple language to make the flashcards accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrasing for both questions and answers.
7. Make sure to create exactly 10 flashcards.
8. Both front and back should be one sentence long.
9. When appropriate, use memory aids to help reinforce the information.
10. Tailer the difficulty level of the flashcards to the user's specified preferences.
11. If given a body of text, extract the most important and relevant information for the flashcards.
12. Aim to create a balanced set of flashcards that cover the topic comprehensively.

Remember, the goal is to facilitate effective learning and retention of information through the flashcards.

Return in the following JSON format:
{
    "flashcards": [
        {
        "front": str,
        "back": str
        }
    ]
}
`
export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.text()
  
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: data },
      ],
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
    })
  
    const flashcards = JSON.parse(completion.choices[0].message.content)
    return NextResponse.json(flashcards.flashcards)
  }