import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, Tag, Share2, Bookmark, ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

interface BlogArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: BlogPost | null;
}

export function BlogArticleModal({ isOpen, onClose, post }: BlogArticleModalProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100) + 50);
  const [hasLiked, setHasLiked] = useState(false);

  if (!post) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? "Removed from bookmarks" : "Added to bookmarks");
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
      toast.success("Thanks for the support!");
    }
  };

  // Generate full article content based on the excerpt
  const generateFullContent = () => {
    return `
      <div class="prose prose-invert max-w-none">
        <p class="text-lg text-gray-300 leading-relaxed mb-6">${post.excerpt}</p>
        
        <h2 class="text-2xl text-white mt-8 mb-4">Introduction</h2>
        <p class="text-gray-300 leading-relaxed mb-4">
          In today's rapidly evolving business landscape, AI automation has become a critical component for organizations looking to stay competitive and efficient. This comprehensive guide explores the key aspects of ${post.title.toLowerCase()}.
        </p>
        
        <h2 class="text-2xl text-white mt-8 mb-4">Why This Matters</h2>
        <p class="text-gray-300 leading-relaxed mb-4">
          Businesses that embrace AI automation are seeing dramatic improvements in productivity, cost savings, and customer satisfaction. The technology has matured to a point where implementation is more accessible than ever before.
        </p>
        
        <ul class="list-disc list-inside text-gray-300 space-y-2 mb-6 ml-4">
          <li>Reduce operational costs by up to 40%</li>
          <li>Improve accuracy and reduce human error</li>
          <li>Scale operations without proportional cost increases</li>
          <li>Free up team members for strategic work</li>
          <li>Provide 24/7 service capabilities</li>
        </ul>
        
        <h2 class="text-2xl text-white mt-8 mb-4">Key Strategies</h2>
        <p class="text-gray-300 leading-relaxed mb-4">
          Successful implementation requires a thoughtful approach. Start small with high-impact processes, measure results, and gradually expand. The most successful organizations treat AI automation as a journey rather than a destination.
        </p>
        
        <blockquote class="border-l-4 border-purple-500 pl-4 italic text-gray-400 my-6">
          "AI automation isn't about replacing humans—it's about augmenting human capabilities and allowing people to focus on what they do best: creative problem-solving and strategic thinking."
        </blockquote>
        
        <h2 class="text-2xl text-white mt-8 mb-4">Implementation Best Practices</h2>
        <p class="text-gray-300 leading-relaxed mb-4">
          When implementing AI automation solutions, consider these proven best practices:
        </p>
        
        <ol class="list-decimal list-inside text-gray-300 space-y-2 mb-6 ml-4">
          <li><strong class="text-white">Start with clear objectives:</strong> Define what success looks like before beginning</li>
          <li><strong class="text-white">Choose the right processes:</strong> Focus on repetitive, high-volume tasks first</li>
          <li><strong class="text-white">Involve your team:</strong> Get buy-in from those who will use the system</li>
          <li><strong class="text-white">Measure and iterate:</strong> Track KPIs and continuously improve</li>
          <li><strong class="text-white">Plan for scale:</strong> Build with future growth in mind</li>
        </ol>
        
        <h2 class="text-2xl text-white mt-8 mb-4">Real-World Results</h2>
        <p class="text-gray-300 leading-relaxed mb-4">
          Companies implementing AI automation are seeing transformative results. From e-commerce businesses processing orders 10x faster to service companies handling customer inquiries 24/7, the impact is measurable and significant.
        </p>
        
        <div class="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-6 my-6">
          <h3 class="text-xl text-white mb-3">Case Study Highlight</h3>
          <p class="text-gray-300 mb-2">
            A mid-sized e-commerce company implemented AI-powered customer service automation and saw:
          </p>
          <ul class="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>60% reduction in response time</li>
            <li>45% cost savings in support operations</li>
            <li>25% increase in customer satisfaction scores</li>
            <li>24/7 availability without additional staffing</li>
          </ul>
        </div>
        
        <h2 class="text-2xl text-white mt-8 mb-4">Getting Started</h2>
        <p class="text-gray-300 leading-relaxed mb-4">
          The journey to AI automation doesn't have to be overwhelming. Start by identifying one process that could benefit from automation, then work with experts who can guide you through implementation.
        </p>
        
        <p class="text-gray-300 leading-relaxed mb-4">
          Whether you're looking to automate customer communications, streamline data processing, or optimize your workflows, the key is to begin. The competitive advantage goes to those who act decisively.
        </p>
        
        <h2 class="text-2xl text-white mt-8 mb-4">Conclusion</h2>
        <p class="text-gray-300 leading-relaxed mb-4">
          AI automation represents one of the most significant opportunities for business transformation in decades. By understanding the fundamentals, following best practices, and starting with focused implementations, organizations of any size can harness its power.
        </p>
        
        <p class="text-gray-300 leading-relaxed">
          Ready to explore how AI automation can transform your business? Contact our team for a personalized consultation and discover the possibilities.
        </p>
      </div>
    `;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
              {/* Hero Image */}
              <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 backdrop-blur-sm"
                >
                  <X className="w-5 h-5" />
                </Button>

                {/* Category Badge */}
                <Badge className="absolute top-4 left-4 bg-purple-500/90 border-none">
                  {post.category}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="mb-6">
                  <h1 className="text-3xl md:text-4xl text-white mb-4">
                    {post.title}
                  </h1>
                  
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                    <span>By {post.author}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-white/5 text-gray-400 border-white/10"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pb-6 border-b border-white/10">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLike}
                      className={`border-white/10 ${hasLiked ? 'bg-purple-500/20 border-purple-500/30' : 'hover:bg-white/5'}`}
                    >
                      <ThumbsUp className={`w-4 h-4 mr-2 ${hasLiked ? 'fill-current' : ''}`} />
                      {likes}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleBookmark}
                      className={`border-white/10 ${isBookmarked ? 'bg-blue-500/20 border-blue-500/30' : 'hover:bg-white/5'}`}
                    >
                      <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                      {isBookmarked ? 'Saved' : 'Save'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShare}
                      className="border-white/10 hover:bg-white/5"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Article Content */}
                <div 
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: generateFullContent() }}
                />

                {/* CTA Section */}
                <div className="mt-12 p-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/30">
                  <h3 className="text-2xl text-white mb-3">Ready to Get Started?</h3>
                  <p className="text-gray-300 mb-6">
                    Let's discuss how AI automation can transform your business. Our team is ready to help you implement custom solutions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => {
                        onClose();
                        if ((window as any).navigate) {
                          (window as any).navigate('/contact');
                        }
                      }}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      size="lg"
                    >
                      Schedule Consultation
                    </Button>
                    <Button
                      onClick={() => {
                        onClose();
                        if ((window as any).navigate) {
                          (window as any).navigate('/case-studies');
                        }
                      }}
                      variant="outline"
                      className="border-white/20 hover:bg-white/10"
                      size="lg"
                    >
                      View Case Studies
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
