import { Card, CardContent } from "./ui/card";
import { Target, Users, Lightbulb, TrendingUp } from "lucide-react";

export function About() {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "Empowering businesses through intelligent automation",
    },
    {
      icon: Users,
      title: "Client-Focused",
      description: "Your success is our primary objective",
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "Leveraging the latest AI advancements",
    },
    {
      icon: TrendingUp,
      title: "Results-Oriented",
      description: "Measurable impact on your bottom line",
    },
  ];

  return (
    <section id="about" className="py-20 px-4 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">About AstrameAI</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're a team of AI specialists, engineers, and business strategists dedicated 
            to transforming how companies operate through intelligent automation. Our mission 
            is to make advanced AI technology accessible and impactful for businesses of all sizes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
