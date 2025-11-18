import { motion } from "motion/react";
import { FileText, CheckCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function Terms() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using Astramaie's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
    },
    {
      title: "2. Service Description",
      content: "Astramaie provides custom AI automation workflow solutions. We create bespoke automation workflows based on client requirements, not pre-built templates. Each workflow is uniquely designed for your specific business needs.",
    },
    {
      title: "3. User Accounts",
      content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.",
    },
    {
      title: "4. Custom Workflow Development",
      content: "All workflows are created on-demand based on your specifications. Development timelines and pricing are determined on a per-project basis. We reserve the right to refuse service for requests that are illegal, unethical, or technically infeasible.",
    },
    {
      title: "5. Payment Terms",
      content: "Payment terms are agreed upon before project commencement. Invoices are due within 30 days unless otherwise specified. Late payments may incur interest charges and may result in service suspension.",
    },
    {
      title: "6. Intellectual Property",
      content: "Upon full payment, you own the custom workflows created for you. Astramaie retains intellectual property rights to underlying technology, frameworks, and methodologies. We may use anonymized data from your workflows to improve our services.",
    },
    {
      title: "7. Data Usage and Privacy",
      content: "We collect and process data as described in our Privacy Policy. You retain ownership of your data. We will not share your data with third parties except as necessary to provide services or as required by law.",
    },
    {
      title: "8. Service Level Agreement",
      content: "We strive to maintain 99.9% uptime for our API and workflow execution services. Scheduled maintenance will be announced in advance. We are not liable for downtime caused by circumstances beyond our control.",
    },
    {
      title: "9. Limitation of Liability",
      content: "Astramaie's liability is limited to the fees paid for the specific service in question. We are not liable for indirect, incidental, special, consequential, or punitive damages arising from your use of our services.",
    },
    {
      title: "10. Warranties and Disclaimers",
      content: "Services are provided 'as is' without warranties of any kind. We do not guarantee that workflows will meet all your requirements or operate error-free. We will make reasonable efforts to fix bugs and issues reported within warranty periods.",
    },
    {
      title: "11. Termination",
      content: "Either party may terminate the agreement with 30 days written notice. We may suspend or terminate services immediately for violations of these terms, non-payment, or illegal activity. Upon termination, you retain access to completed workflows.",
    },
    {
      title: "12. Changes to Terms",
      content: "We reserve the right to modify these terms at any time. Material changes will be communicated via email. Continued use of services after changes constitutes acceptance of modified terms.",
    },
    {
      title: "13. Governing Law",
      content: "These terms are governed by the laws of [Your Jurisdiction]. Any disputes will be resolved in the courts of [Your Jurisdiction].",
    },
    {
      title: "14. Contact Information",
      content: "For questions about these terms, contact us at legal@astramaie.com.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-purple-950/20 to-black pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
              Legal
            </Badge>
            <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-400 mb-4">
              Please read these terms carefully before using Astramaie's services
            </p>
            <p className="text-sm text-gray-500">
              Effective Date: January 17, 2025
            </p>
          </motion.div>

          <motion.div
            className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white mb-2">Important Notice</h3>
                <p className="text-gray-300 text-sm">
                  These terms constitute a legally binding agreement between you and Astramaie. By using our services, you acknowledge that you have read, understood, and agree to be bound by these terms.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.05 }}
              >
                <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{section.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <FileText className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl text-white mb-4">Questions About These Terms?</h3>
            <p className="text-gray-300 mb-2">
              Contact our legal team at <strong className="text-white">legal@astramaie.com</strong>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
