import { motion } from "motion/react";
import { Zap, Brain, Workflow, Shield, TrendingUp, Settings, Home, Check, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

export function Product() {
  const goHome = () => {
    if ((window as any).navigate) {
      (window as any).navigate('/');
    } else {
      window.location.href = '/';
    }
  };

  const capabilities = [
    {
      icon: Brain,
      title: "Intelligent Automation",
      description: "AI-powered workflows that learn and adapt to your business processes",
      features: [
        "Natural language processing",
        "Machine learning algorithms",
        "Predictive analytics",
        "Smart decision making"
      ]
    },
    {
      icon: Workflow,
      title: "Custom Workflows",
      description: "Tailored automation solutions designed specifically for your needs",
      features: [
        "On-demand workflow creation",
        "No pre-built templates",
        "Business-specific logic",
        "Scalable architecture"
      ]
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Lightning-fast execution with instant results and feedback",
      features: [
        "Sub-second response times",
        "Concurrent processing",
        "Stream data handling",
        "Live monitoring"
      ]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and security for your sensitive data",
      features: [
        "End-to-end encryption",
        "SOC 2 Type II compliance",
        "Role-based access control",
        "Audit logging"
      ]
    },
    {
      icon: TrendingUp,
      title: "Analytics & Insights",
      description: "Comprehensive dashboards with actionable business intelligence",
      features: [
        "Real-time metrics",
        "Custom reports",
        "Performance tracking",
        "ROI measurement"
      ]
    },
    {
      icon: Settings,
      title: "Easy Integration",
      description: "Seamlessly connect with your existing tools and systems",
      features: [
        "REST API access",
        "Webhook support",
        "Pre-built connectors",
        "Custom integrations"
      ]
    }
  ];

  const platforms = [
    "Salesforce", "HubSpot", "Slack", "Microsoft Teams", "Google Workspace",
    "Shopify", "WooCommerce", "Stripe", "PayPal", "Mailchimp",
    "Zendesk", "Intercom", "Jira", "Asana", "Trello"
  ];

  const useCases = [
    {
      title: "Customer Service Automation",
      description: "Reduce response times by 80% with AI-powered support",
      impact: "Save 40+ hours/week"
    },
    {
      title: "Lead Qualification",
      description: "Automatically score and route leads to the right team",
      impact: "Increase conversions by 35%"
    },
    {
      title: "Data Processing",
      description: "Extract, transform, and analyze data at scale",
      impact: "Process 10x more data"
    },
    {
      title: "Report Generation",
      description: "Create comprehensive reports automatically",
      impact: "Save 20+ hours/month"
    },
    {
      title: "Inventory Management",
      description: "Real-time tracking and automated reordering",
      impact: "Reduce stockouts by 90%"
    },
    {
      title: "Email Automation",
      description: "Personalized campaigns at scale",
      impact: "Boost engagement by 50%"
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-950/20 via-purple-950/20 to-black pointer-events-none"></div>
      
      {/* Back to Home Button */}
      <div className="fixed top-24 left-6 z-40">
        <Button
          onClick={goHome}
          variant="outline"
          className="border-purple-500/30 bg-black/40 backdrop-blur-sm hover:bg-purple-500/20 hover:border-purple-500/50 text-white"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">AI Automation Platform</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Astramaie Product
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            AI automation platform built by a startup, designed to transform your business operations with intelligent, custom workflows
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => {
                if ((window as any).navigate) {
                  (window as any).navigate('/contact');
                }
              }}
            >
              Get in Touch
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/10 bg-white/5 hover:bg-white/10 text-white"
              onClick={() => {
                if ((window as any).navigate) {
                  (window as any).navigate('/documentation');
                }
              }}
            >
              View Documentation
            </Button>
          </div>
        </motion.div>

        {/* Core Capabilities */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl text-white mb-4">Core Capabilities</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Powerful features that make Astramaie the leading AI automation platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-purple-500/30 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center mb-4">
                      <capability.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <CardTitle className="text-white">{capability.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {capability.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {capability.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-gray-300 text-sm">
                          <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Integration Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"></div>
            <CardContent className="relative p-12">
              <div className="text-center mb-8">
                <h2 className="text-4xl text-white mb-4">Seamless Integrations</h2>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                  Connect with 100+ popular platforms and tools your business already uses
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                {platforms.map((platform) => (
                  <Badge
                    key={platform}
                    className="bg-white/10 border-white/20 text-white px-4 py-2 text-sm"
                  >
                    {platform}
                  </Badge>
                ))}
                <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300 px-4 py-2 text-sm">
                  +100 more
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl text-white mb-4">Popular Use Cases</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Real-world applications delivering measurable results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-purple-500/30 transition-all duration-300 h-full">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">{useCase.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {useCase.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-300">
                      {useCase.impact}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
            <CardContent className="relative p-12 text-center">
              <h3 className="text-3xl text-white mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Join hundreds of companies automating their workflows with Astramaie's AI-powered platform
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={() => {
                    if ((window as any).navigate) {
                      (window as any).navigate('/contact');
                    }
                  }}
                >
                  Schedule Demo
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white/10 text-white"
                  onClick={() => {
                    if ((window as any).navigate) {
                      (window as any).navigate('/documentation');
                    }
                  }}
                >
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}