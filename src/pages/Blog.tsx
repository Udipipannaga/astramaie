import { motion } from "motion/react";
import { Home, Search, Sparkles, Calendar, Clock, Tag, ArrowRight, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { BlogArticleModal } from "../components/BlogArticleModal";
import { toast } from "sonner@2.0.3";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured?: boolean;
}

export function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const goHome = () => {
    if ((window as any).navigate) {
      (window as any).navigate('/');
    } else {
      window.location.href = '/';
    }
  };

  const handleNewsletterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      toast.success("Thanks for subscribing! Check your email for confirmation.");
      setNewsletterEmail("");
    }
  };

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Future of AI Automation in Business",
      excerpt: "Discover how artificial intelligence is revolutionizing business operations and creating unprecedented efficiency gains.",
      content: "AI automation is transforming the business landscape...",
      author: "Astramaie Team",
      date: "November 15, 2024",
      readTime: "5 min read",
      category: "AI & Technology",
      tags: ["AI", "Automation", "Business"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      featured: true
    },
    {
      id: 2,
      title: "10 Ways to Streamline Your Workflow with AI",
      excerpt: "Practical strategies to implement AI-powered automation in your daily business operations.",
      content: "Workflow optimization is key to business success...",
      author: "Astramaie Team",
      date: "November 12, 2024",
      readTime: "7 min read",
      category: "Productivity",
      tags: ["Workflow", "Efficiency", "Tips"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      featured: true
    },
    {
      id: 3,
      title: "Understanding Custom AI Workflow Solutions",
      excerpt: "Why one-size-fits-all doesn't work for AI automation, and how custom solutions drive better results.",
      content: "Custom AI workflows are designed specifically for your business...",
      author: "Astramaie Team",
      date: "November 10, 2024",
      readTime: "6 min read",
      category: "AI & Technology",
      tags: ["Custom Solutions", "AI", "Strategy"],
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80"
    },
    {
      id: 4,
      title: "ROI of AI Automation: A Complete Guide",
      excerpt: "Learn how to measure and maximize the return on investment from your AI automation initiatives.",
      content: "Measuring ROI for AI automation requires understanding key metrics...",
      author: "Astramaie Team",
      date: "November 8, 2024",
      readTime: "8 min read",
      category: "Business Strategy",
      tags: ["ROI", "Analytics", "Business"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
    },
    {
      id: 5,
      title: "AI-Powered Customer Service: Best Practices",
      excerpt: "Transform your customer support with intelligent automation while maintaining the human touch.",
      content: "AI-powered customer service combines efficiency with empathy...",
      author: "Astramaie Team",
      date: "November 5, 2024",
      readTime: "6 min read",
      category: "Customer Experience",
      tags: ["Customer Service", "AI", "Support"],
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80"
    },
    {
      id: 6,
      title: "Data Security in AI Automation",
      excerpt: "Essential security considerations when implementing AI-powered workflows in your organization.",
      content: "Security must be at the forefront of any AI implementation...",
      author: "Astramaie Team",
      date: "November 3, 2024",
      readTime: "7 min read",
      category: "Security",
      tags: ["Security", "Data Protection", "AI"],
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80"
    },
    {
      id: 7,
      title: "Machine Learning vs Traditional Automation",
      excerpt: "Understanding the key differences and when to use each approach for optimal results.",
      content: "Machine learning offers dynamic solutions compared to traditional automation...",
      author: "Astramaie Team",
      date: "November 1, 2024",
      readTime: "5 min read",
      category: "AI & Technology",
      tags: ["Machine Learning", "Comparison", "Technology"],
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80"
    },
    {
      id: 8,
      title: "Scaling Your Business with AI Automation",
      excerpt: "How to leverage AI automation to grow your business without proportionally increasing costs.",
      content: "Scaling with AI automation enables exponential growth...",
      author: "Astramaie Team",
      date: "October 28, 2024",
      readTime: "6 min read",
      category: "Business Strategy",
      tags: ["Scaling", "Growth", "AI"],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
    }
  ];

  const categories = ["All", "AI & Technology", "Productivity", "Business Strategy", "Customer Experience", "Security"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

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
            <span className="text-sm text-purple-300">Insights & Updates</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Astramaie Blog
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Explore the latest insights on AI automation, business innovation, and technology trends
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-2xl"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    : "border-white/10 bg-white/5 hover:bg-white/10 text-white"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Featured Posts */}
        {selectedCategory === "All" && !searchQuery && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-purple-400" />
              <h2 className="text-3xl text-white">Featured Articles</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedPost(post)}
                  className="cursor-pointer"
                >
                  <Card className="group bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-purple-500/30 transition-all duration-300 overflow-hidden h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <Badge className="absolute top-4 left-4 bg-purple-500/90 border-none">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                          {post.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl text-white group-hover:text-purple-400 transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-base">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Posts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl text-white mb-6">
            {searchQuery ? `Search Results (${filteredPosts.length})` : 'Latest Articles'}
          </h2>
          
          {filteredPosts.length === 0 ? (
            <Card className="bg-white/5 border-white/10 p-12 text-center">
              <p className="text-gray-400 text-lg">No articles found matching your criteria.</p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedPost(post)}
                  className="cursor-pointer"
                >
                  <Card className="group bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-purple-500/30 transition-all duration-300 overflow-hidden h-full">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    </div>
                    
                    <CardHeader className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="border-purple-500/30 text-purple-300 text-xs">
                          {post.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-white group-hover:text-purple-400 transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-white/5 text-gray-400 border-none text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-white/5">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.date.split(',')[0]}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"></div>
            <CardContent className="relative p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-6">
                <Sparkles className="w-8 h-8 text-purple-400" />
              </div>
              
              <h3 className="text-3xl text-white mb-4">
                Stay Updated with AI Insights
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and get the latest articles, automation tips, and industry insights delivered to your inbox.
              </p>
              
              <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Subscribe
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Blog Article Modal */}
      <BlogArticleModal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
      />
    </div>
  );
}