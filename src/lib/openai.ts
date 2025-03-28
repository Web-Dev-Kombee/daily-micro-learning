import OpenAI from "openai";
import { Topic, LearningContent } from "@/types";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `You are an expert educational content creator specializing in micro-learning. 
Your task is to create concise, engaging, and informative learning content that can be consumed in 2-5 minutes.
Focus on delivering practical knowledge with clear examples and key takeaways.`;

export const generateLearningContent = async (
  topic: Topic
): Promise<LearningContent> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `Create a micro-learning lesson about ${topic.title}. 
          Include:
          1. A clear title
          2. Key concepts and definitions
          3. A practical example
          4. Key takeaways
          Keep it concise and engaging, suitable for 2-3 minutes of reading.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0].message.content;
    const paragraphs = response?.split("\n\n") || [];

    // Extract title from first paragraph
    const title = paragraphs[0].replace(/^#\s*/, "");

    // Combine remaining paragraphs for content
    const content = paragraphs.slice(1).join("\n\n");

    return {
      id: Math.random().toString(36).substring(7),
      topicId: topic.id,
      title,
      content,
      readTime: Math.ceil(content.split(" ").length / 200), // Estimate read time based on word count
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error generating learning content:", error);
    throw new Error("Failed to generate learning content");
  }
};

export const generateTopicSuggestions = async (
  interests: string[]
): Promise<Topic[]> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert in educational content planning. 
          Generate topic suggestions based on user interests. 
          Each topic should have a title, description, and an appropriate emoji icon.`,
        },
        {
          role: "user",
          content: `Generate 5 learning topics based on these interests: ${interests.join(
            ", "
          )}. 
          Format each topic as JSON with: title, description, icon (emoji), and color (one of: blue, green, purple, red, yellow).`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0].message.content;
    if (!response) throw new Error("No response from OpenAI");

    // Parse the response into Topic objects
    const topics: Topic[] = JSON.parse(response);

    // Add IDs to each topic
    return topics.map((topic, index) => ({
      ...topic,
      id: (index + 1).toString(),
    }));
  } catch (error) {
    console.error("Error generating topic suggestions:", error);
    // Fallback to default topics if OpenAI fails
    return [
      {
        id: "1",
        title: "Artificial Intelligence",
        description: "Learn about the fundamentals of AI and machine learning.",
        icon: "🤖",
        color: "blue",
      },
      {
        id: "2",
        title: "Web Development",
        description:
          "Master modern web development technologies and practices.",
        icon: "🌐",
        color: "green",
      },
      {
        id: "3",
        title: "Data Science",
        description: "Explore data analysis and visualization techniques.",
        icon: "📊",
        color: "purple",
      },
    ];
  }
};
