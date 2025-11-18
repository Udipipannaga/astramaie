import { motion, AnimatePresence } from "motion/react";
import { X, Play } from "lucide-react";
import { Button } from "./ui/button";

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoVideoModal({ isOpen, onClose }: DemoVideoModalProps) {
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div>
                  <h2 className="text-2xl text-white mb-2">Product Demo</h2>
                  <p className="text-gray-400">
                    See Astramaie AI Automation in Action
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Video Container */}
              <div className="p-6">
                <div className="relative aspect-video bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl border border-white/10 overflow-hidden">
                  {/* YouTube Embed - Replace with your actual video */}
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0"
                    title="Astramaie Demo Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  
                  {/* Placeholder if no video */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                    <motion.div
                      className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-4"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play className="w-10 h-10 text-white ml-1" />
                    </motion.div>
                    <h3 className="text-xl text-white mb-2">Demo Video Coming Soon</h3>
                    <p className="text-gray-400 max-w-md">
                      We're preparing an exciting demo video to showcase our AI automation capabilities. 
                      In the meantime, feel free to explore our features or contact us for a live demo!
                    </p>
                  </div>
                </div>

                {/* Demo Highlights */}
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <h4 className="text-white mb-2">⚡ Quick Setup</h4>
                    <p className="text-sm text-gray-400">
                      See how easy it is to set up your first automation workflow
                    </p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <h4 className="text-white mb-2">🤖 AI in Action</h4>
                    <p className="text-sm text-gray-400">
                      Watch our AI models process real-world business scenarios
                    </p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <h4 className="text-white mb-2">📊 Real Results</h4>
                    <p className="text-sm text-gray-400">
                      See actual efficiency gains and time savings from our clients
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-purple-500/30">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="text-white mb-2">Want a Personalized Demo?</h4>
                      <p className="text-gray-400 text-sm">
                        Schedule a live demo with our team to see how Astramaie can transform your business
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        onClose();
                        if ((window as any).navigate) {
                          (window as any).navigate('/contact');
                        }
                      }}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 whitespace-nowrap"
                    >
                      Schedule Live Demo
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
