import { motion } from "motion/react";
import { Shield, Lock, Eye, Server, AlertOctagon, CheckCircle, Key, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function Security() {
  const securityFeatures = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "TLS 1.3 for data in transit, AES-256 for data at rest",
      details: ["256-bit encryption keys", "Perfect forward secrecy", "Encrypted backups", "Secure key management"],
    },
    {
      icon: Key,
      title: "Access Control",
      description: "Multi-layered authentication and authorization",
      details: ["OAuth 2.0 & OpenID Connect", "Multi-factor authentication (MFA)", "Role-based access control (RBAC)", "API key rotation"],
    },
    {
      icon: Eye,
      title: "Monitoring & Logging",
      description: "24/7 security monitoring and threat detection",
      details: ["Real-time threat detection", "Automated security alerts", "Comprehensive audit logs", "SIEM integration"],
    },
    {
      icon: Server,
      title: "Infrastructure Security",
      description: "Enterprise-grade cloud infrastructure",
      details: ["AWS/GCP secure hosting", "DDoS protection", "Web application firewall", "Network segmentation"],
    },
    {
      icon: Database,
      title: "Data Protection",
      description: "Comprehensive data security measures",
      details: ["Regular automated backups", "Geo-redundant storage", "Data anonymization", "Secure deletion"],
    },
    {
      icon: AlertOctagon,
      title: "Incident Response",
      description: "Rapid response to security incidents",
      details: ["24/7 security team", "Incident response plan", "Customer notification protocol", "Post-incident analysis"],
    },
  ];

  const certifications = [
    {
      name: "SOC 2 Type II",
      description: "Security, availability, and confidentiality",
      icon: Shield,
    },
    {
      name: "ISO 27001",
      description: "Information security management",
      icon: Lock,
    },
    {
      name: "GDPR Compliant",
      description: "EU data protection regulations",
      icon: CheckCircle,
    },
    {
      name: "HIPAA Ready",
      description: "Healthcare data protection",
      icon: Shield,
    },
  ];

  const practices = [
    {
      title: "Regular Security Audits",
      description: "Third-party penetration testing and security assessments conducted quarterly",
    },
    {
      title: "Vulnerability Management",
      description: "Continuous vulnerability scanning and patch management processes",
    },
    {
      title: "Employee Training",
      description: "Mandatory security awareness training for all team members",
    },
    {
      title: "Secure Development",
      description: "Security-first development practices with code reviews and static analysis",
    },
    {
      title: "Data Minimization",
      description: "We only collect and retain data necessary for service delivery",
    },
    {
      title: "Privacy by Design",
      description: "Privacy and security built into every feature from the ground up",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
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
              Security
            </Badge>
            <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              Enterprise-Grade Security
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Your data and workflows are protected by industry-leading security measures and compliance standards
            </p>
          </motion.div>

          {/* Certifications */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 text-center hover:border-blue-500/30 transition-all"
              >
                <CardHeader>
                  <cert.icon className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                  <CardTitle className="text-white text-lg">{cert.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Security Features */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Security Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-purple-500/30 transition-all"
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Security Practices */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Security Practices
            </h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              {practices.map((practice, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10"
                >
                  <CardHeader>
                    <CardTitle className="text-white text-lg flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      {practice.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm">{practice.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Responsible Disclosure */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-3xl mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Responsible Disclosure
            </h2>
            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-white">Bug Bounty Program</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400">
                  We welcome security researchers to help us keep Astramaie secure. If you discover a security vulnerability, please report it to us responsibly.
                </p>
                <div className="space-y-2 text-gray-400">
                  <p><strong className="text-white">Email:</strong> security@astramaie.com</p>
                  <p><strong className="text-white">PGP Key:</strong> Available on request</p>
                  <p><strong className="text-white">Response Time:</strong> Within 24 hours</p>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-300 text-sm">
                    We offer rewards for qualifying security vulnerabilities. All reports are reviewed by our security team and handled with the highest priority.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="p-8 rounded-3xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl text-white mb-4">Security Questions?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Our security team is available to answer questions about our security practices, compliance, and certifications.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-green-500/20 border-green-500/30 text-green-400 px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                SOC 2 Type II Certified
              </Badge>
              <Badge className="bg-blue-500/20 border-blue-500/30 text-blue-400 px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                ISO 27001 Certified
              </Badge>
              <Badge className="bg-purple-500/20 border-purple-500/30 text-purple-400 px-4 py-2">
                <Lock className="w-4 h-4 mr-2" />
                GDPR Compliant
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
