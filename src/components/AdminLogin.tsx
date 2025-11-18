import { useState } from "react";
import { motion } from "motion/react";
import { Shield, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner@2.0.3";

interface AdminLoginProps {
  onLogin: (password: string) => void;
  onClose: () => void;
}

export function AdminLogin({ onLogin, onClose }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simple password check - in production, this would be server-side
    const ADMIN_PASSWORD = "astramaie2024"; // Change this to your secure password

    if (password === ADMIN_PASSWORD) {
      toast.success("Access granted!");
      onLogin(password);
    } else {
      toast.error("Incorrect password. Please try again.");
      setPassword("");
    }
    
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        className="bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 border border-purple-500/20 rounded-3xl p-8 max-w-md w-full shadow-2xl"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
            <Shield className="w-12 h-12 text-purple-400" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Admin Access
          </h2>
          <p className="text-gray-400">Enter your password to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="password" className="text-gray-200 mb-2 block">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 pl-10 pr-10"
                disabled={loading}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-white/10 hover:bg-white/5"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              disabled={loading || !password}
            >
              {loading ? "Verifying..." : "Access Dashboard"}
            </Button>
          </div>
        </form>

        {/* Demo Info - REMOVED FOR SECURITY */}
      </motion.div>
    </div>
  );
}