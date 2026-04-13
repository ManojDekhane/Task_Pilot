"use client"

import { motion } from "framer-motion"
import { Bot, User, CheckCircle, Clock, Flame } from "lucide-react"

const chatMessages = [
  {
    type: "bot",
    message: "Hey! Did you finish that project you mentioned yesterday? ",
    time: "2:30 PM",
  },
  {
    type: "user",
    message: "Uhh... not yet, I got distracted",
    time: "2:32 PM",
  },
  {
    type: "bot",
    message: "You said \"later\" yesterday too. What's blocking you? Let's break it down together.",
    time: "2:32 PM",
  },
  {
    type: "user",
    message: "You're right... I keep putting it off",
    time: "2:33 PM",
  },
  {
    type: "bot",
    message: "No judgment! Let's set a 25-min focus session right now. You in?",
    time: "2:33 PM",
  },
]

const taskItems = [
  { title: "Finish project proposal", status: "in-progress", streak: 3 },
  { title: "Review design mockups", status: "completed", streak: 7 },
  { title: "Send client update", status: "pending", streak: 0 },
]

export default function DemoPreview() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background effects */}
      <motion.div
        className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
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
            <span className="text-foreground">See it in </span>
            <span className="gradient-text">action</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {"Here's"} what {"it's"} like to have TaskPilot as your accountability buddy.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Chat Preview */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-6 overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">TaskPilot AI</h3>
                <p className="text-xs text-muted-foreground">Always here for you</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>

            <div className="space-y-4 max-h-80 overflow-y-auto">
              {chatMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex items-start gap-3 ${msg.type === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.type === "bot" 
                      ? "bg-gradient-to-r from-purple-500 to-blue-500" 
                      : "bg-muted"
                  }`}>
                    {msg.type === "bot" ? (
                      <Bot className="w-4 h-4 text-white" />
                    ) : (
                      <User className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className={`max-w-[75%] ${msg.type === "user" ? "text-right" : ""}`}>
                    <div className={`inline-block px-4 py-2 rounded-2xl ${
                      msg.type === "bot"
                        ? "bg-muted text-foreground rounded-tl-none"
                        : "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-tr-none"
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <h3 className="font-semibold text-foreground">{"Today's"} Tasks</h3>
              <div className="flex items-center gap-2 text-sm">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-muted-foreground">7 day streak</span>
              </div>
            </div>

            <div className="space-y-4">
              {taskItems.map((task, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 hover:bg-muted/80 transition-colors cursor-pointer"
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    task.status === "completed" 
                      ? "bg-green-500/20 text-green-500"
                      : task.status === "in-progress"
                      ? "bg-blue-500/20 text-blue-500"
                      : "bg-muted-foreground/20 text-muted-foreground"
                  }`}>
                    {task.status === "completed" ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      task.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"
                    }`}>
                      {task.title}
                    </p>
                  </div>
                  {task.streak > 0 && (
                    <div className="flex items-center gap-1 text-xs text-orange-500">
                      <Flame className="w-3 h-3" />
                      {task.streak}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Daily progress</span>
                <span className="font-semibold text-foreground">67%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "67%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
