import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Bot, Workflow, Brain, MessageSquare, BarChart3, Zap } from "lucide-react";

export function Services() {
  const services = [
    {
      icon: Bot,
      title: "AI Chatbots",
      description: "Intelligent conversational AI that handles customer inquiries 24/7 with natural language processing.",
    },
    {
      icon: Workflow,
      title: "Process Automation",
      description: "Streamline repetitive tasks and workflows to save time and reduce operational costs.",
    },
    {
      icon: Brain,
      title: "Machine Learning",
      description: "Custom ML models that learn from your data to make intelligent predictions and decisions.",
    },
    {
      icon: MessageSquare,
      title: "Smart Communication",
      description: "Automated email responses, scheduling, and communication management powered by AI.",
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description: "Transform raw data into actionable insights with AI-powered analytics and reporting.",
    },
    {
      icon: Zap,
      title: "Integration Solutions",
      description: "Seamlessly connect your existing tools and platforms with AI automation workflows.",
    },
  ];

  return (
    <section id="services" className="py-20 px-4 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">Our AI Automation Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI solutions tailored to your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-2 hover:border-blue-500/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
