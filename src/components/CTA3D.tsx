import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { api } from "../utils/api";
import { toast } from "sonner@2.0.3";

export function CTA3D() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      await api.subscribeNewsletter({ email });
      toast.success("Successfully subscribed! We'll be in touch soon.");
      setEmail("");
    } catch (error: any) {
      toast.error(error.message || "Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-4 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          className="relative overflow-hidden"
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl" />
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                               radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Content */}
          <div className="relative z-10 p-8 lg:p-16 text-center text-white">
            <motion.h2
              className="text-5xl lg:text-6xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Ready to Transform Your Business?
            </motion.h2>

            <motion.p
              className="text-xl opacity-90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join hundreds of companies already leveraging AI automation to scale
              faster and work smarter. Let's discuss how we can help you.
            </motion.p>

            <motion.div
              className="max-w-md mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="bg-white/90 backdrop-blur-xl text-black border-0 h-12"
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="gap-2 whitespace-nowrap bg-black hover:bg-black/80 h-12"
                  >
                    {loading ? "Subscribing..." : "Get Started"} <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </form>
              <p className="text-sm opacity-75 mt-4">
                No credit card required. Get a free consultation.
              </p>
            </motion.div>

            {/* 3D Floating Stats */}
            <motion.div
              className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                { value: "2 weeks", label: "Average Setup" },
                { value: "10x", label: "ROI Increase" },
                { value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
                  style={{ transformStyle: "preserve-3d" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{
                    scale: 1.1,
                    rotateY: 10,
                    z: 30,
                  }}
                >
                  <div className="text-4xl mb-2">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}