import { useState } from "react";
import { motion } from "motion/react";
import { X, Upload, FileText, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner@2.0.3";
import { api } from "../utils/api";

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: {
    id: string;
    title: string;
    department: string;
  };
}

export function JobApplicationModal({ isOpen, onClose, job }: JobApplicationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    coverLetter: "",
    experience: "",
    expectedSalary: "",
  });
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate resume file
    if (!resumeFile) {
      toast.error("Resume is required", {
        description: "Please upload your resume/CV to continue.",
      });
      return;
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(resumeFile.type)) {
      toast.error("Invalid file type", {
        description: "Please upload a PDF or Word document.",
      });
      return;
    }

    // Validate file size (5MB max)
    if (resumeFile.size > 5 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Please upload a file smaller than 5MB.",
      });
      return;
    }

    setLoading(true);

    try {
      await api.submitJobApplication({
        ...formData,
        jobId: job.id,
        jobTitle: job.title,
        department: job.department,
        resumeFileName: resumeFile.name,
        resumeFileSize: resumeFile.size,
      });

      toast.success("Application submitted successfully!", {
        description: "We'll review your application and get back to you soon.",
      });

      onClose();
      setFormData({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        github: "",
        portfolio: "",
        coverLetter: "",
        experience: "",
        expectedSalary: "",
      });
      setResumeFile(null);
    } catch (error: any) {
      toast.error("Failed to submit application", {
        description: error.message || "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      toast.success("Resume uploaded successfully!", {
        description: `${file.name} (${(file.size / 1024).toFixed(0)} KB)`,
      });
    }
  };

  const removeResume = () => {
    setResumeFile(null);
    toast.info("Resume removed");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-gray-900 to-black border-b border-white/10 p-6 z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Apply for {job.title}
          </h2>
          <p className="text-gray-400 mt-1">{job.department}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              Personal Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-white">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="text-white">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                required
              />
            </div>
          </div>

          {/* Professional Links */}
          <div className="space-y-4">
            <h3 className="text-white">Professional Links</h3>

            <div>
              <Label htmlFor="linkedin" className="text-white">
                LinkedIn Profile
              </Label>
              <Input
                id="linkedin"
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/yourprofile"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="github" className="text-white">
                  GitHub Profile
                </Label>
                <Input
                  id="github"
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  placeholder="https://github.com/yourusername"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>

              <div>
                <Label htmlFor="portfolio" className="text-white">
                  Portfolio Website
                </Label>
                <Input
                  id="portfolio"
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  placeholder="https://yourportfolio.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-white">Additional Information</h3>

            <div>
              <Label htmlFor="experience" className="text-white">
                Relevant Experience *
              </Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="Describe your relevant experience, projects, internships, or academic work in AI/ML..."
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 min-h-[100px]"
                required
              />
            </div>

            <div>
              <Label htmlFor="coverLetter" className="text-white">
                Why do you want to join Astramaie? *
              </Label>
              <Textarea
                id="coverLetter"
                value={formData.coverLetter}
                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                placeholder="Tell us why you're excited about this opportunity and what you can bring to our team..."
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 min-h-[120px]"
                required
              />
            </div>

            <div>
              <Label htmlFor="expectedSalary" className="text-white">
                Expected Salary (Optional)
              </Label>
              <Input
                id="expectedSalary"
                type="text"
                value={formData.expectedSalary}
                onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                placeholder="e.g., $60,000 - $80,000"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Resume Upload */}
          <div className="space-y-4">
            <h3 className="text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-purple-400" />
              Resume / CV *
            </h3>
            
            <div className="p-6 bg-purple-500/10 border-2 border-dashed border-purple-500/30 rounded-lg hover:border-purple-500/50 transition-all">
              {!resumeFile ? (
                <div className="text-center">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="cursor-pointer block"
                  >
                    <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <p className="text-white mb-2">
                      Click to upload your resume
                    </p>
                    <p className="text-gray-400 text-sm mb-1">
                      PDF, DOC, or DOCX (Max 5MB)
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4 border-purple-500/30 hover:bg-purple-500/20"
                      onClick={() => document.getElementById('resume-upload')?.click()}
                    >
                      Choose File
                    </Button>
                  </label>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white">{resumeFile.name}</p>
                      <p className="text-gray-400 text-sm">
                        {(resumeFile.size / 1024).toFixed(0)} KB
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeResume}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              )}
            </div>
            
            <p className="text-gray-400 text-sm flex items-start gap-2">
              <span className="text-purple-400">•</span>
              Your resume will be reviewed by our hiring team and kept confidential
            </p>
          </div>

          {/* Submit Button */}
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
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}