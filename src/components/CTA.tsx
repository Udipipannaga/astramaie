import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section id="contact" className="py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 lg:p-16 text-center text-white">
          <h2 className="text-4xl lg:text-5xl mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies already leveraging AI automation to scale faster 
            and work smarter. Let's discuss how we can help you.
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-black border-0"
              />
              <Button size="lg" variant="secondary" className="gap-2 whitespace-nowrap">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-4">
              No credit card required. Get a free consultation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/20">
            <div>
              <div className="text-3xl mb-2">10x</div>
              <div className="opacity-90">Efficiency Boost</div>
            </div>
            <div>
              <div className="text-3xl mb-2">70%</div>
              <div className="opacity-90">Cost Reduction</div>
            </div>
            <div>
              <div className="text-3xl mb-2">2 weeks</div>
              <div className="opacity-90">Average Setup Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
