"use client"

import { motion } from "framer-motion"
import { 
  Target, 
  Brain, 
  Bell, 
  TrendingUp, 
  Repeat, 
  MessageSquare 
} from "lucide-react"

const features = [
  {
    icon: Target,
    title: "Smart Task Tracking",
    description: "AI-powered task management that learns your workflow and adapts to your style.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Brain,
    title: "AI Accountability",
    description: "Your personal AI that checks in, motivates, and calls you out (nicely) when needed.",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    icon: Bell,
    title: "Daily Reminders",
    description: "Smart notifications that know when to nudge you without being annoying.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: TrendingUp,
    title: "Progress Insights",
    description: "Beautiful analytics that show your growth and help you stay motivated.",
    gradient: "from-green-500 to-cyan-500",
  },
  {
    icon: Repeat,
    title: "Habit Building",
    description: "Build lasting habits with streak tracking and personalized milestones.",
    gradient: "from-orange-500 to-pink-500",
  },
  {
    icon: MessageSquare,
    title: "Personalized Feedback",
    description: "Get real-time feedback that actually helps you improve and grow.",
    gradient: "from-pink-500 to-purple-500",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function Features() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Features that slap</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to actually get stuff done. No fluff, just results.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative"
            >
              <div className="glass-card rounded-3xl p-6 h-full transition-all duration-300 hover:border-primary/30">
                {/* Gradient border on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`} />
                
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-4`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
