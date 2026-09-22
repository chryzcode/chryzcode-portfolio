"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Navigation from "@/components/Navigation"
import CustomCursor from "@/components/CustomCursor"

import { 
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Code2,
  ExternalLink,
  Github,
  Mail,
  Linkedin,
  Star,
  CheckCircle2,
  Terminal,
  Database,
  Layers,
  Cpu,
  HelpCircle,
  FolderGit2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe
} from "lucide-react"

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const [scrollYProgress, setScrollYProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showBackgroundAnimations, setShowBackgroundAnimations] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    purpose: 'Backend Engineering',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const containerRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement[]>([])

  // Track scroll position to update active navigation highlights
  useEffect(() => {
    if (typeof window === "undefined") return

    let ticking = false
    let lastScrollY = 0

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY || 0
          const windowHeight = window.innerHeight || 0

          if (Math.abs(scrollY - lastScrollY) < 10) {
            ticking = false
            return
          }
          lastScrollY = scrollY

          const documentHeight = document.documentElement?.scrollHeight || 0
          const progress = documentHeight > windowHeight ? scrollY / (documentHeight - windowHeight) : 0
          setScrollYProgress(progress)

          let newSection = 0
          if (sectionsRef.current) {
            sectionsRef.current.forEach((section, index) => {
              if (!section) return
              const rect = section.getBoundingClientRect()
              if (rect.top <= windowHeight * 0.4 && rect.bottom >= windowHeight * 0.4) {
                newSection = index
              }
            })
          }
          setCurrentSection(newSection)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 350)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBackgroundAnimations(true)
    }, 700)
    return () => clearTimeout(timer)
  }, [])

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...contactForm,
          to: 'alabaolanrewaju13@gmail.com'
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setContactForm({ name: '', email: '', purpose: 'Backend Engineering', message: '' })
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // 8 Exact Technical Skills Categories
  const technicalSkills = [
    {
      category: "Backend Engineering",
      icon: <Database size={16} className="text-white" />,
      skills: ["Python", "Django", "Django REST Framework", "FastAPI", "Node.js", "Express.js"]
    },
    {
      category: "Databases & Data",
      icon: <Layers size={16} className="text-white" />,
      skills: ["PostgreSQL", "MongoDB", "SQLite", "Prisma", "Mongoose", "Redis"]
    },
    {
      category: "Frontend Engineering",
      icon: <Code2 size={16} className="text-white" />,
      skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"]
    },
    {
      category: "Cloud & Infrastructure",
      icon: <Cpu size={16} className="text-white" />,
      skills: ["AWS", "Docker", "Celery", "Vercel", "Render", "Netlify", "DigitalOcean"]
    },
    {
      category: "Payments & Integrations",
      icon: <Terminal size={16} className="text-white" />,
      skills: ["Stripe", "PayPal", "Paystack", "REST APIs", "Webhooks", "OAuth"]
    },
    {
      category: "AI & Automation",
      icon: <Zap size={16} className="text-white" />,
      skills: ["OpenAI APIs", "AI integrations", "Python automation", "Web scraping"]
    },
    {
      category: "Blockchain",
      icon: <Globe size={16} className="text-white" />,
      skills: ["Solidity", "Smart Contracts", "Web3", "Ethers.js", "Hardhat", "DeFi integrations"]
    },
    {
      category: "Documentation & Collaboration",
      icon: <BookOpen size={16} className="text-white" />,
      skills: ["OpenAPI", "Swagger", "Postman", "Git", "Technical Documentation", "Jira"]
    }
  ]

  // 6 Primary Featured Projects (Instasew #1)
  const featuredProjects = [
    {
      number: "01",
      id: "instasew",
      title: "Instasew",
      subtitle: "Fashion Marketplace Platform",
      category: "Marketplace / Backend Engineering",
      projectType: "Company Project",
      description: "A multi-sided fashion marketplace platform designed to connect bespoke fashion designers, clients, and logistics carriers with real-time bidding, order tracking, and escrow-backed payouts.",
      keyContributions: [
        "Owned backend architecture and production delivery for the marketplace platform.",
        "Built and maintained Django and Django REST Framework services.",
        "Designed PostgreSQL data models and business workflows.",
        "Implemented background processing using Redis and Celery.",
        "Worked on payments, wallet payouts, subscriptions, messaging, bidding, and negotiation.",
        "Supported AWS production and testing environments.",
        "Contributed to a platform serving approximately 200 users."
      ],
      technologies: ["Python", "Django", "Django REST Framework", "PostgreSQL", "Redis", "Celery", "AWS", "Stripe"],
      caseStudyUrl: "/case-study/instasew",
      buttonText: "View Case Study",
      isInternalCaseStudy: true,
      image: null // Render sleek architectural visual preview
    },
    {
      number: "02",
      id: "nexapay",
      title: "NexaPay",
      subtitle: "Cross-Chain Payment Platform",
      category: "FinTech / Blockchain",
      projectType: "Personal Project",
      description: "A blockchain payment platform designed to support payments across multiple networks and chains.",
      keyContributions: [
        "Built the application using Next.js and TypeScript.",
        "Worked with Solidity smart contracts.",
        "Integrated blockchain transactions and wallet interactions.",
        "Implemented cross-chain payment functionality using Stargate.",
        "Worked with testnet and mainnet environments.",
        "Implemented a platform transaction fee model."
      ],
      technologies: ["Next.js", "TypeScript", "Solidity", "Web3", "Smart Contracts", "Stargate"],
      liveUrl: "https://nexapay.vercel.app/",
      caseStudyUrl: "/case-study/nexapay",
      buttonText: "View Project",
      image: "/nexapay-proj.png"
    },
    {
      number: "03",
      id: "essay-revive",
      title: "Essay Revive",
      subtitle: "AI Writing Assistant",
      category: "AI / Web Application",
      projectType: "Client Project",
      description: "An AI-powered writing assistant application designed to help users generate, structure, and refine academic and professional essays with seamless content generation workflows.",
      keyContributions: [
        "Integrated AI functionality into a web application.",
        "Built application workflows around content generation.",
        "Worked on the user interface and application experience.",
        "Integrated payment functionality for paid access.",
        "Delivered the MVP for a client."
      ],
      technologies: ["Next.js", "TypeScript", "AI APIs", "MongoDB", "Stripe"],
      liveUrl: "https://aja-pro-tools.vercel.app/",
      buttonText: "View Project",
      image: "/ai_powered_mla_proj.png"
    },
    {
      number: "04",
      id: "clearpeak",
      title: "ClearPeak Trading",
      subtitle: "Trading Analytics SaaS",
      category: "SaaS / FinTech",
      projectType: "Client Project",
      description: "A subscription-based trading analytics platform offering performance indicators and paid access to specialized tools.",
      keyContributions: [
        "Built the application using Next.js and TypeScript.",
        "Implemented authentication using Auth.js.",
        "Used Prisma and PostgreSQL for data management.",
        "Integrated Stripe subscriptions.",
        "Implemented Stripe webhook handling.",
        "Worked with subscription lifecycle events.",
        "Integrated Brevo for email communication."
      ],
      technologies: ["Next.js", "TypeScript", "Auth.js", "Prisma", "PostgreSQL", "Stripe", "Brevo"],
      liveUrl: "https://www.clearpeaktrading.com/",
      caseStudyUrl: "/case-study/clearpeak",
      buttonText: "View Project",
      image: "/clearpeak-trading-proj.png"
    },
    {
      number: "05",
      id: "travel-leaf",
      title: "Travel Leaf APIs",
      subtitle: "Rental Marketplace API",
      category: "Backend / REST API",
      projectType: "Client Project",
      description: "A backend API for a platform connecting users with owners of houses, yachts, and vehicles for rental, leasing, and booking workflows.",
      keyContributions: [
        "Built REST API functionality with Node.js and Express.",
        "Implemented authentication and authorization workflows.",
        "Worked with JWT and Google OAuth authentication.",
        "Integrated MongoDB through Mongoose.",
        "Added file upload and Cloudinary integration.",
        "Integrated Stripe payment functionality.",
        "Implemented email and account verification workflows.",
        "Added security middleware, rate limiting, and request protection.",
        "Prepared API documentation for developers."
      ],
      technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "Google OAuth", "Stripe", "Cloudinary"],
      liveUrl: "https://github.com/chryzcode",
      buttonText: "View API Documentation",
      image: "/travel-leaf-api-proj.png"
    },
    {
      number: "06",
      id: "fwc26",
      title: "FWC26 Marketing Group",
      subtitle: "Business Consulting Platform",
      category: "Business Consulting / Web Application",
      projectType: "Client Project",
      description: "A business consulting platform helping entrepreneurs and small businesses explore opportunities connected to the FIFA 2026 ecosystem in Toronto and Vancouver.",
      keyContributions: [
        "Built the platform with Next.js, React, and TypeScript.",
        "Integrated Stripe payments.",
        "Integrated Calendly for consultation bookings.",
        "Connected OpenAI-powered live chat functionality.",
        "Integrated Mailchimp for marketing communication.",
        "Implemented payment and email workflows.",
        "Added input validation and rate-limiting measures.",
        "Deployed the application using Vercel."
      ],
      technologies: ["Next.js", "React", "TypeScript", "MongoDB", "Stripe", "Calendly", "OpenAI API", "Mailchimp", "Vercel"],
      liveUrl: "https://fwc26-project.vercel.app/",
      buttonText: "View Project",
      image: "/fwc26-proj.png"
    }
  ]

  // Remaining Projects (Smaller Cards)
  const moreProjects = [
    {
      title: "AssetFlow",
      projectType: "Personal Project",
      description: "Blockchain asset management and ownership transfer platform.",
      technologies: ["Next.js", "Firebase", "Solidity", "Tailwind CSS"],
      link: "https://assetflow-site.vercel.app/"
    },
    {
      title: "MathPoint",
      projectType: "Client Project",
      description: "Mathematics learning and problem-solving platform.",
      technologies: ["TypeScript", "Next.js", "MongoDB", "Stripe"],
      link: "https://math-point.vercel.app/"
    },
    {
      title: "YCSYH",
      projectType: "Client Project",
      description: "Beat-selling e-commerce platform with file delivery and PDF license generation.",
      technologies: ["Next.js", "Stripe", "TypeScript", "PDF Engine"],
      link: "https://www.heardmusicycsyh.com/"
    },
    {
      title: "CVBuild",
      projectType: "Personal Project",
      description: "Resume and portfolio-building platform.",
      technologies: ["Python", "Django", "DRF", "PostgreSQL"],
      link: "https://cvbuild.onrender.com/"
    },
    {
      title: "TokenForge",
      projectType: "Personal Project",
      description: "ERC-20 token implementation using Solidity and OpenZeppelin.",
      technologies: ["Solidity", "Hardhat", "Ethers.js", "OpenZeppelin"],
      link: "https://token-forge-app.vercel.app/"
    }
  ]

  // Experience timeline data matching resume and exact copy instructions
  const experienceData = [
    {
      role: "Backend / Full-Stack Engineer",
      company: "Instasew",
      period: "2024 – Present",
      bullets: [
        "Owned backend architecture and production delivery for a fashion marketplace.",
        "Built and maintained Django and Django REST Framework services.",
        "Designed PostgreSQL data models and business workflows.",
        "Implemented background processing using Redis and Celery.",
        "Worked on payments, wallet payouts, subscriptions, messaging, bidding, and negotiation.",
        "Supported AWS production and testing environments.",
        "Contributed to a platform serving approximately 200 users."
      ]
    },
    {
      role: "Backend Engineer",
      company: "InstinctHub",
      period: "Nov 2023 – May 2024",
      bullets: [
        "Led backend development, building robust APIs, securing infrastructure, and designing core database layers.",
        "Integrated payment gateways (Paystack, PayPal) and USSD systems via Africa's Talking platforms for accessible transactions.",
        "Shipped features like 'Scoreboard' for the core EdTech application, improving student interaction and platform metrics."
      ]
    },
    {
      role: "Backend Engineer (Contract)",
      company: "Bizconnect",
      period: "2024",
      bullets: [
        "Built background automated systems enabling users to extract LinkedIn data, manage lead targets, and schedule email campaigns.",
        "Integrated secure subscription checkouts via Stripe, mapping role-based access permissions dynamically across the database.",
        "Hosted infrastructure components on AWS, tuning configurations for scalability and load protection."
      ]
    }
  ]

  // Testimonials
  const testimonials = [
    {
      name: "DynastyCorp",
      location: "Canada",
      content: "It was a pleasure working with Olanrewaju. He demonstrated strong communication skills and a great ability to follow direction. Most importantly, we collaborated effectively to achieve our vision."
    },
    {
      name: "merrelhurd",
      location: "United Kingdom",
      content: "I couldn't be happier with the work. Communication was clear, professional, and consistent. They went above and beyond to solve unexpected challenges, explained solutions clearly, and made sure everything worked exactly as promised. Highly recommended."
    },
    {
      name: "SirRelbert",
      location: "United States",
      content: "Was able to solve my coding problem with my smart contract. Very knowledgeable, would recommend him and will continue to use him for future projects. Thank you."
    }
  ]

  // FAQ Section
  const faqs = [
    {
      question: "What kind of systems do you build?",
      answer: "I build backend services, APIs, SaaS platforms, marketplaces, payment-enabled applications, and full-stack web products."
    },
    {
      question: "What is your primary technology stack?",
      answer: "My primary backend stack is Python, Django, Django REST Framework, PostgreSQL, Redis, Celery, and AWS. I also work with React, Next.js, and TypeScript for full-stack applications."
    },
    {
      question: "Do you work across the full stack?",
      answer: "Yes. My strongest area is backend engineering, but I also build frontend applications using React, Next.js, and TypeScript."
    },
    {
      question: "Do you have production experience?",
      answer: "Yes. I have worked on real applications involving users, payments, subscriptions, third-party integrations, background processing, deployments, and ongoing product workflows."
    },
    {
      question: "Can you work with an existing engineering team?",
      answer: "Yes. I can contribute to existing codebases, develop APIs and features, improve architecture, integrate external services, and collaborate with product and engineering teams."
    }
  ]

  const sectionVariants = {
    hidden: { opacity: 0, y: 35 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
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
            "jobTitle": "Backend / Full-Stack Software Engineer",
            "description": "Backend / Full-Stack Software Engineer with 5+ years of experience building practical, production-focused software, APIs, SaaS platforms, and marketplaces using Python, Django, PostgreSQL, AWS, and Next.js.",
            "url": "https://chryzcode.netlify.app/",
            "sameAs": [
              "https://github.com/chryzcode",
              "https://www.linkedin.com/in/olanrewaju-alaba",
              "https://x.com/chryzcode"
            ],
            "knowsAbout": [
              "Backend Engineering",
              "Full-Stack Development",
              "Python",
              "Django",
              "Django REST Framework",
              "PostgreSQL",
              "Redis",
              "Celery",
              "AWS",
              "Next.js",
              "TypeScript",
              "Stripe Integrations",
              "REST APIs"
            ]
          })
        }}
      />

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <div className="text-center">
              <h1 className="text-3xl font-mono text-white tracking-widest uppercase mb-2">chryzcode</h1>
              <p className="text-zinc-500 text-sm font-mono">Loading engineering portfolio...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={containerRef} className="min-h-screen bg-black text-white overflow-x-hidden relative z-0 cursor-none selection:bg-white selection:text-black">
        <Navigation />

        {/* Parallax Background Grid */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute inset-0 bg-black" />
          {showBackgroundAnimations && (
            <div className="absolute inset-0 opacity-10">
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: '80px 80px'
                }}
              />
            </div>
          )}
        </div>

        {/* HERO SECTION */}
        <section id="home" className="relative min-h-screen flex flex-col justify-between px-6 py-20 md:px-12">
          <div className="flex-grow flex items-center justify-center">
            <div className="text-center max-w-4xl mx-auto pt-16">
              
              {/* Online / Hiring Status Indicator */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }} 
                className="mb-8"
              >
                <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs tracking-wider uppercase font-mono">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Open to Backend & Full-Stack Opportunities
                </div>
              </motion.div>
              
              {/* Engineering Title */}
              <motion.h1 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight mb-6 font-sans text-white leading-none uppercase"
              >
                Backend / Full-Stack<br />
                <span className="text-zinc-500 font-light">Software Engineer</span>
              </motion.h1>

              {/* Production-Focused Positioning Copy */}
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed font-mono"
              >
                I build practical, production-focused software, backend systems, APIs, and web applications using Python, Django, PostgreSQL, and modern cloud infrastructure.
              </motion.p>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center font-mono"
              >
                <a 
                  href="#work"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 text-sm font-semibold tracking-wider uppercase"
                >
                  View My Work
                  <ArrowUpRight size={16} />
                </a>
                
                <a 
                  href="#contact"
                  className="w-full sm:w-auto px-8 py-4 border border-zinc-700 hover:border-white text-white hover:bg-zinc-900 transition-all flex items-center justify-center gap-2 text-sm tracking-wider uppercase"
                >
                  Get In Touch
                </a>
              </motion.div>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div 
            className="relative z-10 flex flex-col items-center gap-3 text-zinc-500 hover:text-white transition-colors duration-300 font-mono text-[10px] tracking-widest uppercase cursor-pointer mt-8"
            onClick={() => {
              const target = document.getElementById('about');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Scroll to explore</span>
            <div className="w-[18px] h-[30px] border border-zinc-700 rounded-full flex justify-center p-1">
              <motion.div 
                animate={{ 
                  y: [0, 8, 0],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-1 h-1.5 bg-zinc-400 rounded-full"
              />
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <motion.section 
          id="about" 
          ref={(el) => { if (el) sectionsRef.current[0] = el as HTMLDivElement }} 
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-6 md:px-12 border-t border-zinc-900 bg-zinc-950/20 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">01 // Profile</h2>
              <h3 className="text-4xl font-normal text-white uppercase tracking-tight">About Me</h3>
            </div>
            
            <div className="lg:col-span-2 space-y-6 text-zinc-400 text-base md:text-lg leading-relaxed font-sans">
              <p>
                I'm <strong className="text-white font-medium">Olanrewaju Alaba — Chryzcode</strong>, a backend-focused full-stack software engineer building practical, production-focused software with 5+ years of engineering experience.
              </p>
              <p>
                My primary backend stack is <strong className="text-white font-medium">Python, Django, Django REST Framework, PostgreSQL, Redis, Celery, and AWS</strong>. I specialize in designing transactional database models, high-throughput APIs, background workers, and resilient cloud architectures.
              </p>
              <p>
                I also build full-stack web applications using <strong className="text-white font-medium">React, Next.js, and TypeScript</strong>, integrating Stripe billing, authentication, and external services. I have architected and built the core systems across almost all projects featured in this portfolio, delivering production software for both client platforms and specialized engineering products.
              </p>
              <p>
                Whether designing a multi-sided marketplace backend like Instasew, cross-chain payment pipelines, or data-intensive SaaS platforms, my focus is always on engineering integrity, clean architecture, and reliable production execution.
              </p>
              
              <div className="pt-4 font-mono">
                <Link 
                  href="/my-story"
                  className="inline-flex items-center gap-2 text-white hover:text-zinc-300 border-b border-white pb-1 text-sm tracking-wider uppercase transition-colors"
                >
                  Read My Full Story
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 7. TECHNICAL SKILLS SECTION */}
        <motion.section 
          id="skills" 
          ref={(el) => { if (el) sectionsRef.current[1] = el as HTMLDivElement }}
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-6 md:px-12 border-t border-zinc-900 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">02 // Capabilities</h2>
              <h3 className="text-4xl font-normal text-white uppercase tracking-tight">Technical Skills</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {technicalSkills.map((cat, index) => (
                <div 
                  key={index} 
                  className="p-6 bg-zinc-950 border border-zinc-900 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-5 pb-3 border-b border-zinc-900">
                      <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                        {cat.icon}
                      </div>
                      <h4 className="text-xs font-mono text-zinc-200 uppercase tracking-widest font-semibold leading-tight">
                        {cat.category}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill, sIdx) => (
                        <span 
                          key={sIdx} 
                          className="px-2.5 py-1 text-xs font-mono bg-zinc-900/50 border border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SELECTED WORK SECTION (6 MAIN PROJECTS) */}
        <motion.section 
          id="work" 
          ref={(el) => { if (el) sectionsRef.current[2] = el as HTMLDivElement }}
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-6 md:px-12 border-t border-zinc-900 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">03 // Engineering Portfolio</h2>
              <h3 className="text-4xl font-normal text-white uppercase tracking-tight">Selected Work</h3>
              <p className="text-zinc-500 text-sm font-mono mt-2">
                Featured systems, marketplace architectures, APIs, and SaaS products.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12">
              {featuredProjects.map((project) => (
                <div 
                  key={project.id}
                  className="bg-zinc-950 border border-zinc-900 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 hover:border-zinc-800 transition-colors"
                >
                  {/* Left: Metadata & Descriptions */}
                  <div className="p-8 lg:p-10 lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                          {project.number} — {project.category}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border border-zinc-800 text-zinc-400 bg-zinc-900/50">
                          {project.projectType}
                        </span>
                      </div>
                      
                      <h4 className="text-2xl sm:text-3xl font-normal text-white mb-2 uppercase">
                        {project.title}
                      </h4>
                      <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-6">
                        {project.subtitle}
                      </p>
                      
                      <div className="space-y-4 text-sm text-zinc-400 leading-relaxed font-sans mb-8">
                        <p className="text-zinc-300">
                          {project.description}
                        </p>

                        <div>
                          <span className="text-white font-mono text-xs uppercase tracking-wider block mb-3 font-semibold">
                            Key Contributions
                          </span>
                          <ul className="space-y-2">
                            {project.keyContributions.map((contrib, cIdx) => (
                              <li key={cIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-400">
                                <span className="text-zinc-600 shrink-0 font-mono">›</span>
                                <span>{contrib}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-2 mb-8 pt-4 border-t border-zinc-900">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="px-2.5 py-1 bg-zinc-900 text-zinc-400 text-xs font-mono border border-zinc-800">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex flex-wrap items-center gap-4">
                        {project.caseStudyUrl && (
                          <Link
                            href={project.caseStudyUrl}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-zinc-200 transition-colors font-mono text-xs uppercase tracking-widest font-semibold"
                          >
                            View Case Study
                            <ArrowRight size={14} />
                          </Link>
                        )}

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-6 py-3 border font-mono text-xs uppercase tracking-widest transition-all ${
                              !project.caseStudyUrl 
                                ? 'bg-white text-black hover:bg-zinc-200 border-white font-semibold' 
                                : 'border-zinc-800 hover:border-white text-white hover:bg-zinc-900'
                            }`}
                          >
                            {project.buttonText}
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Preview Visual */}
                  <div className="lg:col-span-5 relative bg-zinc-900/60 border-t lg:border-t-0 lg:border-l border-zinc-900 flex items-center justify-center p-6 group overflow-hidden">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full max-h-[420px] object-cover object-top filter grayscale contrast-110 opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" 
                      />
                    ) : (
                      // Instasew Visual Schematic
                      <div className="w-full h-full min-h-[300px] p-6 bg-zinc-950 border border-zinc-800/80 font-mono text-xs text-zinc-400 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
                            <span className="text-white uppercase font-semibold flex items-center gap-2">
                              <Terminal size={14} /> Marketplace Architecture
                            </span>
                            <span className="text-emerald-400 text-[10px] uppercase tracking-wider">● Production</span>
                          </div>
                          <pre className="text-[11px] text-zinc-300 leading-relaxed overflow-x-auto">
{`[Django REST API Engine]
   ├── PostgreSQL (ACID Data Models)
   ├── Redis + Celery (Async Queue)
   ├── Stripe & Escrow Wallet Service
   ├── DHL Shipping Webhooks
   └── AWS Production Cloud`}
                          </pre>
                        </div>
                        <div className="pt-4 border-t border-zinc-900 flex justify-between items-center text-[10px] text-zinc-500 uppercase">
                          <span>~200 Active Users</span>
                          <span>Bespoke Logistics</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 6. MORE PROJECTS SECTION */}
        <motion.section 
          id="more-projects"
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-6 md:px-12 border-t border-zinc-900 bg-zinc-950/20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-14">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">Secondary Work</h2>
              <h3 className="text-4xl font-normal text-white uppercase tracking-tight">More Projects</h3>
              <p className="text-zinc-500 text-sm font-mono mt-2">
                Additional web applications, APIs, smart contract tools, and utilities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {moreProjects.map((p, idx) => (
                <div 
                  key={idx} 
                  className="p-6 bg-zinc-950 border border-zinc-900 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between h-56 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                        {p.projectType}
                      </span>
                      {p.link && (
                        <a 
                          href={p.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-zinc-500 hover:text-white transition-colors"
                          aria-label={`Visit ${p.title}`}
                        >
                          <ArrowUpRight size={16} />
                        </a>
                      )}
                    </div>
                    <h4 className="text-lg font-normal text-white uppercase group-hover:text-zinc-200 transition-colors mb-2">
                      {p.title}
                    </h4>
                    <p className="text-zinc-400 text-xs leading-relaxed font-sans mb-4">
                      {p.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-900">
                      {p.technologies.map(t => (
                        <span key={t} className="text-[10px] font-mono text-zinc-400 bg-zinc-900/60 px-2 py-0.5 border border-zinc-800">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 8. EXPERIENCE SECTION (Placed BEFORE Testimonials) */}
        <motion.section 
          id="experience" 
          ref={(el) => { if (el) sectionsRef.current[3] = el as HTMLDivElement }}
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-6 md:px-12 border-t border-zinc-900 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">04 // Employment</h2>
              <h3 className="text-4xl font-normal text-white uppercase tracking-tight">Experience</h3>
              <p className="text-zinc-500 text-sm font-mono mt-4 leading-relaxed">
                Professional engineering experience, systems architecture, and production delivery.
              </p>
            </div>
            
            <div className="lg:col-span-2 space-y-12 font-sans text-sm md:text-base">
              {experienceData.map((exp, idx) => (
                <div key={idx} className="border-l-2 border-zinc-800 pl-6 relative">
                  {/* Timeline indicator node */}
                  <div className="absolute w-3.5 h-3.5 bg-black border border-white rounded-full -left-[8px] top-1.5" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 font-mono">
                    <div>
                      <h4 className="text-lg font-bold text-white uppercase tracking-wide">{exp.role}</h4>
                      <div className="text-zinc-400 text-sm">{exp.company}</div>
                    </div>
                    <div className="text-xs text-zinc-500">{exp.period}</div>
                  </div>
                  
                  <ul className="space-y-3 text-zinc-400 list-disc pl-4 leading-relaxed">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 9. TESTIMONIALS SECTION */}
        <motion.section 
          id="testimonials"
          ref={(el) => { if (el) sectionsRef.current[4] = el as HTMLDivElement }}
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-6 md:px-12 border-t border-zinc-900 bg-zinc-950/20 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">05 // Endorsements</h2>
              <h3 className="text-4xl font-normal text-white uppercase tracking-tight">What Clients Say</h3>
              <p className="text-zinc-500 text-sm font-mono mt-2">
                Feedback from clients and collaborators I’ve worked with across different projects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, idx) => (
                <div key={idx} className="p-8 bg-zinc-950 border border-zinc-900 flex flex-col justify-between h-80 font-sans">
                  <div>
                    <div className="flex gap-1 mb-4 text-white">
                      {[...Array(5)].map((_, sIdx) => <Star key={sIdx} size={14} className="fill-current" />)}
                    </div>
                    <blockquote className="text-zinc-300 text-sm leading-relaxed italic">
                      "{t.content}"
                    </blockquote>
                  </div>
                  <div className="font-mono text-xs pt-4 border-t border-zinc-900">
                    <span className="text-white block font-bold uppercase">{t.name}</span>
                    <span className="text-zinc-500">{t.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 10. FAQ SECTION */}
        <motion.section 
          id="faq"
          ref={(el) => { if (el) sectionsRef.current[5] = el as HTMLDivElement }}
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-6 md:px-12 border-t border-zinc-900 scroll-mt-20"
        >
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">06 // Inquiries</h2>
              <h3 className="text-4xl font-normal text-white uppercase tracking-tight">Frequently Asked Questions</h3>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx
                return (
                  <div 
                    key={idx}
                    className="border border-zinc-900 bg-zinc-950 transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 font-mono text-sm sm:text-base text-white hover:text-zinc-300 transition-colors"
                    >
                      <span className="font-medium">{faq.question}</span>
                      <span className="text-zinc-500 shrink-0">
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </span>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 text-sm text-zinc-400 leading-relaxed font-sans border-t border-zinc-900/60">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.section>

        {/* 11. CONTACT SECTION */}
        <motion.section 
          id="contact" 
          ref={(el) => { if (el) sectionsRef.current[6] = el as HTMLDivElement }}
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 px-6 md:px-12 border-t border-zinc-900 bg-zinc-950/30 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center lg:text-left">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">07 // Collaboration</h2>
              <h3 className="text-4xl font-normal text-white uppercase tracking-tight">Let’s Build Something Useful</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column info */}
              <div className="lg:col-span-5 space-y-8 font-mono">
                <p className="text-zinc-300 text-base md:text-lg leading-relaxed font-sans">
                  Have a product to build, an existing system to improve, or a backend problem to solve?
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                  I’m open to backend engineering, full-stack development, product collaborations, and selected freelance opportunities.
                </p>

                <div className="grid grid-cols-[100px_1fr] gap-y-3.5 items-baseline text-sm border-t border-zinc-900 pt-6 font-mono">
                  <span className="text-zinc-500">EMAIL</span>
                  <a href="mailto:alabaolanrewaju13@gmail.com" className="text-white hover:text-zinc-300 break-all">alabaolanrewaju13@gmail.com</a>
                  
                  <span className="text-zinc-500">GITHUB</span>
                  <a href="https://github.com/chryzcode" target="_blank" rel="noopener noreferrer" className="text-white hover:text-zinc-300 break-all">chryzcode</a>
                  
                  <span className="text-zinc-500">LINKEDIN</span>
                  <a href="https://www.linkedin.com/in/olanrewaju-alaba" target="_blank" rel="noopener noreferrer" className="text-white hover:text-zinc-300 break-all">Olanrewaju Alaba</a>
                  
                  <span className="text-zinc-500">X</span>
                  <a href="https://x.com/chryzcode" target="_blank" rel="noopener noreferrer" className="text-white hover:text-zinc-300 break-all">@chryzcode</a>
                </div>
              </div>

              {/* Right Column Form */}
              <div className="lg:col-span-7">
                <form onSubmit={handleContactSubmit} className="p-8 bg-zinc-950 border border-zinc-900 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-zinc-500 uppercase">Name</label>
                      <input 
                        type="text" 
                        required 
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors font-mono" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-zinc-500 uppercase">Email</label>
                      <input 
                        type="email" 
                        required 
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors font-mono" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-500 uppercase">Reason for reaching out</label>
                    <select 
                      value={contactForm.purpose}
                      onChange={(e) => setContactForm(prev => ({ ...prev, purpose: e.target.value }))}
                      className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors font-mono"
                    >
                      <option value="Backend Engineering">Backend Engineering</option>
                      <option value="Full-Stack Development">Full-Stack Development</option>
                      <option value="API & Integrations">API & Integrations</option>
                      <option value="Payments or SaaS">Payments or SaaS</option>
                      <option value="AI Application">AI Application</option>
                      <option value="Maintenance & Improvements">Maintenance & Improvements</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-500 uppercase">Message</label>
                    <textarea 
                      rows={5} 
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors font-mono" 
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="p-3 bg-emerald-950/20 border border-emerald-900/30 text-emerald-400 text-xs font-mono">
                      ✓ Message sent successfully. I will get back to you shortly.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-3 bg-red-950/20 border border-red-900/30 text-red-400 text-xs font-mono">
                      ✗ Error delivering message. Please reach out via email directly.
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-white text-black hover:bg-zinc-200 transition-colors font-mono text-xs uppercase tracking-widest font-bold"
                  >
                    {isSubmitting ? 'Delivering...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 12. FOOTER */}
        <footer className="border-t border-zinc-900 bg-zinc-950 py-14 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="text-xl font-bold text-white mb-2">chryzcode</div>
              <p className="text-zinc-400 text-sm font-sans mb-1">
                Backend / Full-Stack Software Engineer building practical, production-focused software.
              </p>
              <p className="text-zinc-500 text-xs font-mono">
                Python · Django · PostgreSQL · AWS · React · Next.js
              </p>
            </div>

            <div className="text-zinc-500 text-xs font-mono text-center md:text-right">
              © 2026 Olanrewaju Alaba. All rights reserved.
            </div>
          </div>
        </footer>

        {/* Back to Top */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-white text-black hover:bg-zinc-200 flex items-center justify-center transition-colors"
          aria-label="Back to Top"
        >
          <ChevronDown size={20} className="rotate-180" />
        </button>

        <CustomCursor />
      </div>
    </>
  )
}
