"use client"

import { motion } from "framer-motion"
import { PlusCircle, BellRing, Trophy } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: PlusCircle,
    title: "Add your goal",
    description: "Tell TaskPilot what you want to achieve. Big or small, we got you.",
  },
  {
    number: "02",
    icon: BellRing,
    title: "Get reminders & nudges",
    description: "Smart notifications that know when you need that extra push.",
  },
  {
    number: "03",
    icon: Trophy,
    title: "Stay consistent",
    description: "Watch your streak grow and celebrate your wins along the way.",
  },
]

export default function HowItWorks() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/2 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">How it </span>
            <span className="gradient-text">works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Three simple steps to become the productive person {"you've"} always wanted to be.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hidden lg:block transform -translate-y-1/2 opacity-30" />

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="glass-card rounded-3xl p-8 text-center relative z-10"
                >
                  {/* Step number */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                  >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold">
                      {step.number}
                    </span>
                  </motion.div>

                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 mb-6 mt-4"
                  >
                    <step.icon className="w-8 h-8 text-primary" />
                  </motion.div>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>

                {/* Arrow connector for mobile */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-4 lg:hidden">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.2 + 0.4 }}
                      className="w-0.5 h-8 bg-gradient-to-b from-purple-500 to-blue-500 opacity-50"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
