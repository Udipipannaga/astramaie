import { motion, useScroll, useTransform } from "motion/react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { useRef } from "react";

export function Features3D() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  const features = [
    "Custom AI models trained on your business data",
    "Seamless integration with existing systems",
    "Real-time analytics and performance tracking",
    "Scalable solutions that grow with your business",
    "Enterprise-grade security and compliance",
    "Dedicated support and continuous optimization",
  ];

  return (
    <section id="features" ref={ref} className="relative py-32 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - 3D Cube Animation */}
          <motion.div
            className="relative h-[600px] flex items-center justify-center"
            style={{ perspective: "1000px" }}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative w-80 h-80"
              style={{
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
              }}
            >
              {/* Floating Elements */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    rotateY: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5,
                  }}
                >
                  <motion.div
                    className="absolute w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/20 rounded-xl"
                    style={{
                      transform: `translateZ(${i * 40}px)`,
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-blue-400" />
                    </div>
                  </motion.div>
                </motion.div>
              ))}

              {/* Center Orb */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-2xl opacity-50" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h2 className="text-5xl lg:text-6xl mb-6">
                Why Choose{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Astramaie
                </span>
              </h2>
              <p className="text-xl text-gray-400">
                We combine cutting-edge AI technology with deep industry expertise
                to deliver automation solutions that drive real results.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 group"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <motion.div
                    className="flex-shrink-0 mt-1"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle2 className="w-6 h-6 text-blue-400" />
                  </motion.div>
                  <span className="text-lg text-gray-300 group-hover:text-white transition-colors">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="pt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-shadow"
                onClick={() => {
                  if ((window as any).navigate) {
                    (window as any).navigate("/features");
                  }
                }}
              >
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}