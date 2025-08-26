"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

import { 
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  Code2,
  Palette,
  Quote,
  ExternalLink,
  Github,
  Star,
  Mail,
  Linkedin,
  X,
  CheckCircle,
  Copy,
} from "lucide-react"



export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const [scrollYProgress, setScrollYProgress] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorTrail, setCursorTrail] = useState<Array<{ x: number; y: number }>>([])
  const [isLoading, setIsLoading] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement[]>([])



  // Handle scroll with enhanced animations
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      try {
        const scrollY = window.scrollY || 0
        const windowHeight = window.innerHeight || 0

        // Calculate scroll progress
        const documentHeight = document.documentElement?.scrollHeight || 0
        const progress = documentHeight > windowHeight ? scrollY / (documentHeight - windowHeight) : 0
        setScrollYProgress(progress)

        // Update current section based on actual section positions
        let newSection = 0
        if (sectionsRef.current && Array.isArray(sectionsRef.current)) {
          sectionsRef.current.forEach((section, index) => {
            if (!section) return
            try {
              const rect = section.getBoundingClientRect()
              if (rect && rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
                newSection = index
              }
            } catch (error) {
              console.warn('Error getting bounding rect for section:', error)
            }
          })
        }
        setCurrentSection(newSection)

        // Add parallax effects to background elements
        try {
          const backgroundElements = document.querySelectorAll('.parallax-bg')
          backgroundElements.forEach((el, index) => {
            if (el && 'style' in el) {
              const speed = 0.5 + (index * 0.1)
              const yPos = -(scrollY * speed)
              ;(el as HTMLElement).style.transform = `translateY(${yPos}px)`
            }
          })
        } catch (error) {
          console.warn('Error applying parallax effects:', error)
        }

        // Add rotation effects based on scroll
        try {
          const rotateElements = document.querySelectorAll('.rotate-on-scroll')
          rotateElements.forEach((el, index) => {
            if (el && 'style' in el) {
              const rotation = scrollY * 0.1 + (index * 45)
              ;(el as HTMLElement).style.transform = `rotate(${rotation}deg)`
            }
          })
        } catch (error) {
          console.warn('Error applying rotation effects:', error)
        }
      } catch (error) {
        console.warn('Error in handleScroll:', error)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mouse tracking and cursor trail
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleMouseMove = (e: MouseEvent) => {
      try {
        if (e && typeof e.clientX === 'number' && typeof e.clientY === 'number') {
          setMousePosition({ x: e.clientX, y: e.clientY })
          
          // Update cursor trail
          setCursorTrail(prev => {
            if (Array.isArray(prev)) {
              const newTrail = [...prev, { x: e.clientX, y: e.clientY }]
              return newTrail.slice(-10) // Keep last 10 positions
            }
            return [{ x: e.clientX, y: e.clientY }]
          })
        }
      } catch (error) {
        console.warn('Error in handleMouseMove:', error)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Handle loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Show loading for 2 seconds

    return () => clearTimeout(timer)
  }, [])

  const sections = [
    { id: "about", title: "About", icon: Palette, refIndex: 1 },
    { id: "skills", title: "Skills", icon: Code2, refIndex: 2 },
    { id: "services", title: "Services", icon: Code2, refIndex: 3 },
    { id: "testimonials", title: "Testimonials", icon: Quote, refIndex: 4 },
    { id: "faq", title: "FAQ", icon: Quote, refIndex: 5 },
  ]

  const projects = [
    {
      title: "AI-Powered Analytics Platform",
      description:
        "A comprehensive analytics solution that leverages machine learning to provide actionable insights from complex data sets.",
      category: "AI/ML",
      technologies: ["Python", "TensorFlow", "React", "Node.js", "PostgreSQL"],
      link: "#",
      github: "#",
      image: "/api/placeholder/1200/800/1a1a1a/6366f1?text=AI+Analytics",
    },
    {
      title: "Blockchain DeFi Protocol",
      description:
        "A decentralized finance protocol built on Ethereum that enables automated yield farming and liquidity provision.",
      category: "Blockchain",
      technologies: ["Solidity", "React", "Web3.js", "Hardhat", "TypeScript"],
      link: "#",
      github: "#",
      image: "/api/placeholder/1200/800/1a1a1a/8b5cf6?text=DeFi+Protocol",
    },
    {
      title: "Real-time Collaboration Tool",
      description:
        "A web-based collaboration platform with real-time editing, video conferencing, and project management features.",
      category: "Web App",
      technologies: ["React", "Socket.io", "Node.js", "MongoDB", "WebRTC"],
      link: "#",
      github: "#",
      image: "/api/placeholder/1200/800/1a1a1a/ec4899?text=Collaboration+Tool",
    },
  ]

  const skills = [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis", "Django", "Django Rest Framework", "FastAPI", "Express.js", "NestJS"] },
    { category: "Blockchain", items: ["Solidity", "Web3.js", "Hardhat", "Ethereum", "DeFi Protocols", "Ether.js", "IPFS", "Polygon", "BSC"] },
    { category: "DevOps", items: ["AWS", "Docker", "Digital Ocean", "Vercel", "Netlify", "Render", "Heroku"] },
  ]

  

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO at TechFlow",
      content:
        "Working with chryzcode was transformative. Their technical expertise and creative problem-solving delivered results beyond our expectations.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Founder of DeFi Labs",
      content:
        "The blockchain protocol chryzcode built for us is not just technically sound but also user-friendly. They understand both the tech and user experience.",
      rating: 5,
    },
    {
      name: "Dr. Emily Watson",
      role: "AI Research Lead",
      content:
        "chryzcode's AI implementation was crucial to our research success. They have a rare combination of technical depth and practical application skills.",
      rating: 5,
    },
  ]

  const faqs = [
    {
      question: "What technologies do you specialize in?",
      answer:
        "I specialize in modern web technologies (React, Next.js, Node.js), AI/ML (TensorFlow, OpenAI), and blockchain development (Solidity, DeFi protocols).",
    },
    {
      question: "Do you work with startups or only enterprise clients?",
      answer:
        "I work with both! I love helping startups build MVPs and scale, while also delivering enterprise-grade solutions for larger organizations.",
    },
    {
      question: "What's your typical project timeline?",
      answer:
        "Project timelines vary based on complexity. Simple web apps take 2-4 weeks, while complex AI platforms can take 3-6 months. I always provide detailed estimates upfront.",
    },
    {
      question: "Do you provide ongoing support after project completion?",
      answer:
        "Yes! I offer maintenance packages and ongoing support to ensure your project continues to perform optimally and stays up-to-date with the latest technologies.",
    },
  ]

  const sectionVariants = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Olanrewaju Alaba",
            "alternateName": "chryzcode",
            "jobTitle": "Full Stack Developer & Blockchain Expert",
            "description": "Freelance full-stack developer with 5+ years of experience in frontend, backend, blockchain development, and smart contracts",
            "url": "https://chryzcode.netlify.app/",
            "sameAs": [
              "https://cal.com/chryzcode",
              "https://github.com/chryzcode",
              "https://www.linkedin.com/in/olanrewaju-alaba",
              "https://x.com/chryzcode"
            ],
            "knowsAbout": [
              "Frontend Development",
              "Backend Development", 
              "Full Stack Development",
              "Blockchain Development",
              "Smart Contracts",
              "React",
              "Node.js",
              "Python",
              "PostgreSQL",
              "MongoDB",
              "Redis",
              "Django",
              "Django Rest Framework",
              "TypeScript",
              "Tailwind CSS",
              "Next.js",
              "Solidity",
              "Web3",
              "DeFi",
              "DevOps"
            ],
            "hasOccupation": {
              "@type": "Occupation",
              "name": "Software Developer",
              "occupationLocation": {
                "@type": "Place",
                "name": "Nigeria"
              }
            },
            "worksFor": {
              "@type": "Organization",
              "name": "chryzcode",
              "url": "https://chryzcode.netlify.app/"
            }
          })
        }}
      />

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
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-4xl font-bold text-white mb-4"
              >
                chryzcode
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-gray-400 text-lg"
              >
                Loading creative portfolio...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={containerRef} className="min-h-screen bg-black text-white overflow-x-hidden relative z-0">
      {/* Cursor Trail Effect */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {cursorTrail.map((pos, index) => (
          <motion.div
            key={index}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="absolute w-2 h-2 bg-white/60 rounded-full"
            style={{
              left: pos.x - 4,
              top: pos.y - 4,
            }}
          />
        ))}
      </div>

      {/* CRAZY Animated Background - Multiple Layers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute inset-0 bg-black" />
        
        {/* Layer 1: Floating Geometric Shapes */}
        <div className="absolute inset-0 parallax-bg">
          {/* Crazy rotating triangles */}
          <motion.div
            animate={{
              rotate: [0, 360, 720],
              scale: [1, 1.2, 1],
              x: [0, 50, -50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-20 h-20 border border-white/20 bg-white/5 rotate-on-scroll"
            style={{ 
              top: '15%', 
              left: '5%',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
            }}
          />
          
          {/* Bouncing squares */}
          <motion.div
            animate={{
              y: [0, -100, 0],
              rotate: [0, 180, 360],
              scale: [1, 0.8, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-16 h-16 border border-white/15 bg-white/5"
            style={{ top: '25%', right: '10%' }}
          />
          
          {/* Spinning hexagon */}
          <motion.div
            animate={{
              rotate: [0, 360],
              x: [0, 80, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-24 h-24 border border-white/20 bg-white/5"
            style={{ 
              top: '70%', 
              left: '20%',
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
            }}
          />
            </div>

        {/* Layer 2: Moving Lines and Grids */}
        <div className="absolute inset-0 parallax-bg" style={{ transform: 'translateZ(-10px)' }}>
          {/* Animated grid */}
          <motion.div
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
          
          {/* Floating lines that cross */}
          <motion.div
            animate={{
              rotate: [0, 45, 90, 135, 180],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-40 bg-gradient-to-b from-white/30 to-transparent"
            style={{ top: '30%', left: '60%' }}
          />
          
          <motion.div
            animate={{
              rotate: [180, 135, 90, 45, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-32 bg-gradient-to-b from-white/20 to-transparent"
            style={{ top: '60%', right: '30%' }}
          />
        </div>
        
        {/* Layer 3: Particle Effects */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
        <motion.div
              key={i}
              animate={{
                y: [0, -1000],
                x: [0, Math.sin(i) * 100],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 10 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
              className="absolute w-2 h-2 bg-white/40 rounded-full"
              style={{
                left: `${20 + (i * 4)}%`,
                top: `${30 + (i * 3)}%`,
              }}
            />
          ))}
        </div>

        {/* Layer 4: Glitch Effect */}
        <motion.div
          animate={{
            opacity: [0, 1, 0],
            x: [0, 2, -2, 0],
          }}
          transition={{
            duration: 0.1,
            repeat: Infinity,
            repeatDelay: 5,
          }}
          className="absolute inset-0 bg-white/5"
        />



        {/* Layer 6: Matrix Rain Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
          <motion.div
              key={`matrix-${i}`}
              animate={{
                y: [0, 1000],
              }}
              transition={{
                duration: 8 + (i % 4),
                repeat: Infinity,
                delay: i * 0.3,
                ease: "linear"
              }}
              className="absolute text-green-400/30 font-mono text-sm"
              style={{
                left: `${(i * 7) % 100}%`,
                top: '-20px',
              }}
            >
              {String.fromCharCode(0x30A0 + (i % 96))}
          </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-black/80 border-b border-white/10">
        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-white" style={{ width: `${scrollYProgress * 100}%` }} />
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white">chryzcode</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {sections.map((section) => (
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  key={section.id}
                  onClick={() => {
                    try {
                      const element = sectionsRef.current?.[section.refIndex]
                      if (element && typeof element.scrollIntoView === 'function') {
                        element.scrollIntoView({ behavior: "smooth", block: "start" })
                      }
                    } catch (error) {
                      console.warn('Error scrolling to section:', error)
                    }
                  }}
                  className={`text-sm tracking-wide transition-colors duration-300 ${
                    currentSection === section.refIndex ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {section.title}
                </motion.button>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden md:block">
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  try {
                    const contactSection = sectionsRef.current?.[6]
                    if (contactSection && typeof contactSection.scrollIntoView === 'function') {
                      contactSection.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                  } catch (error) {
                    console.warn('Error scrolling to contact section:', error)
                  }
                }}
                className="px-6 py-2 bg-white text-black hover:bg-gray-100 rounded-none text-sm font-medium transition-all duration-300 border border-white"
              >
                Contact
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1"
            >
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white block transition-all duration-300"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-white block transition-all duration-300"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white block transition-all duration-300"
              />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
                  <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black/95 border-t border-white/10 overflow-hidden"
            >
              <div className="px-6 py-4 space-y-4">
                {sections.map((section) => (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => {
                      try {
                        const element = sectionsRef.current?.[section.refIndex]
                        if (element && typeof element.scrollIntoView === 'function') {
                          // Close mobile menu first
                          setMobileMenuOpen(false)
                          // Use setTimeout to ensure menu closes before scrolling
                          setTimeout(() => {
                            try {
                              element.scrollIntoView({ 
                                behavior: "smooth", 
                                block: "start" 
                              })
                            } catch (error) {
                              console.warn('Error scrolling to section in mobile menu:', error)
                            }
                          }, 100)
                        }
                      } catch (error) {
                        console.warn('Error in mobile menu click handler:', error)
                      }
                    }}
                    className={`block w-full text-left py-3 px-4 text-sm tracking-wide transition-colors duration-300 ${
                      currentSection === section.refIndex ? "text-white bg-white/10" : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {section.title}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                                onClick={() => {
                try {
                  const contactSection = sectionsRef.current?.[6]
                  if (contactSection && typeof contactSection.scrollIntoView === 'function') {
                    // Close mobile menu first
                    setMobileMenuOpen(false)
                    // Use setTimeout to ensure menu closes before scrolling
                    setTimeout(() => {
                      try {
                        contactSection.scrollIntoView({ 
                          behavior: "smooth", 
                          block: "start" 
                        })
                      } catch (error) {
                        console.warn('Error scrolling to contact section in mobile menu:', error)
                      }
                    }, 100)
                  }
                } catch (error) {
                  console.warn('Error in mobile menu contact click handler:', error)
                }
              }}
                  className="w-full mt-4 px-6 py-3 bg-white text-black hover:bg-gray-100 rounded-none text-sm font-medium transition-all duration-300 border border-white"
                >
                  Contact
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section ref={(el) => {
        if (el) sectionsRef.current[0] = el as HTMLDivElement
      }} className="relative min-h-screen flex items-center justify-center px-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-8">
              <motion.a 
                href="https://cal.com/chryzcode" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 20px rgba(255,255,255,0.3)",
                  backgroundColor: "rgba(255,255,255,0.1)"
                }}
                onHoverStart={() => {
                  // Rotate the star when button is hovered
                  const star = document.querySelector('.star-icon') as HTMLElement
                  if (star) {
                    star.style.transform = 'rotate(180deg)'
                    star.style.transition = 'transform 0.6s ease-in-out'
                  }
                }}
                onHoverEnd={() => {
                  // Reset star rotation when hover ends
                  const star = document.querySelector('.star-icon') as HTMLElement
                  if (star) {
                    star.style.transform = 'rotate(0deg)'
                  }
                }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-none border border-white/30 bg-white/5 text-white text-sm tracking-wide hover:border-white/50 transition-all duration-300 group cursor-pointer"
              >
                {/* Green online indicator */}
            <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-3 h-3 bg-green-400 rounded-full border-2 border-black"
                />
                <div className="relative star-icon">
                  <Sparkles size={18} className="text-white" />
                </div>
                <span className="group-hover:text-white transition-colors">Available for new opportunities</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.a>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.9, delay: 0.1 }} 
              className="text-6xl md:text-8xl font-light tracking-tight mb-8 leading-none relative"
            >
              <motion.span 
                className="text-white inline-block"
                whileHover={{ 
                  scale: 1.05, 
                  textShadow: "0 0 20px rgba(255,255,255,0.8)",
                  filter: "blur(0px)"
                }}
                transition={{ duration: 0.3 }}
              >
                Creative
              </motion.span>
              <br />
              <motion.span 
                className="text-gray-300 inline-block"
                whileHover={{ 
                  scale: 1.05, 
                  textShadow: "0 0 20px rgba(255,255,255,0.6)",
                  filter: "blur(0px)"
                }}
                transition={{ duration: 0.3 }}
              >
                Developer
              </motion.span>
              

            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Crafting digital experiences that push the boundaries of what's possible. Full-stack developer specializing in AI, blockchain, and cutting-edge web technologies.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => {
                try {
                  const workSection = sectionsRef.current?.[1]
                  if (workSection && typeof workSection.scrollIntoView === 'function') {
                    workSection.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                } catch (error) {
                  console.warn('Error scrolling to work section:', error)
                }
              }} className="group px-8 py-4 bg-white text-black rounded-none font-medium tracking-wide flex items-center gap-3 hover:bg-gray-100 transition-all duration-300 border border-white">
                View My Work
                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
              
              <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}               onClick={() => {
                try {
                  const contactSection = sectionsRef.current?.[6]
                  if (contactSection && typeof contactSection.scrollIntoView === 'function') {
                    contactSection.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                } catch (error) {
                  console.warn('Error scrolling to contact section:', error)
                }
              }} className="px-8 py-4 border border-white/30 hover:border-white text-white font-medium tracking-wide transition-all duration-300">
                Get In Touch
              </motion.button>
                </div>
                </div>
                </div>

        {/* Scroll Indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="text-zinc-500 text-center flex flex-col items-center">
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex justify-center"
            >
              <ChevronDown size={24} />
            </motion.div>
            <div className="text-sm mt-2 tracking-wide text-center">Scroll to explore</div>
              </div>
            </motion.div>

        {/* Crazy floating elements around hero */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -50, 0],
                x: [0, Math.sin(i) * 30, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${40 + (i * 10)}%`,
              }}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <motion.section 
        ref={(el) => { if (el) sectionsRef.current[1] = el as HTMLDivElement }} 
        variants={sectionVariants} 
        initial="hidden" 
        whileInView="show" 
            viewport={{ once: true }}
        className="py-16 px-8 bg-zinc-900/20 scroll-mt-28 pt-28"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-5xl md:text-6xl font-light mb-4">
              About <span className="text-white">Me</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4 text-gray-300 leading-relaxed text-center">
              <p>
                Hi, I'm <span className="text-white font-semibold">Olanrewaju Alaba</span> -  <span className="text-white font-semibold">chryzcode</span>, a creative developer. I believe that the best digital experiences come from the perfect marriage of innovative technology and thoughtful design.
              </p>
              <p>
                As a <span className="text-white font-semibold">full-stack developer</span> with over <span className="text-white font-semibold">5 years of experience</span>, I specialize in <span className="text-white font-semibold">frontend development</span>, <span className="text-white font-semibold">backend development</span>, <span className="text-white font-semibold">blockchain development</span>, and <span className="text-white font-semibold">smart contracts</span>. I also have experience with <span className="text-white font-semibold">DevOps</span> practices to ensure seamless deployment and maintenance.
              </p>
              
              <div className="pt-2 pb-8">
                <Link 
                  href="/my-story"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 text-white font-medium rounded-none transition-all duration-300 group"
                >
                  Read My Full Story
                  <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section - Separate and Beautiful */}
      <motion.section 
        ref={(el) => { if (el) sectionsRef.current[2] = el as HTMLDivElement }} 
        variants={sectionVariants} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true }} 
        className="min-h-screen py-16 px-8 scroll-mt-28 pt-28"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-light mb-8 text-white"
            >
              Skills & <span className="text-white">Expertise</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              A comprehensive showcase of my technical capabilities across multiple domains.
            </motion.p>
          </div>
          
                    {/* Horizontal Scrolling Skills Bar - Ultra Compact */}
          <div className="space-y-8">
            {skills.map((skillCategory, categoryIndex) => (
              <motion.div 
                key={skillCategory.category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: categoryIndex * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Minimal Category Header */}
                <div className="flex items-center gap-3 mb-4 relative z-0">
                  <motion.h3 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: categoryIndex * 0.15 + 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="text-xl font-medium text-white whitespace-nowrap"
                  >
                    {skillCategory.category}
                  </motion.h3>
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: categoryIndex * 0.15 + 0.2, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="h-0.5 bg-white/60 flex-1"
                  />
                </div>
                
                {/* Horizontal Scrolling Skills */}
                <div className="relative group z-20">
                  {/* Scrollable wrapper that doesn't clip hover effects */}
                  <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex gap-2 pb-8 w-max">
                      {skillCategory.items.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: (categoryIndex * 0.15) + (skillIndex * 0.03), 
                            duration: 0.3
                          }}
                          viewport={{ once: true }}
                                                  whileHover={{ 
                        }}
                          className="group/skill cursor-pointer flex-shrink-0 relative z-10"
                        >
                          {/* Compact Skill Badge */}
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/20 rounded-full hover:border-white/40 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-2xl">
                            {/* Skill Icon */}
                            <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center group-hover/skill:bg-white/30 transition-all duration-300">
                              <span className="text-xs font-bold text-white">
                                {skill.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            
                            {/* Skill Name */}
                            <span className="text-sm text-gray-300 group-hover/skill:text-white transition-colors duration-300 font-medium whitespace-nowrap">
                              {skill}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Scroll Indicator */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-l from-black/80 to-transparent rounded-l-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* What I Do Section */}
      <motion.section 
        ref={(el) => { if (el) sectionsRef.current[3] = el as HTMLDivElement }} 
        variants={sectionVariants} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true }} 
        className="min-h-screen py-20 px-8 scroll-mt-28 pt-28"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light mb-6 text-white">
              What I <span className="text-white">Do</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Comprehensive development services to bring your digital vision to life.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Frontend Development",
                description: "Creating responsive, interactive user interfaces with modern frameworks like React, Next.js, and Vue.js. Focus on performance, accessibility, and user experience.",
                icon: "🎨",
                technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
              },
              {
                title: "Backend Development", 
                description: "Building robust server-side applications, APIs, and databases. Expertise in Node.js, Python, and various database technologies.",
                icon: "⚙️",
                technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis"]
              },
              {
                title: "Custom Web Applications",
                description: "End-to-end web application development from concept to deployment. Full-stack solutions tailored to your specific business needs.",
                icon: "🌐",
                technologies: ["Full Stack", "Custom Solutions", "Business Logic", "User Management", "API Integration"]
              },
              {
                title: "Website Development",
                description: "Professional websites that convert visitors into customers. SEO-optimized, fast-loading, and mobile-responsive designs.",
                icon: "💻",
                technologies: ["WordPress", "Custom CMS", "SEO", "Performance", "Mobile-First"]
              },
              {
                title: "Blockchain Smart Contract Development",
                description: "Developing secure, audited smart contracts for DeFi protocols, NFTs, and blockchain applications. Expert in Solidity and Web3 technologies.",
                icon: "⛓️",
                technologies: ["Solidity", "Web3.js", "Hardhat", "DeFi", "NFTs"]
              },
              {
                title: "Ongoing Support",
                description: "Comprehensive maintenance, updates, and technical support to keep your applications running smoothly and securely. Regular backups, security patches, and performance monitoring.",
                icon: "🔧",
                technologies: ["Maintenance", "Updates", "Security", "Monitoring", "Backups"]
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                whileHover={{ 
                  y: -8, 
                  rotateY: 5,
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.5)"
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className="group bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-8 hover:border-white/30 transition-all duration-500 overflow-hidden transform-gpu"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 group-hover:text-white transition-colors">{service.title}</h3>
                <p className="text-zinc-400 leading-relaxed mb-6">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-zinc-800/50 text-zinc-300 text-xs rounded-full border border-zinc-700/50">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Work Section */}
      <motion.section ref={(el) => { if (el) sectionsRef.current[3] = el as HTMLDivElement }} variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="min-h-screen py-20 px-8 scroll-mt-28 pt-28">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={sectionVariants} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light mb-6 text-white">
              Selected <span className="text-white">Work</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">A showcase of projects that demonstrate innovation, technical excellence, and real-world impact.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50, rotateY: -15, boxShadow: "0 0px 0px rgba(0,0,0,0)" }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                whileHover={{ 
                  y: -8, 
                  rotateY: 5,
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.5)"
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className="group bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-0 hover:border-white/30 transition-all duration-500 overflow-hidden transform-gpu"
              >
                {/* Project Image with hover effects */}
                <div className="relative">
                  <motion.img src={project.image} alt={project.title} className="w-full h-52 object-cover" initial={{ scale: 1 }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} />
                  <motion.div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0" whileHover={{ opacity: 1 }} transition={{ duration: 0.4 }} />
                  <motion.div className="absolute right-4 top-4 flex gap-2" initial={{ opacity: 0, y: -10 }} whileHover={{ opacity: 1, y: 0 }}>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="px-3 py-1 text-xs rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition">Live</a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-3 py-1 text-xs rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition">Code</a>
                  </motion.div>
                    </div>

                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-indigo-400 font-medium">{project.category}</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-white transition-colors">{project.title}</h3>
                  <p className="text-zinc-400 leading-relaxed mb-4">{project.description}</p>                
                    <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-zinc-800/50 text-zinc-300 text-xs rounded-full border border-zinc-700/50">
                          {tech}
                        </span>
                      ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section ref={(el) => { if (el) sectionsRef.current[4] = el as HTMLDivElement }} variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="min-h-screen py-20 px-8 scroll-mt-28 pt-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
                         <h2 className="text-5xl md:text-6xl font-light mb-6">
               Client <span className="text-white">Testimonials</span>
            </h2>
             <p className="text-xl text-gray-400 max-w-2xl mx-auto">Hear from clients about their experience working with me.</p>
                  </div>
                  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-8 hover:border-zinc-700/50 transition-all duration-500">
                <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                <blockquote className="text-zinc-300 leading-relaxed mb-6 italic">"{testimonial.content}"</blockquote>

                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-indigo-400">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section (Accordion) */}
      <motion.section ref={(el) => { if (el) sectionsRef.current[5] = el as HTMLDivElement }} variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="min-h-screen py-20 px-8 bg-zinc-900/20 scroll-mt-28 pt-28">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
                         <h2 className="text-5xl md:text-6xl font-light mb-6">
               Frequently Asked <span className="text-white">Questions</span>
            </h2>
             <p className="text-xl text-gray-400 max-w-2xl mx-auto">Common questions about my services and process.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const open = openFaq === index
              return (
                <div key={index} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl hover:border-zinc-700/50 transition-all duration-300">
                  <button onClick={() => setOpenFaq(open ? null : index)} className="w-full px-6 py-5 text-left flex items-center justify-between">
                    <span className="text-white font-medium">{faq.question}</span>
                    <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="text-zinc-400">
                      <ChevronDown size={18} />
                    </motion.span>
                </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden px-6">
                        <div className="pb-6 text-zinc-300 leading-relaxed">{faq.answer}</div>
              </motion.div>
                    )}
                  </AnimatePresence>
          </div>
              )
            })}
        </div>
        </div>
      </motion.section>

      {/* Contact Section (Enhanced) */}
      <motion.section ref={(el) => { if (el) sectionsRef.current[6] = el as HTMLDivElement }} variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="min-h-screen py-20 px-8 scroll-mt-28 pt-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
                         <h2 className="text-5xl md:text-6xl font-light mb-6">
               Let's <span className="text-white">Connect</span>
              </h2>
             <p className="text-xl text-gray-400 max-w-2xl mx-auto">Ready to bring your vision to life? Let's discuss how we can work together to create something extraordinary.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Card */}
            <motion.div whileHover={{ y: -2 }} className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/60 backdrop-blur">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Mail size={22} className="text-white" />
                </div>
                <div>
                  <div className="text-lg font-semibold">Email</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        try {
                          if (navigator?.clipboard?.writeText) {
                            navigator.clipboard.writeText("alabaolanrewaju13@gmail.com")
                          }
                        } catch (error) {
                          console.warn('Error copying email to clipboard:', error)
                        }
                      }}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      alabaolanrewaju13@gmail.com
                    </button>
                    <Copy size={16} className="text-gray-400 hover:text-white cursor-pointer" onClick={() => {
                      try {
                        if (navigator?.clipboard?.writeText) {
                          navigator.clipboard.writeText("alabaolanrewaju13@gmail.com")
                        }
                      } catch (error) {
                        console.warn('Error copying email to clipboard:', error)
                      }
                    }} />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Github size={22} className="text-white" />
              </div>
                <div>
                  <div className="text-lg font-semibold text-white">GitHub</div>
                  <a href="https://www.github.com/chryzcode" className="text-sm text-gray-300 hover:text-white transition-colors">chryzcode</a>
            </div>
        </div>

              
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Linkedin size={22} className="text-white" />
              </div>
                <div>
                  <div className="text-lg font-semibold text-white">LinkedIn</div>
                  <a href="https://www.linkedin.com/in/olanrewaju-alaba" className="text-sm text-gray-300 hover:text-white transition-colors">Olanrewaju Alaba</a>
            </div>
        </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <X size={22} className="text-white" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">X (Twitter)</div>
                  <a href="https://x.com/chryzcode" className="text-sm text-gray-300 hover:text-white transition-colors">@chryzcode</a>
              </div>
            </div>
            </motion.div>

            {/* Contact Form (non-functional demo) */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                alert("Thanks! This demo form doesn't submit yet—wire it to your API or service.")
              }}
              className="p-8 rounded-2xl bg-zinc-900/50 border border-white/20 backdrop-blur"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                  <label className="text-sm text-gray-400">Name</label>
                  <motion.input whileFocus={{ scale: 1.01 }} type="text" required className="mt-2 w-full px-4 py-3 rounded-lg bg-zinc-900 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-white" />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Email</label>
                  <motion.input whileFocus={{ scale: 1.01 }} type="email" required className="mt-2 w-full px-4 py-3 rounded-lg bg-zinc-900 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-white" />
                </div>
                </div>
              <div className="mt-6">
                <label className="text-sm text-gray-400">Purpose</label>
                <select className="mt-2 w-full px-4 py-3 rounded-lg bg-zinc-900 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-white">
                  <option>Development</option>
                  <option>Maintenance</option>
                  <option>Collaboration</option>
                  <option>Deployment</option>
                  <option>Consulting</option>
                  <option>Others</option>
                </select>
              </div>
              <div className="mt-6">
                <label className="text-sm text-gray-400">Message</label>
                <motion.textarea whileFocus={{ scale: 1.01 }} rows={6} className="mt-2 w-full px-4 py-3 rounded-lg bg-zinc-900 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-white" />
            </div>
              <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} type="submit" className="mt-8 w-full px-6 py-3 bg-white text-black hover:bg-gray-100 rounded-none font-medium transition-all duration-300 shadow-lg hover:shadow-xl border border-white">
                Start Your Project
              </motion.button>
              
            </form>
          </div>
        </div>
      </motion.section>

             {/* Footer */}
       <footer className="border-t border-white/10 bg-black/50 py-12 px-8">
         <div className="max-w-7xl mx-auto">
           <div className="flex flex-col md:flex-row items-center justify-between">
             <div className="mb-6 md:mb-0">
               <div className="text-2xl font-bold text-white mb-2">chryzcode</div>
               <p className="text-gray-400 text-sm">Crafting digital experiences that inspire and innovate.</p>
             </div>
 
             <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}              onClick={() => {
               try {
                 const contactSection = sectionsRef.current?.[6]
                 if (contactSection && typeof contactSection.scrollIntoView === 'function') {
                   contactSection.scrollIntoView({ behavior: "smooth", block: "start" })
                 }
               } catch (error) {
                 console.warn('Error scrolling to contact section from footer:', error)
               }
             }} className="px-8 py-3 bg-white text-black hover:bg-gray-100 rounded-none font-medium transition-all duration-300 border border-white">
               Let's Build Something Amazing
             </motion.button>
           </div>
 
           <div className="mt-8 pt-8 border-t border-white/10 text-center">
             <p className="text-gray-400 text-sm">© {new Date().getFullYear()} chryzcode. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <motion.button 
        whileHover={{ y: -2, scale: 1.1 }} 
        whileTap={{ scale: 0.95 }} 
        onClick={() => {
          try {
            if (typeof window !== 'undefined' && window.scrollTo) {
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
          } catch (error) {
            console.warn('Error scrolling to top:', error)
          }
        }} 
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-white text-black hover:bg-gray-100 rounded-none shadow-2xl flex items-center justify-center transition-all duration-300 border-2 border-white"
      >
        <ChevronDown size={24} className="rotate-180" />
      </motion.button>
    </div>
    </>
  )
}
