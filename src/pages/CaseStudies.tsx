import { motion } from "motion/react";
import { TrendingUp, Users, Clock, DollarSign, Target, Award, Home, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

export function CaseStudies() {
  const goHome = () => {
    if ((window as any).navigate) {
      (window as any).navigate('/');
    } else {
      window.location.href = '/';
    }
  };

  const caseStudies = [
    {
      company: "TechFlow Solutions",
      industry: "SaaS",
      size: "25 employees",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&q=80",
      challenge: "Small customer support team was struggling with 100+ daily tickets, leading to slow response times and declining satisfaction.",
      solution: "Implemented AI-powered ticket triage and automated responses for common queries, integrated with their Zendesk setup.",
      results: [
        { metric: "70%", label: "Faster Response Time", icon: Clock },
        { metric: "45%", label: "Ticket Reduction", icon: TrendingUp },
        { metric: "$45K", label: "Annual Savings", icon: DollarSign },
        { metric: "92%", label: "CSAT Score", icon: Award }
      ],
      testimonial: "Working with Astramaie has been incredible. They built exactly what we needed, and our support team can finally focus on complex issues instead of repetitive questions.",
      author: "Sarah Chen, Co-Founder & Head of Support",
      badge: "Partner Associate"
    },
    {
      company: "GreenLeaf Organics",
      industry: "E-commerce",
      size: "12 employees",
      logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80",
      challenge: "Manual order processing and inventory tracking across multiple sales channels was time-consuming and error-prone.",
      solution: "Custom workflow automating order processing, inventory sync across platforms, and automatic reorder alerts for popular products.",
      results: [
        { metric: "80%", label: "Processing Time Saved", icon: Clock },
        { metric: "95%", label: "Inventory Accuracy", icon: Target },
        { metric: "3x", label: "Order Volume Handled", icon: TrendingUp },
        { metric: "$28K", label: "Annual Savings", icon: DollarSign }
      ],
      testimonial: "As a small team, we couldn't afford to hire more people. Astramaie's automation lets us handle triple the orders with the same team size. Game changer!",
      author: "Michael Torres, Owner",
      badge: "Partner Associate"
    },
    {
      company: "Brightside Consulting",
      industry: "Professional Services",
      size: "8 employees",
      logo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
      challenge: "Client onboarding required hours of manual data entry and document collection, delaying project starts.",
      solution: "Automated client intake workflow with smart forms, document collection, and automatic CRM updates with custom integrations.",
      results: [
        { metric: "85%", label: "Onboarding Time Saved", icon: Clock },
        { metric: "100%", label: "Data Accuracy", icon: Target },
        { metric: "2x", label: "Client Capacity", icon: Users },
        { metric: "$32K", label: "Revenue Increase", icon: TrendingUp }
      ],
      testimonial: "The team at Astramaie understood our needs perfectly. They built a custom solution that fits our workflow exactly. We're now taking on twice as many clients.",
      author: "Jennifer Park, Managing Partner",
      badge: "Partner Associate"
    }
  ];

  const smallClients = [
    { name: "Coastal Coffee Roasters", industry: "Retail", employees: "5", result: "Automated inventory management" },
    { name: "Urban Yoga Studio", industry: "Wellness", employees: "3", result: "Smart class scheduling system" },
    { name: "PetCare Plus", industry: "Pet Services", employees: "7", result: "Client booking automation" },
    { name: "NextGen Marketing", industry: "Marketing", employees: "4", result: "Campaign reporting automation" },
    { name: "FreshBite Catering", industry: "Food Service", employees: "6", result: "Order & delivery workflow" },
    { name: "BuildRight Contractors", industry: "Construction", employees: "10", result: "Project scheduling system" },
    { name: "StyleHub Boutique", industry: "Fashion", employees: "3", result: "Multi-channel inventory sync" },
    { name: "TechRepair Pro", industry: "Services", employees: "4", result: "Customer ticketing system" }
  ];

  const industries = [
    { name: "E-commerce & Retail", count: 8 },
    { name: "Professional Services", count: 6 },
    { name: "SaaS & Technology", count: 5 },
    { name: "Food & Beverage", count: 4 },
    { name: "Health & Wellness", count: 3 },
    { name: "Marketing & Creative", count: 5 }
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
            <span className="text-sm text-purple-300">Success Stories</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Case Studies
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real results from innovative companies using Astramaie to transform their operations
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { value: "11+", label: "Happy Clients" },
            { value: "$180K+", label: "Client Savings" },
            { value: "75%", label: "Avg. Efficiency Gain" },
            { value: "4.9/5", label: "Client Rating" }
          ].map((stat, index) => (
            <Card key={stat.label} className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 text-center">
              <CardContent className="p-6">
                <div className="text-3xl mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Case Studies */}
        {caseStudies.map((study, index) => (
          <motion.div
            key={study.company}
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
          >
            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-purple-500/30 transition-all duration-300 overflow-hidden">
              <div className="grid md:grid-cols-3 gap-6 p-8">
                {/* Company Info */}
                <div className="md:col-span-1">
                  <div className="w-full h-32 rounded-lg overflow-hidden mb-4">
                    <img src={study.logo} alt={study.company} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-2xl text-white mb-2">{study.company}</h3>
                  <div className="flex gap-2 flex-wrap mb-4">
                    <Badge className="bg-purple-500/20 border-purple-500/30 text-purple-300">
                      {study.industry}
                    </Badge>
                    <Badge className="bg-blue-500/20 border-blue-500/30 text-blue-300">
                      {study.size}
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm text-gray-400 mb-2">Challenge</h4>
                      <p className="text-gray-300 text-sm">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-400 mb-2">Solution</h4>
                      <p className="text-gray-300 text-sm">{study.solution}</p>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="md:col-span-2">
                  <h4 className="text-lg text-white mb-6">Results</h4>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {study.results.map((result) => (
                      <Card key={result.label} className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                              <result.icon className="w-5 h-5 text-purple-400" />
                            </div>
                            <div className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                              {result.metric}
                            </div>
                          </div>
                          <div className="text-gray-400 text-sm">{result.label}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Testimonial */}
                  <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/20">
                    <CardContent className="p-6">
                      <p className="text-gray-300 italic mb-4">"{study.testimonial}"</p>
                      <p className="text-sm text-purple-300">— {study.author}</p>
                      {study.badge && (
                        <Badge className="bg-purple-500/20 border-purple-500/30 text-purple-300 mt-2">
                          {study.badge}
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {/* Small Clients */}
        <motion.div
          className="mt-20 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl text-white mb-4">Small Clients, Big Impact</h2>
            <p className="text-gray-400 text-lg">
              Transforming operations for businesses of all sizes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {smallClients.map((client, index) => (
              <Card key={client.name} className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-purple-500/30 transition-all duration-300">
                <CardContent className="p-4 flex items-center justify-between">
                  <span className="text-white">{client.name}</span>
                  <Badge className="bg-purple-500/20 border-purple-500/30 text-purple-300">
                    {client.employees} employees
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Industries Served */}
        <motion.div
          className="mt-20 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl text-white mb-4">Industries We Serve</h2>
            <p className="text-gray-400 text-lg">
              Delivering results across diverse sectors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.map((industry, index) => (
              <Card key={industry.name} className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-purple-500/30 transition-all duration-300">
                <CardContent className="p-4 flex items-center justify-between">
                  <span className="text-white">{industry.name}</span>
                  <Badge className="bg-purple-500/20 border-purple-500/30 text-purple-300">
                    {industry.count}
                  </Badge>
                </CardContent>
              </Card>
            ))}
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
                Ready to Write Your Success Story?
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Join our growing community of businesses achieving remarkable results with AI automation
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
                Get Started Today
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}