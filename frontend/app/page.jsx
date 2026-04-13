"use client"

import { useState } from "react"
import Navbar from "@/components/taskpilot/Navbar"
import Hero from "@/components/taskpilot/Hero"
import Features from "@/components/taskpilot/Features"
import HowItWorks from "@/components/taskpilot/HowItWorks"
import DemoPreview from "@/components/taskpilot/DemoPreview"
import WhyTaskPilot from "@/components/taskpilot/WhyTaskPilot"
import CTA from "@/components/taskpilot/CTA"
import LoginModal from "@/components/taskpilot/LoginModal"
import Footer from "@/components/taskpilot/Footer"

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [loginMode, setLoginMode] = useState("login")

  const handleLoginClick = (mode) => {
    setLoginMode(mode)
    setIsLoginOpen(true)
  }

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar onLoginClick={handleLoginClick} />
      
      <Hero />
      
      <section id="features">
        <Features />
      </section>
      
      <section id="how-it-works">
        <HowItWorks />
      </section>
      
      <section id="demo">
        <DemoPreview />
      </section>
      
      <section id="why-us">
        <WhyTaskPilot />
      </section>
      
      <CTA />
      
      <Footer />

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        mode={loginMode}
      />
    </main>
  )
}
