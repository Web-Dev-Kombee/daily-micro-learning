interface User {
  id: string;
  email: string;
  name: string;
}

const STORAGE_KEY = "ai-knowledge-sprout-user";

export const login = (email: string, password: string): Promise<User> => {
  // Mock login - in a real app, this would make an API call
  return new Promise((resolve, reject) => {
    if (email === "demo@example.com" && password === "password") {
      const user = {
        id: "1",
        email,
        name: "Demo User",
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      resolve(user);
    } else {
      reject(new Error("Invalid credentials"));
    }
  });
};

export const logout = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem(STORAGE_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
  return !!getCurrentUser();
};
