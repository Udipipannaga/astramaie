import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-blue-600">AI-Powered Solutions</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl">
              Automate Your Business with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Intelligence
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Transform your operations with cutting-edge AI automation solutions. 
              Streamline workflows, reduce costs, and scale your business effortlessly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2">
                Start Your Journey <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl">500+</div>
                <div className="text-sm text-muted-foreground">Projects Automated</div>
              </div>
              <div>
                <div className="text-3xl">98%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl">24/7</div>
                <div className="text-sm text-muted-foreground">AI Support</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1763110305836-17790330be78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjBuZXR3b3JrfGVufDF8fHx8MTc2MzMwNTc1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="AI Technology"
              className="relative rounded-3xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
