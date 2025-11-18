import { motion, useScroll, useTransform } from "motion/react";
import { Bot, Workflow, Brain, MessageSquare, BarChart3, Zap } from "lucide-react";
import { useRef, useState } from "react";
import { ServiceDetailModal } from "./ServiceDetailModal";

export function Services3D() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const services = [
    {
      icon: Bot,
      title: "AI Chatbots",
      description: "Intelligent conversational AI that handles customer inquiries 24/7 with natural language processing.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Workflow,
      title: "Process Automation",
      description: "Streamline repetitive tasks and workflows to save time and reduce operational costs.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Brain,
      title: "Machine Learning",
      description: "Custom ML models that learn from your data to make intelligent predictions and decisions.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: MessageSquare,
      title: "Smart Communication",
      description: "Automated email responses, scheduling, and communication management powered by AI.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description: "Transform raw data into actionable insights with AI-powered analytics and reporting.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: Zap,
      title: "Integration Solutions",
      description: "Seamlessly connect your existing tools and platforms with AI automation workflows.",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <section id="services" ref={ref} className="relative py-32 px-4 lg:px-8">
      <motion.div style={{ y }} className="container mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl lg:text-6xl mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Services
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive AI solutions tailored to your business needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative"
              style={{ transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                z: 50,
              }}
              onClick={() => {
                setSelectedService(service);
                setModalOpen(true);
              }}
            >
              {/* Glow Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 rounded-2xl`}
              />

              {/* Card */}
              <div
                className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full"
                style={{ transform: "translateZ(20px)" }}
              >
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-2xl mb-4">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>

                {/* Hover Arrow */}
                <motion.div
                  className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <div className={`w-10 h-10 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center`}>
                    <span className="text-white">→</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}