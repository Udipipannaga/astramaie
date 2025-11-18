import { useState } from "react";
import { motion } from "motion/react";
import { Briefcase, MapPin, Clock, DollarSign, Users, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { JobApplicationModal } from "./JobApplicationModal";

const jobs = [
  {
    id: "ai-ml-engineer-2025",
    title: "AI & ML Engineer",
    department: "Engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
    experience: "Fresher",
    salary: "Competitive",
    postedDate: "2025",
    description: "Join our innovative team and help build cutting-edge AI automation solutions for businesses worldwide.",
    responsibilities: [
      "Develop and deploy machine learning models for automation workflows",
      "Design and implement AI-powered chatbots and virtual assistants",
      "Work on natural language processing (NLP) and computer vision projects",
      "Optimize existing ML models for better performance and accuracy",
      "Collaborate with cross-functional teams to integrate AI solutions",
      "Research and implement latest AI/ML technologies and frameworks",
      "Contribute to building our AI automation platform",
    ],
    requirements: [
      "Bachelor's or Master's degree in Computer Science, AI/ML, or related field",
      "Strong foundation in Python and ML libraries (TensorFlow, PyTorch, scikit-learn)",
      "Understanding of machine learning algorithms and deep learning concepts",
      "Familiarity with NLP, computer vision, or reinforcement learning",
      "Knowledge of data structures, algorithms, and software engineering principles",
      "Passion for AI and automation technologies",
      "Good problem-solving and analytical skills",
      "Excellent communication and teamwork abilities",
    ],
    niceToHave: [
      "Experience with cloud platforms (AWS, Azure, GCP)",
      "Knowledge of MLOps and model deployment",
      "Contributions to open-source ML projects",
      "Experience with LLMs (GPT, Claude, etc.)",
      "Understanding of automation frameworks",
      "Previous internships or projects in AI/ML",
    ],
    benefits: [
      "Competitive salary and equity options",
      "Work on real-world AI automation projects",
      "Mentorship from experienced AI engineers",
      "Flexible work hours and remote options",
      "Learning and development budget",
      "Latest tools and technologies",
      "Collaborative and innovative culture",
      "Health insurance and wellness benefits",
    ],
  },
];

const perks = [
  {
    icon: Users,
    title: "Collaborative Culture",
    description: "Work with passionate AI experts and automation specialists",
  },
  {
    icon: Sparkles,
    title: "Cutting-Edge Tech",
    description: "Use latest AI/ML frameworks and cloud technologies",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Work-life balance with flexible schedules",
  },
  {
    icon: DollarSign,
    title: "Competitive Pay",
    description: "Industry-standard compensation and benefits",
  },
];

export function Careers() {
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);

  const handleApplyClick = (job: typeof jobs[0]) => {
    setSelectedJob(job);
    setApplicationModalOpen(true);
  };

  return (
    <section id="careers" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6">
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300">Join Our Team</span>
          </div>

          <h2 className="text-5xl md:text-6xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Careers at Astramaie
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Empowering businesses with intelligent AI automation solutions. Join us in shaping the future of automation.
          </p>
        </motion.div>

        {/* Perks */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {perks.map((perk, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-blue-500/30 transition-all duration-300"
            >
              <CardHeader>
                <perk.icon className="w-8 h-8 text-blue-400 mb-3" />
                <CardTitle className="text-white text-lg">{perk.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">{perk.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Job Openings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-3xl text-white mb-8 text-center">Open Positions</h3>

          <div className="space-y-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-purple-500/30 transition-all duration-300">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-white text-2xl mb-2">
                              {job.title}
                            </CardTitle>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                                {job.department}
                              </Badge>
                              <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                                {job.experience}
                              </Badge>
                              <Badge variant="outline" className="border-green-500/30 text-green-400">
                                {job.type}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <CardDescription className="text-gray-300 text-base mb-4">
                          {job.description}
                        </CardDescription>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            <span>{job.salary}</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleApplyClick(job)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 whitespace-nowrap"
                        size="lg"
                      >
                        Apply Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Responsibilities */}
                    <div>
                      <h4 className="text-white mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                        Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {job.responsibilities.map((item, idx) => (
                          <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h4 className="text-white mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-purple-400" />
                        Requirements
                      </h4>
                      <ul className="space-y-2">
                        {job.requirements.map((item, idx) => (
                          <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                            <span className="text-purple-400 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Nice to Have */}
                    <div>
                      <h4 className="text-white mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        Nice to Have
                      </h4>
                      <ul className="space-y-2">
                        {job.niceToHave.map((item, idx) => (
                          <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="text-white mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                        What We Offer
                      </h4>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {job.benefits.map((item, idx) => (
                          <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                            <span className="text-yellow-400 mt-1">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Apply Button (Mobile) */}
                    <div className="pt-4 border-t border-white/10">
                      <Button
                        onClick={() => handleApplyClick(job)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        size="lg"
                      >
                        Apply for this Position
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Join Us */}
        <motion.div
          className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl text-white mb-4">Why Astramaie?</h3>
          <p className="text-gray-300 max-w-3xl mx-auto mb-6">
            We're a fast-growing AI automation agency working with cutting-edge technologies. 
            You'll have the opportunity to work on real-world projects, learn from experienced engineers, 
            and make a significant impact on businesses worldwide. If you're passionate about AI and automation, 
            this is the perfect place to start your career.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="outline" className="border-blue-500/30 text-blue-400 px-4 py-2">
              🚀 Fast-Growing Startup
            </Badge>
            <Badge variant="outline" className="border-purple-500/30 text-purple-400 px-4 py-2">
              🤖 AI-First Company
            </Badge>
            <Badge variant="outline" className="border-green-500/30 text-green-400 px-4 py-2">
              🌍 Global Impact
            </Badge>
            <Badge variant="outline" className="border-yellow-500/30 text-yellow-400 px-4 py-2">
              💡 Innovation-Driven
            </Badge>
          </div>
        </motion.div>
      </div>

      {/* Job Application Modal */}
      {selectedJob && (
        <JobApplicationModal
          isOpen={applicationModalOpen}
          onClose={() => setApplicationModalOpen(false)}
          job={selectedJob}
        />
      )}
    </section>
  );
}
