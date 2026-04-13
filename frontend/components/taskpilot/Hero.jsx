"use client"

import { motion } from "framer-motion"
import { Sparkles, Bell, MessageCircle, CheckCircle2, Zap } from "lucide-react"

const floatingElements = [
  { icon: CheckCircle2, label: "Task completed!", x: "10%", y: "20%", delay: 0 },
  { icon: Bell, label: "Reminder set", x: "85%", y: "15%", delay: 0.5 },
  { icon: MessageCircle, label: "You got this!", x: "5%", y: "70%", delay: 1 },
  { icon: Zap, label: "3 day streak!", x: "90%", y: "65%", delay: 1.5 },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-background to-blue-900/40 animate-gradient" />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />

      {/* Floating UI elements */}
      {floatingElements.map((item, index) => (
        <motion.div
          key={index}
          className="absolute hidden lg:flex items-center gap-2 glass-card rounded-2xl px-4 py-3"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { delay: item.delay + 0.5, duration: 0.5 },
            y: { delay: item.delay + 1, duration: 3, repeat: Infinity }
          }}
        >
          <item.icon className="w-5 h-5 text-primary" />
          <span className="text-sm text-foreground/80">{item.label}</span>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground/80">Your AI accountability partner</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="gradient-text">Stop Planning.</span>
          <br />
          <span className="text-foreground">Start Doing.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty"
        >
          TaskPilot keeps you accountable when motivation disappears.
          {"It's"} like having a friend who actually makes you do the thing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            // onClick={() => window.open("https://t.me/TasksPilotBot?start=1", "_blank")}
            onClick={() => {
              window.location.href = "https://web.telegram.org/k/#@TasksPilotBot";
            }}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-semibold text-white overflow-hidden"
          >
            <span className="relative z-10">Get Started</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 glass rounded-2xl font-semibold text-foreground hover:bg-white/10 transition-colors"
          >
            Try Demo
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "10K+", label: "Active users" },
            { value: "89%", label: "Task completion" },
            { value: "4.9", label: "User rating" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
