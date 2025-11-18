import { motion } from "motion/react";
import { 
  Book, Code, Zap, Shield, Workflow, Settings, 
  FileCode, Server, Database, Key, Webhook,
  Home, Search, ChevronRight, Sparkles, ExternalLink
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useState } from "react";

export function Documentation() {
  const [searchQuery, setSearchQuery] = useState("");

  const goHome = () => {
    if ((window as any).navigate) {
      (window as any).navigate('/');
    } else {
      window.location.href = '/';
    }
  };

  const docSections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Zap,
      description: "Quick start guides and tutorials",
      articles: [
        { title: "Installation & Setup", time: "5 min", difficulty: "Beginner" },
        { title: "Your First Workflow", time: "10 min", difficulty: "Beginner" },
        { title: "Understanding the Dashboard", time: "8 min", difficulty: "Beginner" },
        { title: "Basic Concepts", time: "12 min", difficulty: "Beginner" }
      ]
    },
    {
      id: "api",
      title: "API Reference",
      icon: Code,
      description: "Complete API documentation",
      articles: [
        { title: "Authentication", time: "15 min", difficulty: "Intermediate" },
        { title: "REST API Endpoints", time: "20 min", difficulty: "Intermediate" },
        { title: "Webhooks", time: "18 min", difficulty: "Intermediate" },
        { title: "Rate Limiting", time: "10 min", difficulty: "Advanced" },
        { title: "Error Handling", time: "12 min", difficulty: "Intermediate" }
      ]
    },
    {
      id: "workflows",
      title: "Workflows",
      icon: Workflow,
      description: "Build and manage workflows",
      articles: [
        { title: "Workflow Builder Guide", time: "25 min", difficulty: "Beginner" },
        { title: "Advanced Logic", time: "30 min", difficulty: "Advanced" },
        { title: "Conditional Branching", time: "20 min", difficulty: "Intermediate" },
        { title: "Error Handling & Retries", time: "15 min", difficulty: "Intermediate" },
        { title: "Testing Workflows", time: "18 min", difficulty: "Intermediate" }
      ]
    },
    {
      id: "integrations",
      title: "Integrations",
      icon: Settings,
      description: "Connect with external services",
      articles: [
        { title: "Available Integrations", time: "10 min", difficulty: "Beginner" },
        { title: "OAuth Configuration", time: "20 min", difficulty: "Intermediate" },
        { title: "Custom Integrations", time: "35 min", difficulty: "Advanced" },
        { title: "Data Mapping", time: "15 min", difficulty: "Intermediate" }
      ]
    },
    {
      id: "security",
      title: "Security",
      icon: Shield,
      description: "Security best practices",
      articles: [
        { title: "Security Overview", time: "10 min", difficulty: "Beginner" },
        { title: "Access Control", time: "15 min", difficulty: "Intermediate" },
        { title: "Encryption Standards", time: "12 min", difficulty: "Advanced" },
        { title: "Compliance", time: "20 min", difficulty: "Advanced" }
      ]
    }
  ];

  const quickLinks = [
    { icon: FileCode, title: "SDKs", description: "Official libraries for Python, Node.js, and more" },
    { icon: Server, title: "Self-Hosting", description: "Deploy on your own infrastructure" },
    { icon: Database, title: "Data Models", description: "Schema and data structure reference" },
    { icon: Key, title: "API Keys", description: "Managing authentication tokens" },
    { icon: Webhook, title: "Event System", description: "Real-time webhooks and notifications" }
  ];

  const codeExamples = {
    authentication: `// Initialize the Astramaie client
import { AstramaieClient } from '@astramaie/sdk';

const client = new AstramaieClient({
  apiKey: process.env.ASTRAMAIE_API_KEY,
  environment: 'production'
});

// Verify authentication
const user = await client.auth.verify();
console.log('Authenticated as:', user.email);`,

    workflow: `// Create a new workflow
const workflow = await client.workflows.create({
  name: 'Customer Onboarding',
  description: 'Automated customer onboarding process',
  trigger: {
    type: 'webhook',
    path: '/onboard'
  },
  steps: [
    {
      type: 'email',
      template: 'welcome_email',
      to: '{{customer.email}}'
    },
    {
      type: 'crm',
      action: 'create_contact',
      data: {
        name: '{{customer.name}}',
        email: '{{customer.email}}'
      }
    }
  ]
});

console.log('Workflow created:', workflow.id);`,

    webhook: `// Set up a webhook listener
const webhook = await client.webhooks.create({
  url: 'https://your-domain.com/webhooks',
  events: ['workflow.completed', 'workflow.failed'],
  secret: 'your-webhook-secret'
});

// Verify webhook signature
const isValid = client.webhooks.verify(
  payload, 
  signature, 
  secret
);

if (isValid) {
  // Process webhook payload
  console.log('Event:', payload.event);
  console.log('Data:', payload.data);
}`
  };

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
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Developer Resources</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Documentation
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Everything you need to build powerful AI automation workflows
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-2xl"
              />
            </div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((link, index) => (
              <Card key={link.title} className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                      <link.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white mb-1 group-hover:text-purple-400 transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{link.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Documentation Sections */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl text-white mb-8">Documentation</h2>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {docSections.map((section, index) => (
              <Card key={section.id} className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-purple-500/30 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <CardTitle className="text-white">{section.title}</CardTitle>
                      <CardDescription className="text-gray-400 text-sm">
                        {section.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.articles.map((article) => (
                      <li key={article.title} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                        <span className="text-gray-300 group-hover:text-white transition-colors flex-1">
                          {article.title}
                        </span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-white/10 text-gray-400 text-xs">
                            {article.time}
                          </Badge>
                          <Badge className={
                            article.difficulty === 'Beginner' 
                              ? 'bg-green-500/20 border-green-500/30 text-green-300 text-xs'
                              : article.difficulty === 'Intermediate'
                              ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300 text-xs'
                              : 'bg-red-500/20 border-red-500/30 text-red-300 text-xs'
                          }>
                            {article.difficulty}
                          </Badge>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Code Examples */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl text-white mb-8">Code Examples</h2>
          
          <Tabs defaultValue="authentication" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10 mb-6">
              <TabsTrigger value="authentication" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600">
                Authentication
              </TabsTrigger>
              <TabsTrigger value="workflow" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600">
                Create Workflow
              </TabsTrigger>
              <TabsTrigger value="webhook" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600">
                Webhooks
              </TabsTrigger>
            </TabsList>

            {Object.entries(codeExamples).map(([key, code]) => (
              <TabsContent key={key} value={key}>
                <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border-white/10">
                  <CardContent className="p-0">
                    <pre className="p-6 overflow-x-auto">
                      <code className="text-sm text-gray-300 font-mono">
                        {code}
                      </code>
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl text-white mb-8">Additional Resources</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6">
                <Book className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-white mb-2 group-hover:text-purple-400 transition-colors">
                  Tutorials
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Step-by-step guides for common use cases
                </p>
                <Button variant="ghost" className="text-purple-400 p-0 h-auto hover:bg-transparent">
                  View Tutorials
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6">
                <Code className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-white mb-2 group-hover:text-purple-400 transition-colors">
                  Examples Repository
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Browse our collection of sample code
                </p>
                <Button variant="ghost" className="text-purple-400 p-0 h-auto hover:bg-transparent">
                  View on GitHub
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6">
                <Settings className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-white mb-2 group-hover:text-purple-400 transition-colors">
                  Changelog
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Latest updates and release notes
                </p>
                <Button variant="ghost" className="text-purple-400 p-0 h-auto hover:bg-transparent">
                  View Changelog
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
            <CardContent className="relative p-12 text-center">
              <h3 className="text-3xl text-white mb-4">
                Need Help?
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Our support team is available 24/7 to help with any questions
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
                  Contact Support
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white/10 text-white"
                  onClick={() => {
                    if ((window as any).navigate) {
                      (window as any).navigate('/community');
                    }
                  }}
                >
                  Join Community
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}