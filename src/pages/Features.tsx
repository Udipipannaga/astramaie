import { motion } from "motion/react";
import { 
  Brain, Workflow, Zap, Shield, TrendingUp, Settings, 
  Code, Globe, Lock, Users, BarChart3, Boxes,
  Home, Sparkles, Check, ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export function Features() {
  const goHome = () => {
    if ((window as any).navigate) {
      (window as any).navigate('/');
    } else {
      window.location.href = '/';
    }
  };

  const featureCategories = [
    {
      id: "automation",
      label: "Automation",
      icon: Workflow,
      features: [
        {
          icon: Brain,
          title: "Intelligent Workflows",
          description: "AI-powered decision making that adapts to your business logic",
          benefits: [
            "Self-learning algorithms",
            "Context-aware processing",
            "Predictive automation",
            "Smart error handling"
          ]
        },
        {
          icon: Zap,
          title: "Lightning Fast",
          description: "Process thousands of tasks per second with minimal latency",
          benefits: [
            "Sub-100ms response times",
            "Parallel processing",
            "Auto-scaling infrastructure",
            "CDN-powered delivery"
          ]
        },
        {
          icon: Settings,
          title: "Custom Logic Builder",
          description: "Visual workflow designer with drag-and-drop simplicity",
          benefits: [
            "No-code interface",
            "Conditional branching",
            "Loop support",
            "Custom functions"
          ]
        }
      ]
    },
    {
      id: "integration",
      label: "Integration",
      icon: Boxes,
      features: [
        {
          icon: Code,
          title: "REST API",
          description: "Comprehensive API for seamless integration with any system",
          benefits: [
            "RESTful endpoints",
            "JSON/XML support",
            "Rate limiting",
            "API versioning"
          ]
        },
        {
          icon: Globe,
          title: "Webhooks",
          description: "Real-time event notifications to your applications",
          benefits: [
            "Custom event triggers",
            "Retry mechanisms",
            "Payload customization",
            "Signature verification"
          ]
        },
        {
          icon: Boxes,
          title: "Pre-built Connectors",
          description: "Ready-to-use integrations with 100+ popular platforms",
          benefits: [
            "One-click setup",
            "OAuth support",
            "Auto-sync",
            "Custom mappings"
          ]
        }
      ]
    },
    {
      id: "security",
      label: "Security",
      icon: Shield,
      features: [
        {
          icon: Lock,
          title: "Enterprise Encryption",
          description: "Bank-level security for all your sensitive data",
          benefits: [
            "AES-256 encryption",
            "TLS 1.3 in transit",
            "End-to-end security",
            "Zero-knowledge architecture"
          ]
        },
        {
          icon: Shield,
          title: "Compliance",
          description: "Meet regulatory requirements with built-in compliance",
          benefits: [
            "SOC 2 Type II certified",
            "GDPR compliant",
            "HIPAA ready",
            "ISO 27001"
          ]
        },
        {
          icon: Users,
          title: "Access Control",
          description: "Granular permissions and role-based access",
          benefits: [
            "Role-based permissions",
            "SSO integration",
            "2FA/MFA support",
            "Activity monitoring"
          ]
        }
      ]
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      features: [
        {
          icon: TrendingUp,
          title: "Real-time Metrics",
          description: "Monitor performance with live dashboards",
          benefits: [
            "Custom dashboards",
            "Real-time updates",
            "Anomaly detection",
            "Trend analysis"
          ]
        },
        {
          icon: BarChart3,
          title: "Advanced Reporting",
          description: "Generate comprehensive reports with actionable insights",
          benefits: [
            "Scheduled reports",
            "Export to PDF/CSV",
            "Custom metrics",
            "Data visualization"
          ]
        },
        {
          icon: Brain,
          title: "AI-Powered Insights",
          description: "Get intelligent recommendations based on your data",
          benefits: [
            "Pattern recognition",
            "Optimization suggestions",
            "Predictive analytics",
            "Automated alerts"
          ]
        }
      ]
    }
  ];

  const highlights = [
    {
      stat: "99.99%",
      label: "Uptime SLA",
      description: "Industry-leading reliability"
    },
    {
      stat: "< 100ms",
      label: "Response Time",
      description: "Lightning-fast processing"
    },
    {
      stat: "100+",
      label: "Integrations",
      description: "Connect anything"
    },
    {
      stat: "24/7",
      label: "Support",
      description: "Always here to help"
    }
  ];

  const comparisonFeatures = [
    { feature: "Custom AI Workflows", astramaie: true, others: false },
    { feature: "No Template Limitations", astramaie: true, others: false },
    { feature: "Real-time Processing", astramaie: true, others: true },
    { feature: "Advanced Analytics", astramaie: true, others: false },
    { feature: "Enterprise Security", astramaie: true, others: true },
    { feature: "Unlimited Integrations", astramaie: true, others: false },
    { feature: "White-glove Support", astramaie: true, others: false },
    { feature: "Custom Development", astramaie: true, others: false }
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
            <span className="text-sm text-purple-300">Powerful Features</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Feature-Rich Platform
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to automate, optimize, and scale your business operations
          </p>
        </motion.div>

        {/* Highlights */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-purple-500/30 transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {highlight.stat}
                  </div>
                  <div className="text-white mb-1">{highlight.label}</div>
                  <div className="text-sm text-gray-400">{highlight.description}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Categories Tabs */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs defaultValue="automation" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-white/5 border border-white/10 mb-8">
              {featureCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600"
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {featureCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid md:grid-cols-3 gap-6">
                  {category.features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-purple-500/30 transition-all duration-300 h-full">
                        <CardHeader>
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center mb-4">
                            <feature.icon className="w-6 h-6 text-purple-400" />
                          </div>
                          <CardTitle className="text-white">{feature.title}</CardTitle>
                          <CardDescription className="text-gray-400">
                            {feature.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {feature.benefits.map((benefit) => (
                              <li key={benefit} className="flex items-start gap-2 text-gray-300 text-sm">
                                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl text-white mb-4">Why Choose Astramaie?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              See how we compare to traditional automation platforms
            </p>
          </div>

          <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-white">Feature</th>
                      <th className="text-center p-4">
                        <div className="text-white mb-1">Astramaie</div>
                        <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300">
                          Premium
                        </Badge>
                      </th>
                      <th className="text-center p-4 text-gray-400">Other Platforms</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((item, index) => (
                      <tr key={item.feature} className="border-b border-white/5">
                        <td className="p-4 text-gray-300">{item.feature}</td>
                        <td className="p-4 text-center">
                          {item.astramaie ? (
                            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 border border-green-500/30">
                              <Check className="w-4 h-4 text-green-400" />
                            </div>
                          ) : (
                            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30">
                              <span className="text-red-400 text-xs">✕</span>
                            </div>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {item.others ? (
                            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 border border-green-500/30">
                              <Check className="w-4 h-4 text-green-400" />
                            </div>
                          ) : (
                            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30">
                              <span className="text-red-400 text-xs">✕</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
            <CardContent className="relative p-12 text-center">
              <h3 className="text-3xl text-white mb-4">
                Experience the Full Power
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Start automating your workflows today with all features included
              </p>
              
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={() => {
                  if ((window as any).navigate) {
                    (window as any).navigate('/contact');
                  }
                }}
              >
                Get Started Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}