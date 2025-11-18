import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { api } from "../utils/api";
import { toast } from "sonner@2.0.3";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      await api.submitContact(formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", company: "", service: "", message: "" });
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className="bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 border border-purple-500/20 rounded-3xl p-8 max-w-2xl w-full pointer-events-auto overflow-y-auto max-h-[90vh] shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Get in Touch
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-200">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Your name"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 mt-2"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-200">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="your@email.com"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 mt-2"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company" className="text-gray-200">
                    Company
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="Your company name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 mt-2"
                    disabled={loading}
                  />
                </div>

                <div>
                  <Label htmlFor="service" className="text-gray-200">
                    Service Interest
                  </Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) =>
                      setFormData({ ...formData, service: value })
                    }
                    disabled={loading}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white mt-2">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="workflow-automation">Workflow Automation</SelectItem>
                      <SelectItem value="ai-chatbots">AI Chatbots</SelectItem>
                      <SelectItem value="data-processing">Data Processing</SelectItem>
                      <SelectItem value="custom-integration">Custom Integration</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-200">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us about your project..."
                    rows={5}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 mt-2 resize-none"
                    disabled={loading}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12 gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
