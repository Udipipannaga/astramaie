import { useState } from "react";
import { CompanyLogin } from "./components/CompanyLogin";
import { CompanyDashboard } from "./components/CompanyDashboard";
import { Toaster } from "./components/ui/sonner";
import { ParticleBackground } from "./components/ParticleBackground";

export default function InternalDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = (user: string, userRole: string) => {
    setUsername(user);
    setRole(userRole);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setRole("");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <ParticleBackground />
      <div className="fixed inset-0 bg-gradient-to-br from-blue-950/20 via-purple-950/20 to-black pointer-events-none"></div>
      
      {!isAuthenticated ? (
        <CompanyLogin 
          onLogin={handleLogin} 
          onClose={() => {}} 
        />
      ) : (
        <CompanyDashboard
          isOpen={true}
          onClose={handleLogout}
          username={username}
          role={role}
        />
      )}
      
      <Toaster position="top-right" theme="dark" richColors />
    </div>
  );
}
