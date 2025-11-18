import { motion } from "motion/react";
import { Book, MessageCircle, Search, FileText, Video, Zap, ArrowRight, CheckCircle, Home } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useState } from "react";

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");

  const goHome = () => {
    if ((window as any).navigate) {
      (window as any).navigate('/');
    } else {
      window.location.href = '/';
    }
  };

  const categories = [
    {
      icon: Zap,
      title: "Getting Started",
      description: "Quick start guides and tutorials",
      color: "from-blue-500 to-cyan-500",
      articles: [
        "What is AI Automation?",
        "How to Request Your First Workflow",
        "Understanding Workflow Components",
        "Best Practices for AI Implementation",
      ],
    },
    {
      icon: Book,
      title: "Workflow Management",
      description: "Learn to manage and optimize workflows",
      color: "from-purple-500 to-pink-500",
      articles: [
        "Viewing Your Published Workflows",
        "How Workflows Are Created",
        "Custom Workflow Requirements",
        "Integration with Existing Systems",
      ],
    },
    {
      icon: MessageCircle,
      title: "Support & Contact",
      description: "Get help from our team",
      color: "from-green-500 to-emerald-500",
      articles: [
        "How to Contact Support",
        "Response Time Expectations",
        "Reporting Technical Issues",
        "Request Workflow Modifications",
      ],
    },
    {
      icon: FileText,
      title: "Billing & Plans",
      description: "Understand pricing and payments",
      color: "from-orange-500 to-red-500",
      articles: [
        "Custom Pricing Model",
        "Payment Methods",
        "Invoice Management",
        "Refund Policy",
      ],
    },
  ];

  const popularArticles = [
    {
      title: "How Does Astramaie's Custom Workflow Model Work?",
      category: "Getting Started",
      readTime: "5 min",
      views: "2.3k",
    },
    {
      title: "What AI Technologies Does Astramaie Use?",
      category: "Technical",
      readTime: "8 min",
      views: "1.8k",
    },
    {
      title: "How to Request a Custom AI Automation Workflow",
      category: "Workflow Management",
      readTime: "6 min",
      views: "1.5k",
    },
    {
      title: "Integration Options with Your Existing Tools",
      category: "Integration",
      readTime: "10 min",
      views: "1.2k",
    },
  ];

  const faqs = [
    {
      question: "What is Astramaie?",
      answer: "Astramaie is an AI automation agency that creates custom workflows tailored to your business needs. We don't offer pre-built templates; instead, we build automation solutions from scratch based on your specific requirements.",
    },
    {
      question: "How do I get started?",
      answer: "Simply contact us through our website with your automation needs. Our team will analyze your requirements and create a custom workflow specifically designed for your business processes.",
    },
    {
      question: "Do you offer pre-built workflow templates?",
      answer: "No. We believe every business is unique, so we create custom workflows on-demand when clients request them. This ensures you get exactly what you need, not a one-size-fits-all solution.",
    },
    {
      question: "How long does it take to build a custom workflow?",
      answer: "Development time varies based on complexity. Simple workflows can be ready in 1-2 weeks, while complex enterprise solutions may take 4-8 weeks. We'll provide a timeline estimate during our initial consultation.",
    },
    {
      question: "What AI technologies do you use?",
      answer: "We leverage cutting-edge AI technologies including GPT models, custom machine learning algorithms, natural language processing, computer vision, and various automation frameworks to build robust solutions.",
    },
    {
      question: "Can workflows integrate with my existing tools?",
      answer: "Yes! Our workflows can integrate with most popular business tools including CRMs, project management software, communication platforms, databases, and custom APIs.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-purple-950/20 to-black pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
              Help Center
            </Badge>
            <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              How Can We Help You?
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Find answers, guides, and resources to make the most of Astramaie's AI automation solutions
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for help articles, guides, and FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 bg-white/5 border-white/10 text-white placeholder:text-gray-500 text-lg"
              />
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer group"
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} bg-opacity-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.articles.map((article, idx) => (
                      <li key={idx} className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                        <ArrowRight className="w-3 h-3" />
                        {article}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Popular Articles */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Popular Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {popularArticles.map((article, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                        {article.category}
                      </Badge>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span>{article.readTime}</span>
                        <span>•</span>
                        <span>{article.views} views</span>
                      </div>
                    </div>
                    <CardTitle className="text-white hover:text-blue-400 transition-colors">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10"
                >
                  <CardHeader>
                    <CardTitle className="text-white text-lg flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Contact Support */}
          <motion.div
            className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="text-2xl text-white mb-4">
              Still Need Help?
            </h3>
            <p className="text-gray-300 mb-6">
              Our support team is available 24/7 to assist you
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => {
                  if ((window as any).navigate) {
                    (window as any).navigate('/contact');
                  }
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
              <Button 
                variant="outline" 
                className="border-white/10 hover:bg-white/5"
                onClick={() => {
                  if ((window as any).navigate) {
                    (window as any).navigate('/community');
                  }
                }}
              >
                Join Community
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}