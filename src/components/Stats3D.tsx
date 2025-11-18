import { motion } from "motion/react";
import { Target, Users, Lightbulb, TrendingUp } from "lucide-react";

export function Stats3D() {
  const stats = [
    {
      icon: Target,
      value: "10x",
      label: "Efficiency Boost",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      value: "500+",
      label: "Happy Clients",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Lightbulb,
      value: "1000+",
      label: "AI Solutions",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: TrendingUp,
      value: "70%",
      label: "Cost Reduction",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section id="about" className="relative py-32 px-4 lg:px-8">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl lg:text-6xl mb-6">
            Results That{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Matter
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Trusted by leading companies worldwide to transform their operations with AI
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative group"
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.1,
                rotateY: 10,
                rotateX: 10,
                z: 50,
              }}
            >
              {/* Glow Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-300 rounded-3xl`}
              />

              {/* Card */}
              <motion.div
                className="relative bg-gradient-to-br from-white/10 to-white/0 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center h-full"
                style={{ transform: "translateZ(30px)" }}
              >
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.5,
                  }}
                >
                  <stat.icon className="w-10 h-10 text-white" />
                </motion.div>

                <motion.div
                  className="text-5xl mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}