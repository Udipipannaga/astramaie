import { motion } from "motion/react";
import { Users, MessageSquare, Trophy, Calendar, Star, TrendingUp, Heart, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

export function Community() {
  const stats = [
    { icon: Users, label: "Community Members", value: "5,000+" },
    { icon: MessageSquare, label: "Discussions", value: "1,200+" },
    { icon: Trophy, label: "Success Stories", value: "300+" },
    { icon: Star, label: "5-Star Reviews", value: "450+" },
  ];

  const channels = [
    {
      icon: MessageSquare,
      name: "General Discussion",
      description: "Talk about AI automation, share ideas, and connect",
      members: "2,300",
      posts: "8,500",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      name: "Workflow Showcase",
      description: "Share your workflows and see what others have built",
      members: "1,800",
      posts: "3,200",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: TrendingUp,
      name: "Business Growth",
      description: "Discuss how AI automation helped grow your business",
      members: "1,500",
      posts: "2,800",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Calendar,
      name: "Events & Webinars",
      description: "Join live sessions, workshops, and community events",
      members: "2,100",
      posts: "1,200",
      color: "from-orange-500 to-red-500",
    },
  ];

  const featuredMembers = [
    {
      name: "Sarah Chen",
      role: "AI Automation Expert",
      badge: "Top Contributor",
      contributions: "250+ posts",
      avatar: "SC",
    },
    {
      name: "Marcus Johnson",
      role: "Business Owner",
      badge: "Success Story",
      contributions: "150+ posts",
      avatar: "MJ",
    },
    {
      name: "Emily Rodriguez",
      role: "Developer",
      badge: "Community Leader",
      contributions: "200+ posts",
      avatar: "ER",
    },
    {
      name: "David Kim",
      role: "Startup Founder",
      badge: "Rising Star",
      contributions: "100+ posts",
      avatar: "DK",
    },
  ];

  const recentDiscussions = [
    {
      title: "How I Automated My Customer Service with AI",
      author: "Sarah Chen",
      replies: 45,
      likes: 128,
      category: "Success Stories",
      time: "2 hours ago",
    },
    {
      title: "Best Practices for Integrating AI into Existing Systems",
      author: "Marcus Johnson",
      replies: 32,
      likes: 89,
      category: "Technical",
      time: "5 hours ago",
    },
    {
      title: "Reduced Processing Time by 80% - Here's How",
      author: "Emily Rodriguez",
      replies: 28,
      likes: 156,
      category: "Case Study",
      time: "1 day ago",
    },
    {
      title: "Weekly AI Automation Trends - January 2025",
      author: "Astramaie Team",
      replies: 67,
      likes: 234,
      category: "Industry News",
      time: "2 days ago",
    },
  ];

  const benefits = [
    {
      icon: Users,
      title: "Connect with Experts",
      description: "Learn from AI automation professionals and industry leaders",
    },
    {
      icon: MessageSquare,
      title: "Share Knowledge",
      description: "Contribute your experiences and help others succeed",
    },
    {
      icon: Trophy,
      title: "Get Recognized",
      description: "Earn badges and recognition for your contributions",
    },
    {
      icon: Calendar,
      title: "Exclusive Events",
      description: "Access to webinars, workshops, and networking sessions",
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
              Join Our Community
            </Badge>
            <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              Welcome to the Astramaie Community
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Connect with thousands of business owners, developers, and AI enthusiasts transforming their operations with automation
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" size="lg">
              Join the Community
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 text-center">
                <CardHeader>
                  <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <CardTitle className="text-white text-2xl">{stat.value}</CardTitle>
                  <CardDescription>{stat.label}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </motion.div>

          {/* Channels */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Community Channels
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {channels.map((channel, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer group"
                >
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${channel.color} bg-opacity-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <channel.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white">{channel.name}</CardTitle>
                    <CardDescription>{channel.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 text-sm text-gray-400">
                      <span><Users className="w-4 h-4 inline mr-1" />{channel.members} members</span>
                      <span><MessageSquare className="w-4 h-4 inline mr-1" />{channel.posts} posts</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Recent Discussions */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Recent Discussions
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {recentDiscussions.map((discussion, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                        {discussion.category}
                      </Badge>
                      <span className="text-xs text-gray-400">{discussion.time}</span>
                    </div>
                    <CardTitle className="text-white hover:text-blue-400 transition-colors">
                      {discussion.title}
                    </CardTitle>
                    <CardDescription>by {discussion.author}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 text-sm text-gray-400">
                      <span><MessageSquare className="w-4 h-4 inline mr-1" />{discussion.replies} replies</span>
                      <span><Heart className="w-4 h-4 inline mr-1" />{discussion.likes} likes</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Featured Members */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-3xl mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Community Members
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredMembers.map((member, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-purple-500/30 transition-all duration-300 text-center"
                >
                  <CardHeader>
                    <Avatar className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500">
                      <AvatarFallback className="text-white text-xl">{member.avatar}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-white text-lg">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge className="mb-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-yellow-400">
                      {member.badge}
                    </Badge>
                    <p className="text-sm text-gray-400">{member.contributions}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <h2 className="text-3xl mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Why Join Our Community?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 text-center"
                >
                  <CardHeader>
                    <benefit.icon className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                    <CardTitle className="text-white text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-400">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="p-8 rounded-3xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl text-white mb-4">Ready to Join?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Become part of a thriving community of AI automation enthusiasts. Share your experiences, learn from others, and grow together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Join Now - It's Free
              </Button>
              <Button variant="outline" className="border-white/10 hover:bg-white/5">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
