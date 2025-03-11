
import { motion } from "framer-motion";

// Feature card data
const features = [
  {
    title: "Multi-Agent Collaboration",
    description: "Create teams of specialized AI agents that collaborate in real-time to solve complex problems.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
  },
  {
    title: "Dynamic Learning",
    description: "Bots share knowledge and improve over time through continuous learning from interactions.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
    ),
  },
  {
    title: "Real-Time Communication",
    description: "WebSocket-based communication enables seamless coordination between different agents.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    ),
  },
  {
    title: "Industry-Specific Teams",
    description: "Configure specialized teams for different use cases like customer service, technical support, or sales.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    ),
  },
  {
    title: "Claude API Integration",
    description: "Leverage Claude's advanced capabilities for natural conversations with deep understanding.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
      </svg>
    ),
  },
  {
    title: "Supabase Integration",
    description: "Store conversation history, user data, and bot configurations in a powerful PostgreSQL database.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
    ),
  },
];

// Bot types data
const botTypes = [
  {
    title: "Leader Bot",
    subtitle: "Orchestration AI",
    description: "Oversees team operations and routes conversations to appropriate specialized bots.",
    color: "bg-blue-500",
  },
  {
    title: "Knowledge Bot",
    subtitle: "Database AI",
    description: "Retrieves information from Supabase database to ensure accurate responses.",
    color: "bg-teal-500",
  },
  {
    title: "Reasoning Bot",
    subtitle: "Deep Analysis AI",
    description: "Performs complex analysis and problem-solving using Claude for sophisticated reasoning.",
    color: "bg-violet-500",
  },
  {
    title: "Data Processing Bot",
    subtitle: "Dataset AI",
    description: "Extracts and processes structured data, preparing datasets for training and analysis.",
    color: "bg-amber-500",
  },
  {
    title: "Customer Support Bot",
    subtitle: "Interaction AI",
    description: "Handles front-end user interactions with a consistent tone and personality.",
    color: "bg-rose-500",
  },
  {
    title: "Security Bot",
    subtitle: "Privacy AI",
    description: "Ensures compliance and data privacy by filtering sensitive information.",
    color: "bg-emerald-500",
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 mb-4">
        {feature.icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-neutral-900">{feature.title}</h3>
      <p className="text-neutral-600">{feature.description}</p>
    </motion.div>
  );
};

const BotTypeCard = ({ bot, index }: { bot: typeof botTypes[0], index: number }) => {
  return (
    <motion.div 
      className="relative overflow-hidden rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className={`h-2 ${bot.color}`} />
      <div className="p-5">
        <h3 className="text-lg font-semibold text-neutral-900">{bot.title}</h3>
        <p className="text-sm text-neutral-500 mb-2">{bot.subtitle}</p>
        <p className="text-neutral-600">{bot.description}</p>
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl font-bold mb-4 text-neutral-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Powerful Features for AI Teams
          </motion.h2>
          <motion.p 
            className="text-neutral-600 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Everything you need to build, manage, and deploy collaborative AI agent systems.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
        
        <div className="mt-24 mb-16 text-center max-w-3xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold mb-4 text-neutral-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Specialized Bot Types
          </motion.h2>
          <motion.p 
            className="text-neutral-600 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Create teams with multiple specialized AI agents for enhanced performance and knowledge sharing.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {botTypes.map((bot, index) => (
            <BotTypeCard key={index} bot={bot} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
