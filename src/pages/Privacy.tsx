import { motion } from "motion/react";
import { Shield, Lock, Eye, UserCheck, FileText, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function Privacy() {
  const sections = [
    {
      icon: FileText,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Account Information",
          text: "When you create an account, we collect your name, email address, company name, and contact details.",
        },
        {
          subtitle: "Workflow Data",
          text: "We collect information about the custom workflows you request, including business requirements, integration preferences, and usage data.",
        },
        {
          subtitle: "Usage Analytics",
          text: "We automatically collect information about how you use our services, including workflow executions, API calls, and performance metrics.",
        },
        {
          subtitle: "Technical Data",
          text: "We collect IP addresses, browser types, device information, and other technical data to ensure service quality and security.",
        },
      ],
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Service Delivery",
          text: "We use your information to create custom AI automation workflows tailored to your specific business needs.",
        },
        {
          subtitle: "Communication",
          text: "We use your contact information to send service updates, respond to inquiries, and provide customer support.",
        },
        {
          subtitle: "Improvement",
          text: "We analyze usage data to improve our AI models, optimize performance, and develop new features.",
        },
        {
          subtitle: "Security",
          text: "We use your data to detect and prevent fraud, abuse, and security threats to our platform.",
        },
      ],
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        {
          subtitle: "Encryption",
          text: "All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.",
        },
        {
          subtitle: "Access Control",
          text: "We implement strict access controls and authentication mechanisms to protect your data from unauthorized access.",
        },
        {
          subtitle: "Regular Audits",
          text: "Our systems undergo regular security audits and penetration testing by third-party security experts.",
        },
        {
          subtitle: "Data Backup",
          text: "We maintain encrypted backups of your data with geo-redundant storage for disaster recovery.",
        },
      ],
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        {
          subtitle: "Access",
          text: "You have the right to access all personal data we hold about you at any time.",
        },
        {
          subtitle: "Correction",
          text: "You can request corrections to any inaccurate or incomplete personal information.",
        },
        {
          subtitle: "Deletion",
          text: "You can request deletion of your personal data, subject to legal and contractual obligations.",
        },
        {
          subtitle: "Export",
          text: "You can export your data in a machine-readable format at any time through your account dashboard.",
        },
      ],
    },
  ];

  const highlights = [
    {
      icon: Shield,
      title: "GDPR Compliant",
      description: "Full compliance with EU data protection regulations",
    },
    {
      icon: Lock,
      title: "SOC 2 Type II",
      description: "Certified for security, availability, and confidentiality",
    },
    {
      icon: Eye,
      title: "Transparent",
      description: "Clear policies on data collection and usage",
    },
    {
      icon: UserCheck,
      title: "Your Control",
      description: "You control your data with full access and deletion rights",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-purple-950/20 to-black pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
              Privacy Policy
            </Badge>
            <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              Your Privacy Matters
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-4">
              We are committed to protecting your privacy and handling your data with transparency and care
            </p>
            <p className="text-sm text-gray-500">
              Last Updated: January 17, 2025
            </p>
          </motion.div>

          {/* Highlights */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {highlights.map((highlight, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 text-center"
              >
                <CardHeader>
                  <highlight.icon className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                  <CardTitle className="text-white text-lg">{highlight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Sections */}
          {sections.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + sectionIndex * 0.2 }}
            >
              <h2 className="text-3xl mb-8 flex items-center gap-3 text-white">
                <section.icon className="w-8 h-8 text-blue-400" />
                {section.title}
              </h2>
              <div className="max-w-4xl space-y-4">
                {section.content.map((item, itemIndex) => (
                  <Card
                    key={itemIndex}
                    className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10"
                  >
                    <CardHeader>
                      <CardTitle className="text-white text-lg">{item.subtitle}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400">{item.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Data Retention */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <h2 className="text-3xl mb-8 text-white">Data Retention</h2>
            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 max-w-4xl">
              <CardContent className="p-6 space-y-4">
                <p className="text-gray-400">
                  We retain your personal data only as long as necessary to provide our services and fulfill the purposes outlined in this privacy policy. When you close your account, we will delete your personal data within 30 days, except where we are legally required to retain it.
                </p>
                <p className="text-gray-400">
                  Workflow execution logs and analytics data may be retained for up to 2 years for performance analysis and service improvement, but will be anonymized to remove personally identifiable information.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Third-Party Services */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <h2 className="text-3xl mb-8 text-white">Third-Party Services</h2>
            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 max-w-4xl">
              <CardContent className="p-6 space-y-4">
                <p className="text-gray-400">
                  We use carefully selected third-party services to help operate our platform:
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong>Cloud Infrastructure:</strong> AWS, Google Cloud for hosting and computing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong>Analytics:</strong> Privacy-focused analytics to improve our service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong>Payment Processing:</strong> Stripe for secure payment processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong>Communication:</strong> Email service providers for transactional emails</span>
                  </li>
                </ul>
                <p className="text-gray-400">
                  All third-party services are required to maintain appropriate security standards and comply with applicable data protection regulations.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="p-8 rounded-3xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <div className="flex items-start gap-4">
              <AlertCircle className="w-12 h-12 text-blue-400 flex-shrink-0" />
              <div>
                <h3 className="text-2xl text-white mb-4">Questions About Privacy?</h3>
                <p className="text-gray-300 mb-6">
                  If you have any questions about this Privacy Policy or how we handle your data, please contact our Data Protection Officer:
                </p>
                <div className="space-y-2 text-gray-400">
                  <p><strong className="text-white">Email:</strong> privacy@astramaie.com</p>
                  <p><strong className="text-white">Mail:</strong> Astramaie Data Protection Officer, [Your Address]</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
