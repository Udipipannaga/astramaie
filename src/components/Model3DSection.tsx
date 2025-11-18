import { motion } from "motion/react";
import { Model3DViewer } from "./Model3DViewer";

export function Model3DSection() {
  return (
    <section id="model" className="relative py-32 px-4 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl lg:text-6xl mb-6">
            Experience{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Intelligence
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our interactive AI architecture visualization
          </p>
        </motion.div>

        <motion.div
          className="relative h-[600px] bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Glow Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

          <Model3DViewer />
        </motion.div>

        {/* Feature Points */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mt-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {[
            {
              title: "Neural Processing",
              description: "Advanced deep learning algorithms that adapt and evolve",
            },
            {
              title: "Real-time Analysis",
              description: "Process and analyze data streams instantaneously",
            },
            {
              title: "Scalable Architecture",
              description: "Grow seamlessly from startup to enterprise scale",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              whileHover={{ scale: 1.05, borderColor: "rgba(59, 130, 246, 0.5)" }}
            >
              <h3 className="text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}