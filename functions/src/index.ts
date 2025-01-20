import * as functions from "firebase-functions";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const generateLessonContent = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "The function must be called while authenticated."
      );
    }

    const { topic, difficulty } = data;

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an educational content creator. Create a short lesson with quiz questions.",
          },
          {
            role: "user",
            content: `Create a ${difficulty} level micro-lesson about ${topic} with the following format:
          {
            "title": "lesson title",
            "content": "main lesson content (200-300 words)",
            "quiz": {
              "questions": [
                {
                  "text": "question text",
                  "type": "multiple-choice",
                  "options": ["option1", "option2", "option3", "option4"],
                  "correctAnswer": "correct option",
                  "explanation": "why this is correct"
                }
              ]
            }
          }`,
          },
        ],
      });

      const lessonContent = JSON.parse(
        completion.data.choices[0].message?.content || "{}"
      );
      return lessonContent;
    } catch (error) {
      throw new functions.https.HttpsError(
        "internal",
        "Failed to generate lesson content"
      );
    }
  }
);

export const generateTopics = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }

  const { category } = data;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an educational content planner.",
        },
        {
          role: "user",
          content: `Generate 5 interesting learning topics for the category "${category}" in this format:
          [{
            "id": "unique-id",
            "name": "topic name",
            "description": "brief description",
            "icon": "relevant emoji",
            "category": "${category}"
          }]`,
        },
      ],
    });

    const topics = JSON.parse(
      completion.data.choices[0].message?.content || "[]"
    );
    return topics;
  } catch (error) {
    throw new functions.https.HttpsError(
      "internal",
      "Failed to generate topics"
    );
  }
});
