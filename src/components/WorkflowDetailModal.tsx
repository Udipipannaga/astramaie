import { motion, AnimatePresence } from "motion/react";
import { X, Eye, Zap, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import type { Workflow } from "../types/workflow";

interface WorkflowDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  workflow: Workflow | null;
}

const categoryIcons: Record<string, string> = {
  "email-automation": "📧",
  "data-processing": "⚙️",
  "chatbot": "🤖",
  "crm-integration": "📊",
  "social-media": "📱",
  "analytics": "📈",
  "custom": "✨",
};

const categoryLabels: Record<string, string> = {
  "email-automation": "Email Automation",
  "data-processing": "Data Processing",
  "chatbot": "AI Chatbot",
  "crm-integration": "CRM Integration",
  "social-media": "Social Media",
  "analytics": "Analytics",
  "custom": "Custom Solution",
};

export function WorkflowDetailModal({ isOpen, onClose, workflow }: WorkflowDetailModalProps) {
  if (!workflow) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-br from-gray-900 to-black border-b border-white/10 p-6 z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">
                      {categoryIcons[workflow.category] || "✨"}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-2xl text-white">{workflow.name}</h2>
                        <Badge 
                          variant="outline" 
                          className="border-purple-500/30 text-purple-400 bg-purple-500/10"
                        >
                          {categoryLabels[workflow.category] || workflow.category}
                        </Badge>
                      </div>
                      <p className="text-gray-400">
                        {workflow.description || "Custom automation workflow"}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="hover:bg-white/10 flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Eye className="w-4 h-4" />
                    <span>{workflow.metrics?.views || 0} views</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Zap className="w-4 h-4" />
                    <span>{workflow.nodes?.length || 0} steps</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>Avg. {workflow.metrics?.avgExecutionTime || '2-5'} min</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Tags */}
                {workflow.tags && workflow.tags.length > 0 && (
                  <div>
                    <h3 className="text-white mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {workflow.tags.map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-white/5 text-gray-400 border-white/10"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Workflow Steps */}
                {workflow.nodes && workflow.nodes.length > 0 && (
                  <div>
                    <h3 className="text-white mb-4">Workflow Steps</h3>
                    <div className="space-y-3">
                      {workflow.nodes.map((node, index) => (
                        <div
                          key={node.id}
                          className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10"
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white mb-1">{node.type}</h4>
                            <p className="text-sm text-gray-400">
                              {node.data?.label || node.data?.description || 'Processing step'}
                            </p>
                          </div>
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Benefits */}
                <div className="p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl border border-purple-500/30">
                  <h3 className="text-white mb-4">Key Benefits</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Fully automated process</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Reduces manual work by 80%</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Real-time processing and notifications</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Customizable to your needs</span>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                {workflow.metrics && (
                  <div>
                    <h3 className="text-white mb-4">Performance Metrics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                        <div className="text-2xl text-purple-400 mb-1">
                          {workflow.metrics.successRate || '98'}%
                        </div>
                        <div className="text-sm text-gray-400">Success Rate</div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                        <div className="text-2xl text-blue-400 mb-1">
                          {workflow.metrics.executions || '1.2K'}
                        </div>
                        <div className="text-sm text-gray-400">Executions</div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                        <div className="text-2xl text-green-400 mb-1">
                          {workflow.metrics.timeSaved || '45'}h
                        </div>
                        <div className="text-sm text-gray-400">Time Saved</div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                        <div className="text-2xl text-pink-400 mb-1">
                          {workflow.metrics.costSavings || '$8K'}
                        </div>
                        <div className="text-sm text-gray-400">Cost Saved</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="pt-6 border-t border-white/10">
                  <div className="text-center mb-4">
                    <p className="text-gray-400 mb-2">
                      Interested in a similar workflow for your business?
                    </p>
                    <p className="text-sm text-gray-500">
                      We'll customize this solution to match your specific needs
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => {
                        onClose();
                        if ((window as any).navigate) {
                          (window as any).navigate('/contact');
                        }
                      }}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      size="lg"
                    >
                      Request Custom Workflow
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/20 hover:bg-white/10"
                      size="lg"
                      onClick={() => {
                        onClose();
                        if ((window as any).navigate) {
                          (window as any).navigate('/case-studies');
                        }
                      }}
                    >
                      View Case Studies
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
