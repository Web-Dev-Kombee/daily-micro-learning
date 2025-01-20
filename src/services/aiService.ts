import { getFunctions, httpsCallable } from "firebase/functions";
import { db } from "../config/firebase";
import { ref, push, set } from "firebase/database";
import { Lesson, Topic } from "../types";

const functions = getFunctions();

export const aiService = {
  async generateLesson(
    topic: string,
    difficulty: "beginner" | "intermediate" | "advanced"
  ): Promise<Lesson> {
    const generateLessonContent = httpsCallable(
      functions,
      "generateLessonContent"
    );
    const result = await generateLessonContent({ topic, difficulty });

    // Save to database
    const lessonRef = ref(db, "lessons");
    const newLessonRef = push(lessonRef);
    const lesson = {
      id: newLessonRef.key,
      ...(result.data as Omit<Lesson, "id">),
      topic,
      difficulty,
      createdAt: new Date().toISOString(),
    };

    await set(newLessonRef, lesson);
    return lesson;
  },

  async generateTopics(category: string): Promise<Topic[]> {
    const generateTopics = httpsCallable(functions, "generateTopics");
    const result = await generateTopics({ category });

    // Save to database
    const topics = result.data as Topic[];
    const topicsRef = ref(db, "topics");

    await Promise.all(
      topics.map((topic) => set(ref(db, `topics/${topic.id}`), topic))
    );

    return topics;
  },
};
