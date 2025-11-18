import { motion } from "motion/react";
import { 
  Mail, Phone, MapPin, Send, Clock, MessageCircle,
  Home, Sparkles, User, Building, Briefcase
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const goHome = () => {
    if ((window as any).navigate) {
      (window as any).navigate('/');
    } else {
      window.location.href = '/';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you within 24 hours.");
      setFormData({
        name: "",
        email: "",
        company: "",
        role: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@astramaie.com",
      link: "mailto:hello@astramaie.com"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "San Francisco, CA",
      link: null
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "Within 24 hours",
      link: null
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-950/20 via-purple-950/20 to-black pointer-events-none"></div>
      
      {/* Back to Home Button */}
      <div className="fixed top-24 left-6 z-40">
        <Button
          onClick={goHome}
          variant="outline"
          className="border-purple-500/30 bg-black/40 backdrop-blur-sm hover:bg-purple-500/20 hover:border-purple-500/50 text-white"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Let's Talk</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your business with AI automation? Let's discuss your custom solution.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Send us a Message</CardTitle>
                <CardDescription className="text-gray-400">
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-gray-300">
                      <Building className="w-4 h-4 inline mr-2" />
                      Company Name
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-gray-300">
                      <Briefcase className="w-4 h-4 inline mr-2" />
                      Your Role
                    </Label>
                    <Input
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="e.g. CEO, Operations Manager"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-300">
                      <MessageCircle className="w-4 h-4 inline mr-2" />
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your automation needs..."
                      required
                      rows={5}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Contact Info Cards */}
            <div className="grid gap-4">
              {contactInfo.map((info) => (
                <Card key={info.title} className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-purple-500/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white mb-1">{info.title}</h3>
                        {info.link ? (
                          <a href={info.link} className="text-gray-400 hover:text-purple-400 transition-colors">
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-400">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Why Choose Us */}
            <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">Why Work With Us?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white mb-1">Custom Solutions</h4>
                    <p className="text-gray-400 text-sm">
                      We build workflows tailored to your specific business needs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-pink-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white mb-1">Fast Response</h4>
                    <p className="text-gray-400 text-sm">
                      Get a reply within 24 hours, often much sooner
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white mb-1">Proven Results</h4>
                    <p className="text-gray-400 text-sm">
                      75% average efficiency gain across 11+ happy clients
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white mb-1">Ongoing Support</h4>
                    <p className="text-gray-400 text-sm">
                      We're with you every step of the way, from setup to scale
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10">
              <CardContent className="p-6">
                <h3 className="text-white mb-4">Office Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monday - Friday</span>
                    <span className="text-white">9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Saturday</span>
                    <span className="text-white">10:00 AM - 2:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sunday</span>
                    <span className="text-gray-500">Closed</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-gray-400 text-sm">
                    For urgent matters, email us anytime. We monitor our inbox 24/7.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          className="mt-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl text-white mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">What's the typical project timeline?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">
                  Most custom workflows take 2-4 weeks from initial consultation to deployment, depending on complexity.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Do you offer free consultations?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">
                  Yes! We offer a free 30-minute consultation to discuss your needs and explore potential solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">What industries do you work with?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">
                  We work across all industries including e-commerce, SaaS, professional services, and more.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">What's your pricing model?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">
                  We create custom quotes based on your specific needs. Contact us to discuss your project.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
