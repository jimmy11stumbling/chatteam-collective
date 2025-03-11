
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ConversationDemo from "@/components/ConversationDemo";

const Index = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <Features />
        
        {/* Demo Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                className="order-2 lg:order-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="h-[600px]">
                  <ConversationDemo />
                </div>
              </motion.div>
              
              <motion.div 
                className="order-1 lg:order-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <span className="inline-block px-4 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-full mb-4">
                  Try It Now
                </span>
                <h2 className="text-3xl font-bold mb-4 text-neutral-900">
                  Experience the Power of Multi-Agent Collaboration
                </h2>
                <p className="text-lg text-neutral-600 mb-6">
                  See how our specialized AI agents work together to provide comprehensive and insightful responses to your queries.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mt-0.5 mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <p className="text-neutral-700">Each bot specializes in different tasks, from retrieving information to complex reasoning</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mt-0.5 mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <p className="text-neutral-700">Leader Bot intelligently routes your request to the most appropriate specialists</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mt-0.5 mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <p className="text-neutral-700">Bots collaborate in real-time to provide comprehensive responses</p>
                  </div>
                </div>
                <div className="mt-8">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-6 rounded-xl shadow-lg hover:shadow-blue-200/50 text-base font-medium transition-all hover:-translate-y-0.5">
                    Create Your Own Team
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-500 to-teal-400 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Ready to transform your AI conversations?
            </motion.h2>
            <motion.p
              className="text-lg mb-8 max-w-2xl mx-auto text-blue-50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Get started with Ultimate Chatbot Station today and experience the future of AI collaboration.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 rounded-xl shadow-lg text-base font-medium transition-all hover:-translate-y-0.5">
                Start Free Trial
              </Button>
              <Button variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 px-8 py-6 rounded-xl text-base font-medium transition-all">
                Schedule a Demo
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
