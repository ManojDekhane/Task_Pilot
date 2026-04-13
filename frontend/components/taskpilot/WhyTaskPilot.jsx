"use client"

import { motion } from "framer-motion"
import { Heart, Users, Shield, Zap, Sparkles, Check } from "lucide-react"

const reasons = [
  {
    icon: Zap,
    title: "No boring reminders",
    description: "Our AI knows when and how to nudge you. No spam, just smart timing.",
  },
  {
    icon: Heart,
    title: "Feels like a real companion",
    description: "TaskPilot actually gets you. It celebrates wins and picks you up when you slip.",
  },
  {
    icon: Shield,
    title: "Keeps you accountable",
    description: "No more excuses. TaskPilot remembers what you said and holds you to it.",
  },
  {
    icon: Users,
    title: "Built for real humans",
    description: "We know life happens. TaskPilot adapts to your pace, not the other way around.",
  },
]

const benefits = [
  "Track unlimited tasks",
  "AI-powered insights",
  "Custom reminder schedules",
  "Streak tracking",
  "Progress analytics",
  "Dark mode (obviously)",
]

export default function WhyTaskPilot() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-blue-900/10" />
      
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Why </span>
            <span className="gradient-text">TaskPilot?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {"We're"} not just another to-do app. {"We're"} the friend {"you've"} been needing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Reasons grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card rounded-2xl p-5"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex p-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 mb-3"
                >
                  <reason.icon className="w-5 h-5 text-primary" />
                </motion.div>
                <h3 className="font-semibold text-foreground mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Benefits list */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Everything you need</h3>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 pt-6 border-t border-border"
            >
              <p className="text-sm text-muted-foreground mb-4">
                Join thousands of productive humans
              </p>
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 border-2 border-background flex items-center justify-center text-xs font-bold text-white"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium text-muted-foreground">
                  +9k
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
