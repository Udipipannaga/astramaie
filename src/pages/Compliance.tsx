import { motion } from "motion/react";
import { CheckCircle, Shield, FileText, Globe, Building, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function Compliance() {
  const standards = [
    {
      icon: Shield,
      name: "SOC 2 Type II",
      status: "Certified",
      description: "Comprehensive security, availability, and confidentiality controls",
      details: [
        "Annual third-party audits",
        "Security control effectiveness",
        "Availability commitments",
        "Confidentiality protection",
      ],
    },
    {
      icon: Lock,
      name: "ISO/IEC 27001",
      status: "Certified",
      description: "International standard for information security management",
      details: [
        "Information security policies",
        "Risk assessment procedures",
        "Business continuity planning",
        "Incident management",
      ],
    },
    {
      icon: Globe,
      name: "GDPR",
      status: "Compliant",
      description: "EU General Data Protection Regulation compliance",
      details: [
        "Data protection by design",
        "Right to data portability",
        "Right to be forgotten",
        "Data breach notification",
      ],
    },
    {
      icon: FileText,
      name: "CCPA",
      status: "Compliant",
      description: "California Consumer Privacy Act compliance",
      details: [
        "Consumer data rights",
        "Opt-out mechanisms",
        "Data disclosure requirements",
        "Non-discrimination policy",
      ],
    },
    {
      icon: Building,
      name: "HIPAA",
      status: "Ready",
      description: "Healthcare data protection standards (available for enterprise)",
      details: [
        "PHI encryption",
        "Access controls",
        "Audit trails",
        "Business Associate Agreement",
      ],
    },
    {
      icon: Shield,
      name: "PCI DSS",
      status: "Compliant",
      description: "Payment card industry data security standard",
      details: [
        "Secure payment processing",
        "Tokenization",
        "Regular security testing",
        "Access monitoring",
      ],
    },
  ];

  const frameworks = [
    {
      name: "NIST Cybersecurity Framework",
      description: "Following NIST guidelines for cybersecurity risk management",
    },
    {
      name: "CIS Controls",
      description: "Implementing Center for Internet Security best practices",
    },
    {
      name: "OWASP Top 10",
      description: "Protection against the most critical web application security risks",
    },
    {
      name: "CSA STAR",
      description: "Cloud Security Alliance Security, Trust & Assurance Registry",
    },
  ];

  const dataResidency = [
    { region: "North America", locations: "US East, US West, Canada" },
    { region: "Europe", locations: "Ireland, Germany, UK" },
    { region: "Asia Pacific", locations: "Singapore, Tokyo, Sydney" },
    { region: "Custom", locations: "Available for enterprise customers" },
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
              Compliance
            </Badge>
            <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              Regulatory Compliance
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Astramaie meets the highest standards of regulatory compliance and data protection
            </p>
          </motion.div>

          {/* Compliance Standards */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Certifications & Standards
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {standards.map((standard, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-green-500/30 transition-all"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                        <standard.icon className="w-6 h-6 text-green-400" />
                      </div>
                      <Badge className="bg-green-500/20 border-green-500/30 text-green-400">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {standard.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-white">{standard.name}</CardTitle>
                    <CardDescription>{standard.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {standard.details.map((detail, idx) => (
                        <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                          <span className="text-green-400 mt-0.5">✓</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Security Frameworks */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Security Frameworks
            </h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              {frameworks.map((framework, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10"
                >
                  <CardHeader>
                    <CardTitle className="text-white text-lg flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                      {framework.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm">{framework.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Data Residency */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Data Residency Options
            </h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              {dataResidency.map((option, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10"
                >
                  <CardHeader>
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      <Globe className="w-5 h-5 text-purple-400" />
                      {option.region}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm">{option.locations}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center text-gray-400 mt-6 max-w-2xl mx-auto text-sm">
              Choose where your data is stored to meet local data residency requirements. All data centers maintain the same high security and compliance standards.
            </p>
          </motion.div>

          {/* Audit Reports */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-3xl mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Audit Reports & Documentation
            </h2>
            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 max-w-4xl mx-auto">
              <CardContent className="p-8 space-y-4">
                <p className="text-gray-400">
                  We maintain comprehensive audit reports and compliance documentation. Enterprise customers can request access to:
                </p>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">SOC 2 Type II Reports:</strong> Detailed security control audit reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">ISO 27001 Certificate:</strong> Current certification documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Penetration Test Results:</strong> Third-party security assessment reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">DPA/BAA Templates:</strong> Data Processing Agreements and Business Associate Agreements</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <p className="text-sm text-gray-500">
                    To request audit reports, please contact <strong className="text-white">compliance@astramaie.com</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Ongoing Compliance */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <h2 className="text-3xl mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Ongoing Compliance Program
            </h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 text-center">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Annual</CardTitle>
                  <CardDescription>External Audits</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 text-center">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Quarterly</CardTitle>
                  <CardDescription>Security Reviews</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 text-center">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Continuous</CardTitle>
                  <CardDescription>Monitoring & Updates</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="p-8 rounded-3xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl text-white mb-4">Compliance Questions?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Our compliance team is available to answer questions and provide documentation for your audit requirements.
            </p>
            <p className="text-white">
              Email: <strong>compliance@astramaie.com</strong>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
