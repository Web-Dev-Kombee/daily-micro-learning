import { LearningContent, UserProgress, Topic } from "@/types";
import { LoginInput, SignupInput } from "./validations/auth";

const API_URL = import.meta.env.VITE_API_URL;

interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  async signup(data: SignupInput): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to sign up");
    }
    return response.json();
  },

  async login(data: LoginInput): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to log in");
    }
    return response.json();
  },

  async getTopics(): Promise<Topic[]> {
    const response = await fetch(`${API_URL}/topics`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch topics");
    return response.json();
  },

  async getContent(topicId: string): Promise<LearningContent[]> {
    const response = await fetch(`${API_URL}/content/${topicId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch content");
    return response.json();
  },

  async getProgress(topicId: string): Promise<UserProgress> {
    const response = await fetch(`${API_URL}/progress/${topicId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch progress");
    return response.json();
  },

  async createContent(
    content: Omit<LearningContent, "id">
  ): Promise<LearningContent> {
    const response = await fetch(`${API_URL}/content`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(content),
    });
    if (!response.ok) throw new Error("Failed to create content");
    return response.json();
  },

  async updateProgress(topicId: string): Promise<UserProgress> {
    const response = await fetch(`${API_URL}/progress/${topicId}`, {
      method: "PUT",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to update progress");
    return response.json();
  },
};
