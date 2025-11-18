import { CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Features() {
  const features = [
    "Custom AI models trained on your business data",
    "Seamless integration with existing systems",
    "Real-time analytics and performance tracking",
    "Scalable solutions that grow with your business",
    "Enterprise-grade security and compliance",
    "Dedicated support and continuous optimization",
  ];

  return (
    <section id="features" className="py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-3xl blur-3xl"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1759395162739-84190996783c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbWF0aW9uJTIwcm9ib3RpY3MlMjBmdXR1cmV8ZW58MXx8fHwxNzYzMzA2NzMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Automation Technology"
              className="relative rounded-3xl shadow-2xl w-full h-auto"
            />
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <h2 className="text-4xl">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AstrameAI
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground">
              We combine cutting-edge AI technology with deep industry expertise 
              to deliver automation solutions that drive real results.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
