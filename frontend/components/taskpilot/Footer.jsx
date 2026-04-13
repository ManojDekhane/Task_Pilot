"use client"

import { motion } from "framer-motion"
import { Rocket, Twitter, Github, Instagram, Heart } from "lucide-react"

const footerLinks = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Demo", "Roadmap"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Press"],
  },
  {
    title: "Resources",
    links: ["Help Center", "Community", "Guides", "API"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Cookies", "License"],
  },
]

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Instagram, href: "#", label: "Instagram" },
]

export default function Footer() {
  return (
    <footer className="relative py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">TaskPilot</span>
            </motion.a>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Your AI-powered accountability partner. Stop planning, start doing.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group, index) => (
            <div key={index}>
              <h4 className="font-semibold text-foreground mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 3 }}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 TaskPilot. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> for productive humans
          </p>
        </div>
      </div>
    </footer>
  )
}
