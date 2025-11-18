import { motion, AnimatePresence } from "motion/react";
import { X, Check, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    icon: any;
    title: string;
    description: string;
    color: string;
  } | null;
}

const serviceDetails: Record<string, {
  fullDescription: string;
  features: string[];
  useCases: string[];
  benefits: string[];
  technologies: string[];
}> = {
  "AI Chatbots": {
    fullDescription: "Build intelligent conversational AI that understands context, handles complex queries, and provides 24/7 customer support. Our chatbots use advanced NLP to deliver human-like interactions.",
    features: [
      "Natural Language Understanding (NLU)",
      "Multi-language support",
      "Context-aware responses",
      "Sentiment analysis",
      "Integration with CRM systems",
      "Custom training on your data",
      "Voice and text capabilities",
      "Escalation to human agents"
    ],
    useCases: [
      "Customer support automation",
      "Lead qualification",
      "Appointment scheduling",
      "FAQ handling",
      "Order tracking",
      "Product recommendations"
    ],
    benefits: [
      "Reduce support costs by 60%",
      "24/7 availability",
      "Instant response times",
      "Handle unlimited conversations",
      "Consistent service quality",
      "Multilingual support"
    ],
    technologies: ["GPT-4", "Claude", "Dialogflow", "Rasa", "LangChain"]
  },
  "Process Automation": {
    fullDescription: "Streamline repetitive business processes with intelligent automation. From data entry to complex workflows, we help you eliminate manual tasks and focus on strategic work.",
    features: [
      "Workflow orchestration",
      "Task scheduling",
      "Error handling & retries",
      "Email automation",
      "Document processing",
      "Data validation",
      "Conditional logic",
      "Multi-system integration"
    ],
    useCases: [
      "Invoice processing",
      "Employee onboarding",
      "Report generation",
      "Data migration",
      "Quality assurance checks",
      "Inventory management"
    ],
    benefits: [
      "Save 15-20 hours per week",
      "Reduce human error by 95%",
      "Faster processing times",
      "Lower operational costs",
      "Scalable automation",
      "Audit trail for compliance"
    ],
    technologies: ["Zapier", "Make.com", "n8n", "Power Automate", "Python"]
  },
  "Machine Learning": {
    fullDescription: "Custom ML models trained on your business data to make intelligent predictions, automate decisions, and uncover hidden patterns. From predictive analytics to computer vision.",
    features: [
      "Custom model development",
      "Predictive analytics",
      "Classification & regression",
      "Time series forecasting",
      "Anomaly detection",
      "Recommendation engines",
      "Image recognition",
      "Model optimization"
    ],
    useCases: [
      "Sales forecasting",
      "Churn prediction",
      "Fraud detection",
      "Quality control",
      "Price optimization",
      "Customer segmentation"
    ],
    benefits: [
      "Data-driven decisions",
      "Predict trends accurately",
      "Identify risks early",
      "Personalize experiences",
      "Optimize pricing",
      "Reduce waste"
    ],
    technologies: ["TensorFlow", "PyTorch", "scikit-learn", "XGBoost", "Keras"]
  },
  "Smart Communication": {
    fullDescription: "Automate your email workflows, meeting scheduling, and team communications with AI-powered tools that understand context and prioritize intelligently.",
    features: [
      "Email response automation",
      "Smart scheduling",
      "Meeting transcription",
      "Follow-up reminders",
      "Priority inbox",
      "Template generation",
      "Sentiment tracking",
      "Multi-channel support"
    ],
    useCases: [
      "Email triage and routing",
      "Calendar management",
      "Customer follow-ups",
      "Internal notifications",
      "Meeting summaries",
      "Feedback collection"
    ],
    benefits: [
      "Save 5-10 hours per week",
      "Never miss important messages",
      "Faster response times",
      "Better team coordination",
      "Professional communication",
      "Reduced email overload"
    ],
    technologies: ["Gmail API", "Outlook API", "Calendly", "SendGrid", "Twilio"]
  },
  "Data Analytics": {
    fullDescription: "Transform raw data into actionable insights with AI-powered analytics, automated reporting, and interactive dashboards that help you make smarter business decisions.",
    features: [
      "Automated reporting",
      "Real-time dashboards",
      "Predictive insights",
      "Data visualization",
      "KPI tracking",
      "Anomaly detection",
      "Natural language queries",
      "Custom metrics"
    ],
    useCases: [
      "Business intelligence",
      "Performance monitoring",
      "Customer analytics",
      "Sales reporting",
      "Marketing attribution",
      "Financial analysis"
    ],
    benefits: [
      "Real-time visibility",
      "Identify opportunities faster",
      "Track what matters",
      "Spot issues early",
      "Better forecasting",
      "Data democratization"
    ],
    technologies: ["Tableau", "Power BI", "Looker", "Python", "SQL", "Apache Spark"]
  },
  "Integration Solutions": {
    fullDescription: "Connect all your business tools and platforms seamlessly. We build custom integrations that make your systems work together, eliminating data silos and manual data transfer.",
    features: [
      "API integrations",
      "Real-time sync",
      "Data transformation",
      "Webhook automation",
      "Legacy system connection",
      "Cloud platform integration",
      "Database synchronization",
      "Error handling"
    ],
    useCases: [
      "CRM to ERP sync",
      "E-commerce integration",
      "Payment processing",
      "Shipping automation",
      "Marketing tool connection",
      "Accounting software sync"
    ],
    benefits: [
      "Single source of truth",
      "Eliminate duplicate data entry",
      "Real-time updates",
      "Reduced errors",
      "Better collaboration",
      "Scalable infrastructure"
    ],
    technologies: ["REST APIs", "GraphQL", "Webhooks", "OAuth", "Middleware", "iPaaS"]
  }
};

export function ServiceDetailModal({ isOpen, onClose, service }: ServiceDetailModalProps) {
  if (!service) return null;

  const details = serviceDetails[service.title];
  if (!details) return null;

  const ServiceIcon = service.icon;

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
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-br from-gray-900 to-black border-b border-white/10 p-6 z-10">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <ServiceIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl text-white mb-2">{service.title}</h2>
                      <p className="text-gray-400">{details.fullDescription}</p>
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
              </div>

              {/* Content */}
              <div className="p-6 space-y-8">
                {/* Features */}
                <div>
                  <h3 className="text-xl text-white mb-4">Key Features</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {details.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                        <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 text-gradient bg-gradient-to-r ${service.color} text-transparent`} />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Use Cases */}
                <div>
                  <h3 className="text-xl text-white mb-4">Common Use Cases</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {details.useCases.map((useCase, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-400">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`}></div>
                        <span className="text-sm">{useCase}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl border border-purple-500/30">
                  <h3 className="text-xl text-white mb-4">Business Benefits</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {details.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-xl text-white mb-4">Technologies We Use</h3>
                  <div className="flex flex-wrap gap-2">
                    {details.technologies.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className={`border-purple-500/30 bg-gradient-to-r ${service.color} bg-clip-text text-transparent border`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => {
                        onClose();
                        if ((window as any).navigate) {
                          (window as any).navigate('/contact');
                        }
                      }}
                      className={`flex-1 bg-gradient-to-r ${service.color} hover:opacity-90`}
                      size="lg"
                    >
                      Get Started with {service.title}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                      onClick={() => {
                        onClose();
                        if ((window as any).navigate) {
                          (window as any).navigate('/case-studies');
                        }
                      }}
                      variant="outline"
                      className="border-white/20 hover:bg-white/10"
                      size="lg"
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
