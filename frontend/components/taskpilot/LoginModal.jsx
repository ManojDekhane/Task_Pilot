"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Lock, User, Github, Chrome } from "lucide-react"

export default function LoginModal({ isOpen, onClose, mode = "login" }) {
  const [currentMode, setCurrentMode] = useState(mode)
  const [focusedInput, setFocusedInput] = useState(null)

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md glass rounded-3xl p-8 neon-border"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </motion.button>

          {/* Header */}
          <div className="text-center mb-8">
            <motion.h2
              key={currentMode}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold gradient-text mb-2"
            >
              {currentMode === "login" ? "Welcome back!" : "Join TaskPilot"}
            </motion.h2>
            <p className="text-muted-foreground text-sm">
              {currentMode === "login" 
                ? "Ready to crush your goals?" 
                : "Start your productivity journey"}
            </p>
          </div>

          {/* Social buttons */}
          <div className="flex gap-3 mb-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm font-medium">GitHub</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
            >
              <Chrome className="w-5 h-5" />
              <span className="text-sm font-medium">Google</span>
            </motion.button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or continue with email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Form */}
          <form className="space-y-4">
            {currentMode === "signup" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="relative"
              >
                <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                  focusedInput === "name" ? "text-primary" : "text-muted-foreground"
                }`} />
                <input
                  type="text"
                  placeholder="Your name"
                  onFocus={() => setFocusedInput("name")}
                  onBlur={() => setFocusedInput(null)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                />
              </motion.div>
            )}

            <div className="relative">
              <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                focusedInput === "email" ? "text-primary" : "text-muted-foreground"
              }`} />
              <input
                type="email"
                placeholder="Email address"
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput(null)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="relative">
              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                focusedInput === "password" ? "text-primary" : "text-muted-foreground"
              }`} />
              <input
                type="password"
                placeholder="Password"
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput(null)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {currentMode === "login" && (
              <div className="flex justify-end">
                <button type="button" className="text-sm text-primary hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              {currentMode === "login" ? "Sign In" : "Create Account"}
            </motion.button>
          </form>

          {/* Toggle mode */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            {currentMode === "login" ? (
              <>
                {"Don't"} have an account?{" "}
                <button
                  onClick={() => setCurrentMode("signup")}
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setCurrentMode("login")}
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
