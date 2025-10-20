"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Calendar, MapPin, GraduationCap, Code, Users, BookOpen, Globe } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import CustomCursor from "@/components/CustomCursor"

export default function MyStory() {
  const [showBackgroundAnimations, setShowBackgroundAnimations] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Handle loading (optimized for faster LCP)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 400) // 400ms for excellent LCP

    return () => clearTimeout(timer)
  }, [])

  // Delay background animations to improve LCP
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBackgroundAnimations(true)
    }, 500) // Show background animations after 500ms for faster LCP

    return () => clearTimeout(timer)
  }, [])

  const storySections = [
    {
      title: "The COVID-19 Catalyst",
      content: "In 2020, when COVID-19 changed everything, I found myself with time to explore new passions. As an art student with a love for games, I was curious about how they were created. This curiosity led me to start with game development, marking the beginning of my tech journey.",
      icon: <Code className="w-6 h-6" />
    },
    {
      title: "Backend Foundations",
      content: "After a few months in game development, I pivoted to software development, starting with Python. I built small side projects and landed internships at HNG and Ingressive for Good (I4G). I learned Django REST Framework, building APIs and gaining real-world experience.",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: "Technical Writing & Knowledge Sharing",
      content: "Beyond development, I'm also a technical writer, creating content on technologies, products, technical API documentation, and more. This helps me stay updated with the latest trends while sharing knowledge with the community.",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: "Frontend & Full-Stack Growth",
      content: "To make my projects more visible and push them further, I learned frontend technologies - HTML, CSS, and JavaScript. I started getting small gigs, working for startups, and building experience. This led me to learn AWS, Digital Ocean, TypeScript, React, Next.js, and many more technologies as needed for projects.",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Professional Growth & Leadership",
      content: "My journey progressed from intern developer to junior developer, and eventually to lead developer. I worked based on contracts, remotely, part-time, full-time, and gigs. Each role taught me different aspects of development and project management.",
      icon: <GraduationCap className="w-6 h-6" />
    },
    {
      title: "Web3 & Blockchain Exploration",
      content: "When I discovered Web3, I was amazed by the possibilities in this field. I started learning blockchain technology, building on it, and exploring decentralized applications. This opened up a whole new world of opportunities and technical challenges.",
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: "Freelancing & Entrepreneurship",
      content: "I've been freelancing for a while, but in late 2024, I decided to take it to a whole new level. Through this, I've met diverse clients - local and international, startups, and personal entities. I've built SaaS platforms, blockchain solutions, landing page solutions, e-commerce platforms, e-learning solutions, and even freelancing solutions for tailors.",
      icon: <Code className="w-6 h-6" />
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white cursor-none overflow-x-hidden relative">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <motion.h1
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-4xl font-bold text-white mb-4"
              >
                chryzcode
              </motion.h1>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-gray-400 text-lg"
              >
                Loading my story...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Background */}
      {showBackgroundAnimations && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {/* Floating Geometric Shapes */}
          <div className="absolute inset-0">
            {/* Rotating triangle */}
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute w-16 h-16 border border-white/25 bg-white/10"
              style={{ 
                top: '15%', 
                left: '5%',
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                willChange: 'transform'
              }}
            />
            
            {/* Bouncing square */}
            <motion.div
              animate={{
                y: [0, -60, 0],
                scale: [1, 0.9, 1.1, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute w-12 h-12 border border-white/20 bg-white/8"
              style={{ 
                top: '25%', 
                right: '10%',
                willChange: 'transform'
              }}
            />
            
            {/* Spinning hexagon */}
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-20 h-20 border border-white/25 bg-white/10"
              style={{ 
                top: '70%', 
                left: '20%',
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                willChange: 'transform'
              }}
            />
          </div>

          {/* Particle Effects */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -600],
                  opacity: [0, 0.5, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 6 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut"
                }}
                className="absolute w-1.5 h-1.5 bg-white/50 rounded-full"
                style={{
                  left: `${25 + (i * 8)}%`,
                  top: `${35 + (i * 4)}%`,
                }}
              />
            ))}
          </div>

          {/* Matrix Rain Effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`matrix-${i}`}
                animate={{
                  y: [0, 600],
                }}
                transition={{
                  duration: 5 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "linear"
                }}
                className="absolute text-green-400/40 font-mono text-xs"
                style={{
                  left: `${(i * 15) % 100}%`,
                  top: '-20px',
                }}
              >
                {String.fromCharCode(0x30A0 + (i % 32))}
              </motion.div>
            ))}
          </div>
        </div>
      )}
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-black/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white cursor-pointer">chryzcode</Link>
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft size={20} />
              Back to Portfolio
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-light mb-6"
          >
            My <span className="text-white">Story</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-12"
          >
            From art student to self-taught developer: My journey from COVID-19 curiosity to building innovative solutions.
          </motion.p>
        </div>
      </section>

      {/* Personal Images & Work Environment */}
      <section className="py-20 px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-6">
              Behind the <span className="text-white">Code</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              My workspace, tools, and the environment where innovation happens
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* My Picture */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800/50"
            >
              <div className="aspect-square relative">
                <img 
                  src="/my-picture.jpeg" 
                  alt="Olanrewaju Alaba - Self-taught Developer" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-lg font-semibold text-white mb-1">Olanrewaju Alaba</h3>
                  <p className="text-sm text-gray-200">Self-taught Developer & Creator</p>
                </div>
              </div>
            </motion.div>

            {/* Work Station */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800/50"
            >
              <div className="aspect-square relative">
                <img 
                  src="/work-station.jpeg" 
                  alt="My Work Station - Where innovation happens" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-lg font-semibold text-white mb-1">Work Station</h3>
                  <p className="text-sm text-gray-200">Where innovation happens</p>
                </div>
              </div>
            </motion.div>

            {/* Starlink */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800/50"
            >
              <div className="aspect-square relative">
                <img 
                  src="/starlink.png" 
                  alt="Starlink - Global connectivity tool" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-lg font-semibold text-white mb-1">Starlink</h3>
                  <p className="text-sm text-gray-200">Global connectivity tool</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Sections */}
      <section className="py-20 px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-16">
            {storySections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="flex flex-col md:flex-row gap-8 items-start"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white">
                    {section.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-4">{section.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">{section.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Call to Action */}
      <section className="py-20 px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-light mb-6">
              Ready to <span className="text-white">Build Something Amazing?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              From SaaS platforms to blockchain solutions, e-commerce to e-learning - let's create innovative digital experiences together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="px-8 py-4 bg-white text-black hover:bg-gray-100 rounded-none font-medium tracking-wide transition-all duration-300 border border-white cursor-pointer"
              >
                Get In Touch
              </Link>
              <Link
                href="/#work"
                className="px-8 py-4 border border-white/30 hover:border-white text-white font-medium tracking-wide transition-all duration-300 cursor-pointer"
              >
                View My Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Custom Cursor */}
      <CustomCursor />
    </div>
  )
}
