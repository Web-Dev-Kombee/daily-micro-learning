import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, User, Settings, LogOut } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../contexts/AuthContext";

export function Navigation() {
  const { signOut, userProfile } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="flex items-center space-x-4">
      <Link to="/">
        <Button variant="ghost" size="icon">
          <Home className="h-5 w-5" />
        </Button>
      </Link>
      <Link to="/profile">
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </Link>
      <Link to="/settings">
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </Link>
      <Button variant="ghost" size="icon" onClick={handleSignOut}>
        <LogOut className="h-5 w-5" />
      </Button>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">
          {userProfile?.displayName || userProfile?.email}
        </span>
        <span className="text-sm text-muted-foreground">
          🔥 {userProfile?.streak || 0} day streak
        </span>
      </div>
    </nav>
  );
}
