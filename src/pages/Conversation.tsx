
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConversationDemo from "@/components/ConversationDemo";

const Conversation = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-neutral-900">Interactive Demo</h1>
            <p className="text-neutral-600 mt-1 max-w-2xl mx-auto">
              Experience the power of multi-agent collaboration. Chat with our team of specialized bots and see how they work together.
            </p>
          </motion.div>
          
          <motion.div
            className="max-w-4xl mx-auto bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="h-[700px]">
              <ConversationDemo />
            </div>
          </motion.div>
          
          <motion.div
            className="mt-12 max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">How It Works</h2>
            <p className="text-neutral-600 mb-8">
              Our chatbot team features specialized bots that collaborate to provide comprehensive answers.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white border border-neutral-200 p-5 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mb-4">
                  <span className="font-medium">1</span>
                </div>
                <h3 className="font-medium text-neutral-900 mb-2">You Ask a Question</h3>
                <p className="text-sm text-neutral-600">
                  Type your query in the chat interface above.
                </p>
              </div>
              
              <div className="bg-white border border-neutral-200 p-5 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mb-4">
                  <span className="font-medium">2</span>
                </div>
                <h3 className="font-medium text-neutral-900 mb-2">Leader Bot Routes</h3>
                <p className="text-sm text-neutral-600">
                  The Leader Bot analyzes and routes your query to specialized bots.
                </p>
              </div>
              
              <div className="bg-white border border-neutral-200 p-5 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mb-4">
                  <span className="font-medium">3</span>
                </div>
                <h3 className="font-medium text-neutral-900 mb-2">Collaborative Response</h3>
                <p className="text-sm text-neutral-600">
                  Specialized bots work together to provide a comprehensive answer.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Conversation;
