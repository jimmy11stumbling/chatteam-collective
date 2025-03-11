
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10" />
      
      {/* Animated circles */}
      <div className="absolute top-20 right-1/4 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
      <div className="absolute top-40 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: "2s" }} />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
          <motion.span 
            className="px-4 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Revolutionizing AI Conversations
          </motion.span>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Build <span className="text-gradient">Multi-Agent</span> Collaborative Chatbot Systems
          </motion.h1>
          
          <motion.p 
            className="text-neutral-600 text-lg md:text-xl max-w-2xl text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Create and manage teams of specialized AI agents that work together to provide enhanced conversational experiences powered by Claude API.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-blue-200/50 text-base font-medium transition-all hover:-translate-y-0.5">
              Get Started Free
            </Button>
            <Button variant="outline" className="border-neutral-200 text-neutral-700 px-8 py-6 rounded-xl text-base font-medium hover:bg-neutral-50 transition-all">
              View Demo
            </Button>
          </motion.div>
        </div>
        
        {/* Dashboard Preview */}
        <motion.div 
          className="mt-16 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="glass-card rounded-2xl overflow-hidden shadow-xl">
            <div className="h-8 bg-neutral-50 border-b border-neutral-200 flex items-center px-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-neutral-300" />
                <div className="w-3 h-3 rounded-full bg-neutral-300" />
                <div className="w-3 h-3 rounded-full bg-neutral-300" />
              </div>
            </div>
            <div className="aspect-[16/9] bg-white relative">
              <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                Dashboard Preview Image
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
