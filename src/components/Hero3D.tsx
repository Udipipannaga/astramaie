import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { AstrameLogo } from "./AstrameLogo";
import { DemoVideoModal } from "./DemoVideoModal";

export function Hero3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 lg:px-8 pt-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating Grid */}
      <div className="absolute inset-0" style={{ perspective: "1000px" }}>
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateX: mousePosition.y * 0.5,
            rotateY: mousePosition.x * 0.5,
          }}
          transition={{ type: "spring", stiffness: 50 }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Logo Display */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <AstrameLogo className="w-32 h-32 drop-shadow-2xl" animated={false} />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 mb-6"
              whileHover={{ scale: 1.05 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400">AI-Powered Solutions</span>
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-6xl lg:text-8xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block mb-4">Transform</span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Your Business
            </span>
            <span className="block mt-4">with AI</span>
          </motion.h1>

          <motion.p
            className="text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Harness the power of artificial intelligence to automate workflows,
            optimize operations, and scale your business beyond limits.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg px-8 py-6"
                onClick={() => {
                  if ((window as any).navigate) {
                    (window as any).navigate("/contact");
                  }
                }}
              >
                Start Your Journey <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 hover:bg-white/10 text-lg px-8 py-6"
                onClick={() => setDemoModalOpen(true)}
              >
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* 3D Floating Cards */}
          <motion.div
            className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { value: "500+", label: "Projects" },
              { value: "98%", label: "Satisfaction" },
              { value: "24/7", label: "AI Support" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="relative"
                style={{ transformStyle: "preserve-3d" }}
                animate={{
                  rotateY: [0, 5, 0, -5, 0],
                  rotateX: [0, -5, 0, 5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
                whileHover={{ scale: 1.1, z: 50 }}
              >
                <div
                  className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <div className="text-3xl lg:text-4xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Demo Video Modal */}
      <DemoVideoModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </section>
  );
}