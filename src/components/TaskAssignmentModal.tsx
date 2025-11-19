import { useState } from "react";
import { motion } from "motion/react";
import { X, Calendar, User, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner@2.0.3";
import { api } from "../utils/api";

interface TaskAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: () => void;
}

export function TaskAssignmentModal({ isOpen, onClose, onTaskCreated }: TaskAssignmentModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "medium",
    dueDate: "",
    category: "general",
  });
  const [loading, setLoading] = useState(false);

  // Demo employee list - in production, fetch from API
  const employees = [
    { id: "EMP001", name: "John Doe", department: "Engineering" },
    { id: "EMP002", name: "Jane Smith", department: "Marketing" },
    { id: "EMP003", name: "Mike Johnson", department: "Sales" },
    { id: "EMP004", name: "Sarah Williams", department: "Design" },
    { id: "EMP005", name: "Tom Brown", department: "Engineering" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.assignedTo || !formData.dueDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const selectedEmployee = employees.find(emp => emp.id === formData.assignedTo);
      
      await api.createTask({
        ...formData,
        assignedToName: selectedEmployee?.name || "",
        assignedToDepartment: selectedEmployee?.department || "",
        status: "pending",
        createdBy: "Admin",
      });

      toast.success("Task assigned successfully!", {
        description: `Task assigned to ${selectedEmployee?.name}`,
      });

      onTaskCreated();
      onClose();
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        priority: "medium",
        dueDate: "",
        category: "general",
      });
    } catch (error: any) {
      toast.error("Failed to create task", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl w-full max-w-2xl relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50" />

        {/* Header */}
        <div className="relative border-b border-white/10 p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl text-white">Assign New Task</h2>
              <p className="text-gray-400 text-sm">Create and assign task to employee</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Task Title */}
          <div>
            <Label htmlFor="title" className="text-white">
              Task Title *
            </Label>
            <Input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Complete Q4 Financial Report"
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              required
            />
          </div>

          {/* Task Description */}
          <div>
            <Label htmlFor="description" className="text-white">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide detailed task description and requirements..."
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Assign To */}
            <div>
              <Label htmlFor="assignedTo" className="text-white">
                Assign To *
              </Label>
              <Select
                value={formData.assignedTo}
                onValueChange={(value) => setFormData({ ...formData, assignedTo: value })}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/10">
                  {employees.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id} className="text-white">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{emp.name}</span>
                        <span className="text-gray-400 text-xs">({emp.department})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div>
              <Label htmlFor="priority" className="text-white">
                Priority
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/10">
                  <SelectItem value="low" className="text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      Low Priority
                    </div>
                  </SelectItem>
                  <SelectItem value="medium" className="text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      Medium Priority
                    </div>
                  </SelectItem>
                  <SelectItem value="high" className="text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      High Priority
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Due Date */}
            <div>
              <Label htmlFor="dueDate" className="text-white">
                Due Date *
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="bg-white/5 border-white/10 text-white pl-10"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category" className="text-white">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/10">
                  <SelectItem value="general" className="text-white">General</SelectItem>
                  <SelectItem value="development" className="text-white">Development</SelectItem>
                  <SelectItem value="marketing" className="text-white">Marketing</SelectItem>
                  <SelectItem value="sales" className="text-white">Sales</SelectItem>
                  <SelectItem value="design" className="text-white">Design</SelectItem>
                  <SelectItem value="support" className="text-white">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Info Box */}
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-blue-300 text-sm mb-1">Employee Notification</p>
              <p className="text-gray-400 text-xs">
                The assigned employee will be notified immediately and can view this task in their dashboard.
              </p>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4 border-t border-white/10">
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
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Assigning...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Assign Task
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
