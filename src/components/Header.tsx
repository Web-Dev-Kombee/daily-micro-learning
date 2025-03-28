import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Header - Main application header component
 *
 * @param {string} className - Additional classes to apply
 * @param {string} title - Title to display in the header
 * @param {React.ReactNode} rightElement - Element to display on the right side
 * @returns {React.ReactElement} - The header component
 */
interface HeaderProps {
  className?: string;
  title?: string;
  rightElement?: React.ReactNode;
  transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  className,
  title = "AI Knowledge Sprout",
  rightElement,
  transparent = false,
}) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300",
        transparent
          ? "bg-transparent"
          : "glass-morphism backdrop-blur-xl bg-background/80",
        className
      )}
    >
      <div className="flex items-center justify-between mx-auto max-w-5xl">
        <div className="flex items-center gap-8">
          <button onClick={() => navigate("/")} className="text-xl font-medium">
            {title && <h1 className="text-lg font-medium">{title}</h1>}
          </button>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4" />
                <span>{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign Up
              </button>
            </div>
          )}

          {rightElement}
        </div>
      </div>
    </header>
  );
};

export default Header;
