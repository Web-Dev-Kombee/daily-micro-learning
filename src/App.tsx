import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/auth/PrivateRoute";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Lesson from "./pages/Lesson";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { SignIn } from "./components/auth/SignIn";
import { SignUp } from "./components/auth/SignUp";
import { useAuth } from "./contexts/AuthContext";
import { Provider } from 'react-redux';
import { store } from './store/store';

const queryClient = new QueryClient();

function AuthenticatedRoutes() {
  const { userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to onboarding if user hasn't selected topics
  if (!userProfile?.selectedTopics?.length ?? 0) {
    return <Navigate to="/onboarding" />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lesson/:id" element={<Lesson />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/onboarding"
                element={
                  <PrivateRoute>
                    <Onboarding />
                  </PrivateRoute>
                }
              />

              {/* Protected routes */}
              <Route
                path="/*"
                element={
                  <PrivateRoute>
                    <AuthenticatedRoutes />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
