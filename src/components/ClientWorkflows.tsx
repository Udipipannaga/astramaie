import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Zap, Sparkles, Eye, Users, ChevronRight, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { api } from "../utils/api";
import type { Workflow } from "../types/workflow";
import { WorkflowDetailModal } from "./WorkflowDetailModal";

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

export function ClientWorkflows() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);

  useEffect(() => {
    loadWorkflows();
  }, []);

  const loadWorkflows = async () => {
    try {
      const result = await api.getWorkflows();
      // Only show published workflows
      const publishedWorkflows = result.workflows.filter((w: Workflow) => w.isPublished);
      setWorkflows(publishedWorkflows);
    } catch (error) {
      console.error("Failed to load workflows:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredWorkflows = selectedCategory === "all"
    ? workflows
    : workflows.filter((w) => w.category === selectedCategory);

  const categories = Array.from(new Set(workflows.map((w) => w.category)));

  if (loading) {
    return (
      <section id="workflows" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">Loading workflows...</p>
        </div>
      </section>
    );
  }

  // Don't show section if no published workflows
  if (workflows.length === 0) {
    return null;
  }

  return (
    <section id="workflows" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300">Client Success Stories</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Custom Workflows
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Automation solutions we've built for our clients
          </p>
        </motion.div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className={selectedCategory === "all" 
                ? "bg-gradient-to-r from-purple-600 to-pink-600"
                : "border-white/10 hover:bg-white/5"
              }
            >
              <Filter className="w-4 h-4 mr-2" />
              All Workflows
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-pink-600"
                  : "border-white/10 hover:bg-white/5"
                }
              >
                <span className="mr-2">{categoryIcons[category] || "✨"}</span>
                {categoryLabels[category] || category}
              </Button>
            ))}
          </motion.div>
        )}

        {/* Workflows Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkflows.map((workflow, index) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-purple-500/30 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-4xl mb-3">
                      {categoryIcons[workflow.category] || "✨"}
                    </div>
                    <Badge 
                      variant="outline" 
                      className="border-purple-500/30 text-purple-400 bg-purple-500/10"
                    >
                      {categoryLabels[workflow.category] || workflow.category}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-white group-hover:text-purple-400 transition-colors">
                    {workflow.name}
                  </CardTitle>
                  
                  <CardDescription className="text-gray-400 line-clamp-2">
                    {workflow.description || "Custom automation workflow"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Tags */}
                  {workflow.tags && workflow.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {workflow.tags.slice(0, 4).map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-white/5 text-gray-400 border-white/10"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{workflow.metrics?.views || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      <span>{workflow.nodes?.length || 0} steps</span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Button
                    variant="ghost"
                    className="w-full justify-between group-hover:bg-purple-500/10 group-hover:text-purple-400"
                    onClick={() => setSelectedWorkflow(workflow)}
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredWorkflows.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No workflows in this category yet.</p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20">
            <Users className="w-12 h-12 mx-auto mb-4 text-purple-400" />
            <h3 className="text-2xl mb-2">
              Need a Custom Workflow?
            </h3>
            <p className="text-gray-400 mb-6">
              We'll build a tailored automation solution for your business
            </p>
            <Button
              onClick={() => {
                const contactSection = document.getElementById("contact");
                contactSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              size="lg"
            >
              Request Custom Workflow
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Workflow Detail Modal */}
      {selectedWorkflow && (
        <WorkflowDetailModal
          workflow={selectedWorkflow}
          isOpen={!!selectedWorkflow}
          onClose={() => setSelectedWorkflow(null)}
        />
      )}
    </section>
  );
}