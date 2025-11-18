import { useState } from "react";
import { motion } from "motion/react";
import { Lock, Users, X, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Logo from "../imports/logo.svg";

// Company user credentials
const COMPANY_USERS = [
  { username: "admin", password: "astramaie2024", role: "Admin" },
  { username: "manager", password: "manager2024", role: "Manager" },
  { username: "team", password: "team2024", role: "Team Member" },
];

interface CompanyLoginProps {
  onLogin: (username: string, role: string) => void;
  onClose: () => void;
}

export function CompanyLogin({ onLogin, onClose }: CompanyLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const user = COMPANY_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      onLogin(user.username, user.role);
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 max-w-md w-full relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <h2 className="text-2xl mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Company Dashboard
          </h2>
          <p className="text-gray-400">Internal team access only</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="username" className="text-white mb-2 block">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-white mb-2 block">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            size="lg"
          >
            <Lock className="w-4 h-4 mr-2" />
            Login to Dashboard
          </Button>
        </form>

        {/* Demo Credentials - REMOVED FOR SECURITY */}
      </motion.div>
    </div>
  );
}